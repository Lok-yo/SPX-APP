import React from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [], color: () => '#00b140', strokeWidth: 3 }]
  });
  const [busiestHour, setBusiestHour] = useState('');

  useEffect(() => {
  axios.get('http://192.168.1.72:3001/ocupacion-promedio-por-hora')
    .then(res => {
      // res.data es el array que recibes del backend
      // Genera todas las horas de 6 a 18
      const allHours = Array.from({ length: 13 }, (_, i) => i + 6); // [6,7,...,18]
      // Mapea los datos recibidos a un Map para acceso rápido
      const dataMap = new Map(res.data.map(d => [Number(d.hora), Number(d.porcentaje_ocupacion) || 0]));
      // Genera labels y valores uniformes
      const labels = allHours.map(h => h.toString().padStart(2, '0'));
      const values = allHours.map(h => dataMap.get(h) ?? 0);

      setChartData({
        labels,
        datasets: [{ data: values, color: () => '#00b140', strokeWidth: 3 }]
      });

      const maxIndex = values.indexOf(Math.max(...values));
      setBusiestHour(labels[maxIndex]);
    })
    .catch(err => {
      console.error('Error al obtener datos:', err);
    });
}, []);
const hasData =
  chartData.labels.length > 0 &&
  chartData.datasets[0].data.length > 0 &&
  chartData.datasets[0].data.every((v) => typeof v === 'number' && !isNaN(v));


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
        {hasData ? (
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
        ) : (
          <Text style={{ marginTop: 40, color: '#888' }}>
            No hay datos para mostrar.
          </Text>
        )}
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