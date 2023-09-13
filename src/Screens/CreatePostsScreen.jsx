import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import specimen from "../images/mountains.jpg";
import { useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

export const CreatePostsScreen = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);

  const addPhoto = () => {
    photo ? setPhoto(null) : setPhoto(specimen);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={{ flexGrow: 1 }}>
          <View style={styles.cameraContainer}>
            <View style={styles.camera}>
              <View style={styles.imageWrapper}>
                <Image source={photo} style={styles.image} />
              </View>
              <TouchableOpacity
                style={[
                  styles.buttonAdd,
                  !photo
                    ? { backgroundColor: "#ffffff" }
                    : { backgroundColor: "rgba(255, 255, 255, 0.3)" },
                ]}
                onPress={addPhoto}
              >
                <Ionicons
                  name="camera"
                  size={24}
                  color={photo ? "#FFFFFF" : "#BDBDBD"}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.photoExistance}>
            {photo ? "Редагувати фото" : "Завантажте фото"}
          </Text>
          <KeyboardAvoidingView
            style={styles.form}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TextInput
              placeholder="Назва..."
              style={styles.input}
              placeholderTextColor="#BDBDBD"
              value={title}
              onChangeText={setTitle}
            />
            <View style={styles.inputLocationContainer}>
              <TextInput
                placeholder="Місцевість..."
                style={[styles.input, styles.inputLocation]}
                placeholderTextColor="#BDBDBD"
                value={location}
                onChangeText={setLocation}
              />
              <Feather
                name="map-pin"
                size={20}
                color={"#BDBDBD"}
                style={styles.iconLocation}
              />
            </View>
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={[
              styles.publishBtn,
              photo && title && location
                ? { backgroundColor: "#FF6C00" }
                : { backgroundColor: "#F6F6F6" },
            ]}
          >
            <Text
              style={[
                styles.publishBtnText,
                photo && title && location && { color: "#FFFFFF" },
              ]}
            >
              Опублікувати
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.deletBtn}>
          <Feather name="trash-2" size={24} color={"#BDBDBD"} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 30,
    justifyContent: "flex-end",
    backgroundColor: "#ffffff",
  },
  cameraContainer: {
    position: "relative",
    height: 240,
    overflow: "hidden",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  buttonAdd: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  photoExistance: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 8,
  },
  form: {
    gap: 16,
    marginTop: 30,
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    height: 49,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "#E8E8E8",
    borderStyle: "solid",
    backgroundColor: "#FFFFFF",
  },
  inputLocationContainer: {
    position: "relative",
  },
  inputLocation: {
    paddingLeft: 24,
  },
  iconLocation: {
    position: "absolute",
    left: 0,
    bottom: 13,
  },
  publishBtn: {
    marginTop: 30,
    width: "100%",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    height: 51,
  },
  publishBtnText: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
  },
  deletBtn: {
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
