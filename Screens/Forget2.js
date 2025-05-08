import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NGROK_BASE_URL } from "@env";

const Forget2 = ({ route }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const { email } = route.params || {};

  // Hàm kiểm tra giá trị nhập liệu và cập nhật lỗi
  const validateField = (field, value) => {
    let newErrors = { ...errors };

    switch (field) {
      case "password":
        if (!value) {
          newErrors.password = "Mật khẩu không được để trống.";
        } else if (value.length < 6) {
          newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
        } else {
          delete newErrors.password;
        }
        break;
      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống.";
        } else if (value !== password) {
          newErrors.confirmPassword =
            "Mật khẩu và xác nhận mật khẩu không khớp.";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  // Xử lý cập nhật mật khẩu
  const handleUpdatePassword = async () => {
    // Kiểm tra tất cả các trường trước khi gửi yêu cầu
    validateField("password", password);
    validateField("confirmPassword", confirmPassword);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const response = await fetch(`${NGROK_BASE_URL}/api/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cập nhật mật khẩu thành công.");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } else {
        setErrors((prev) => ({
          ...prev,
          server: data.error || "Không thể cập nhật mật khẩu.",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        server: `Lỗi kết nối: ${error.message}`,
      }));
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

      <Text style={styles.title}>Cập Nhật Mật Khẩu</Text>
      <Text style={styles.subtitle}>
        Nhập mật khẩu mới cho tài khoản của bạn.
      </Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed"
          size={20}
          color="#777"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu mới"
          placeholderTextColor="#777"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validateField("password", text);
          }}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Entypo
            name={passwordVisible ? "eye" : "eye-with-line"}
            size={20}
            color="#777"
          />
        </TouchableOpacity>
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed"
          size={20}
          color="#777"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          placeholderTextColor="#777"
          secureTextEntry={!passwordVisible}
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            validateField("confirmPassword", text);
          }}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Entypo
            name={passwordVisible ? "eye" : "eye-with-line"}
            size={20}
            color="#777"
          />
        </TouchableOpacity>
      </View>
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      )}

      {errors.server && <Text style={styles.errorText}>{errors.server}</Text>}

      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdatePassword}
      >
        <Text style={styles.updateText}>Cập Nhật</Text>
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
  updateButton: {
    backgroundColor: "#E57905",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  updateText: {
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

export default Forget2;