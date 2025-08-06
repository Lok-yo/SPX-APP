import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const ALL_SPOTS = [
  'A1','A2','A3','A4','A5','A6','B1','B2','B3','B4','B5','B6',
  'C1','C2','C3','C4','C5','C6','D1','D2','D3','D4','D5','D6'
];

interface NotificationAlertProps {
  enabled: boolean;
}

const NotificationAlert: React.FC<NotificationAlertProps> = ({ enabled }) => {
  const [currentAlert, setCurrentAlert] = useState<any>(null);
  const [sound, setSound] = useState<any>(null);
  const prevPercent = useRef<number>(0);
  const wasFull = useRef<boolean>(false);

  useEffect(() => {
    if (!enabled) return;

    const fetchGeneral = () => {
      fetch('http://192.168.38.18:3001/disponibilidad')
        .then(res => res.json())
        .then(apiSpots => {
          const available = ALL_SPOTS.filter(id => {
            const found = apiSpots.find((s: any) => s.posicion === id);
            return found ? found.estatus === 0 : true;
          }).length;
          const percent = Math.round((available / ALL_SPOTS.length) * 100);

          if (percent === 0) {
            wasFull.current = true;
          } else if (wasFull.current && percent > 0) {
            const newAlert = {
              id: Date.now().toString(),
              time: new Date().toLocaleTimeString(),
              title: '¡Lugar disponible!',
              message: 'Se ha liberado un lugar en el estacionamiento.',
            };
            setCurrentAlert(newAlert);
            playSound();
            wasFull.current = false;
          }

          prevPercent.current = percent;
        });
    };

    const interval = setInterval(fetchGeneral, 5000);
    fetchGeneral();
    return () => {
      clearInterval(interval);
      if (sound) sound.unloadAsync();
    };
  }, [enabled]);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/alert.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  };

  if (!enabled) return null;

  return (
    <Modal
      visible={currentAlert !== null}
      transparent
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{currentAlert?.title}</Text>
          <Text style={styles.modalText}>{currentAlert?.message}</Text>
          <Text style={styles.time}>{currentAlert?.time}</Text>
          <TouchableOpacity 
            style={styles.modalButton}
            onPress={() => setCurrentAlert(null)}
          >
            <Text style={styles.modalButtonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    color: '#d93025',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  time: {
    fontSize: 12,
    color: 'gray',
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
});

export default NotificationAlert;