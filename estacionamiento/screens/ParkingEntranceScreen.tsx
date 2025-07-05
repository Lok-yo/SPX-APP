import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../src/components/Header';
import ParkingGrid from '../../src/components/ParkingGrid';

type ParkingEntranceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ParkingEntrance'>;

const ParkingEntranceScreen: React.FC = () => {
  const navigation = useNavigation<ParkingEntranceScreenNavigationProp>();

  // Mock data for parking spots with entrance proximity
  const generateSpotsWithEntrance = (total: number, available: number, entranceSpots: number[]) => {
    const spots = [];
    for (let i = 0; i < total; i++) {
      spots.push({
        id: `spot-${i}`,
        available: i < available,
        type: entranceSpots.includes(i) ? 'entrance' as const : undefined,
      });
    }
    return spots;
  };

  const floor1Spots = generateSpotsWithEntrance(32, 3, [0, 1, 8, 9]);
  const floor2Spots = generateSpotsWithEntrance(16, 12, [0, 1]);

  return (
    <LinearGradient colors={['#E5E5E5', '#C4E5E5']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header 
          title="Estacionamientos con cercanía a entradas"
          showBack 
          onBackPress={() => navigation.goBack()}
        />
        
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <ParkingGrid
            floor={1}
            availableSpots={3}
            totalSpots={32}
            spots={floor1Spots}
            type="entrance"
          />
          
          <ParkingGrid
            floor={2}
            availableSpots={12}
            totalSpots={16}
            spots={floor2Spots}
            type="entrance"
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

export default ParkingEntranceScreen;