import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile';
import DetailScreen from '../screens/DetailScreen';
import EmergencyForm from '../screens/EmergencyForm';
import Login from '../screens/Login';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: 'Detail Tindakan',
        }}
      />

      <Stack.Screen
        name="EmergencyForm"
        component={EmergencyForm}
        options={{
          title: 'Form Darurat',
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;