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

import { supabase } from '../lib/supabase';

export default function EmergencyForm({
  navigation,
  route,
}) {

  const editData = route.params?.item;

  const [name, setName] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');

  // Isi data saat edit
  useEffect(() => {

    if (editData) {

      setName(
        editData.name || ''
      );

      setCondition(
        editData.title || ''
      );

      setLocation(
        editData.location || ''
      );

      setNote(
        editData.medicine || ''
      );
    }

  }, []);

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async () => {

    if (
      !name ||
      !condition ||
      !location
    ) {

      Alert.alert(
        'Peringatan',
        'Mohon isi semua data penting!'
      );

      return;
    }

    const formData = {

      name: name,

      title: condition,

      category: 'Darurat',

      location: location,

      image:
        'https://cdn-icons-png.flaticon.com/512/2966/2966486.png',

      description:
        `Pasien mengalami ${condition}.`,

      treatment:
        `Segera lakukan pemeriksaan awal di lokasi ${location} dan hubungi tenaga medis terdekat.`,

      medicine:
        note ||
        'Menunggu tindakan medis lebih lanjut.',
    };

    try {

      // =========================
      // UPDATE
      // =========================
      if (editData) {

        const { error } = await supabase
          .from('emergencies')
          .update(formData)
          .eq('id', editData.id);

        if (error) {

          console.log(error);

          Alert.alert(
            'Error',
            error.message
          );

        } else {

          Alert.alert(
            'Berhasil',
            'Data berhasil diupdate!'
          );

          navigation.goBack();
        }

      }

      // =========================
      // INSERT
      // =========================
      else {

        const { error } = await supabase
          .from('emergencies')
          .insert([formData]);

        if (error) {

          console.log(error);

          Alert.alert(
            'Error',
            error.message
          );

        } else {

          Alert.alert(
            'Berhasil',
            'Laporan berhasil dikirim!'
          );

          setName('');
          setCondition('');
          setLocation('');
          setNote('');

          navigation.goBack();
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

      {/* Nama */}
      <TextInput
        style={styles.input}
        placeholder="Nama Pasien"
        value={name}
        onChangeText={setName}
      />

      {/* Kondisi */}
      <TextInput
        style={styles.input}
        placeholder="Kondisi Darurat"
        value={condition}
        onChangeText={setCondition}
      />

      {/* Lokasi */}
      <TextInput
        style={styles.input}
        placeholder="Lokasi"
        value={location}
        onChangeText={setLocation}
      />

      {/* Catatan */}
      <TextInput
        style={[
          styles.input,
          styles.textArea
        ]}
        placeholder="Catatan Tambahan"
        value={note}
        onChangeText={setNote}
        multiline
      />

      {/* Button */}
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