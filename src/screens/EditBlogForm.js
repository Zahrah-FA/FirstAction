import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function EditBlogForm({ route }) {
  const { blogId } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchOldData = async () => {
      try {
        // MASUKKAN URL ENDPOINT MOCKAPI KAMU DI SINI
        const response = await axios.get(`https://6a0b363c21e4456256978c1c.mockapi.io/blogs/${blogId}`);
        setTitle(response.data.title);
        setImage(response.data.image);
        setContent(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchOldData();
  }, [blogId]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // MASUKKAN URL ENDPOINT MOCKAPI KAMU DI SINI
      await axios.put(`https://6a0b363c21e4456256978c1c.mockapi.io/blogs/${blogId}`, {
        title,
        image,
        content,
      });
      setLoading(false);
      alert("Panduan sukses diperbarui!");
      navigation.navigate("Profile");
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
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
        <Text style={styles.headerTitle}>Edit Panduan Medis</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.label}>Nama Tindakan</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <Text style={styles.label}>URL Gambar</Text>
        <TextInput style={styles.input} value={image} onChangeText={setImage} />

        <Text style={styles.label}>Instruksi Penyelamatan</Text>
        <TextInput style={[styles.input, { height: 120, textAlignVertical: 'top' }]} value={content} onChangeText={setContent} multiline />

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', marginTop: 30 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center', backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1D3557' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#1D3557', marginTop: 15, marginBottom: 5 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, fontSize: 14 },
  button: { backgroundColor: '#1D3557', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});