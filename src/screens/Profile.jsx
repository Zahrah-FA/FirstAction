import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function Profile() {
  return (
    <ScrollView style={styles.container}>
      {/* Header Profile - Flexbox Row */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://ui-avatars.com/api/?name=Srikandi+Medis&background=E63946&color=fff&size=128' }} 
          style={styles.profileImage} 
        />
        <View style={styles.headerText}>
          <Text style={styles.name}>Srikandi Medis</Text>
          <Text style={styles.role}>Relawan Medis FirstAction</Text>
        </View>
      </View>

      {/* Stats Section - Flexbox Row dengan JustifyContent Space-Between */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Sertifikat</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>45</Text>
          <Text style={styles.statLabel}>Aksi P3K</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>150</Text>
          <Text style={styles.statLabel}>Poin</Text>
        </View>
      </View>

      {/* Bio Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tentang Saya</Text>
        <Text style={styles.bio}>
          Relawan Medis yang fokus pada pertolongan pertama dan keselamatan publik. 
          Aktif dalam riset machine learning untuk deteksi kesehatan.
        </Text>
      </View>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
  header: { 
    flexDirection: 'row', // Menyusun gambar dan teks secara menyamping
    alignItems: 'center', 
    marginTop: 40, 
    marginBottom: 30 
  },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  headerText: { marginLeft: 20 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#1D3557' },
  role: { fontSize: 14, color: '#E63946' },
  
  statsContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', // Memberikan jarak merata antar elemen
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 15, 
    elevation: 4,
    marginBottom: 30
  },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#1D3557' },
  statLabel: { fontSize: 12, color: '#666' },

  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1D3557', marginBottom: 10 },
  bio: { fontSize: 14, color: '#457B9D', lineHeight: 22 },

  editButton: { 
    backgroundColor: '#1D3557', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10 
  },
  editButtonText: { color: '#fff', fontWeight: 'bold' }
});