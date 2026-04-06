import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ActionCard from '../components/ActionCard';
import actionData from '../utils/actionData';

export default function HomeScreen() {
  // STATE: Untuk menyimpan kategori yang sedang dipilih user
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const categories = ['Semua', 'Pernapasan', 'Luka Luar', 'Cedera Fisik'];

  // Fungsi Logika: Memfilter data berdasarkan State selectedCategory
  const filteredData = selectedCategory === 'Semua' 
    ? actionData 
    : actionData.filter(item => item.category === selectedCategory);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>FirstAction: Panduan P3K</Text>

      {/* Bar Kategori: Menggunakan State untuk mengubah tampilan tombol aktif */}
      <View style={styles.categoryContainer}>
        {categories.map((cat) => (
          <TouchableOpacity 
            key={cat} 
            style={[styles.catBtn, selectedCategory === cat && styles.activeCat]}
            onPress={() => setSelectedCategory(cat)} // Update state saat tombol kategori ditekan
          >
            <Text style={[styles.catText, selectedCategory === cat && styles.activeCatText]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Mengirim data ke ActionCard melalui PROPS 'item' */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ActionCard item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F9FA' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 50, marginBottom: 20, color: '#1D3557' },
  categoryContainer: { flexDirection: 'row', marginBottom: 20, gap: 8, flexWrap: 'wrap' },
  catBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#ddd' },
  activeCat: { backgroundColor: '#E63946' },
  catText: { fontSize: 12, color: '#333' },
  activeCatText: { color: '#fff', fontWeight: 'bold' }
});