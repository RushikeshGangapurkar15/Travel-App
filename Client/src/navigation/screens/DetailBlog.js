import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import BackButton from "../../components/BackButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const DetailBlog = ({ route }) => {
  const { blogData } = route.params;
  const navigation = useNavigation();
  const handleEdit = () => {
    navigation.navigate("EditBlog", { blogData });
  };
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: blogData.image }} style={styles.coverimage} />
      <BackButton />
      <Icon
        size={30}
        color={"#fff"}
        name="edit"
        onPress={handleEdit}
        style={{
          margin: 10,
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 2,
        }}
      />
      <View style={styles.profileContainer}>
        <Image source={blogData.image} style={styles.profileimage} />

        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#007acc",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          {blogData.title}
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{blogData.content}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
  coverimage: {
    width: "100%",
    height: 300,
  },

  descriptionContainer: {
    marginHorizontal: 10,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10, // Reduced padding
    height: "auto",
  },
  descriptionText: {
    fontSize: 16,
  },
});

export default DetailBlog;
