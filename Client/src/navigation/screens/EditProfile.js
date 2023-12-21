import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { updateProfile } from "../../constants/api";

const EditProfile = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Get the profile data from the route params
  const profileData = route.params?.profileData || null;

  // console.log("Profile data id:", profileData.id);
  // Initialize state with the profile data
  const [selectedImage, setSelectedImage] = useState(
    profileData ? profileData.profile_image : null
  );
  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState(
    profileData ? profileData.cover_image : null
  );
  const [firstName, setFirstName] = useState(profileData.first_name);
  const [lastName, setLastName] = useState(profileData.last_name);
  const [phone, setPhone] = useState(profileData.phone_number);
  const [about, setAbout] = useState(profileData.about);
  const [name, setName] = useState(profileData.name);

  console.log("Profile data phone:", profileData.phone);
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

  const handleBackgroundImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedBackgroundImage(result.uri);
    }
  };

  // const handlePublish = async () => {
  //   try {
  //     // Prepare the profile data
  //     const updatedProfileData = {
  //       id: profileData.id,
  //       name: `${firstName} ${lastName}`,
  //       cover_image: selectedBackgroundImage, // Include selected cover image
  //       profile_image: selectedImage, // Include selected profile image
  //       first_name: firstName,
  //       last_name: lastName,
  //       phone: phone,
  //       about: about,
  //     };

  //     await updateProfile(
  //       id,
  //       selectedBackgroundImage,
  //       selectedImage,
  //       firstName,
  //       lastName,
  //       phone,
  //       about
  //     );

  //     // After a successful update, set the state in EditProfile screen

  //     navigation.navigate("Profile", { updatedProfileData });
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };

  const handlePublish = async () => {
    updateProfile(
      profileData.id,
      name,
      firstName,
      lastName,
      phone,
      about
      // selectedBackgroundImage,
      // selectedImage
    )
      .then((response) => {
        console.log("Blog post updated:", response);
        alert("Blog Updated Successfully"); // Show success message
        navigation.navigate("Profile", { updateProfile }); // Navigate to the updated blog post
      })
      .catch((error) => {
        console.error("Error updating blog post:", error);
        alert("An error occurred. Please try again."); // Show an error message
      });
  };

  console.log("Profile data id:", selectedBackgroundImage);

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity>
          <ImageBackground
            source={{ uri: selectedBackgroundImage }}
            style={{ height: 200, width: "100%" }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                name="camera"
                size={35}
                onPress={handleBackgroundImagePicker}
                color="#fff"
                style={{
                  opacity: 0.8,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: "#fff",
                  borderRadius: 10,
                }}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: "center" }}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={{
                uri: selectedImage,
              }}
              style={{ height: 100, width: 100, marginTop: 20 }}
              imageStyle={{ borderRadius: 15 }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="camera"
                  size={35}
                  onPress={handleImagePicker}
                  color="#fff"
                  style={{
                    opacity: 0.7,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 10,
                  }}
                />
              </View>
            </ImageBackground>
          </View>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {firstName} {lastName}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.action} size={20}>
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={[
            styles.textInput,
            {
              color: "#222",
            },
          ]}
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
      <View style={styles.action} color="#666" size={20}>
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={[
            styles.textInput,
            {
              color: "#222",
            },
          ]}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <View style={styles.action}>
        <TextInput
          placeholder="Phone"
          placeholderTextColor="#666666"
          keyboardType="number-pad"
          autoCorrect={false}
          style={[
            styles.textInput,
            {
              color: "#222",
            },
          ]}
          value={phone}
          onChangeText={setPhone}
        />
      </View>
      <View style={styles.action} color="#666" size={20}>
        <TextInput
          placeholder="About"
          placeholderTextColor="#666666"
          style={[
            styles.textInput,
            {
              color: "#222",
            },
          ]}
          value={about}
          onChangeText={setAbout}
        />
      </View>

      <TouchableOpacity
        style={styles.commandButton}
        onPress={handlePublish} // Corrected the function call
      >
        <Text style={styles.panelButtonTitle}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 100,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 1,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
