import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { ArrowLeft, Trash, Edit } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function BlogDetail({ route }) {
  const { blogId } = route.params;
  const navigation = useNavigation();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDetailData();
  }, [blogId]);

  const getDetailData = async () => {
    try {
      // MASUKKAN URL ENDPOINT MOCKAPI KAMU DI SINI
      const response = await axios.get(`https://6a0b363c21e4456256978c1c.mockapi.io/blogs/${blogId}`);
      setDetail(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Fungsi DELETE: Menghapus data dari MockAPI
  const handleDelete = () => {
    Alert.alert("Konfirmasi", "Hapus panduan penyelamatan ini?", [
      { text: "Batal", style: "cancel" },
      { text: "Hapus", style: "destructive", onPress: async () => {
          try {
            setLoading(true);
            await axios.delete(`https://6a0b363c21e4456256978c1c.mockapi.io/blogs/${blogId}`);
            alert("Data berhasil terhapus!");
            navigation.goBack();
          } catch (e) { console.error(e); }
        }
      }
    ]);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#E63946" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size="24" color="#1D3557" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Instruksi</Text>
        <View style={{ flexDirection: 'row', gap: 15 }}>
          <TouchableOpacity onPress={() => navigation.navigate("EditBlog", { blogId: detail.id })}>
            <Edit size="22" color="#1D3557" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Trash size="22" color="#E63946" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Image source={{ uri: detail?.image }} style={styles.mainImage} />
        <Text style={styles.title}>{detail?.title}</Text>
        <Text style={styles.content}>{detail?.content}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', marginTop: 30 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1D3557' },
  mainImage: { width: '100%', height: 220, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1D3557', marginTop: 20 },
  content: { fontSize: 15, color: '#457B9D', marginTop: 12, lineHeight: 24 }
});