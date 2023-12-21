import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { updateBlogPost } from "../../constants/api";

const EditBlog = ({ route, navigation }) => {
  const { blogData } = route.params;

  // Initialize state with the current title and content
  const [title, setTitle] = useState(blogData.title);
  const [content, setContent] = useState(blogData.content);

  const handleUpdateBlog = () => {
    // Call the updateBlogPost function to send the updated data to the server
    updateBlogPost(blogData.id, title, content)
      .then((response) => {
        console.log("Blog post updated:", response);
        alert("Blog Updated Successfully"); // Show success message
        navigation.navigate("DetailBlog", { blogData: response }); // Navigate to the updated blog post
      })
      .catch((error) => {
        console.error("Error updating blog post:", error);
        alert("An error occurred. Please try again."); // Show an error message
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Blog Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Title.."
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Edit your story.."
        multiline
        value={content}
        onChangeText={setContent}
      />
      <Button title="Save" onPress={handleUpdateBlog} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    height: 150,
    textAlignVertical: "top",
    marginBottom: 20,
  },
});

export default EditBlog;
