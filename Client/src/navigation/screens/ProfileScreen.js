import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFadeInAnimation } from "../../Animations/fadeIn";
import { useZoomInAnimation } from "../../Animations/zoomIn";
import axios from "axios";
import { API_BASE_URL } from "../../constants/api";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const fadeAnim1 = useFadeInAnimation();
  const fadeAnim2 = useFadeInAnimation();
  const fadeAnim3 = useFadeInAnimation();

  const scaleValue = useZoomInAnimation();
  const coverScaleValue = useZoomInAnimation();

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

  const handleImagePress = () => {
    Animated.spring(scaleValue, {
      toValue: 1.05,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleImageRelease = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleCoverPress = () => {
    Animated.spring(coverScaleValue, {
      toValue: 1.05,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleCoverRelease = () => {
    Animated.spring(coverScaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const sequenceAnimation = () => {
      Animated.sequence([
        Animated.timing(fadeAnim1, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim2, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim3, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => setIsVisible(true));
    };

    sequenceAnimation();
  }, []);

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/api/user");
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log(profileData);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPressIn={handleCoverPress}
        onPressOut={handleCoverRelease}
      >
        <Animated.Image
          source={{
            uri: "https://flowbite.com/docs/images/examples/image-3@2x.jpg",
          }}
          style={[
            styles.coverImage,
            { transform: [{ scale: coverScaleValue }] },
          ]}
        />
      </TouchableWithoutFeedback>

      <TouchableOpacity
        onPress={() => navigation.navigate("EditProfile", { profileData })}
        style={styles.editButton}
      >
        <Icon name="edit" size={30} color={"#fff"} />
        <Text style={styles.logoutText}>EditProfile</Text>
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <TouchableWithoutFeedback
          onPressIn={handleImagePress}
          onPressOut={handleImageRelease}
        >
          <Animated.View
            style={[
              styles.animatedContainer,
              { opacity: fadeAnim1, transform: [{ scale: scaleValue }] },
            ]}
          >
            <Image
              source={{
                uri: "https://flowbite.com/docs/images/examples/image-3@2x.jpg",
              }}
              style={styles.profileImage}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        {/* {console.log(profileData)} */}
        <Animated.View
          style={[styles.animatedContainer, { opacity: fadeAnim2 }]}
        >
          <Text style={styles.name}>
            {profileData
              ? `${profileData.first_name} ${profileData.last_name} `
              : ""}
          </Text>
        </Animated.View>
        <Animated.View
          style={[styles.animatedContainer, { opacity: fadeAnim3 }]}
        >
          <Text style={styles.jobTitle}>
            {profileData ? profileData.email : ""}{" "}
          </Text>
        </Animated.View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {profileData ? profileData.about : ""}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  coverImage: {
    width: "100%",
    height: 200,
  },
  editButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 2,
    alignItems: "center",
    color: "#fff",
  },
  logoutText: {
    fontSize: 12,
    color: "#fff",
  },
  profileContainer: {
    position: "absolute",
    top: 120,
    left: 20,
    right: 20,
    alignItems: "center",
    flex: 1,
  },
  animatedContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#007acc",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007acc",
    marginTop: 10,
  },
  jobTitle: {
    fontSize: 16,
    color: "#333",
  },
  descriptionContainer: {
    margin: 20,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    flex: 1,
  },
  descriptionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ProfileScreen;
