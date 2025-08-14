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

type ParkingEntranceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ParkingEntrance'>;

const ParkingEntranceScreen: React.FC = () => {
  const navigation = useNavigation<ParkingEntranceScreenNavigationProp>();
  const { notificationsEnabled } = useSettings();
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
          showBack 
          onBackPress={() => navigation.goBack()}
          title="Estacionamientos con                       cercanía a entradas"
        />
        
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <ParkingGrid floor={1} entranceSpots={['A5', 'B5']} />
          
          <ParkingGrid floor={2} entranceSpots={['C6', 'D6','C5', 'D5']} />
        </ScrollView>
        <View style={styles.footer}>
          <ParkingGridGeneral />
        </View>
        <NotificationAlert enabled={notificationsEnabled} />
        <View style={styles.footer2}>
          <Text style={styles.footerText}>SMART PARKING EXPERIENCE</Text>
          <View style={styles.indicatorContainer}>
            <View style={styles.indicator} />
            <View style={[styles.indicator, styles.activeIndicator]} />
          </View>
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
    paddingBottom: 30,
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
  footer2: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 15,
  },
  indicatorContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgb(255, 0, 0)',
  },
  activeIndicator: {
    backgroundColor: '#4FC946',
  },
});

export default ParkingEntranceScreen;