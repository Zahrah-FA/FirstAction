import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Pastikan nama ini benar
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../../screens/HomeScreen';
import Profile from '../../screens/Profile';
import DetailScreen from '../../screens/DetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // Pastikan tidak ada tanda hubung (-)

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#E63946',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainApp" 
        component={MainTab} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={{ title: 'Detail Pertolongan' }} 
      />
    </Stack.Navigator>
  );
}