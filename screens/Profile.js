import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Edit, Trash, AddSquare } from 'iconsax-react-native';
import axios from 'axios';

export default function Profile() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Fungsi GET: Mengambil data panduan darurat dari MockAPI
  const getDataBlog = async () => {
    try {
      // MASUKKAN URL ENDPOINT MOCKAPI KAMU DI SINI
      const response = await axios.get("https://6a0b363c21e4456256978c1c.mockapi.io/blogs");
      setBlogData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal mengambil data dari server: ", error);
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getDataBlog();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getDataBlog();
    }, []),
  );

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header Profile */}
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

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Sertifikat</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{blogData.length}</Text>
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
      <View style={{ height: 30 }} />

      {/* Bagian Daftar Tindakan P3K (REST API List) */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
        <Text style={styles.sectionTitle}>Panduan Tindakan Saya</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddEmergency")}>
          <AddSquare size="24" color="#E63946" variant="Linear" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#E63946" />
      ) : (
        // Validasi: Pastikan blogData ada dan tipenya adalah Array sebelum di-map
        Array.isArray(blogData) && blogData.length > 0 ? (
          blogData.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.blogItem}
              onPress={() => navigation.navigate("BlogDetail", { blogId: item.id })}
            >
              <Image source={{ uri: item.image }} style={styles.blogImage} />
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={styles.blogTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.blogContent} numberOfLines={2}>{item.content}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          // Tampilan jika data di MockAPI masih kosong
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text style={{ color: '#666' }}>Belum ada panduan tindakan medis.</Text>
          </View>
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 30 },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  headerText: { marginLeft: 20 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#1D3557' },
  role: { fontSize: 14, color: '#E63946' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 20, borderRadius: 15, elevation: 4, marginBottom: 30 },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#1D3557' },
  statLabel: { fontSize: 12, color: '#666' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1D3557' },
  bio: { fontSize: 14, color: '#457B9D', lineHeight: 22 },
  blogItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 12, elevation: 2, alignItems: 'center' },
  blogImage: { width: 60, height: 60, borderRadius: 8 },
  blogTitle: { fontSize: 16, fontWeight: 'bold', color: '#1D3557' },
  blogContent: { fontSize: 12, color: '#666', marginTop: 4 },
  editButton: { backgroundColor: '#1D3557', padding: 10, borderRadius: 10, alignItems: 'center', marginTop: 1 },
  editButtonText: { color: '#fff', fontWeight: 'bold' }
});