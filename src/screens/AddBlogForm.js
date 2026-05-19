import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function AddBlogForm() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');

  const handleUpload = async () => {
    if (!title || !content || !image) {
      alert("Seluruh kolom wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://6a0b363c21e4456256978c1c.mockapi.io/blogs", {
        title: title,
        image: image,
        content: content,
        createdAt: new Date(),
      });
      setLoading(false);
      alert("Tindakan penyelamatan sukses ditambahkan!");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size="24" color="#1D3557" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tambah Panduan P3K</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.label}>Nama Tindakan Darurat</Text>
        <TextInput style={styles.input} placeholder="Contoh: Resusitasi Jantung (RJP)" value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Link Ilustrasi Gambar</Text>
        <TextInput style={styles.input} placeholder="Masukkan URL Gambar" value={image} onChangeText={setImage} />

        <Text style={styles.label}>Langkah Penyelamatan</Text>
        <TextInput style={[styles.input, { height: 120, textAlignVertical: 'top' }]} placeholder="Tulis instruksi penanganan medis..." value={content} onChangeText={setContent} multiline />

        <TouchableOpacity style={styles.button} onPress={handleUpload} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Simpan ke Server</Text>}
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
  button: { backgroundColor: '#E63946', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});