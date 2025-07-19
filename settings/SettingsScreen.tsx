import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Header from '../src/components/Header';
import ayuda from '../assets/ayuda.png';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const settingSections = [
    {
      id: 'notifications',
      title: 'Avisos de disponibilidad de estacionamiento',
      type: 'toggle',
      value: notificationsEnabled,
      onChange: setNotificationsEnabled,
      expanded: true,
      description: 'Le llegarán avisos de disponibilidad de estacionamiento.',
    },
    {
      id: 'support',
      title: 'Soporte y mantenimiento',
      type: 'support',
      options: [
        {
          id: 'help',
          title: 'Centro de ayuda',
          subtitle: '• Guía de uso',
          image: ayuda,
        },
      ],
    },
  ];

  const renderToggleSection = (section: any) => (
    <View key={section.id} style={styles.section}>
      <TouchableOpacity style={styles.sectionHeader}>
        <LinearGradient
          colors={['#1f3339', '#06a3c4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.sectionHeaderGradient}
        >
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Ionicons 
            name={section.expanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="white" 
          />
          
        </LinearGradient>
      </TouchableOpacity>
      
      {section.expanded && (
        <View style={styles.sectionContent}>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleDescription}>{section.description}</Text>
            <Switch
              value={section.value}
              onValueChange={section.onChange}
              trackColor={{ false: '#E0E0E0', true: '#4FC3C3' }}
              thumbColor={section.value ? '#2D7B7B' : '#f4f3f4'}
            />
          </View>
        </View>
      )}
    </View>
  );

  const renderSupportSection = (section: any) => (
    <View key={section.id} style={styles.section}>
      <TouchableOpacity style={styles.sectionHeader}>
        <LinearGradient
          colors={['#1f3339', '#06a3c4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.sectionHeaderGradient}
        >
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Ionicons name="chevron-up" size={20} color="white" />
        </LinearGradient>
      </TouchableOpacity>
      
      <View style={styles.sectionContent}>
        {section.options.map((option: any) => (
          <TouchableOpacity key={option.id} style={styles.supportOption}>
            <View style={styles.supportOptionLeft}>
              <View style={styles.supportIconContainer}>
                <Image source={option.image} style={styles.menuIconImage} resizeMode="contain"/>
              </View>
              <View>
                <Text style={styles.supportOptionTitle}>{option.title}</Text>
                <Text style={styles.supportOptionSubtitle}>{option.subtitle}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#E5E5E5', '#C4E5E5']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header 
          title="AJUSTES"
          showBack 
          onBackPress={() => navigation.goBack()}
        />
        
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.settingsContainer}>
            {settingSections.map((section) => {
              switch (section.type) {
                case 'toggle':
                  return renderToggleSection(section);
                case 'support':
                  return renderSupportSection(section);
                default:
                  return null;
              }
            })}
          </View>
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
  settingsContainer: {
    gap: 20,
  },
  section: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  sectionHeader: {
    borderRadius: 15,
  },
  sectionHeaderGradient: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  sectionContent: {
    backgroundColor: 'white',
    padding: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleDescription: {
    flex: 1,
    color: '#333',
    fontSize: 14,
    marginRight: 15,
  },
  menuIconImage: {
    width: 40,
    height: 40,
  },
  supportOption: {
    paddingVertical: 15,
  },
  supportOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  supportOptionTitle: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  supportOptionSubtitle: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
});

export default SettingsScreen;