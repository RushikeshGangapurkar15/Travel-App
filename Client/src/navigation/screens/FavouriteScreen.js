import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useBlogContext } from "../BlogContext";
import { useNavigation } from "@react-navigation/native";

const FavouriteScreen = () => {
  const { state } = useBlogContext();
  const navigation = useNavigation();

  return (
    <FlatList
      style={{ backgroundColor: "#fff" }}
      data={state.favoriteBlogs}
      numColumns={2} // Set the number of columns to 2
      keyExtractor={(blog) => blog.id.toString()}
      renderItem={({ item: blog }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("DetailBlog", {
              blogData: blog, // Corrected to use blogData
            })
          }
        >
          <View style={styles.cardContainer}>
            <Image source={{ uri: blog.image }} style={styles.profileImage} />
            <View style={styles.cardText}>
              <Text style={styles.blogTitle}>{blog.title}</Text>
              {/* <Text style={styles.authorText}>By {blog.author}</Text> */}
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 173, // Set a fixed width for the card
    height: 280, // Set a fixed height for the card
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    margin: 12,
  },
  profileImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardText: {
    margin: 10,
    marginBottom: 20,
  },
  blogTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007acc",
  },
  authorText: {
    fontSize: 13,
    fontWeight: "300",
    marginTop: 10,
    marginBottom: 20,
  },
  cardContent: {
    alignItems: "center",
  },

  imageText: {},
});

export default FavouriteScreen;
