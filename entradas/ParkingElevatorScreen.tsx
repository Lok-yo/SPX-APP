import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../src/components/Header';
import ParkingGrid from '../src/components/ParkingGrid';

type ParkingElevatorScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ParkingElevator'>;

const ParkingElevatorScreen: React.FC = () => {
  const navigation = useNavigation<ParkingElevatorScreenNavigationProp>();

  // Mock data for parking spots with elevator proximity
  const generateSpotsWithElevator = (total: number, available: number, elevatorSpots: number[]) => {
    const spots = [];
    for (let i = 0; i < total; i++) {
      spots.push({
        id: `spot-${i}`,
        available: i < available,
        type: elevatorSpots.includes(i) ? 'elevator' as const : undefined,
      });
    }
    return spots;
  };

  const floor1Spots = generateSpotsWithElevator(32, 1, [0, 1]);
  const floor2Spots = generateSpotsWithElevator(16, 2, [0, 1]);

  return (
    <LinearGradient colors={['#E5E5E5', '#C4E5E5']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header 
          title="Estacionamientos con cercanía a ascensores"
          showBack 
          onBackPress={() => navigation.goBack()}
        />
        
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <ParkingGrid
            floor={1}
            availableSpots={1}
            totalSpots={32}
            spots={floor1Spots}
            type="elevator"
          />
          
          <ParkingGrid
            floor={2}
            availableSpots={2}
            totalSpots={16}
            spots={floor2Spots}
            type="elevator"
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

export default ParkingElevatorScreen;