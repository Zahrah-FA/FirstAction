import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { ArrowLeft } from 'iconsax-react-native';
import axios from 'axios';

const EditBlogForm = ({ route, navigation }) => {
  // Mengambil data blog/artikel yang dikirim dari halaman detail sebelumnya
  const { blogId } = route.params;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // 1. GET DATA: Mengambil data lama dari API berdasarkan ID saat halaman dibuka
  useEffect(() => {
    getBlogDetail();
  }, []);

  const getBlogDetail = async () => {
    try {
      // Ganti URL ini dengan URL API backend kamu
      const response = await axios.get(`https://api.firstaction.com/blogs/${blogId}`);
      setTitle(response.data.title);
      setContent(response.data.content);
      setImage(response.data.image);
      setFetching(false);
    } catch (error) {
      console.error("Gagal mengambil detail data: ", error);
      setFetching(false);
    }
  };

  // 2. PUT DATA: Mengirimkan data yang sudah diubah kembali ke server API
  const handleUpdate = async () => {
    if (!title || !content || !image) {
      alert("Semua kolom harus diisi!");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`https://api.firstaction.com/blogs/${blogId}`, {
        title: title,
        content: content,
        image: image,
      });
      setLoading(false);
      alert("Data berhasil diperbarui!");
      navigation.goBack(); // Kembali ke halaman sebelumnya setelah sukses
    } catch (error) {
      console.error("Gagal memperbarui data: ", error);
      setLoading(false);
      alert("Terjadi kesalahan saat memperbarui data.");
    }
  };

  if (fetching) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF0000" />
        <Text>Memuat data lama...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size="24" color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Artikel Darurat</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Form Input */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.label}>Judul Tindakan</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan judul pertolongan..."
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Link Gambar Ilustrasi</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan URL gambar..."
          value={image}
          onChangeText={setImage}
        />

        <Text style={styles.label}>Konten / Langkah Penyelamatan</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Tuliskan langkah-langkah penyelamatan secara detail..."
          multiline={true}
          numberOfLines={6}
          value={content}
          onChangeText={setContent}
        />

        {/* Tombol Simpan */}
        <TouchableOpacity style={styles.buttonSubmit} onPress={handleUpdate} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Perbarui Data</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditBlogForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  buttonSubmit: {
    backgroundColor: 'rgba(255, 0, 0, 1)', // Menggunakan aksen merah medis dasar
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});