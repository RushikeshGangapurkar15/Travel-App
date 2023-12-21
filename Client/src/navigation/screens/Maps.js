import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Dimensions, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const Maps = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    async function getLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            ...userLocation,
          }}
        >
          <Marker coordinate={userLocation} title="Your Location" />
        </MapView>
      )}
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
