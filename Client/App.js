import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainContainer from "./src/navigation/mainContainer";
import { BlogProvider } from "./src/navigation/BlogContext";

export default function App() {
  return (
    <BlogProvider>
      <MainContainer />
    </BlogProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
