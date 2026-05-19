import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function DetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  
  // Menangkap object 'item' yang dikirim dari HomeScreen
  const { item } = route.params || {}; 

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Tombol Kembali */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Kembali</Text>
      </TouchableOpacity>

      {/* Gambar Kondisi Medis */}
      {item?.image && (
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      )}

      {/* Konten Detail */}
      <View style={styles.contentContainer}>
        <View style={styles.badgeContainer}>
          <Text style={styles.categoryBadge}>{item?.category}</Text>
        </View>
        
        <Text style={styles.title}>{item?.title}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Langkah Penanganan Cepat:</Text>
        {/* Menggunakan text dinamis dari properti description lengkap milikmu */}
        <Text style={styles.description}>{item?.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  backButton: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  backText: {
    fontSize: 16,
    color: '#E63946',
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 240,
  },
  contentContainer: {
    padding: 20,
  },
  badgeContainer: {
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#FFE3E5',
    color: '#E63946',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1D3557',
  },
  divider: {
    height: 2,
    backgroundColor: '#F1F1F1',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#4A4A4A',
  },
});