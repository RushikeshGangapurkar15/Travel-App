import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
// import { signupUser } from "../../constants/api";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(null);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    //
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    //
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
    } else if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
    } else if (!passwordRegex.test(password)) {
      Alert.alert(
        "Error",
        "Password must be at least 8 characters and include 1 capital letter, 1 number, and 1 special character."
      );
    } else {
      try {
        const response = await fetch("http://10.0.2.2:8000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            name,
            password,
          }),
        });

        if (response.ok) {
          setUser(await response.json());
          setIsError(null);
          navigation.navigate("LogIn");
        } else {
          setIsError(
            "Sign-up failed. Please check your information and try again."
          );
          setUser(null);
        }
      } catch (error) {
        setIsError("An error occurred. Please try again later.");
        setUser(null);
        Alert.alert("Error", "An error occurred. Please try again later.");
      }
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
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setname}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
          <Text style={styles.signupText}>Already a user? Sign In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    borderColor: "#8b8b8b",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  signupText: {
    marginTop: 20,
    color: "#111",
    fontSize: 13,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#007acc",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default SignUp;
