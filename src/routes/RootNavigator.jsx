import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "../screens/RegistrationScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { HomeBottomNavigator } from "./HomeBottomNavigator";

const MainStack = createStackNavigator();

export const RootNavigator = () => {
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
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeBottomNavigator}
      />
    </MainStack.Navigator>
  );
};
