import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/navigation/Router';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}