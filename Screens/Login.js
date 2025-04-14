import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { NGROK_BASE_URL } from "@env";
import styles from "../styles/Login";

// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login({ navigation, route }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    redirectTo = "Main",
    redirectParams = {},
    updateLoginStatus,
  } = route.params || {};

  const handleLogin = async () => {
    setErrorMessage("");

    if (!username || !password) {
      setErrorMessage("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
      return;
    }

    try {
      const API_URL = `${NGROK_BASE_URL}/api/login`;
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        setErrorMessage("Không thể đọc phản hồi từ server.");
        return;
      }

      if (response.status === 200) {
        setErrorMessage("");
        await AsyncStorage.removeItem("userInfo");
        await AsyncStorage.setItem("isLoggedIn", "true");
        const userInfo = {
          username: data.user?.username || username,
          fullName: data.user?.fullName || "",
          email: data.user?.email || "",
          phone: data.user?.phone || "",
          address: data.user?.address || "",
          avatarUrl: data.user?.avatarUrl || "",
        };
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log("Stored userInfo:", userInfo);

        // Cập nhật trạng thái đăng nhập trong App.js
        if (updateLoginStatus) {
          await updateLoginStatus();
        }

        // Điều hướng đến LoginSuccess
        navigation.navigate("LoginSuccess", { redirectTo, redirectParams }); // Sửa từ replace sang navigate
      } else {
        const msg = `❌ Đăng nhập thất bại (${response.status}):\n${
          data.error || "Lỗi không xác định"
        }`;
        setErrorMessage(msg);
        Alert.alert("Lỗi đăng nhập", msg);
      }
    } catch (error) {
      setErrorMessage(`Lỗi kết nối: ${error.message}`);
      Alert.alert("Lỗi kết nối", `Lỗi kết nối API: ${error.message}`);
    }
  };

  // Google Login
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "YOUR_GOOGLE_CLIENT_ID",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(async (userCredential) => {
          const user = userCredential.user;
          Alert.alert("Success", "Signed in with Google!");
          await AsyncStorage.setItem("isLoggedIn", "true");
          await AsyncStorage.setItem(
            "userInfo",
            JSON.stringify({
              username: user.displayName || "",
              fullName: user.displayName || "",
              email: user.email || "",
              phone: user.phoneNumber || "",
              address: "",
              avatarUrl: user.photoURL || "",
            })
          );

          // Cập nhật trạng thái đăng nhập trong App.js
          if (updateLoginStatus) {
            await updateLoginStatus();
          }

          // Điều hướng đến LoginSuccess
          navigation.navigate("LoginSuccess", { redirectTo, redirectParams }); // Sửa từ replace sang navigate
        })
        .catch(() => Alert.alert("Error", "Google sign-in failed!"));
    }
  }, [response]);

  // Facebook Login
  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: "YOUR_FACEBOOK_APP_ID",
  });

  useEffect(() => {
    if (fbResponse?.type === "success") {
      const { access_token } = fbResponse.params;
      const credential = FacebookAuthProvider.credential(access_token);
      signInWithCredential(auth, credential)
        .then(async (userCredential) => {
          const user = userCredential.user;
          Alert.alert("Success", "Signed in with Facebook!");
          await AsyncStorage.setItem("isLoggedIn", "true");
          await AsyncStorage.setItem(
            "userInfo",
            JSON.stringify({
              username: user.displayName || "",
              fullName: user.displayName || "",
              email: user.email || "",
              phone: user.phoneNumber || "",
              address: "",
              avatarUrl: user.photoURL || "",
            })
          );

          // Cập nhật trạng thái đăng nhập trong App.js
          if (updateLoginStatus) {
            await updateLoginStatus();
          }

          // Điều hướng đến LoginSuccess
          navigation.navigate("LoginSuccess", { redirectTo, redirectParams }); // Sửa từ replace sang navigate
        })
        .catch(() => Alert.alert("Error", "Facebook sign-in failed!"));
    }
  }, [fbResponse]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Main")}
      >
        <Ionicons name="arrow-back" size={40} color="#333" />
        <Text style={styles.title}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.subtitle}>
        Enter your Phone number or Email address for sign in. Enjoy your food.
      </Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="#777" style={styles.icon} />
        <TextInput
          placeholder="Username"
          style={styles.input}
          placeholderTextColor="#777"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="#777" style={styles.icon} />
        <TextInput
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          style={styles.input}
          placeholderTextColor="#777"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Entypo
            name={passwordVisible ? "eye" : "eye-with-line"}
            size={20}
            color="#777"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.rememberContainer}>
        <View style={styles.rememberRow}>
          <Switch value={rememberMe} onValueChange={setRememberMe} />
          <Text style={styles.rememberText}>Remember Me</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Forget")}>
          <Text style={styles.forgetText}>Forget Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {errorMessage ? (
        <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
          <Text
            style={{ color: "red", textAlign: "center", fontWeight: "bold" }}
          >
            {errorMessage}
          </Text>
        </View>
      ) : null}

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.forgetText}>Signup</Text>
        </Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity
        style={styles.facebookButton}
        onPress={() => fbPromptAsync()}
      >
        <FontAwesome name="facebook-f" size={20} color="white" />
        <Text style={styles.socialText}> Connect With Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => promptAsync()}
      >
        <AntDesign name="google" size={20} color="white" />
        <Text style={styles.socialText}> Connect With Google</Text>
      </TouchableOpacity>
    </View>
  );
}
