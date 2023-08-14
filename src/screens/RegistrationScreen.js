import {
    ImageBackground,
    Image,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
  } from "react-native";
import React, { useState, useEffect } from "react";
  
const RegistrationScreen = () => {
    const [focusedInput, setFocusedInput] = useState(null);
  
    const addImage = (e) => {
      e.preventDefault();
    };
    const signUp = (e) => {
      e.preventDefault();
    };
    const showPassword = (e) => {
      e.preventDefault();
    };
  
    return (
      <ImageBackground
        source={require("../images/bg-img.jpg")}
        style={styles.imageBackground}
        imageStyle={{
          minHeight: 812,
        }}
      >
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.avatar}>
            <Image
              style={styles.avatarImage}
              source={require("../images/avatar.jpg")}
            />
            <TouchableOpacity style={styles.addButton} onPress={addImage}>
              <Image
                style={styles.addButtonIcon}
                source={require("../images/added.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.registrationTitle}>Реєстрація</Text>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              style={[
                [styles.input],
                focusedInput === "login" && [styles.inputFocused],
              ]}
              placeholderTextColor={"#BDBDBD"}
              placeholder="Логін"
              name="login"
              onFocus={() => setFocusedInput("login")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>
          <View style={styles.formContainer}>
            <TextInput
              style={[
                [styles.input],
                focusedInput === "email" && [styles.inputFocused],
              ]}
              placeholderTextColor={"#BDBDBD"}
              placeholder="Адреса електронної пошти"
              name="email"
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>
          <View style={styles.formContainer}>
            <TextInput
              style={[
                [styles.input],
                focusedInput === "password" && [styles.inputFocused],
              ]}
              placeholderTextColor={"#BDBDBD"}
              secureTextEntry={true}
              placeholder="Пароль"
              name="password"
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
            <TouchableOpacity style={styles.showTextButton} onPress={showPassword}>
              <Text style={styles.showText}>Показати</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.registrationButton} onPress={signUp}>
              <Text style={styles.registrationButtonText}>Зареєструватися</Text>
            </TouchableOpacity>
            <View style={styles.redirection}>
              <Text style={styles.redirectionText}>Вже є акаунт?</Text>
              <TouchableOpacity>
                <Text style={styles.redirectionLink}>Увійти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
};

export default RegistrationScreen;
  
const styles = StyleSheet.create({
    imageBackground: {
      flex: 1,
      position: "relative",
    },
    container: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      minHeight: 549,
      padding: 16,
      backgroundColor: "#fff",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    avatar: {
      position: "relative",
      backgroundColor: "#F6F6F6",
      borderRadius: 16,
      marginBottom: 32,
      width: 120,
      aspectRatio: 1,
      marginTop: -76,
      marginLeft: "auto",
      marginRight: "auto",
    },
    addButton: {
      position: "absolute",
      width: 25,
      height: 25,
      right: -14,
      bottom: 14,
    },
    addButtonIcon: {
      width: 25,
      height: 25,
    },
    avatarImage: {
      borderRadius: 16,
      width: 120,
      height: 120,
    },
    titleContainer: {
      marginBottom: 33,
    },
    registrationTitle: {
      fontSize: 30,
      lineHeight: 35,
      textAlign: "center",
      fontFamily: "Roboto-Medium",
    },
    formContainer: {
      position: "relative",
      marginBottom: 16,
    },
    input: {
      color: "#BDBDBD",
      backgroundColor: "#F6F6F6",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#E8E8E8",
      borderRadius: 6,
      padding: 16,
      fontFamily: "Roboto-Regular",
      fontSize: 16,
    },
    inputFocused: {
      borderColor: "#FF6C00",
      backgroundColor: "#fff",
      color: "#000",
    },
    showTextButton: {
      fontSize: 16,
    },
    showText: {
      position: "absolute",
      top: "50%",
      right: 16,
      lineHeight: 24,
      marginTop: -42,
      color: "#1B4371",
    },
    actions: {
      overflow: "hidden",
    },
    registrationButton: {
      backgroundColor: "#FF6C00",
      borderRadius: 100,
      width: "100%",
      padding: 16,
      marginTop: 27,
    },
    registrationButtonText: {
      textAlign: "center",
      color: "#fff",
      fontSize: 16,
    },
    redirection: {
      marginTop: 16,
      flexDirection: "row",
      alignItems: "center",
      marginRight: "auto",
      marginLeft: "auto",
      gap: 5,
    },
    redirectionText: {
      fontSize: 16,
      color: "#1B4371",
    },
    redirectionLink: {
      fontSize: 16,
      color: "#1B4371",
      textDecorationLine: "underline",
    },
});