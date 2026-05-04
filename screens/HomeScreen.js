import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'; 
import ActionCard from '../components/ActionCard';

// PERHATIKAN INI: Saya sesuaikan import-nya tanpa kurung kurawal sesuai file kamu
import actionData from '../utils/actionData'; 

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const categories = ['Semua', 'Fisik', 'Jantung', 'Saraf'];

  // Filter data berdasarkan kategori
  const filteredData = selectedCategory === 'Semua' 
    ? actionData 
    : actionData.filter(item => 
        item.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER TETAP (DIAM) */}
      <View style={styles.fixedHeader}>
        <View style={styles.titleWrapper}>
          <Text style={styles.headerTitle}>First Action</Text>
          <Text style={styles.headerSubtitle}>Pertolongan Pertama Darurat</Text>
        </View>

        <View style={styles.categoryContainer}>
          {categories.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.catBtn, selectedCategory === cat && styles.activeCat]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.catText, selectedCategory === cat && styles.activeCatText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* FLATLIST (BAGIAN YANG NYAMBUNG KE KARTU PENYAKIT) */}
      {filteredData && filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()} // toString biar aman
          renderItem={({ item }) => <ActionCard item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Data penyakit tidak ditemukan...</Text>
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  fixedHeader: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 30, 
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 10,
  },
  titleWrapper: { marginBottom: 15 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#1D3557' },
  headerSubtitle: { fontSize: 14, color: '#457B9D' },
  categoryContainer: { flexDirection: 'row', gap: 10 },
  catBtn: { 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    borderRadius: 20, 
    backgroundColor: '#E9ECEF' 
  },
  activeCat: { backgroundColor: '#E63946' },
  catText: { fontSize: 13, color: '#495057' },
  activeCatText: { color: '#fff', fontWeight: 'bold' },
  listContent: { padding: 20, paddingBottom: 50 }
});