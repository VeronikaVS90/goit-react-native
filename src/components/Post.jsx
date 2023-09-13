import { Feather, Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Image, Text } from "react-native";

export const Post = ({ item }) => {
  const { photo, title, comments, nav, likes } = item;
  return (
    <View style={styles.post}>
      <Image source={photo} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.oddInfo}>
        <View style={styles.reactions}>
          <View style={styles.parametr}>
            <Ionicons name="chatbubble" size={24} color={"#FF6C00"} />
            <Text style={styles.amount}>{comments}</Text>
          </View>
          <View style={styles.parametr}>
            <Feather name="thumbs-up" size={20} color={"#FF6C00"} />
            <Text style={styles.amount}>{likes}</Text>
          </View>
        </View>
        <View style={styles.parametr}>
          <Feather name="map-pin" size={20} color={"#BDBDBD"} />
          <Text style={styles.location}>{nav}</Text>
        </View>
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
