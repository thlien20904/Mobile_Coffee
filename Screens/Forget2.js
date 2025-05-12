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

// B1: Component Forget2 cho phép cập nhật mật khẩu mới
const Forget2 = ({ route }) => {
  // B2: State quản lý mật khẩu, xác nhận mật khẩu, và hiển thị mật khẩu
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  // B3: State quản lý lỗi cho từng trường
  const [errors, setErrors] = useState({});
  // B4: Hook useNavigation để điều hướng
  const navigation = useNavigation();
  // B5: Lấy email từ route.params
  const { email } = route.params || {};

  // B6: Hàm kiểm tra giá trị nhập liệu
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

  // B7: Hàm xử lý cập nhật mật khẩu
  const handleUpdatePassword = async () => {
    // B8: Kiểm tra tất cả trường trước khi gửi
    validateField("password", password);
    validateField("confirmPassword", confirmPassword);

    if (Object.keys(errors).length > 0) {
      return; // Không gửi nếu có lỗi
    }

    try {
      // B9: Gửi yêu cầu POST đến API reset-password
      const response = await fetch(`${NGROK_BASE_URL}/api/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // B10: Xử lý phản hồi từ server
      if (response.ok) {
        alert("Cập nhật mật khẩu thành công.");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }], // Chuyển về màn hình Login
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

  // B11: Giao diện chính
  return (
    <View style={styles.container}>
      {/* B12: Nút quay lại */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={40} color="#333" />
      </TouchableOpacity>

      {/* B13: Tiêu đề và hướng dẫn */}
      <Text style={styles.title}>Cập Nhật Mật Khẩu</Text>
      <Text style={styles.subtitle}>
        Nhập mật khẩu mới cho tài khoản của bạn.
      </Text>

      {/* B14: Ô nhập mật khẩu mới */}
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

      {/* B15: Ô nhập xác nhận mật khẩu */}
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

      {/* B16: Hiển thị lỗi server nếu có */}
      {errors.server && <Text style={styles.errorText}>{errors.server}</Text>}

      {/* B17: Nút cập nhật mật khẩu */}
      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleUpdatePassword}
      >
        <Text style={styles.updateText}>Cập Nhật</Text>
      </TouchableOpacity>
    </View>
  );
};

// B18: Định nghĩa styles cho giao diện
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

// B19: Xuất component
export default Forget2;
