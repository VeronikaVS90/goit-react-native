import {
  Text,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import specimen from "../images/user-avatar.jpg";
import specimen1 from "../images/mountains.jpg";
import specimen2 from "../images/sunset.jpg";
import specimen3 from "../images/curtain.jpg";
import { Post } from "../components/Post";

const renderItem = ({ item }) => <Post item={item} />;

const specimens = [
  {
    id: 1,
    photo: specimen1,
    title: "Ліс",
    comments: 4,
    nav: "Ukraine",
    likes: 100,
    coordinates: {
      latitude: 48.9226,
      longitude: 24.7111,
    },
  },
  {
    id: 2,
    photo: specimen2,
    title: "Захід на Чорному морі",
    comments: 4,
    nav: "Ukraine",
    likes: 100,
    coordinates: {
      latitude: 46.0815,
      longitude: 30.4372,
    },
  },
  {
    id: 3,
    photo: specimen3,
    title: "Старий будиночок у Венеції",
    comments: 4,
    nav: "Ukraine",
    likes: 100,
    coordinates: {
      latitude: 45.4408,
      longitude: 12.3155,
    },
  },
];

export const PostsScreen = ({ route: { params } }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.user}>
            <Image source={specimen} style={styles.userImage} />
            <View>
              <Text style={styles.userName}>Natali Romanova</Text>
              <Text style={styles.userEmail}>email@example.com</Text>
            </View>
          </View>
        }
        data={specimens}
        keyExtractor={(specimen) => specimen.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
    paddingHorizontal: 16,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
    resizeMode: "cover",
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
