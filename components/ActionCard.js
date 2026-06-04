/**
 * Komponen ActionCard
 * Digunakan untuk menampilkan item panduan dalam bentuk kartu (card)
 * Menerima props 'title' dan 'category'
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Komponen ActionCard untuk menampilkan item dalam list
export default function ActionCard({ title, category }) {
  return (
    <TouchableOpacity style={styles.card}>
      <View>
        {/* Menampilkan kategori dengan teks kecil */}
        <Text style={styles.categoryText}>{category}</Text>
        {/* Menampilkan judul tindakan */}
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <Text style={styles.iconText}>→</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3, // Shadow untuk Android
    borderLeftWidth: 5,
    borderLeftColor: '#E63946', // Warna merah medis
  },
  categoryText: { fontSize: 12, color: '#457B9D', fontWeight: 'bold' },
  titleText: { fontSize: 16, fontWeight: '600', color: '#1D3557', marginTop: 4 },
  iconText: { fontSize: 18, color: '#A8DADC' }
});