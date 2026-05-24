import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import ActionCard from '../components/ActionCard';
import { supabase } from '../lib/supabase';

export default function HomeScreen() {

  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Fisik', 'Saraf', 'Jantung'];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {

    const { data, error } = await supabase
      .from('emergencies')
      .select('*');

    if (error) {
      console.log(error);
    } else {
      setData(data);
    }
  };

  const filteredData = data.filter((item) => {

    const matchesSearch =
      item.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Semua' ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>

      <Text style={styles.headerTitle}>
        FirstAction
      </Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Cari tindakan..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Category */}
      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >

          {categories.map((cat, index) => (

            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === cat &&
                styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(cat)}
            >

              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat &&
                  styles.categoryTextActive
                ]}
              >
                {cat}
              </Text>

            </TouchableOpacity>
          ))}

        </ScrollView>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.formButton}
        onPress={() =>
          navigation.navigate('EmergencyForm')
        }
      >
        <Text style={styles.formButtonText}>
          Buat Laporan Darurat
        </Text>
      </TouchableOpacity>

      {/* List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <ActionCard
            item={item}
            onPress={() =>
              navigation.navigate(
                'DetailScreen',
                { item }
              )
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E63946',
    marginTop: 25,
    marginBottom: 10,
  },

  searchBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },

  categoryContainer: {
    marginBottom: 15,
  },

  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EAEAEA',
    marginRight: 10,
  },

  categoryButtonActive: {
    backgroundColor: '#E63946',
  },

  categoryText: {
    color: '#495057',
    fontWeight: '600',
  },

  categoryTextActive: {
    color: '#fff',
  },

  formButton: {
    backgroundColor: '#1D3557',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },

  formButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});