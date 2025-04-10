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
import styles from "../styles/Forget";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleResetPassword = () => {
    if (email.trim() === "") {
      alert("Please enter your email address.");
      return;
    }
    // Thêm logic gửi yêu cầu đặt lại mật khẩu tại đây
    alert("A password reset link has been sent to " + email);
    navigation.navigate("Login"); // Điều hướng về màn hình Login sau khi reset mật khẩu
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")} // Điều hướng về màn hình Login
      >
        <Ionicons name="arrow-back" size={40} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Forget Password</Text>
      <Text style={styles.subtitle}>
        Enter your email to receive password reset instructions.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#777"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleResetPassword}
      >
        <Text style={styles.resetText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}
