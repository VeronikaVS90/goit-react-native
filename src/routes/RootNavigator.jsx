import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "../screens/RegistrationScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { HomeBottomNavigator } from "./HomeBottomNavigator";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/selectors";

const MainStack = createStackNavigator();

export const AuthStack = () => {
  const isAuth = useSelector(selectIsAuth);

  if (isAuth) {
    return (
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeBottomNavigator}
        />
      </MainStack.Navigator>
    );
  }

  return (
    <MainStack.Navigator initialRouteName="Login">
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Registration"
        component={RegistrationScreen}
      />
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
    </MainStack.Navigator>
  );
};
