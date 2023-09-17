import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View, Image, Text } from "react-native";

export const Post = ({ item }) => {
  const navigation = useNavigation();
  const { photo, title, location, coordinates } = item;

  return (
    <View style={styles.post}>
      <Image source={photo} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.oddInfo}>
        <View style={styles.reactions}>
          <TouchableOpacity
            style={styles.parametr}
            onPress={() => navigation.navigate("Comments")}
          >
            <Ionicons name="chatbubble" size={24} color={"#FF6C00"} />
            <Text style={styles.amount}>0</Text>
          </TouchableOpacity>
          <View style={styles.parametr}>
            <Feather name="thumbs-up" size={20} color={"#FF6C00"} />
            <Text style={styles.amount}>0</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.parametr}
          onPress={() =>
            navigation.navigate("Map", {
              location: coordinates,
              title: location,
            })
          }
        >
          <Feather name="map-pin" size={20} color={"#BDBDBD"} />
          <Text style={styles.location}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    paddingBottom: 32,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  image: {
    width: "100%",
    height: 240,
    resizeMode: "cover",
    borderRadius: 8,
  },
  title: {
    fontFamily: "Roboto-Medium",
    color: "#212121",
    fontSize: 16,
    marginVertical: 8,
  },
  oddInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reactions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  amount: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  parametr: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  location: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#212121",
    textDecorationLine: "underline",
  },
});
