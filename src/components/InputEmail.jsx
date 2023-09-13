import { StyleSheet, TextInput } from "react-native";

export const InputEmail = ({
  value,
  changeMethod,
  onBlur,
  onFocus,
  focusedInput,
}) => {
  return (
    <>
      <TextInput
        style={[styles.input, focusedInput === "email" && styles.blurBorder]}
        keyboardType="email-address"
        placeholder="Адреса електронної пошти"
        placeholderTextColor={"#BDBDBD"}
        onChangeText={changeMethod}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    width: "100%",
    padding: 16,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    height: 50,
    backgroundColor: "#F6F6F6",
  },
  blurBorder: {
    borderColor: "#FF6C00",
    backgroundColor: "#ffffff",
  },
});
