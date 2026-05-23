import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function DetailScreen({ route, navigation }) {
  // Mengambil data yang dikirimkan dari halaman HomeScreen
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Gambar Tindakan */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Konten Detail */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.category}</Text>
        </View>

        <Text style={styles.sectionTitle}>Penjelasan Singkat</Text>
        <Text style={styles.description}>{item.description}</Text>

        <Text style={styles.sectionTitle}>Langkah Penanganan Awal</Text>
        <Text style={styles.description}>{item.treatment}</Text>

        <Text style={styles.sectionTitle}>Obat yang Disarankan</Text>
        <Text style={styles.description}>{item.medicine}</Text>

        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            ⚠️ {item.warning}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 250, resizeMode: 'cover' },
  contentContainer: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1D3557', marginBottom: 10 },
  badge: { backgroundColor: '#E63946', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, alignSelf: 'flex-start', marginBottom: 15 },
  badgeText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1D3557', marginBottom: 10 },
  description: { fontSize: 16, color: '#4A4A4A', lineHeight: 24 },
  warningBox: {
  backgroundColor: '#FFE5E5',
  padding: 15,
  borderRadius: 10,
  marginTop: 20,
  },
  warningText: {
    color: '#D00000',
    fontWeight: 'bold',
    lineHeight: 22,
  },
});