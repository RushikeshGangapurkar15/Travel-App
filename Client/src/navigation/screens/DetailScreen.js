import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet } from "react-native";
import AllBlogsComponent from "../../components/AllBlogsComponent";
import { useBlogContext } from "../BlogContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

export default function DetailPage() {
  const navigation = useNavigation();
  const { state, dispatch } = useBlogContext();
  const [blogPosts, setBlogPosts] = useState([]);

  const fetchBlogPosts = () => {
    const apiUrl = "http://10.0.2.2:8000/api/blogs";

    axios
      .get(apiUrl)
      .then((response) => {
        const blogPostsData = response.data;
        setBlogPosts(blogPostsData);
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error);
      });
  };

  useEffect(() => {
    fetchBlogPosts(); // Fetch data on initial render
  }, []);

  // Add a focus event listener to refresh data when the screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      fetchBlogPosts(); // Refresh data when the screen gains focus
    }, [])
  );

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      {blogPosts.map((blog) => (
        <AllBlogsComponent key={blog.id} dispatch={dispatch} blogData={blog} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
