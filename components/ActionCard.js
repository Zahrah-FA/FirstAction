import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Menerima data melalui PROPS: item
export default function ActionCard({ item }) {
  // STATE: Untuk menyimpan status apakah panduan sudah dibaca atau belum
  const [isRead, setIsRead] = useState(false);

  return (
    <TouchableOpacity 
      style={[styles.card, isRead && styles.readCard]} 
      onPress={() => setIsRead(!isRead)} // Toggle state isRead saat kartu diklik
    >
      {/* Menampilkan Gambar dari Props */}
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.title}>{item.title}</Text>
        {/* Teks dinamis berdasarkan STATE */}
        <Text style={styles.status}>
          {isRead ? '✅ Selesai Dibaca' : '📖 Belum Dibaca'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  readCard: { backgroundColor: '#E8F5E9', opacity: 0.8 }, // Warna berubah jika sudah dibaca
  image: { width: 90, height: 90 },
  content: { padding: 12, flex: 1, justifyContent: 'center' },
  category: { fontSize: 10, color: '#E63946', fontWeight: 'bold', marginBottom: 2 },
  title: { fontSize: 16, fontWeight: '600', color: '#1D3557' },
  status: { fontSize: 11, marginTop: 5, color: '#666', fontStyle: 'italic' }
});