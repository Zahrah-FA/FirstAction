import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Register from '../screens/Register';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile';
import DetailScreen from '../screens/DetailScreen';
import Login from '../screens/Login';
import EmergencyForm from '../screens/EmergencyForm';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName =
            route.name === 'Home'
              ? 'home'
              : 'person';

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#E63946',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function Router() {
  return (
    <Stack.Navigator initialRouteName="Login">

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MainApp"
        component={MainTab}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          title: 'Detail Pertolongan',
          headerTintColor: '#E63946',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />

      <Stack.Screen
        name="EmergencyForm"
        component={EmergencyForm}
        options={{
          title: 'Form Darurat',
          headerTintColor: '#E63946',
        }}
      />

    </Stack.Navigator>
  );
}