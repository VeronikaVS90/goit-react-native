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
import { useState } from "react";
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

export const ProfileScreen = () => {
  const [photo, setPhoto] = useState(specimen);
  return (
    <SafeAreaView style={styles.container}>
      <Background>
        <FlatList
          ListHeaderComponent={
            <View style={styles.userInfoContainer}>
              <TouchableOpacity style={styles.iconLogOut}>
                <Feather name="log-out" size={24} color={"#BDBDBD"} />
              </TouchableOpacity>
              <View style={styles.avatar}>
                <Image source={photo} style={styles.imageAvatar} />
                <TouchableOpacity
                  style={[styles.icon, photo && styles.iconDelete]}
                >
                  {!photo ? (
                    <Ionicons
                      name="add-circle-outline"
                      size={25}
                      color={"#FF6C00"}
                    />
                  ) : (
                    <Ionicons
                      name="close-outline"
                      size={20}
                      color={"#BDBDBD"}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={styles.profileName}>Natalia Romanova</Text>
            </View>
          }
          style={styles.posts}
          data={specimens}
          keyExtractor={(specimen) => specimen.id}
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
