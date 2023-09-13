import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PostsScreen } from "../screens/PostsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { CreatePostsScreen } from "../screens/CreatePostsScreen";

const HomeTab = createBottomTabNavigator();

export const HomeBottomNavigator = () => {
  const navigation = useNavigation();
  return (
    <HomeTab.Navigator
      initialRouteName="Posts"
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarStyle: {
          height: 60,
          paddingHorizontal: 81,
          justifyContent: "center",
        },
      })}
    >
      <HomeTab.Screen
        name="Posts"
        component={PostsScreen}
        options={() => ({
          tabBarIcon: ({ focused, size, color }) => (
            <TouchableOpacity
              style={[styles.iconTab, focused && styles.activeIcon]}
            >
              <Ionicons name="grid-outline" size={size} color={color} />
            </TouchableOpacity>
          ),
          title: "Публікації",
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
      <HomeTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={() => ({
          tabBarIcon: ({ focused, size, color }) => (
            <TouchableOpacity
              style={[styles.iconTab, focused && styles.activeIcon]}
            >
              <Ionicons name="add-outline" size={size} color={color} />
            </TouchableOpacity>
          ),
          tabBarStyle: {
            display: "none",
          },
          title: "Створити публікацію",
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
        })}
      />
      <HomeTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={() => ({
          tabBarIcon: ({ focused, size, color }) => (
            <TouchableOpacity
              style={[styles.iconTab, focused && styles.activeIcon]}
            >
              <Feather name="user" size={size} color={color} />
            </TouchableOpacity>
          ),
          headerShown: false,
        })}
      />
    </HomeTab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconTab: {
    height: 40,
    width: 70,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeIcon: {
    backgroundColor: "#FF6C00",
  },
  logOutIcon: {
    marginRight: 20,
  },
  backIcon: {
    marginLeft: 20,
  },
});
