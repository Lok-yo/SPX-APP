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
      colors={['rgba(196, 229, 229, 0.8)', 'rgba(196, 229, 229, 0.4)']}
      style={styles.header}
    >
      <View style={styles.headerContent}>
        {showBack ? (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
        ) : (
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/logoSPX.png')} style={{ width: 100, height: 40 }} resizeMode="contain"/>
          </View>
        )}
        
        {title && (
          <Text style={styles.headerTitle}>{title}</Text>
        )}
        
        {showSettings && (
          <TouchableOpacity onPress={onSettingsPress} style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        )}
        
        {!showSettings && !showBack && <View style={styles.placeholder} />}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 5,
  },
  settingsButton: {
    padding: 5,
  },
  placeholder: {
    width: 34,
  },
});

export default Header;