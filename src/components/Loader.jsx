import { ActivityIndicator, StyleSheet, Dimensions, View } from "react-native";

export const Loader = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator color={"#FF6C00"} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: "absolute",
    zIndex: 999,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});
