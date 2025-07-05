import React from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../src/components/Header';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type ParkingStatsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ParkingNearby'>;

const chartData = {
  labels: ['6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM'],
  datasets: [
    {
      data: [85, 40, 35, 50, 90, 75, 70],
      color: () => '#00b140', // Línea verde
      strokeWidth: 3,
    },
  ],
};

// Calcular la hora más ocupada
const maxIndex = chartData.datasets[0].data.indexOf(Math.max(...chartData.datasets[0].data));
const busiestHour = chartData.labels[maxIndex];

const screenWidth = Dimensions.get('window').width - 40;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: () => '#00b140',
  labelColor: () => '#222',
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#00b140',
  },
  propsForBackgroundLines: {
    stroke: '#bbb',
  },
};

const ParkingStatsScreen: React.FC = () => {
  const navigation = useNavigation<ParkingStatsScreenNavigationProp>();

  return (
    <LinearGradient colors={['#e0e0e0', '#fff']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header
          title="Estadísticas de ocupación"
          showBack
          onBackPress={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>
            Hora que se ocupan mas estacionamientos{'\n'}
            <Text style={styles.bold}>en general:</Text>
          </Text>
          <Text style={styles.highlight}>{busiestHour}</Text>
          <LineChart
            data={chartData}
            width={screenWidth}
            height={300}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            fromZero
            yAxisSuffix="%"
          />
        </ScrollView>
        <View style={styles.footer}>
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
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 0,
  },
  bold: {
    fontWeight: 'bold',
  },
  highlight: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 0,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  axisLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginTop: 8,
    fontWeight: '600',
  },
  footer: {
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

export default ParkingStatsScreen;