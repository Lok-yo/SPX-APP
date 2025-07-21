import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

import entrada from '../../assets/salida.png';
import elevador from '../../assets/elevador.png';
import discapacitado from '../../assets/discapacitado.png';

interface ParkingSpot {
  id: string;
  available: boolean;
  type?: 'entrance' | 'elevator' | 'disabled';
}

interface ParkingGridProps {
  floor: number;
  disabledSpots?: string[];
  entranceSpots?: string[];
  elevatorSpots?: string[];
}

const { width } = Dimensions.get('window');
const spotWidth = (width - 60) / 6; // Ajustado para 6 espacios por lado

const ParkingGrid: React.FC<ParkingGridProps> = ({ 
  floor,
  disabledSpots = [],
  entranceSpots = [],
  elevatorSpots = [],
 }) => {
  const [spots, setSpots] = useState<ParkingSpot[]>([]);

  useEffect(() => {
  const fetchData = () => {
    axios.get('http://192.168.1.72:3001/disponibilidad')
      .then(response => {
        const apiSpots = response.data;
        const ids = floor === 1
          ? ['A1','A2','A3','A4','A5','A6','B1','B2','B3','B4','B5','B6']
          : ['C1','C2','C3','C4','C5','C6','D1','D2','D3','D4','D5','D6'];
        const floorSpots: ParkingSpot[] = ids.map(id => {
          const found = apiSpots.find(s => s.posicion === id);
          let available = true;
          if (found) available = found.estatus === 1;
          let type: ParkingSpot['type'] = undefined;
          if (disabledSpots.includes(id)) type = 'disabled';
          else if (entranceSpots.includes(id)) type = 'entrance';
          else if (elevatorSpots.includes(id)) type = 'elevator';
          return { id, available, type };
        });
        setSpots(floorSpots);
      })
      .catch(error => {
        console.error('Error al obtener datos de la API:', error);
      });
  };

  fetchData(); // Primera carga
  const interval = setInterval(fetchData, 5000); // Actualiza cada 5 segundos

  return () => clearInterval(interval); // Limpia el intervalo al desmontar
}, [floor, disabledSpots, entranceSpots, elevatorSpots]);

  const availableSpots = spots.filter(spot => spot.available).length;
  const totalSpots = spots.length;

  const renderSpot = (spot: ParkingSpot) => {
    const isSpecialSpot = spot.type !== undefined;
    
    return (
      <View
        key={spot.id}
        style={[
          styles.parkingSpot,
          {
            backgroundColor: spot.available ? '#4FC946' : '#FF4444',
            width: spotWidth,
            height: spotWidth * 0.8,
          }
        ]}
      >
        {/* Mostrar el ID del espacio */}
        <Text style={styles.spotText}>{spot.id}</Text>
        {spot.type === 'disabled' && (
          <View style={styles.spotIcon}>
            <Image source={discapacitado} style={{ width: 16, height: 16 }} resizeMode="contain" />
          </View>
        )}
        {spot.type === 'entrance' && (
          <View style={styles.spotIcon}>
            <Image source={entrada} style={{ width: 16, height: 16 }} resizeMode="contain" />
          </View>
        )}
        {spot.type === 'elevator' && (
          <View style={styles.spotIcon}>
            <Image source={elevador} style={{ width: 16, height: 16 }} resizeMode="contain" />
          </View>
        )}
      </View>
    );
  };

  const renderSide = (sideSpots: ParkingSpot[]) => (
    <View style={styles.side}>
      {sideSpots.map(renderSpot)}
    </View>
  );

  const renderParkingLayout = () => {
    if (spots.length === 0) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando espacios...</Text>
        </View>
      );
    }

    // Dividir los espacios en dos lados
    const leftSide = spots.slice(0, 6);  // Primeros 6 espacios (A1-A6 o C1-C6)
    const rightSide = spots.slice(6, 12); // Siguientes 6 espacios (B1-B6 o D1-D6)

    return (
      <View style={styles.parkingLayout}>
        {renderSide(leftSide)}
        <View style={styles.centerPath}>
          <View style={styles.pathLine} />
        </View>
        {renderSide(rightSide)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.floorHeader}>
        <Text style={styles.floorTitle}>Piso {floor}</Text>
        <View style={styles.availabilityBadge}>
          <Text style={styles.availabilityText}>
            Quedan {availableSpots} espacios disponibles
          </Text>
        </View>
      </View>
      
      <View style={styles.grid}>
        {renderParkingLayout()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  floorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  floorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  availabilityBadge: {
    backgroundColor: 'rgba(79, 195, 195, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  availabilityText: {
    fontSize: 12,
    color: '#2D7B7B',
    fontWeight: '600',
  },
  grid: {
    backgroundColor: '#e7e9ec',
    borderRadius: 20,
    padding: 16,
  },
  parkingLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  side: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  centerPath: {
    width: 40,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  pathLine: {
    width: 4,
    height: '80%',
    backgroundColor: '#bdbdbd',
    borderRadius: 2,
  },
  parkingSpot: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    position: 'relative',
  },
  spotText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  spotIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ParkingGrid;