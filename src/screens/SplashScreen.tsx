import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { LinearGradient } from 'expo-linear-gradient';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

  }, [navigation]);

  return (
    <LinearGradient
      colors={['#fff', '#fff']}
      style={styles.container}
    >
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        {/* Icono del carro con WiFi */}
        <View style={styles.carIconContainer}>
          <Image source={require('../../assets/logoSPX.png')} style={{ width: 300, height: 300 }} resizeMode="contain"/>
        </View>
        
        {/* Botón de navegación */}
        <TouchableOpacity onPress={() => navigation.replace('Home')}>
          <LinearGradient
            colors={['#1f3339', '#06a3c4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.navigationButton}
          >
            <Text style={styles.buttonText}>Iniciar Navegación</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>SMART PARKING EXPERIENCE</Text>
        <View style={styles.indicatorContainer}>
          <View style={[styles.indicator, styles.activeIndicator]} />
          <View style={styles.indicator} />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  carIconContainer: {
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  wifiIcon: {
    position: 'absolute',
    top: -20,
    zIndex: 1,
  },
  title: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 4,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    fontWeight: '600',
    letterSpacing: 2,
  },
  navigationButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgb(0, 255, 0)',
  },
  activeIndicator: {
    backgroundColor: 'rgb(255, 0, 0)',
  },
});

export default SplashScreen;