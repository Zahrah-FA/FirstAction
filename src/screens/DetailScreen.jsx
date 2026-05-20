import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>Halaman Detail Panduan</Text>
      <Text style={styles.sub}>Isi detail akan muncul di sini (BAB Selanjutnya)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 18, fontWeight: 'bold', color: '#1D3557' },
  sub: { fontSize: 14, color: '#666', marginTop: 10 }
});