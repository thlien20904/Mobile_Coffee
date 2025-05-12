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

// B1: Component Forget1 cho phép nhập mã OTP để xác nhận
const Forget1 = ({ route }) => {
  // B2: State quản lý mã OTP nhập vào
  const [otp, setOtp] = useState("");
  // B3: State lưu thông báo lỗi
  const [errorMessage, setErrorMessage] = useState("");
  // B4: Hook useNavigation để điều hướng
  const navigation = useNavigation();
  // B5: Lấy email từ route.params
  const { email } = route.params || {};

  // B6: Hàm xử lý xác nhận OTP
  const handleConfirmOtp = async () => {
    setErrorMessage(""); // Xóa lỗi cũ

    // B7: Kiểm tra OTP trống
    if (otp.trim() === "") {
      setErrorMessage("Vui lòng nhập mã OTP.");
      return;
    }

    try {
      // B8: Gửi yêu cầu POST đến API verify-otp
      const response = await fetch(`${NGROK_BASE_URL}/api/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      // B9: Xử lý phản hồi từ server
      if (response.ok) {
        alert("Xác nhận OTP thành công.");
        navigation.navigate("Forget2", { email }); // Chuyển đến màn hình cập nhật mật khẩu
      } else {
        setErrorMessage(data.error || "Mã OTP không hợp lệ.");
      }
    } catch (error) {
      setErrorMessage(`Lỗi kết nối: ${error.message}`); // Lỗi mạng
    }
  };

  // B10: Giao diện chính
  return (
    <View style={styles.container}>
      {/* B11: Nút quay lại */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={40} color="#333" />
      </TouchableOpacity>

      {/* B12: Tiêu đề và hướng dẫn */}
      <Text style={styles.title}>Xác Nhận OTP</Text>
      <Text style={styles.subtitle}>
        Nhập mã OTP đã được gửi đến email {email}.
      </Text>

      {/* B13: Ô nhập OTP */}
      <View style={styles.inputContainer}>
        <Ionicons name="key" size={20} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nhập mã OTP"
          placeholderTextColor="#777"
          keyboardType="numeric"
          value={otp}
          onChangeText={setOtp}
        />
      </View>

      {/* B14: Hiển thị lỗi nếu có */}
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {/* B15: Nút xác nhận OTP */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOtp}>
        <Text style={styles.confirmText}>Xác Nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

// B16: Định nghĩa styles cho giao diện
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
  confirmButton: {
    backgroundColor: "#E57905",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  confirmText: {
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

// B17: Xuất component
export default Forget1;
