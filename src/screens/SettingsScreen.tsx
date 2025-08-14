import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import ayuda from '../../assets/ayuda.png';
import { useSettings } from '../context/SettingsContext';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  
  const { notificationsEnabled, setNotificationsEnabled } = useSettings();

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
          subtitle: '• Contacto',
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
  const [showContactModal, setShowContactModal] = useState(false);

  const handleSupportPress = () => {
    setShowContactModal(true);
  };

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
        </LinearGradient>
      </TouchableOpacity>
      
      <View style={styles.sectionContent}>
        {section.options.map((option: any) => (
          <TouchableOpacity 
            key={option.id} 
            style={styles.supportOption}
            onPress={handleSupportPress}
          >
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

      <Modal
        visible={showContactModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Contacto</Text>
            <Text style={styles.modalText}>+1 234 567 8900</Text>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setShowContactModal(false)}
            >
              <Text style={styles.modalButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

  return (
    <LinearGradient colors={['#e7e9ec', '#e7e9ec']} style={styles.container}>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#06a3c4',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
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

export default SettingsScreen;