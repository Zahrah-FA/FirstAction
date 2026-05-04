import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, StatusBar } from 'react-native';

const { width } = Dimensions.get('window');

export default function DetailScreen({ route }) {
  const { item } = route.params || {};

  if (!item) {
    return (
      <View style={styles.center}>
        <Text>Data tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" />
      
      {/* Gambar Header dengan Overlay sedikit agar elegan */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Langkah Penanganan & Penjelasan</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Selalu hubungi tenaga medis jika kondisi memburuk.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA', // Abu-abu sangat muda agar mata nyaman
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: width,
    height: 230,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#E63946',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    elevation: 5,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 20,
    marginTop: -10, // Sedikit naik ke arah gambar
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 10,
  },
  divider: {
    height: 4,
    width: 60,
    backgroundColor: '#E63946',
    borderRadius: 2,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#457B9D',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
    textAlign: 'justify',
  },
  footer: {
    marginTop: 10,
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#A8DADC',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});