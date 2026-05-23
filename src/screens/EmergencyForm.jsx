import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

export default function EmergencyForm() {

  const [name, setName] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = () => {

    if (!name || !condition || !location) {
      Alert.alert(
        'Peringatan',
        'Mohon isi semua data penting!'
      );
      return;
    }

    Alert.alert(
      'Laporan Terkirim',
      `Pasien: ${name}\nKondisi: ${condition}`
    );

    setName('');
    setCondition('');
    setLocation('');
    setNote('');
  };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Form Laporan Darurat
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
          Kirim Laporan
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