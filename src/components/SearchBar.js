import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { SearchNormal1 } from 'iconsax-react-native';

const SearchBar = ({ searchPhrase, setSearchPhrase }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchNormal1 size="18" color="#FF4D4D" />
        <TextInput
          style={styles.input}
          placeholder="Cari pertolongan pertama"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: { padding: 10, width: "100%" },
  searchBar: {
    padding: 5,
    flexDirection: "row",
    backgroundColor: "#FFF5F5",
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#FFCCD2'
  },
  input: { fontSize: 12, marginLeft: 10, width: "90%", color: '#333' },
});