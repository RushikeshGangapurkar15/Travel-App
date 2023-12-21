import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const AllBlogsComponent = ({ dispatch, blogData }) => {
  const [isPressed, setIsPressed] = useState(false);

  const toggleIconColor = () => {
    setIsPressed(!isPressed);
    dispatch({ type: "TOGGLE_FAVORITE", payload: { blog: blogData } });
  };

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("DetailBlog", {
          blogData: blogData, // Corrected to use blogData
        })
      }
    >
      <View style={styles.container}>
        <Image source={{ uri: blogData.image }} style={styles.profileimage} />
        <View style={styles.blogText}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#007acc" }}>
            {blogData.title}
          </Text>
          {/* <Text style={{ fontSize: 10, fontWeight: "bold", color: "#444" }}>
            By {blogData.author}
          </Text> */}
        </View>
        <TouchableOpacity
          style={styles.heartIconContainer}
          onPress={toggleIconColor}
        >
          <Icon
            name="heart"
            size={30}
            style={{ color: isPressed ? "red" : "black", marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2, // Add shadow on the right side
      height: 2, // Add shadow on the bottom side
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    margin: 12,
  },

  profileimage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    // borderWidth: 3,

    borderColor: "white",
  },
  blogText: {
    marginLeft: 20,
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007acc",
  },
  authorText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#444",
  },
  heartIconContainer: {
    marginLeft: "auto",
    padding: 10,
  },
  heartIcon: {
    color: "red",
  },
});

export default AllBlogsComponent;
