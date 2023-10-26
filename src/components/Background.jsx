import { StyleSheet, ImageBackground } from "react-native";
import background from "../images/bcg-photo.jpg";

export const Background = ({ children, style }) => {
  return (
    <>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={[styles.back, style && style]}
      >
        {children}
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  back: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
