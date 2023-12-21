import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { signinUser } from "../../constants/api";

// export const id = 1;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const handleSignIn = async () => {
    // Implement your sign-in logic here
    try {
      const response = await signinUser(email, password);
      setUser(response);
      setError(null);

      setEmail("");
      setPassword("");
      navigation.navigate("started");
    } catch (error) {
      setUser(null);
      // setError(error.message);
      Alert.alert("Error", "Invalid email or password entered.");
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1527998257557-0c18b22fa4cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80",
      }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          email
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signupText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // You can customize the resizeMode property as needed
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.7)", // Background color with opacity
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0086ff",
  },
  input: {
    width: 300,
    height: 50,
    borderColor: "#8b8b8b", // Set your own custom Color
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  signupText: {
    marginTop: 20,
    color: "#111", // Set your desired text color
    fontSize: 13,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#007acc", // Set your desired background color
    // padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  buttonText: {
    color: "white", // Set your desired text color
    fontSize: 18,
    textAlign: "center",
  },
});

export default SignIn;
