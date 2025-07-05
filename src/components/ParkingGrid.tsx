import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ParkingSpot {
  id: string;
  available: boolean;
  type?: 'entrance' | 'elevator' | 'disabled';
}

interface ParkingGridProps {
  floor: number;
  availableSpots: number;
  totalSpots: number;
  spots: ParkingSpot[];
  type?: 'entrance' | 'elevator' | 'disabled';
}

const { width } = Dimensions.get('window');
const spotWidth = (width - 60) / 8; // 8 spots per row with margins

const ParkingGrid: React.FC<ParkingGridProps> = ({
  floor,
  availableSpots,
  totalSpots,
  spots,
  type,
}) => {
  const renderSpot = (spot: ParkingSpot) => {
    const isSpecialSpot = spot.type === type;
    
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
        {isSpecialSpot && (
          <View style={styles.spotIcon}>
            {type === 'entrance' && (
              <Ionicons name="enter" size={12} color="white" />
            )}
            {type === 'elevator' && (
              <Ionicons name="arrow-up" size={12} color="white" />
            )}
            {type === 'disabled' && (
              <Ionicons name="accessibility" size={12} color="white" />
            )}
          </View>
        )}
      </View>
    );
  };

  const renderSpotsGrid = () => {
    const rows = [];
    const spotsPerRow = 8;
    
    for (let i = 0; i < spots.length; i += spotsPerRow) {
      const rowSpots = spots.slice(i, i + spotsPerRow);
      rows.push(
        <View key={i} style={styles.spotRow}>
          {rowSpots.map(renderSpot)}
        </View>
      );
    }
    
    return rows;
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
        {renderSpotsGrid()}
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
    gap: 8,
  },
  spotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  parkingSpot: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  spotIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
});

export default ParkingGrid;