import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, Alert } from 'react-native';
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

  // Datos de ejemplo para mostrar cómo se verán las tablas
  const generateMockData = (floorNumber: number) => {
    const floorSpots: ParkingSpot[] = [];
    
    if (floorNumber === 1) {
      // Piso 1: algunos espacios ocupados y otros libres
      const floor1Data = [
        { id: 'A1', available: true },
        { id: 'A2', available: false },
        { id: 'A3', available: true },
        { id: 'A4', available: false },
        { id: 'A5', available: true },
        { id: 'A6', available: true },
        { id: 'B1', available: false },
        { id: 'B2', available: true },
        { id: 'B3', available: false },
        { id: 'B4', available: true },
        { id: 'B5', available: false },
        { id: 'B6', available: true },
      ];
      
      floor1Data.forEach(spot => {
        let type: ParkingSpot['type'] = undefined;
        if (disabledSpots.includes(spot.id)) type = 'disabled';
        else if (entranceSpots.includes(spot.id)) type = 'entrance';
        else if (elevatorSpots.includes(spot.id)) type = 'elevator';
        floorSpots.push({
          id: spot.id,
          available: spot.available,
          type,
        });
      });
    } else {
      // Piso 2: diferentes ocupaciones
      const floor2Data = [
        { id: 'C1', available: false },
        { id: 'C2', available: true },
        { id: 'C3', available: false },
        { id: 'C4', available: true },
        { id: 'C5', available: true },
        { id: 'C6', available: false },
        { id: 'D1', available: true },
        { id: 'D2', available: false },
        { id: 'D3', available: true },
        { id: 'D4', available: true },
        { id: 'D5', available: true },
        { id: 'D6', available: false },
      ];
      
      floor2Data.forEach(spot => {
        let type: ParkingSpot['type'] = undefined;
        if (disabledSpots.includes(spot.id)) type = 'disabled';
        else if (entranceSpots.includes(spot.id)) type = 'entrance';
        else if (elevatorSpots.includes(spot.id)) type = 'elevator';
        floorSpots.push({
          id: spot.id,
          available: spot.available,
          type,
        });
      });
    }
    
    return floorSpots;
  };

  useEffect(() => {
    // Cargar datos de ejemplo
    const mockSpots = generateMockData(floor);
    setSpots(mockSpots);
  }, [floor]);

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