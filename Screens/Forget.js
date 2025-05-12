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

// B1: Component Forget cho phép nhập email để gửi mã OTP
const Forget = () => {
  // B2: State quản lý email nhập vào
  const [email, setEmail] = useState("");
  // B3: State lưu thông báo lỗi
  const [errorMessage, setErrorMessage] = useState("");
  // B4: Hook useNavigation để điều hướng
  const navigation = useNavigation();

  // B5: Hàm xử lý gửi yêu cầu OTP
  const handleSendOtp = async () => {
    setErrorMessage(""); // Xóa lỗi cũ

    // B6: Kiểm tra email trống
    if (!email.trim()) {
      setErrorMessage("Vui lòng nhập email.");
      return;
    }

    try {
      // B7: Gửi yêu cầu POST đến API forgot-password
      const response = await fetch(`${NGROK_BASE_URL}/api/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      // B8: Xử lý phản hồi từ server
      if (response.ok) {
        alert("Mã OTP đã được gửi đến email của bạn.");
        navigation.navigate("Forget1", { email }); // Chuyển đến màn hình nhập OTP
      } else {
        setErrorMessage(data.error || "Không thể gửi mã OTP.");
      }
    } catch (error) {
      setErrorMessage(`Lỗi kết nối: ${error.message}`); // Lỗi mạng
    }
  };

  // B9: Giao diện chính
  return (
    <View style={styles.container}>
      {/* B10: Nút quay lại */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={40} color="#333" />
      </TouchableOpacity>

      {/* B11: Tiêu đề và hướng dẫn */}
      <Text style={styles.title}>Quên Mật Khẩu</Text>
      <Text style={styles.subtitle}>
        Nhập email của bạn để nhận mã OTP đặt lại mật khẩu.
      </Text>

      {/* B12: Ô nhập email */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#777"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* B13: Hiển thị lỗi nếu có */}
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {/* B14: Nút gửi OTP */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSendOtp}>
        <Text style={styles.sendText}>Gửi Mã OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

// B15: Định nghĩa styles cho giao diện
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
  sendButton: {
    backgroundColor: "#E57905",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  sendText: {
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
});

// B16: Xuất component
export default Forget;
