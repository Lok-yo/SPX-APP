import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../src/components/Header';

import entrada from '../../assets/salida.png';
import elevador from '../../assets/elevador.png';
import discapacitado from '../../assets/discapacitado.png';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const menuOptions = [
    {
      id: 'activity',
      title: 'Actividad del día',
      icon: 'calendar',
      onPress: () => navigation.navigate('DayActivity'),
    },
    {
      id: 'entrance',
      title: 'Estacionamientos con cercanía a entradas',
      image: entrada,
      onPress: () => navigation.navigate('ParkingEntrance'),
    },
    {
      id: 'elevator',
      title: 'Estacionamientos con cercanía a ascensores',
      image: elevador,
      onPress: () => navigation.navigate('ParkingElevator'),
    },
    {
      id: 'disabled',
      title: 'Estacionamientos con accesibilidad',
      subtitle: 'Espacios designados para personas con discapacidad',
      image: discapacitado,
      onPress: () => navigation.navigate('DisabledParking'),
    },
  ];

  return (
    <LinearGradient colors={['#e7e9ec', '#e7e9ec']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header 
          showSettings 
          onSettingsPress={() => navigation.navigate('Settings')}
        />
        
        <View style={styles.content}>
          <Text style={styles.greeting}>Hola, ¿a dónde</Text>
          <Text style={styles.greeting}>quieres ir?</Text>
          <LinearGradient
            colors={['#a6a6a6', '#fff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.menuContainer}
          >
          <View style={styles.menuContainer}>
            {menuOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.menuItem}
                onPress={option.onPress}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#1f3339', '#06a3c4']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.menuItemGradient}
                >
                  <View style={styles.menuItemContent}>
                    <View style={styles.menuTextContainer}>
                      <Text style={styles.menuItemText}>{option.title}</Text>
                      {option.subtitle && (
                        <Text style={styles.menuItemSubtitle}>{option.subtitle}</Text>
                      )}
                    </View>
                    {option.image ? (
                      <Image source={option.image} style={styles.menuIconImage} resizeMode="contain"/>
                    ) : (
                      <Ionicons 
                        name={option.icon as any} 
                        size={24} 
                        color="white" 
                        style={styles.menuIcon}
                      />
                    )}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              
            ))}
          </View>
          </LinearGradient>
        </View>
        
        {/* Footer */}
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
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  menuContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    gap: 20,
  },
  menuItem: {
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItemGradient: {
    borderRadius: 15,
    padding: 20,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuTextContainer: {
    flex: 1,
    marginRight: 15,
  },
  menuItemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  menuItemSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  menuIcon: {
    marginLeft: 10,
  },
  menuIconImage: {
    width: 28,
    height: 28,
    marginLeft: 10,
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeIndicator: {
    backgroundColor: '#4FC946',
  },
});

export default HomeScreen;