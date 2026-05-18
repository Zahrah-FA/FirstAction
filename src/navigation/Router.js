import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import Screen Lama (Bab 1-6)
import HomeScreen from '../../screens/HomeScreen.js';
import Profile from '../../screens/Profile.js';
import DetailScreen from '../../screens/DetailScreen.js';

// Import Screen Baru (Bab 7)
import Login from '../screens/Login';
import AddEmergencyForm from '../screens/AddEmergencyForm';

import EditBlogForm from '../screens/EditBlogForm'; 
import { TransitionPresets } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === 'Home' ? 'home' : 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#E63946',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* Halaman Login sebagai pintu masuk utama */}
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} 
      />
      
      <Stack.Screen
        name="EditBlog"
        component={EditBlogForm}
        options={{
          headerShown: false,
          animationEnabled: true,
          animationTypeForReplace: "pop",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          ...TransitionPresets.SlideFromRight, // Efek animasi bergeser masuk dari kanan
        }}
      />

      {/* MainApp berisi Tab Home & Profile */}
      <Stack.Screen 
        name="MainApp" 
        component={MainTab} 
        options={{ headerShown: false }} 
      />

      {/* DetailScreen HARUS didaftarkan di sini agar navigasi tidak ERROR */}
      <Stack.Screen 
        name="DetailScreen" 
        component={DetailScreen} 
        options={{ 
          title: 'Detail Pertolongan',
          headerTintColor: '#E63946' 
        }} 
      />

      {/* Form Tambah Laporan Baru */}
      <Stack.Screen 
        name="AddEmergency" 
        component={AddEmergencyForm} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
};

export default Router;