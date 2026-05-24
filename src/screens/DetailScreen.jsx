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

export default function DetailScreen({ route, navigation }) {
  const { item } = route.params;
  // DELETE API
  const handleDelete = () => {
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
          onPress: async () => {
            try {
              const response = await fetch(
                `http://10.216.231.205:3000/emergencies/${item.id}`,
                {
                  method: 'DELETE',
                }
              );
              if (response.ok) {
                Alert.alert(
                  'Berhasil',
                  'Data berhasil dihapus'
                );
                navigation.goBack();
              } else {
                Alert.alert(
                  'Error',
                  'Gagal menghapus data'
                );
              }

            } catch (error) {
              console.log(error);
              Alert.alert(
                'Error',
                'Server tidak terhubung'
              );
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Gambar */}
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />

      {/* Content */}
      <View style={styles.contentContainer}>

        {/* Judul */}
        <Text style={styles.title}>
          {item.title}
        </Text>

        {/* Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {item.category}
          </Text>
        </View>

        {/* Penjelasan */}
        <Text style={styles.sectionTitle}>
          Penjelasan Singkat
        </Text>
        <Text style={styles.description}>
          {item.description}
        </Text>

        {/* Penanganan */}
        <Text style={styles.sectionTitle}>
          Langkah Penanganan Awal
        </Text>
        <Text style={styles.description}>
          {item.treatment}
        </Text>

        {/* Obat */}
        <Text style={styles.sectionTitle}>
          Obat yang Disarankan
        </Text>
        <Text style={styles.description}>
          {item.medicine}
        </Text>

        {/* Alert */}
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>
            ⚠ Jika kondisi semakin memburuk segera hubungi ambulans atau tenaga medis terdekat.
          </Text>
        </View>

        {/* Button Edit */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate(
              'EmergencyForm',
              { item }
            )
          }
        >
          <Text style={styles.editButtonText}>
            Edit Data
          </Text>
        </TouchableOpacity>

        {/* Button Delete */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>
            Hapus Data
          </Text>
        </TouchableOpacity>
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
    marginBottom: 2,
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
    marginBottom: 10,
    marginTop: 15,
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
    marginBottom: 20,
  },
  alertText: {
    color: '#D62828',
    fontWeight: 'bold',
    lineHeight: 22,
  },
  deleteButton: {
    backgroundColor: '#D62828',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButton: {
  backgroundColor: '#1D3557',
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
  marginBottom: 15,
  },

  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});