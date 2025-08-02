import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import ParkingEntranceScreen from './src/screens/ParkingEntranceScreen';
import ParkingElevatorScreen from './src/screens/ParkingElevatorScreen';
import DisabledParkingScreen from './src/screens/DisabledParkingScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import DayActivityScreen from './src/screens/DayActivityScreen';

// Context
import { SettingsProvider } from './src/context/SettingsContext';

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
    <SettingsProvider>
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
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e9ec',
  },
});