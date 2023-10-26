import {
  Text,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Post } from "../components/Post";
import { useSelector } from "react-redux";
import { selectAvatar, selectEmail, selectLogin } from "../redux/selectors";
import { useEffect, useState } from "react";
import { postsRef } from "../firebase/firestore";
import { Loader } from "../components/Loader";
import {
  orderBy,
  query,
  onSnapshot,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../firebase/config";

const renderItem = ({ item }) => <Post item={item} />;

export const PostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const login = useSelector(selectLogin);
  const avatar = useSelector(selectAvatar);
  const email = useSelector(selectEmail);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const q = query(postsRef, orderBy("createdDate", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(updatedPosts);
      setIsLoading(false);
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading === true && <Loader />}
      {posts.length !== 0 && (
        <FlatList
          ListHeaderComponent={
            <View style={styles.user}>
              {avatar && (
                <Image source={{ uri: avatar }} style={styles.userImage} />
              )}
              {login && email && (
                <View>
                  <Text style={styles.userName}>{login}</Text>
                  <Text style={styles.userEmail}>{email}</Text>
                </View>
              )}
            </View>
          }
          data={posts}
          keyExtractor={(posts) => posts.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
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
