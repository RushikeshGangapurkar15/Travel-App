import { ScrollView, StyleSheet, Text, View } from "react-native";
import SearchBar from "../../components/SearchBar";
import FeedComponent from "../../components/FeedComponent";
import Destination from "../../components/Destination";
import { useState } from "react";

export default function HomePage({ navigation }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
    // console.log(searchText);
  };
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <SearchBar searchText={searchText} handleSearch={handleSearch} />
      {/* <FeedComponent /> */}
      <Destination searchText={searchText} HeadText="Best Destination" />

      <Destination searchText={searchText} HeadText="Nature " />
    </ScrollView>
  );
}
