import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { NGROK_BASE_URL } from "@env";

const Register = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  // Hàm kiểm tra định dạng email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Hàm kiểm tra định dạng số điện thoại
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  // Hàm kiểm tra username có tồn tại không
  const checkUsernameExists = async (username) => {
    try {
      const response = await fetch(`${NGROK_BASE_URL}/api/check-username`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      return data.exists ? data.message : null;
    } catch (err) {
      console.error("Lỗi khi kiểm tra username:", err);
      return "Lỗi khi kiểm tra tên người dùng.";
    }
  };

  // Hàm kiểm tra email có tồn tại không
  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`${NGROK_BASE_URL}/api/check-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return data.exists ? data.message : null;
    } catch (err) {
      console.error("Lỗi khi kiểm tra email:", err);
      return "Lỗi khi kiểm tra email.";
    }
  };

  // Hàm kiểm tra giá trị nhập liệu và cập nhật lỗi
  const validateField = async (field, value) => {
    let newErrors = { ...errors };

    switch (field) {
      case "username":
        if (!value) {
          newErrors.username = "Tên người dùng không được để trống.";
        } else if (value.length < 3) {
          newErrors.username = "Tên người dùng phải có ít nhất 3 ký tự.";
        } else {
          const usernameError = await checkUsernameExists(value);
          if (usernameError) {
            newErrors.username = usernameError;
          } else {
            delete newErrors.username;
          }
        }
        break;
      case "email":
        if (!value) {
          newErrors.email = "Email không được để trống.";
        } else if (!validateEmail(value)) {
          newErrors.email = "Email không đúng định dạng.";
        } else {
          const emailError = await checkEmailExists(value);
          if (emailError) {
            newErrors.email = emailError;
          } else {
            delete newErrors.email;
          }
        }
        break;
      case "password":
        if (!value) {
          newErrors.password = "Mật khẩu không được để trống.";
        } else if (value.length < 6) {
          newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
        } else {
          delete newErrors.password;
        }
        break;
      case "fullName":
        if (!value) {
          newErrors.fullName = "Họ và tên không được để trống.";
        } else {
          delete newErrors.fullName;
        }
        break;
      case "phone":
        if (!value) {
          newErrors.phone = "Số điện thoại không được để trống.";
        } else if (!validatePhone(value)) {
          newErrors.phone = "Số điện thoại phải có đúng 10 chữ số.";
        } else {
          delete newErrors.phone;
        }
        break;
      case "address":
        if (!value) {
          newErrors.address = "Địa chỉ không được để trống.";
        } else {
          delete newErrors.address;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  // Xử lý đăng ký
  const handleRegister = async () => {
    // Kiểm tra tất cả các trường trước khi gửi yêu cầu
    await validateField("username", username);
    await validateField("email", email);
    await validateField("password", password);
    await validateField("fullName", fullName);
    await validateField("phone", phone);
    await validateField("address", address);

    if (Object.keys(errors).length > 0) {
      Alert.alert("Lỗi", "Vui lòng kiểm tra lại các trường nhập liệu.");
      return;
    }

    try {
      console.log("Gửi yêu cầu đến:", `${NGROK_BASE_URL}/api/register`);
      console.log("Dữ liệu gửi đi:", {
        username,
        email,
        password,
        fullName,
        phone,
        address,
      });

      const response = await fetch(`${NGROK_BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          fullName,
          phone,
          address,
        }),
      });

      console.log("Phản hồi từ server:", response.status, response.statusText);

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Phản hồi không phải JSON:", text);
        throw new Error("Phản hồi từ server không phải JSON.");
      }

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("isLoggedIn", "true");
        await AsyncStorage.setItem(
          "userInfo",
          JSON.stringify({
            username,
            fullName,
            email,
          })
        );

        Alert.alert("Thành công", "Đăng ký thành công!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Lỗi", data.error || "Đăng ký thất bại.");
      }
    } catch (error) {
      console.error("Lỗi chi tiết:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi đăng ký: " + error.message);
    }
  };

  // Xử lý đăng nhập bằng Google
  const handleGoogleLogin = async () => {
    try {
      await Linking.openURL("https://accounts.google.com/signin");
      Alert.alert(
        "Thông báo",
        "Sau khi đăng nhập Google, nhấn nút bên dưới để tiếp tục.",
        [
          {
            text: "Tôi đã đăng nhập, tiếp tục",
            onPress: async () => {
              await AsyncStorage.setItem("isLoggedIn", "true");
              await AsyncStorage.setItem(
                "userInfo",
                JSON.stringify({
                  username: "social_user",
                  fullName: "Social User",
                  email: "socialuser@example.com",
                })
              );
              navigation.navigate("Main");
            },
          },
          { text: "Hủy", style: "cancel" },
        ]
      );
    } catch (error) {
      console.error("Lỗi khi mở Google login:", error);
      Alert.alert("Lỗi", "Không thể mở trang đăng nhập Google.");
    }
  };

  // Xử lý đăng nhập bằng Facebook
  const handleFacebookLogin = async () => {
    try {
      await Linking.openURL("https://www.facebook.com/login");
      Alert.alert(
        "Thông báo",
        "Sau khi đăng nhập Facebook, nhấn nút bên dưới để tiếp tục.",
        [
          {
            text: "Tôi đã đăng nhập, tiếp tục",
            onPress: async () => {
              await AsyncStorage.setItem("isLoggedIn", "true");
              await AsyncStorage.setItem(
                "userInfo",
                JSON.stringify({
                  username: "social_user",
                  fullName: "Social User",
                  email: "socialuser@example.com",
                })
              );
              navigation.navigate("Main");
            },
          },
          { text: "Hủy", style: "cancel" },
        ]
      );
    } catch (error) {
      console.error("Lỗi khi mở Facebook login:", error);
      Alert.alert("Lỗi", "Không thể mở trang đăng nhập Facebook.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Create Account</Text>
      </View>
      <Text style={styles.subtitle}>
        Enter your details for sign up. Already have an account?{" "}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          Sign In
        </Text>
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={async (text) => {
            setUsername(text);
            await validateField("username", text);
          }}
        />
        {errors.username && (
          <Text style={styles.errorText}>{errors.username}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={async (text) => {
            setEmail(text);
            await validateField("email", text);
          }}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validateField("password", text);
          }}
          secureTextEntry
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            validateField("fullName", text);
          }}
        />
        {errors.fullName && (
          <Text style={styles.errorText}>{errors.fullName}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            validateField("phone", text);
          }}
          keyboardType="phone-pad"
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={(text) => {
            setAddress(text);
            validateField("address", text);
          }}
        />
        {errors.address && (
          <Text style={styles.errorText}>{errors.address}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity
        style={[styles.button, styles.facebookButton]}
        onPress={handleFacebookLogin}
      >
        <Text style={styles.buttonText}>Connect With Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.googleButton]}
        onPress={handleGoogleLogin}
      >
        <Text style={styles.buttonText}>Connect With Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  loginLink: {
    color: "#00C4B4",
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#00C4B4",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  facebookButton: {
    backgroundColor: "#3b5998",
  },
  googleButton: {
    backgroundColor: "#4285F4",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginVertical: 10,
  },
});

export default Register;