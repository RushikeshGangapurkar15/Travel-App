import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MessageScreen from "./screens/MessageScreen";
import FavouriteScreen from "./screens/FavouriteScreen";
import { Welocome } from "./screens/Welocome";
import DetailBlog from "./screens/DetailBlog";
import DestinationScreen from "./screens/DestinationScreen";
import AllItem from "./screens/AllItem";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import EditProfile from "./screens/EditProfile";
import Maps from "./screens/Maps";
import EditBlog from "./screens/EditBlog";

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "person";
          } else if (route.name === "Fav") {
            iconName = "heart";
          } else if (route.name === "Add") {
            iconName = "add-circle";
          } else if (route.name === "Blogs") {
            iconName = "list";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitleAlign: "center" }}
      />
      <Tab.Screen
        name="Blogs"
        component={DetailScreen}
        options={{ headerTitleAlign: "center" }}
      />
      <Tab.Screen
        name="Fav"
        component={FavouriteScreen}
        options={{ headerTitleAlign: "center" }}
      />
      <Tab.Screen
        name="Add"
        component={MessageScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function mainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          gestureEnabled: true,
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={Welocome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="started"
          component={MainStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DesignationScreen"
          component={DestinationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllItem"
          component={AllItem}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailBlog"
          component={DetailBlog}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Maps"
          component={Maps}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditBlog"
          component={EditBlog}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
