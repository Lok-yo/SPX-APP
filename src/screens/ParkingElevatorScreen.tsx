import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import ParkingGrid from '../components/ParkingGrid';
import ParkingGridGeneral from '../components/ParkingGridGeneral';
import NotificationAlert from '../components/NotificationAlert';
import { useSettings } from '../context/SettingsContext';

type ParkingElevatorScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ParkingElevator'>;

const ParkingElevatorScreen: React.FC = () => {
  const navigation = useNavigation<ParkingElevatorScreenNavigationProp>();
  const { notificationsEnabled } = useSettings();
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
          <ParkingGrid floor={1} elevatorSpots={['A6', 'A5','B5', 'B6']} />
          
          <ParkingGrid floor={2} elevatorSpots={['C6', 'D6']}/>
          
        </ScrollView>
        <View style={styles.footer}>
          <ParkingGridGeneral />
          <NotificationAlert enabled={notificationsEnabled} />
        </View>
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
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    zIndex: 10,
  },
});

export default ParkingElevatorScreen;