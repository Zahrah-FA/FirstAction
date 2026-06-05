import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';

import { Setting2 } from 'iconsax-react-native';

export default function Profile({ navigation }) {

  const [menuVisible, setMenuVisible] = useState(false);
  const [name, setName] = useState('Srikandi Medis');
  const [role, setRole] = useState('Relawan Medis FirstAction');
  const [isEditing, setIsEditing] = useState(false);
  const handleLogout = async () => {
  await supabase.auth.signOut();
  navigation.replace('Login');
};

  return (

    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image
            source={{
              uri: 'https://ui-avatars.com/api/?name=Srikandi+Medis&background=E63946&color=fff&size=128'
            }}
            style={styles.profileImage}
          />
          <View style={styles.headerText}>
            {isEditing ? (
              <>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />

                <TextInput
                  style={styles.input}
                  value={role}
                  onChangeText={setRole}
                />
              </>
            ) : (
              <>
                <Text style={styles.name}>
                  {name}
                </Text>

                <Text style={styles.role}>
                  {role}
                </Text>
              </>
            )}
          </View>
        </View>

        {/* Tombol Gerigi */}
        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => setMenuVisible(true)}
        >
          <Setting2
            size="28"
            color="#1D3557"
            variant="Linear"
          />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Sertifikat</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>45</Text>
          <Text style={styles.statLabel}>Aksi P3K</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>150</Text>
          <Text style={styles.statLabel}>Poin</Text>
        </View>
      </View>

      {/* Tentang Saya */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Tentang Saya
        </Text>

        <Text style={styles.bio}>
          Relawan Medis yang fokus pada pertolongan pertama dan keselamatan publik.
          Aktif dalam riset machine learning untuk deteksi kesehatan.
        </Text>
      </View>

      {/* Tombol Edit */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setIsEditing(!isEditing)}
      >
        <Text style={styles.editButtonText}>
          {isEditing ? 'Simpan Profil' : 'Edit Profil'}
        </Text>
      </TouchableOpacity>

      {/* Modal Logout */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutText}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 30,
  },

  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  settingButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  headerText: {
    marginLeft: 20,
    justifyContent: 'center',
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1D3557',
  },

  role: {
    fontSize: 14,
    color: '#E63946',
    marginTop: 3,
  },

  input: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 10,
    marginBottom: 8,
    width: 180,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 4,
    marginBottom: 30,
  },

  statBox: {
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3557',
  },

  statLabel: {
    fontSize: 12,
    color: '#666666',
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3557',
    marginBottom: 10,
  },

  bio: {
    fontSize: 14,
    color: '#457B9D',
    lineHeight: 22,
  },

  editButton: {
    backgroundColor: '#1D3557',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 90,
    paddingRight: 20,
  },

  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 140,
    elevation: 5,
    paddingVertical: 10,
  },

  menuItem: {
    padding: 15,
  },

  logoutText: {
    color: '#E63946',
    fontWeight: 'bold',
    fontSize: 16,
  },

});