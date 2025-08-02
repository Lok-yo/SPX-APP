import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Audio } from 'expo-av';

const ALL_SPOTS = [
  'A1','A2','A3','A4','A5','A6','B1','B2','B3','B4','B5','B6',
  'C1','C2','C3','C4','C5','C6','D1','D2','D3','D4','D5','D6'
];

interface NotificationAlertProps {
  enabled: boolean;
}

const NotificationAlert: React.FC<NotificationAlertProps> = ({ enabled }) => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [sound, setSound] = useState<any>(null);
  const prevPercent = useRef<number>(0);
  const wasFull = useRef<boolean>(false);

  useEffect(() => {
    if (!enabled) return;

    const fetchGeneral = () => {
      fetch('http://192.168.1.72:3001/disponibilidad')
        .then(res => res.json())
        .then(apiSpots => {
          const available = ALL_SPOTS.filter(id => {
            const found = apiSpots.find((s: any) => s.posicion === id);
            return found ? found.estatus === 1 : true;
          }).length;
          const percent = Math.round((available / ALL_SPOTS.length) * 100);

          // Detecta transición de lleno a desocupado
          if (percent === 0) {
            wasFull.current = true;
          } else if (wasFull.current && percent > 0) {
            const newAlert = {
              id: Date.now().toString(),
              time: new Date().toLocaleTimeString(),
              title: '¡Lugar disponible!',
              message: 'Se ha liberado un lugar en el estacionamiento.',
            };
            setAlerts(prev => [newAlert, ...prev]);
            playSound();
            wasFull.current = false; // Solo alerta una vez hasta que vuelva a llenarse
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

  const renderItem = ({ item }: any) => (
    <View style={styles.messageBubble}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  if (!enabled || alerts.length === 0) return null;

  return (
    <FlatList
      data={alerts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      inverted
      style={{ marginTop: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignSelf: 'flex-start',
    maxWidth: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    color: '#d93025',
    marginBottom: 4,
  },
  message: {
    fontSize: 15,
    color: '#333333',
  },
  time: {
    fontSize: 12,
    color: 'gray',
    marginTop: 6,
    alignSelf: 'flex-end',
  },
});

export default NotificationAlert;