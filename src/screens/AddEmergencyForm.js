import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ArrowLeft } from 'iconsax-react-native';
import "iconsax-react-native";

const AddEmergencyForm = ({ navigation }) => {
  const [formData, setFormData] = useState({
    lokasi: "",
    keterangan: "",
    kontak: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size="24" color="#E63946" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lapor Kejadian Darurat</Text>
      </View>

      <Text style={styles.label}>Lokasi Kejadian</Text>
      <TextInput
        style={styles.input}
        placeholder="Alamat lengkap atau koordinat"
        value={formData.lokasi}
        onChangeText={(text) => handleInputChange("lokasi", text)}
      />

      <Text style={styles.label}>Keterangan Tindakan / Kondisi Korban</Text>
      <TextInput
        style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
        placeholder="Jelaskan kondisi korban dan tindakan yang sudah diambil..."
        multiline={true}
        numberOfLines={6}
        value={formData.keterangan}
        onChangeText={(text) => handleInputChange("keterangan", text)}
      />

      <Text style={styles.label}>Nomor Kontak Darurat</Text>
      <TextInput
        style={styles.input}
        placeholder="0812xxxx"
        keyboardType="phone-pad"
        value={formData.kontak}
        onChangeText={(text) => handleInputChange("kontak", text)}
      />

      <TouchableOpacity style={styles.btnSubmit}>
        <Text style={styles.btnText}>Kirim Laporan Sekarang</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddEmergencyForm;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 30 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 20, marginLeft: -10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginTop: 0, color: '#E63946' },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20
  },
  btnSubmit: {
    backgroundColor: '#E63946',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});