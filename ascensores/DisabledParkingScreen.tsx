import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../src/components/Header';
import ParkingGrid from '../src/components/ParkingGrid';

type DisabledParkingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DisabledParking'>;

const DisabledParkingScreen: React.FC = () => {
  const navigation = useNavigation<DisabledParkingScreenNavigationProp>();

  // Mock data for parking spots with disabled accessibility
  const generateSpotsWithDisabled = (total: number, available: number, disabledSpots: number[]) => {
    const spots = [];
    for (let i = 0; i < total; i++) {
      spots.push({
        id: `spot-${i}`,
        available: i < available,
        type: disabledSpots.includes(i) ? 'disabled' as const : undefined,
      });
    }
    return spots;
  };

  const floor1Spots = generateSpotsWithDisabled(32, 1, [24, 25]);
  const floor2Spots = generateSpotsWithDisabled(16, 1, [8, 9]);

  return (
    <LinearGradient colors={['#E5E5E5', '#C4E5E5']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header 
          title="Estacionamientos para discapacitados"
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
            type="disabled"
          />
          
          <ParkingGrid
            floor={2}
            availableSpots={1}
            totalSpots={16}
            spots={floor2Spots}
            type="disabled"
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

export default DisabledParkingScreen;