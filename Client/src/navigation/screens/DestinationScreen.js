import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import BackButton from "../../components/BackButton";

const DestinationScreen = (props) => {
  const item = props.route.params;
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* destination image */}
      <Image
        source={item.image}
        style={{ width: "100%", height: "40%", resizeMode: "cover" }}
      />
      <BackButton />

      <View
        style={{
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          flex: 1,
          padding: 20,
          backgroundColor: "white",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#007acc",
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "#007acc",
                  fontWeight: "bold",
                }}
              >
                {`${item.price} ₹`}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                color: "black",
                marginBottom: 10,
                marginTop: 30,
              }}
            >
              {item.longDescription}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 1,
              }}
            >
              <Icon
                name="map-marker"
                color={"#007acc"}
                size={30}
                style={{ marginLeft: "48%", marginTop: 30 }}
                onPress={() => props.navigation.navigate("Maps")}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Blogs")}
            style={{
              margin: 10,
              marginBottom: 20,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "grey",
                fontWeight: "bold",
              }}
            >
              Show More Blogs
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
export default DestinationScreen;
