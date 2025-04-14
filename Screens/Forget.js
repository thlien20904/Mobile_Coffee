import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NGROK_BASE_URL } from "@env";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [otpMessage, setOtpMessage] = useState(""); // Thêm state để hiển thị OTP
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    setErrorMessage("");
    setOtpMessage("");

    if (email.trim() === "") {
      setErrorMessage("Vui lòng nhập địa chỉ email.");
      return;
    }

    try {
      const response = await fetch(`${NGROK_BASE_URL}/api/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Lấy OTP từ phản hồi
        const { otp } = data;
        setOtpMessage(
          `Mã OTP của bạn là: ${otp}. Vui lòng sử dụng mã này để xác minh.`
        ); // Hiển thị OTP
        // Truyền email và OTP sang màn hình Forget1
        navigation.navigate("Forget1", { email, otp });
      } else {
        setErrorMessage(
          data.error || "Không thể gửi mã OTP. Vui lòng thử lại."
        );
      }
    } catch (error) {
      setErrorMessage(`Lỗi kết nối: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Ionicons name="arrow-back" size={40} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Quên Mật Khẩu</Text>
      <Text style={styles.subtitle}>Nhập email của bạn để nhận mã OTP.</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập email của bạn"
          placeholderTextColor="#777"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {otpMessage ? <Text style={styles.successText}>{otpMessage}</Text> : null}

      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleResetPassword}
      >
        <Text style={styles.resetText}>Gửi Mã OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  icon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  resetButton: {
    backgroundColor: "#E57905",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  resetText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  successText: {
    color: "green",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default ForgetPassword;
