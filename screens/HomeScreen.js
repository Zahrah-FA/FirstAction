import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Add } from 'iconsax-react-native';
import SearchBar from '../src/components/SearchBar.js';
import ActionCard from '../components/ActionCard.js';
import actionData from '../utils/actionData.js';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchPhrase, setSearchPhrase] = useState("");

  // Memastikan data terfilter dengan aman
  const filteredData = (actionData || []).filter((item) => {
    const titleMatch = item?.title?.toLowerCase().includes(searchPhrase.toLowerCase());
    const categoryMatch = item?.category?.toLowerCase().includes(searchPhrase.toLowerCase());
    return titleMatch || categoryMatch;
  });

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>FirstAction</Text>
        <Text style={styles.subtitle}>Pertolongan Pertama Jadi Mudah</Text>
      </View>

      {/* Search Section */}
      <SearchBar 
        searchPhrase={searchPhrase} 
        setSearchPhrase={setSearchPhrase} 
      />

      {/* List Section */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActionCard
            item={item}
            onPress={() => navigation.navigate('Detail', { data: item })}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchPhrase === ""
                ? "Data belum tersedia"
                : `Tidak ditemukan hasil untuk "${searchPhrase}"`}
            </Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddEmergency')}
        activeOpacity={0.7}
      >
        <Add size="32" color="#FFF" variant="Linear" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF' 
  },
  header: { 
    paddingHorizontal: 20, 
    paddingTop: 60, 
    paddingBottom: 10,
    backgroundColor: '#FFF' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#E63946' 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#666', 
    marginTop: 5 
  },
  listContent: { 
    paddingHorizontal: 20, 
    paddingBottom: 100,
    flexGrow: 1 // Penting agar ListEmptyComponent bisa centering
  },
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: -50 // Menyesuaikan posisi agar benar-benar di tengah visual
  },
  emptyText: { 
    color: '#999', 
    fontSize: 16,
    textAlign: 'center'
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#E63946',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});