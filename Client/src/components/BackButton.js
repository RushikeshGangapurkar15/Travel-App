import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.iconContainer}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={30} color={"#f3f3f3"} />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  iconContainer: {
    margin: 10,
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 2,
  },
});
