import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Welocome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require("../../assets/2.jpg")}
        style={styles.backgroundImage}
      />

      {/* Content and Gradient */}
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.button}>
          <Text
            onPress={() => navigation.navigate("LogIn")}
            style={styles.whiteText}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end", // Align content to the bottom
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  contentContainer: {
    padding: 16,
    marginBottom: 64, // Space between content and the bottom
  },
  whiteText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 24,
  },
  mediumText: {
    fontWeight: "500",
    fontSize: 16,
  },
  button: {
    alignSelf: "center",
    padding: 12,
    paddingHorizontal: 48,
    backgroundColor: "#007acc",
    borderRadius: 32, // To make it rounded
  },
});
