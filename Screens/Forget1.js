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

const Forget1 = ({ route }) => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  const { email } = route.params || {}; // Chỉ lấy email từ params

  const handleConfirmOtp = async () => {
    setErrorMessage("");

    if (otp.trim() === "") {
      setErrorMessage("Vui lòng nhập mã OTP.");
      return;
    }

    try {
      const response = await fetch(`${NGROK_BASE_URL}/api/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Xác nhận OTP thành công.");
        navigation.navigate("Forget2", { email });
      } else {
        setErrorMessage(data.error || "Mã OTP không hợp lệ.");
      }
    } catch (error) {
      setErrorMessage(`Lỗi kết nối: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={40} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Xác Nhận OTP</Text>
      <Text style={styles.subtitle}>
        Nhập mã OTP đã được gửi đến email {email}.
      </Text>

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

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOtp}>
        <Text style={styles.confirmText}>Xác Nhận</Text>
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

export default Forget1;