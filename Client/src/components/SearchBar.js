import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import this if you want a search icon

const SearchBar = ({ searchText, handleSearch }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
});

export default SearchBar;
