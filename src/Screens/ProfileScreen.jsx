import { FlatList, View } from "react-native";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Background } from "../components/Background";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Post } from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { logOut, updateProfile } from "../redux/operations";
import { selectAvatar, selectId, selectLogin } from "../redux/selectors";
import * as ImagePicker from "expo-image-picker";
import { getUserPosts } from "../firebase/firestore";
import { Loader } from "../components/Loader";

const renderItem = ({ item }) => <Post item={item} />;

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const login = useSelector(selectLogin);
  const avatar = useSelector(selectAvatar);
  const userId = useSelector(selectId);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const dataPosts = await getUserPosts(userId);
      setPosts(dataPosts);
    } catch (error) {
      return;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deletePhoto = () => {
    dispatch(updateProfile(null));
  };

  const renewPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      dispatch(updateProfile(result.assets[0].uri));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loader />}
      <Background>
        <FlatList
          ListHeaderComponent={
            <View style={styles.userInfoContainer}>
              <TouchableOpacity
                style={styles.iconLogOut}
                onPress={() => {
                  dispatch(logOut());
                }}
              >
                <Feather name="log-out" size={24} color={"#BDBDBD"} />
              </TouchableOpacity>
              <View style={styles.avatar}>
                {avatar && (
                  <Image source={{ uri: avatar }} style={styles.imageAvatar} />
                )}
                {!avatar ? (
                  <TouchableOpacity style={[styles.icon]} onPress={renewPhoto}>
                    <Ionicons
                      name="add-circle-outline"
                      size={25}
                      color={"#FF6C00"}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.icon, styles.iconDelete]}
                    onPress={deletePhoto}
                  >
                    <Ionicons
                      name="close-outline"
                      size={20}
                      color={"#BDBDBD"}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.profileName}>{login}</Text>
            </View>
          }
          style={styles.posts}
          data={posts}
          keyExtractor={(post) => post.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </Background>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  posts: {
    flexGrow: 0,
  },
  userInfoContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginTop: 150,
  },
  profileName: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    letterSpacing: 1,
    color: "#212121",
    marginTop: 86,
    textAlign: "center",
    marginBottom: 30,
  },
  avatar: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  imageAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    resizeMode: "cover",
  },
  icon: {
    position: "absolute",
    right: -12,
    bottom: 14,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  iconDelete: {
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderStyle: "solid",
  },
  iconLogOut: {
    position: "absolute",
    right: 16,
    top: 22,
  },
});
