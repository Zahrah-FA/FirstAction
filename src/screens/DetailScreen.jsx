import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { supabase } from '../lib/supabase';

export default function DetailScreen({ route, navigation }) {
  const { item } = route.params;

  // FUNCTION DELETE
  const handleDelete = async () => {
    Alert.alert(
      'Konfirmasi',
      'Yakin ingin menghapus data ini?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            const { error } = await supabase
              .from('emergencies')
              .delete()
              .eq('id', item.id);

            if (error) {
              console.log(error);

              Alert.alert(
                'Error',
                'Gagal menghapus data!'
              );
            } else {
              Alert.alert(
                'Berhasil',
                'Data berhasil dihapus!'
              );

              navigation.goBack();
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* IMAGE */}
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />

      <View style={styles.contentContainer}>
        
        {/* TITLE */}
        <Text style={styles.title}>
          {item.title}
        </Text>

        {/* CATEGORY */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {item.category}
          </Text>
        </View>

        {/* DESCRIPTION */}
        <Text style={styles.sectionTitle}>
          Penjelasan Singkat
        </Text>

        <Text style={styles.description}>
          {item.description}
        </Text>

        {/* TREATMENT */}
        <Text style={styles.sectionTitle}>
          Langkah Penanganan Awal
        </Text>

        <Text style={styles.description}>
          {item.treatment}
        </Text>

        {/* MEDICINE */}
        <Text style={styles.sectionTitle}>
          Obat yang Disarankan
        </Text>

        <Text style={styles.description}>
          {item.medicine}
        </Text>

        {/* ALERT */}
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>
            ⚠ Jika kondisi semakin memburuk segera hubungi ambulans atau tenaga medis terdekat.
          </Text>
        </View>

        {/* BUTTON AREA */}
        <View style={styles.buttonContainer}>
          
          {/* EDIT BUTTON */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate(
                'EmergencyForm',
                { item }
              )
            }
          >
            <Text style={styles.buttonText}>
              Edit Data
            </Text>
          </TouchableOpacity>

          {/* DELETE BUTTON */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>
              Hapus Data
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },

  contentContainer: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 10,
  },

  badge: {
    backgroundColor: '#E63946',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },

  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3557',
    marginTop: 20,
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: '#4A4A4A',
    lineHeight: 24,
  },

  alertBox: {
    backgroundColor: '#FFE5E5',
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
  },

  alertText: {
    color: '#D62828',
    fontWeight: 'bold',
    lineHeight: 22,
  },

  buttonContainer: {
    marginTop: 30,
    gap: 15,
  },

  editButton: {
    backgroundColor: '#1D3557',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  deleteButton: {
    backgroundColor: '#E63946',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});