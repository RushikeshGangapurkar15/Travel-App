import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Destination from "./Destination";

const ScrollViewComponent = () => {
  const navigation = useNavigation();
  const handleShowMorePress = () => {
    // Implement the logic you want to execute when "Show More" is pressed here
    // For example, you can show more content or navigate to another screen.
  };
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={styles.container}>
        <Text style={styles.mainText}>BEST DESIGNATION</Text>
        <TouchableOpacity>
          <Text style={styles.showMoreText}> Show More</Text>
        </TouchableOpacity>
      </View>

      {/* Images */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.boarder}>
          <TouchableOpacity
            onPress={() => navigation.navigate("DesignationScreen")}
          >
            <Image source={require("../assets/4.jpg")} style={styles.image} />
          </TouchableOpacity>
          {/* <Destination /> */}
          <Text style={styles.imageText}>Bibi ka magbara</Text>
        </View>
        {/* <View style={styles.boarder}>
          <Image source={require("../assets/2.jpg")} style={styles.image} />
          <Text style={styles.imageText}>Ladhak</Text>
        </View>
        <View style={styles.boarder}>
          <Image source={require("../assets/4.jpg")} style={styles.image} />
          <Text style={styles.imageText}>Taj hotel</Text>
        </View> */}
      </ScrollView>
    </View>
  );
};

const FeedComponent = () => {
  return (
    <View>
      <ScrollView>
        <ScrollViewComponent />
        {/* <ScrollViewComponent /> */}
      </ScrollView>
    </View>
  );
};

export default FeedComponent;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainText: {
    marginTop: -10,
    fontSize: 20,
    fontWeight: "bold",
  },
  showMoreText: {
    fontSize: 10,
    color: "gray",
  },
  scrollViewContent: {
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
    borderRadius: 10,
  },
  imageText: {
    fontSize: 15,
    fontWeight: "300",
    marginLeft: 15,
    marginBottom: 20,
  },
  boarder: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginHorizontal: 5,
  },
});
