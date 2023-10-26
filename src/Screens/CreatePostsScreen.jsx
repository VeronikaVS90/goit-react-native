import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { selectId } from "../redux/selectors";
import { addPost } from "../firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/config";
import { Loader } from "../components/Loader";

export const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  const [location, setLocation] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector(selectId);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();
        setHasPermission(status === "granted");
      } catch (error) {
        setHasPermission(false);
        navigation.navigate("Posts");
      }
    })();
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        }
        let locationData = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        };
        setCoordinates(coords);
      } catch (error) {
        navigation.navigate("Posts");
      }
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        setIsLoading(true);
        const { uri } = await cameraRef.takePictureAsync();
        await MediaLibrary.createAssetAsync(uri);
        setPhoto(uri);
      } catch (error) {
        setPhoto("");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const deletePhoto = () => {
    setPhoto("");
  };

  const turnCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const loadPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const deleteAll = () => {
    setPhoto("");
    setTitle("");
    setLocation("");
  };

  const sendPhoto = async () => {
    if (photo === "" || title === "" || location === "") return;

    setIsLoading(true);
    const response = await fetch(photo);
    const file = await response.blob();
    const photoId = Date.now().toString();
    const refPath = ref(storage, `image/${photoId}`);
    const upload = await uploadBytesResumable(refPath, file);
    const downloadURL = await getDownloadURL(upload.ref);
    const newPost = {
      photo: downloadURL,
      title,
      location,
      coordinates,
      likes: {
        people: [],
        amount: 0,
      },
      userId,
      createdDate: Date.now(),
    };
    await addPost(newPost);
    navigation.navigate("PostsScreen");
    deleteAll();
    setIsLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {isLoading === true && photo && <Loader />}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
        style={styles.container}
      >
        <View style={{ flexGrow: 1 }}>
          <View style={styles.cameraContainer}>
            {photo ? (
              <View style={styles.camera}>
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: photo }} style={styles.image} />
                </View>
                <TouchableOpacity
                  style={[
                    styles.buttonAdd,
                    { backgroundColor: "rgba(255, 255, 255, 0.3)" },
                  ]}
                  onPress={deletePhoto}
                >
                  {!isLoading ? (
                    <Ionicons name="camera" size={24} color={"#FFFFFF"} />
                  ) : (
                    <Ionicons name="time-outline" size={30} color={"#FFFFFF"} />
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <Camera style={styles.camera} ref={setCameraRef} type={type}>
                <TouchableOpacity
                  style={[styles.buttonAdd, { backgroundColor: "#ffffff" }]}
                  onPress={takePhoto}
                  disabled={isLoading ? true : false}
                >
                  {!isLoading ? (
                    <Ionicons name="camera" size={24} color={"#BDBDBD"} />
                  ) : (
                    <Ionicons name="time-outline" size={30} color={"#BDBDBD"} />
                  )}
                </TouchableOpacity>
              </Camera>
            )}
          </View>
          <View style={styles.photoEditors}>
            <Text
              style={styles.photoExistance}
              onPress={loadPhoto}
              disabled={photo ? true : false}
            >
              {photo ? "Редагувати фото" : "Завантажте фото"}
            </Text>
            <TouchableOpacity onPress={turnCamera}>
              <Ionicons name="repeat-outline" size={24} color={"#BDBDBD"} />
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <TextInput
              placeholder="Назва..."
              style={[
                styles.input,
                focusedInput === "title" && styles.focusedInput,
              ]}
              placeholderTextColor="#BDBDBD"
              value={title}
              onChangeText={setTitle}
              onFocus={() => setFocusedInput("title")}
              onBlur={() => setFocusedInput(null)}
            />
            <View style={styles.inputLocationContainer}>
              <TextInput
                placeholder="Місцевість..."
                style={[
                  styles.input,
                  styles.inputLocation,
                  focusedInput === "location" && styles.focusedInput,
                ]}
                placeholderTextColor="#BDBDBD"
                value={location}
                onChangeText={setLocation}
                onFocus={() => setFocusedInput("location")}
                onBlur={() => setFocusedInput(null)}
              />
              <Feather
                name="map-pin"
                size={20}
                color={focusedInput === "location" ? "#FF6C00" : "#BDBDBD"}
                style={styles.iconLocation}
              />
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.publishBtn,
              photo && title && location
                ? { backgroundColor: "#FF6C00" }
                : { backgroundColor: "#F6F6F6" },
            ]}
            onPress={sendPhoto}
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
        <TouchableOpacity
          style={[
            styles.deletBtn,
            photo && title && location
              ? { backgroundColor: "#FF6C00" }
              : { backgroundColor: "#F6F6F6" },
          ]}
          onPress={deleteAll}
        >
          <Feather
            name="trash-2"
            size={24}
            color={photo && title && location ? "#FFFFFF" : "#BDBDBD"}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    backgroundColor: "#000000",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  photoEditors: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-between",
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
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
  focusedInput: {
    borderBottomColor: "#FF6C00",
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
    borderRadius: 20,
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});
