import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

// Screens
import SplashScreen from './estacionamiento/screens/SplashScreen';
import HomeScreen from './estacionamiento/screens/HomeScreen';
import ParkingEntranceScreen from './estacionamiento/screens/ParkingEntranceScreen';
import ParkingElevatorScreen from './estacionamiento/screens/ParkingElevatorScreen';
import DisabledParkingScreen from './estacionamiento/screens/DisabledParkingScreen';
import SettingsScreen from './settings/SettingsScreen';
import DayActivityScreen from './estacionamiento/screens/DayActivityScreen';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  ParkingNearby: undefined;
  ParkingEntrance: undefined;
  ParkingElevator: undefined;
  DisabledParking: undefined;
  Settings: undefined;
  DayActivity: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ParkingEntrance" component={ParkingEntranceScreen} />
        <Stack.Screen name="ParkingElevator" component={ParkingElevatorScreen} />
        <Stack.Screen name="DisabledParking" component={DisabledParkingScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="DayActivity" component={DayActivityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e9ec',
  },
});