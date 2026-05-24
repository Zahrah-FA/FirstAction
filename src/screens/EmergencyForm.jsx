import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

export default function EmergencyForm({ navigation, route }) {
  // Ambil data edit kalau ada
  const editData = route.params?.item;
  const [name, setName] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');

  // Isi otomatis kalau mode edit
  useEffect(() => {
    if (editData) {
      setName(editData.description?.replace('Laporan darurat atas nama ', '').replace('.', '') || '');
      setCondition(editData.title || '');
      setLocation(
        editData.treatment?.replace('Segera lakukan pemeriksaan awal di lokasi ', '').replace('.', '') || ''
      );
      setNote(editData.medicine || '');
    }
  }, []);

  const handleSubmit = async () => {
    if (!name || !condition || !location) {
      Alert.alert(
        'Peringatan',
        'Mohon isi semua data penting!'
      );
      return;
    }

    const formData = {
      title: condition,
      category: 'Darurat',
      image:
        'https://cdn-icons-png.flaticon.com/512/2966/2966486.png',

      description: `Laporan darurat atas nama ${name}.`,
      treatment:
        `Segera lakukan pemeriksaan awal di lokasi ${location}.`,
      medicine:
        note || 'Menunggu tindakan medis lebih lanjut.',
    };

    try {
      // MODE EDIT = PUT
      if (editData) {
        const response = await fetch(
          `http://10.216.231.205:3000/emergencies/${editData.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          Alert.alert(
            'Berhasil',
            'Data berhasil diupdate!'
          );
          navigation.goBack();
        } else {
          Alert.alert(
            'Error',
            'Gagal update data!'
          );
        }
      }

      // MODE TAMBAH = POST
      else {
        const response = await fetch(
          'http://10.216.231.205:3000/emergencies',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          Alert.alert(
            'Berhasil',
            'Laporan darurat berhasil dikirim!'
          );
          setName('');
          setCondition('');
          setLocation('');
          setNote('');
          navigation.goBack();
        } else {
          Alert.alert(
            'Error',
            'Gagal mengirim data!'
          );
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Error',
        'Server tidak terhubung!'
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {editData
          ? 'Edit Laporan Darurat'
          : 'Form Laporan Darurat'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Pasien"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Kondisi Darurat"
        value={condition}
        onChangeText={setCondition}
      />

      <TextInput
        style={styles.input}
        placeholder="Lokasi"
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Catatan Tambahan"
        value={note}
        onChangeText={setNote}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >

        <Text style={styles.buttonText}>

          {editData
            ? 'Update Data'
            : 'Kirim Laporan'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 25,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#E63946',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});