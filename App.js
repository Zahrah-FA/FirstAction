// BAB 2
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


//BAB 3
// import React from 'react';
// import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
// import HomeScreen from './screens/HomeScreen';

// export default function App() {
//   return (
//     // SafeAreaView akan menjaga konten agar tidak menabrak bar notifikasi
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="white" />
//       <HomeScreen />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#F8F9FA', // Sesuaikan dengan warna background HomeScreen
//   },
// });

//BAB 4
import React from 'react';
import Profile from './screens/Profile'; // Import halaman profil yang baru dibuat
import HomeScreen from './screens/HomeScreen'; // Pastikan import ke HomeScreen

export default function App() {
  return (
    <Profile />
    //<HomeScreen />
  );
}