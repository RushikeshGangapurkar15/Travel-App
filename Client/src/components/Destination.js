import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  FlatList,
} from "react-native";
import { destinationData } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useFadeInAnimation } from "../Animations/fadeIn";
export default function Destination({ searchText, HeadText }) {
  const navigation = useNavigation();
  const filteredData = destinationData.filter((item) => {
    return item.title.toLowerCase().includes(searchText.toLowerCase());
  });

  // Initialize Animated values for animations
  const translateY = useFadeInAnimation();
  const scale = useFadeInAnimation();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Configure animations
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: false,
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  const renderDestinationCard = ({ item }) => {
    return (
      <Animated.View
        style={[
          styles.destinationCard,
          {
            transform: [{ translateY }, { scale }],
            opacity,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("DesignationScreen", { ...item })}
        >
          <View style={styles.cardContent}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.imageText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={styles.container}>
        <Text style={styles.mainText}>{HeadText}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AllItem")}>
          <Text style={styles.showMoreText}>Show More</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ margin: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderDestinationCard}
      />
    </View>
  );
}

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
    color: "#007acc",
  },
  showMoreText: {
    fontSize: 15,
    color: "gray",
  },
  scrollViewContent: {
    alignItems: "center",
  },
  destinationCard: {
    marginHorizontal: 10,
    transform: [{ translateY: 50 }, { scale: 0.8 }],
    opacity: 0,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    margin: 5, // Add margin for spacing
  },
  cardContent: {
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageText: {
    fontSize: 15,
    fontWeight: "300",
    // marginLeft: 15,
    marginTop: 10,
    marginBottom: 20,
  },
});
