import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const ALL_SPOTS = [
  'A1','A2','A3','A4','A5','A6','B1','B2','B3','B4','B5','B6',
  'C1','C2','C3','C4','C5','C6','D1','D2','D3','D4','D5','D6'
];

const ParkingGridGeneral: React.FC = () => {
  const [spots, setSpots] = useState<{ id: string; available: boolean }[]>([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://192.168.1.72:3001/disponibilidad')
        .then(response => {
          const apiSpots = response.data;
          const allSpots = ALL_SPOTS.map(id => {
            const found = apiSpots.find(s => s.posicion === id);
            let available = true;
            if (found) available = found.estatus === 1;
            return { id, available };
          });
          setSpots(allSpots);
        })
        .catch(error => {
          console.error('Error al obtener datos de la API:', error);
        });
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const availableSpots = spots.filter(spot => spot.available).length;
  const percentAvailable = spots.length > 0 ? Math.round((availableSpots / spots.length) * 100) : 0;

  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Disponibilidad general: {percentAvailable}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: { alignItems: 'center' },
  footerText: { fontSize: 16, fontWeight: 'bold', color: '#2D7B7B' },
});

export default ParkingGridGeneral;