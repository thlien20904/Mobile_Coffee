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

// B1: Định nghĩa URL đăng nhập mạng xã hội
const GOOGLE_LOGIN_URL = "https://accounts.google.com";
const FACEBOOK_LOGIN_URL = "https://www.facebook.com/login";

// B2: Component Login xử lý đăng nhập người dùng
export default function Login({ navigation, route }) {
  // B3: State quản lý trạng thái giao diện và dữ liệu nhập
  const [passwordVisible, setPasswordVisible] = useState(false); // Hiển thị/ẩn mật khẩu
  const [username, setUsername] = useState(""); // Tên đăng nhập
  const [password, setPassword] = useState(""); // Mật khẩu
  const [rememberMe, setRememberMe] = useState(false); // Lưu thông tin đăng nhập
  const [errorMessage, setErrorMessage] = useState(""); // Thông báo lỗi
  // B4: Lấy redirectTo và redirectParams từ route.params
  const { redirectTo = "Main", redirectParams = {} } = route.params || {};

  // B5: Hàm xử lý đăng nhập qua mạng xã hội
  const handleSocialLogin = async (provider, url) => {
    try {
      // B6: Kiểm tra khả năng mở URL
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        // B7: Mở trang đăng nhập mạng xã hội
        await Linking.openURL(url);
        Alert.alert(
          "Thông báo",
          `Đã mở trang đăng nhập ${provider}. Sau khi đăng nhập, quay lại ứng dụng và tiếp tục.`
        );
      } else {
        // B8: Hiển thị thông báo nếu không mở được URL
        Alert.alert(`Không thể mở URL: ${url}`);
      }
    } catch (error) {
      // B9: Hiển thị thông báo nếu có lỗi khi mở URL
      Alert.alert(`Không thể mở trang đăng nhập ${provider}: ${error.message}`);
    }
  };

  // B10: Hàm xử lý đăng nhập bằng tài khoản
  const handleLogin = async () => {
    setErrorMessage(""); // Xóa lỗi cũ

    // B11: Kiểm tra dữ liệu nhập
    if (!username || !password) {
      setErrorMessage("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
      return;
    }

    try {
      // B12: Gửi yêu cầu POST đến API đăng nhập
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

      // B13: Xử lý phản hồi từ server
      if (response.status === 200) {
        setErrorMessage("");
        await AsyncStorage.removeItem("userInfo"); // Xóa thông tin cũ
        await AsyncStorage.setItem("isLoggedIn", "true"); // Lưu trạng thái đăng nhập
        // B14: Lưu thông tin người dùng vào AsyncStorage
        const userInfo = {
          username: data.user?.username || username,
          fullName: data.user?.fullName || "",
          email: data.user?.email || "",
          phone: data.user?.phone || "",
          address: data.user?.address || "",
          avatarUrl: data.user?.avatarUrl || "",
        };
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));

        // B15: Điều hướng đến màn hình thành công
        navigation.navigate("LoginSuccess", { redirectTo, redirectParams });
      } else {
        const msg = `❌ Đăng nhập thất bại (${response.status}):\n${
          data.error || "Lỗi không xác định"
        }${data.details ? `\nChi tiết: ${data.details}` : ""}`;
        setErrorMessage(msg);
        // B16: Hiển thị thông báo đăng nhập thất bại
        Alert.alert(
          `Đăng nhập thất bại: ${data.error || "Lỗi không xác định"}`
        );
      }
    } catch (error) {
      setErrorMessage(`Lỗi kết nối: ${error.message}`);
      // B17: Hiển thị thông báo lỗi kết nối
      Alert.alert(`Lỗi kết nối API: ${error.message}`);
    }
  };

  // B18: Giao diện chính của màn hình đăng nhập
  return (
    <View style={styles.container}>
      {/* B19: Nút quay lại và tiêu đề */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Main")}
      >
        <Ionicons name="arrow-back" size={40} color="#333" />
        <Text style={styles.title}>Sign In</Text>
      </TouchableOpacity>

      {/* B20: Văn bản chào mừng */}
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.subtitle}>
        Enter your Phone number or Email address for sign in. Enjoy your food.
      </Text>

      {/* B21: Ô nhập tên đăng nhập */}
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

      {/* B22: Ô nhập mật khẩu */}
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

      {/* B23: Tùy chọn "Remember Me" và quên mật khẩu */}
      <View style={styles.rememberContainer}>
        <View style={styles.rememberRow}>
          <Switch value={rememberMe} onValueChange={setRememberMe} />
          <Text style={styles.rememberText}>Remember Me</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Forget")}>
          <Text style={styles.forgetText}>Forget Password?</Text>
        </TouchableOpacity>
      </View>

      {/* B24: Nút đăng nhập */}
      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* B25: Hiển thị thông báo lỗi nếu có */}
      {errorMessage ? (
        <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
          <Text
            style={{ color: "red", textAlign: "center", fontWeight: "bold" }}
          >
            {errorMessage}
          </Text>
        </View>
      ) : null}

      {/* B26: Liên kết đến đăng ký */}
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.forgetText}>Signup</Text>
        </Text>
      </TouchableOpacity>

      {/* B27: Văn bản phân cách */}
      <Text style={styles.orText}>OR</Text>

      {/* B28: Nút đăng nhập bằng Facebook */}
      <TouchableOpacity
        style={styles.facebookButton}
        onPress={() => handleSocialLogin("Facebook", FACEBOOK_LOGIN_URL)}
      >
        <FontAwesome name="facebook-f" size={20} color="white" />
        <Text style={styles.socialText}> Connect With Facebook</Text>
      </TouchableOpacity>

      {/* B29: Nút đăng nhập bằng Google */}
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
