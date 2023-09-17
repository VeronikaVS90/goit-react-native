import { createStackNavigator } from "@react-navigation/stack";
import { PostsScreen } from "../screens/PostsScreen";
import { CommentsScreen } from "../screens/CommentsScreen";
import { MapScreen } from "../screens/MapScreen";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PostsStackNavigator = createStackNavigator();

export const PostsNavigator = () => {
  const navigation = useNavigation();
  return (
    <PostsStackNavigator.Navigator
      initialRouteName="Posts"
      screenOptions={() => ({
        headerStyle: {
          height: 88,
          backgroundColor: "#FFFFFF",
          borderBottomColor: "rgba(0, 0, 0, 0.3)",
          borderBottomWidth: 0.5,
        },
        headerTitleAlign: "center",
        headerTintColor: "#212121",
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          letterSpacing: -0.41,
          fontSize: 17,
          lineHeight: 22,
        },
      })}
    >
      <PostsStackNavigator.Screen
        name="Posts"
        component={PostsScreen}
        options={() => ({
          title: "Публікації",
          headerRight: () => (
            <TouchableOpacity
              style={styles.logOutIcon}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                })
              }
            >
              <Feather name="log-out" size={24} color={"#BDBDBD"} />
            </TouchableOpacity>
          ),
        })}
      />
      <PostsStackNavigator.Screen
        name="Comments"
        component={CommentsScreen}
        options={() => ({
          title: "Коментарі",
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() => navigation.navigate("Posts")}
            >
              <Feather
                name="arrow-left"
                size={24}
                color={"rgba(33, 33, 33, 0.8)"}
              />
            </TouchableOpacity>
          ),
          tabBarStyle: {
            display: "none",
          },
        })}
      />
      <PostsStackNavigator.Screen
        name="Map"
        component={MapScreen}
        options={() => ({
          title: "Мапа",
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() => navigation.goBack()}
            >
              <Feather
                name="arrow-left"
                size={24}
                color={"rgba(33, 33, 33, 0.8)"}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </PostsStackNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  logOutIcon: {
    marginRight: 20,
  },
  backIcon: {
    marginLeft: 20,
  },
});
