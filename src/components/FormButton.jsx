import { StyleSheet, TouchableOpacity, Text } from "react-native";

export const FormButton = ({ text, method }) => {
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={method}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
  },
  buttonText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
