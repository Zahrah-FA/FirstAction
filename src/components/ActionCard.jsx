import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ActionCard = ({ title, category, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Gambar ditaruh di sebelah kiri teks */}
      {image && (
        <Image 
          source={{ uri: image }} 
          style={styles.cardImage} 
          resizeMode="cover"
        />
      )}
      
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardCategory}>Kategori: {category}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 14,
    borderLeftWidth: 6,
    borderLeftColor: '#E63946', // Garis merah penanda medis di sisi kiri
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row', // Mengatur gambar dan teks agar berjejer ke samping
    padding: 12,
    alignItems: 'center',
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 14,
    backgroundColor: '#F3F4F6', // Warna placeholder kalau gambar belum termuat
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  cardCategory: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
});

export default ActionCard;