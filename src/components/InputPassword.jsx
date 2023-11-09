import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

export const InputPassword = ({
  changeMethod,
  value,
  isPasswordHidden,
  showPasswd,
  onBlur,
  onFocus,
  focusedInput,
  autoCapitalize,
}) => {
  return (
    <View style={styles.loginContainer}>
      <TextInput
        style={[styles.input, focusedInput === "password" && styles.blurBorder]}
        placeholderTextColor={"#BDBDBD"}
        placeholder="Пароль"
        onChangeText={changeMethod}
        value={value}
        secureTextEntry={isPasswordHidden}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <TouchableOpacity onPress={showPasswd} style={styles.showBtn}>
        <Text style={styles.showText}>
          {isPasswordHidden ? "Показати" : "Приховати"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    position: "relative",
  },
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
  showBtn: {
    position: "absolute",
    right: 16,
    marginVertical: "auto",
    top: 12,
  },
  showText: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    textAlignVertical: "center",
  },
});
