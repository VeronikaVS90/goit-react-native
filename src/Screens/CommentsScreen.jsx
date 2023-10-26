import {
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectAvatar,
  selectEmail,
  selectId,
  selectLogin,
} from "../redux/selectors";
import { addComment } from "../firebase/firestore";
import { useRoute } from "@react-navigation/native";
import { Loader } from "../components/Loader";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const CommentsScreen = () => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector(selectId);
  const avatar = useSelector(selectAvatar);
  const email = useSelector(selectEmail);
  const login = useSelector(selectLogin);
  const {
    params: { postId, photo },
  } = useRoute();

  const fetchComments = async () => {
    const commentsQuery = query(
      collection(db, "posts", `${postId}`, "comments"),
      orderBy("createdDate")
    );
    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      const updatedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(updatedComments);
      setIsLoading(false);
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const formatDate = (date) => {
    const dateToFormat = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = dateToFormat.toLocaleDateString("uk-UA", options);
    const formattedTime = `${dateToFormat.getHours()}:${dateToFormat.getMinutes()}`;
    return `${formattedDate} | ${formattedTime}`;
  };

  const addCommentUser = async () => {
    try {
      const today = Date.now();
      const newComment = {
        authorId: userId,
        avatar,
        email,
        login,
        commentText,
        createdDate: formatDate(today),
      };
      await addComment(postId, newComment);
      Keyboard.dismiss();
      setCommentText("");
    } catch (error) {
      return;
    }
  };

  return (
    <View style={styles.container}>
      {isLoading === true && <Loader />}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        style={styles.mainWrapper}
      >
        <FlatList
          data={comments}
          style={{ gap: 24 }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.imageWrapper}>
              <Image source={{ uri: photo }} style={styles.image} />
            </View>
          }
          renderItem={({ item }) => (
            <View
              style={[
                styles.comment,
                item.authorId === userId
                  ? styles.simgleCommentAuthor
                  : styles.singleComment,
              ]}
            >
              <Image
                source={{ uri: item.avatar }}
                style={styles.commentImage}
              />
              <View
                style={[
                  styles.commentWrapper,
                  item.authorId === userId && styles.commentWrapperAuthor,
                ]}
              >
                <Text style={styles.commentText}>{item.commentText}</Text>
                <Text
                  style={[
                    styles.commentDate,
                    item.authorId === userId && styles.commentDateAuthor,
                  ]}
                >
                  {item.createdDate}
                </Text>
              </View>
            </View>
          )}
        />
        <View style={styles.form}>
          <TextInput
            placeholder="Коментувати..."
            placeholderTextColor={"#BDBDBD"}
            style={styles.input}
            value={commentText}
            onChangeText={setCommentText}
          />
          <TouchableOpacity style={styles.btnSend} onPress={addCommentUser}>
            <Feather name="arrow-up" size={20} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mainWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 30,
    backgroundColor: "#FFFFFF",
  },
  imageWrapper: {
    borderRadius: 8,
    width: "100%",
    height: 240,
    overflow: "hidden",
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  comment: {
    gap: 16,
    marginBottom: 24,
  },
  singleComment: {
    flexDirection: "row",
  },
  simgleCommentAuthor: {
    flexDirection: "row-reverse",
  },
  commentImage: {
    borderRadius: 50,
    width: 28,
    height: 28,
    resizeMode: "cover",
  },
  commentWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    maxWidth: 300,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    padding: 16,
  },
  commentWrapperAuthor: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
  },
  commentText: {
    color: "#212121",
    fontSize: 13,
    fontFamily: "Roboto-Regular",
    lineHeight: 18,
    marginBottom: 8,
  },
  commentDate: {
    textAlign: "right",
    color: "#BDBDBD",
    fontSize: 10,
    fontFamily: "Roboto-Regular",
  },
  commentDateAuthor: {
    textAlign: "left",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F6F6F6",
    height: 50,
    padding: 16,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  form: {
    position: "relative",
    marginVertical: 20,
  },
  btnSend: {
    position: "absolute",
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    width: 34,
    height: 34,
    top: 8,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
