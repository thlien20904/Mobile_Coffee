import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from "react-native";
import { Ionicons, FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/Login";

const GOOGLE_LOGIN_URL = "https://accounts.google.com";
const FACEBOOK_LOGIN_URL = "https://www.facebook.com/login";

export default function Login({ navigation, route }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { redirectTo = "Main", redirectParams = {} } = route.params || {}; // Xóa updateLoginStatus

  const handleSocialLogin = async (provider, url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
        Alert.alert(
          "Thông báo",
          `Đã mở trang đăng nhập ${provider}. Sau khi đăng nhập, quay lại ứng dụng và tiếp tục.`
        );
      } else {
        Alert.alert("Lỗi", `Không thể mở URL: ${url}`);
      }
    } catch (error) {
      Alert.alert(
        "Lỗi",
        `Không thể mở trang đăng nhập ${provider}: ${error.message}`
      );
    }
  };

  const handleLogin = async () => {
    setErrorMessage("");

    if (!username || !password) {
      setErrorMessage("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
      return;
    }

    try {
      const API_URL = `${process.env.NGROK_BASE_URL}/api/login`;
      console.log("Gửi yêu cầu đến:", API_URL);
      console.log("Dữ liệu gửi đi:", { username, password });

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Phản hồi từ server:", response.status, data);

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

        navigation.navigate("LoginSuccess", { redirectTo, redirectParams });
      } else {
        const msg = `❌ Đăng nhập thất bại (${response.status}):\n${
          data.error || "Lỗi không xác định"
        }${data.details ? `\nChi tiết: ${data.details}` : ""}`;
        setErrorMessage(msg);
        Alert.alert("Lỗi đăng nhập", msg);
      }
    } catch (error) {
      setErrorMessage(`Lỗi kết nối: ${error.message}`);
      Alert.alert("Lỗi kết nối", `Lỗi kết nối API: ${error.message}`);
    }
  };

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
        onPress={() => handleSocialLogin("Facebook", FACEBOOK_LOGIN_URL)}
      >
        <FontAwesome name="facebook-f" size={20} color="white" />
        <Text style={styles.socialText}> Connect With Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => handleSocialLogin("Google", GOOGLE_LOGIN_URL)}
      >
        <AntDesign name="google" size={20} color="white" />
        <Text style={styles.socialText}> Connect With Google</Text>
      </TouchableOpacity>
    </View>
  );
}