import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../src/components/Header';
import ParkingGrid from '../../src/components/ParkingGrid';

type ParkingNearbyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ParkingNearby'>;

const ParkingNearbyScreen: React.FC = () => {
  const navigation = useNavigation<ParkingNearbyScreenNavigationProp>();

  // Mock data for parking spots
  const generateSpots = (total: number, available: number) => {
    const spots = [];
    for (let i = 0; i < total; i++) {
      spots.push({
        id: `spot-${i}`,
        available: i < available,
      });
    }
    return spots;
  };

  const floor1Spots = generateSpots(32, 12);
  const floor2Spots = generateSpots(16, 12);

  return (
    <LinearGradient colors={['#E5E5E5', '#C4E5E5']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header 
          title="Estacionamientos cerca de mí"
          showBack 
          onBackPress={() => navigation.goBack()}
        />
        
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <ParkingGrid
            floor={1}
            availableSpots={12}
            totalSpots={32}
            spots={floor1Spots}
          />
          
          <ParkingGrid
            floor={2}
            availableSpots={12}
            totalSpots={16}
            spots={floor2Spots}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default ParkingNearbyScreen;