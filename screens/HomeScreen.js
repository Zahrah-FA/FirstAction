/**
 * HomeScreen - Halaman Utama
 * Mengatur logika pencarian panduan dan menampilkan daftar data dari actionData
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import ActionCard from '../components/ActionCard';
import actionData from '../utils/actionData';

export default function HomeScreen() {
  // State untuk menyimpan teks pencarian dari user
  const [search, setSearch] = useState('');

  // Fungsi untuk menyaring (filter) data berdasarkan input user
  const filteredData = actionData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* 1. Memberikan komentar sesuai tugas: 
          Komponen Text untuk judul halaman utama aplikasi FirstAction */}
      <Text style={styles.headerTitle}>Panduan FirstAction</Text>
      
      {/* 2. Komponen TextInput untuk fitur pencarian (Handling Input) */}
      <TextInput
        style={styles.searchBar}
        placeholder="Cari tindakan penyelamatan..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActionCard title={item.title} category={item.category} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#F8F9FA' 
  },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#1D3557',
    marginTop: 25,    // Memberikan jarak dari atas layar agar tidak tertutup notch
    marginBottom: 10, // Memberikan jarak sedikit ke kotak search di bawahnya
    // -------------------------
  },
  searchBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    elevation: 2, // Memberikan sedikit bayangan
  },
});