import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Platform, StyleSheet } from "react-native";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";
import { ProfileScreen } from "../screens/ProfileScreen";
import { CreatePostsScreen } from "../screens/CreatePostsScreen";
import { PostsNavigator } from "./PostsNavigator";

const HomeTab = createBottomTabNavigator();

export const HomeBottomNavigator = () => {
  const navigation = useNavigation();
  const barHeight = Platform.OS === "ios" ? 80 : 60;

  return (
    <HomeTab.Navigator
      initialRouteName="PostsScreen"
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarStyle: {
          height: barHeight,
          paddingHorizontal: 81,
          justifyContent: "center",
        },
      })}
    >
      <HomeTab.Screen
        name="PostsScreen"
        component={PostsNavigator}
        options={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => (
            <TouchableOpacity
              style={[styles.iconTab, focused && styles.activeIcon]}
            >
              <Ionicons name="grid-outline" size={size} color={color} />
            </TouchableOpacity>
          ),
          headerShown: false,
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === "Comments" || routeName === "Map") {
              return { display: "none" };
            }
            return {
              height: barHeight,
              paddingHorizontal: 81,
              justifyContent: "center",
            };
          })(route),
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
          unmountOnBlur: true,
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
  backIcon: {
    marginLeft: 20,
  },
});
