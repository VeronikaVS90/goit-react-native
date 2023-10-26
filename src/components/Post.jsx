import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View, Image, Text } from "react-native";
import { addLike } from "../firebase/firestore";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectId } from "../redux/selectors";

export const Post = ({ item }) => {
  const navigation = useNavigation();
  const currentUserId = useSelector(selectId);
  const {
    photo,
    title,
    location,
    coordinates,
    likes: { amount, people },
    id,
  } = item;
  const [postLikes, setLikes] = useState(amount);
  const [peopleLiked, setPeopleLiked] = useState(people);
  const [commentsCount, setCommentsCount] = useState(0);

  const like = async () => {
    await addLike(id, currentUserId);
  };

  const fetchData = () => {
    const unsubscribeLikes = onSnapshot(doc(db, "posts", `${id}`), (doc) => {
      setLikes(doc.data().likes.amount);
      setPeopleLiked(doc.data().likes.people);
    });
    const unsubscribeComments = onSnapshot(
      collection(db, "posts", `${id}`, "comments"),
      (snapshot) => {
        setCommentsCount(snapshot.docs.length);
      }
    );
    return () => {
      unsubscribeLikes();
      unsubscribeComments();
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.post}>
      <Image source={{ uri: photo }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.oddInfo}>
        <View style={styles.reactions}>
          <TouchableOpacity
            style={styles.parametr}
            onPress={() =>
              navigation.navigate("Comments", { postId: id, photo })
            }
          >
            <Ionicons name="chatbubble" size={24} color={"#FF6C00"} />
            <Text style={styles.amount}>{commentsCount}</Text>
          </TouchableOpacity>
          <View style={styles.parametr}>
            <TouchableOpacity
              onPress={like}
              disabled={peopleLiked.includes(currentUserId) && true}
            >
              {peopleLiked.includes(currentUserId) ? (
                <Ionicons name="thumbs-up-sharp" size={20} color={"#FF6C00"} />
              ) : (
                <Feather name="thumbs-up" size={20} color={"#FF6C00"} />
              )}
            </TouchableOpacity>
            <Text style={styles.amount}>{postLikes}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.parametr}
          onPress={() =>
            navigation.navigate("PostsScreen", {
              screen: "Map",
              params: {
                location: coordinates,
                title: location,
              },
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
    fontFamily: "Roboto_500Medium",
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
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
  },
  parametr: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  location: {
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
    color: "#212121",
    textDecorationLine: "underline",
  },
});
