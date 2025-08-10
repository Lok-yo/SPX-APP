import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSettings?: boolean;
  onBackPress?: () => void;
  onSettingsPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showSettings = false,
  onBackPress,
  onSettingsPress,
}) => {
  return (
    <LinearGradient
      colors={['#1f3339', '#06a3c4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <View style={styles.headerContent}>
        {showBack ? (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Ionicons name="chevron-back" size={27} color="#ffffffff" />
          </TouchableOpacity>
        ) : (
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/logoSPX-Small.png')} style={{ width: 100, height: 40 }} resizeMode="contain"/>
          </View>
        )}
        
        {title && (
          <Text style={styles.headerTitle}>{title}</Text>
        )}
        
        {showSettings && (
          <TouchableOpacity onPress={onSettingsPress} style={styles.settingsButton}>
            <Image source={require('../../assets/settings.png')} style={{width: 30, height: 30}} />
          </TouchableOpacity>
        )}
        
        {!showSettings && !showBack && <View style={styles.placeholder} />}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingTop: 30,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  logoIcon: {
    position: 'absolute',
    top: -8,
    left: 8,
    zIndex: 1,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  backButton: {
    padding: 5,
    zIndex: 1,
  },
  settingsButton: {
    padding: 5,
  },
  placeholder: {
    width: 34,
  },
});

export default Header;