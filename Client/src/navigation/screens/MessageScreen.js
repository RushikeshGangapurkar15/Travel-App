import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { addBlogPost } from "../../constants/api";

const MessageScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
      }
    })();
  }, []);

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  const handlePublish = () => {
    if (title.trim() === "" || content.trim() === "") {
      alert("Please fill in both title and content fields.");
      return;
    }

    // Call the addBlogPost function to send the data to the server
    addBlogPost(title, content, selectedImage)
      .then((response) => {
        console.log("Blog post added:", response);
        alert("Blog Created Successfully"); // Show success message
        setTitle("");
        setContent("");
        setSelectedImage(null);
      })
      .catch((error) => {
        console.error("Error adding blog post:", error);
        alert("An error occurred. Please try again."); // Show an error message
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Write a Blog Post</Text>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
        )}
        <Button
          title="Pick an Image"
          onPress={handleImagePicker}
          style={styles.pickImageButton}
        />
        <TextInput
          style={styles.input}
          placeholder="Title.."
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.inputContent}
          placeholder="Tell your story.."
          multiline
          value={content}
          onChangeText={(text) => setContent(text)}
        />
      </ScrollView>
      <View style={styles.publishButtonContainer}>
        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishButtonText}>Create a Blog</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    fontSize: 30,
    padding: 10,
    marginBottom: 10,
  },
  inputContent: {
    fontSize: 20,
    padding: 10,
  },
  publishButtonContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  publishButton: {
    backgroundColor: "#007AFF",
    borderRadius: 50,
    padding: 15,
    alignItems: "center",
  },
  publishButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  pickImageButton: {
    fontSize: 18,
    color: "blue",
    marginVertical: 5,
  },
  imagePreview: {
    width: "auto",
    height: 200,
    borderRadius: 10,
    margin: 10,
  },
});

export default MessageScreen;
