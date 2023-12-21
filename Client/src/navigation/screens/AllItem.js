import React, { useRef } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
} from "react-native";
import { destinationData } from "../../constants";
import { useNavigation } from "@react-navigation/native";
// import BackButton from "../../components/BackButton";
import Icon from "react-native-vector-icons/FontAwesome";
const BackButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.iconContainer}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={30} color={"#222"} />
      </TouchableOpacity>
    </View>
  );
};

const AllItem = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.title}>All Items</Text>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {destinationData.map((item, index) => {
          const translateY = scrollY.interpolate({
            inputRange: [index * 220, (index + 1) * 220],
            outputRange: [50, 0], // Adjusted the gap during animation
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.cardContainer,
                {
                  transform: [{ translateY }],
                },
              ]}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DesignationScreen", { ...item })
                }
              >
                <Image style={styles.cardImage} source={item.image} />
                <Text style={styles.cardTitle}>{item.title}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingBottom: 110,
    paddingHorizontal: 10,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    padding: 10,
  },
  iconContainer: {
    margin: 10,
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 2,
  },
});

export default AllItem;
