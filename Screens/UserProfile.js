import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { NGROK_BASE_URL } from "@env";
import styles from "../styles/UserProfile";

export default function UserProfile({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    avatarUrl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const BASE_URL = NGROK_BASE_URL;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        let username = "";
        if (storedUserInfo) {
          const parsedUserInfo = JSON.parse(storedUserInfo);
          username = parsedUserInfo.username || "";
        }

        if (!username) {
          Alert.alert(
            "Lỗi",
            "Không tìm thấy thông tin đăng nhập. Vui lòng đăng nhập lại."
          );
          navigation.navigate("Login");
          return;
        }

        const API_URL = `${BASE_URL}/api/user?username=${username}`;
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.status === 200) {
          setUserInfo({
            username: data.username || "",
            fullName: data.fullName || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            avatarUrl: data.avatarUrl || "",
          });
          setImageError(false);
        } else {
          Alert.alert("Lỗi", "Không thể lấy thông tin người dùng từ server.");
        }
      } catch (error) {
        Alert.alert("Lỗi kết nối", `Lỗi kết nối API: ${error.message}`);
      }
    };

    fetchUserInfo();
  }, [navigation, refreshKey]);

  const handlePickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Lỗi quyền truy cập",
          "Ứng dụng cần quyền truy cập thư viện ảnh để chọn ảnh. Vui lòng cấp quyền trong cài đặt."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setUserInfo({ ...userInfo, avatarUrl: uri });
        setSelectedImage(result.assets[0]);
        setImageError(false);
      }
    } catch (error) {
      Alert.alert("Lỗi", `Không thể chọn ảnh: ${error.message}`);
    }
  };

  const handleUpdate = async () => {
    try {
      const API_URL = `${BASE_URL}/api/update-user`;
      const formData = new FormData();
      formData.append("username", userInfo.username);
      formData.append("fullName", userInfo.fullName || "");
      formData.append("email", userInfo.email || "");
      formData.append("phone", userInfo.phone || "");
      formData.append("address", userInfo.address || "");

      if (selectedImage) {
        formData.append("avatar", {
          uri: selectedImage.uri,
          type: selectedImage.type || "image/jpeg",
          name: selectedImage.fileName || "avatar.jpg",
        });
      }

      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await response.json();
      if (response.status === 200) {
        Alert.alert("Thành công", "Cập nhật thông tin thành công!");
        setIsEditing(false);
        setSelectedImage(null);

        const fetchUserResponse = await fetch(
          `${BASE_URL}/api/user?username=${userInfo.username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const fetchUserData = await fetchUserResponse.json();
        if (fetchUserResponse.status === 200) {
          setUserInfo({
            username: fetchUserData.username || "",
            fullName: fetchUserData.fullName || "",
            email: fetchUserData.email || "",
            phone: fetchUserData.phone || "",
            address: fetchUserData.address || "",
            avatarUrl: fetchUserData.avatarUrl || "",
          });
          setImageError(false);
          setRefreshKey((prevKey) => prevKey + 1);
        }

        Keyboard.dismiss();
      } else {
        Alert.alert("Lỗi", "Không thể cập nhật thông tin. Vui lòng thử lại.");
      }
    } catch (error) {
      Alert.alert("Lỗi kết nối", `Lỗi kết nối API: ${error.message}`);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    Alert.alert(
      "Lỗi tải ảnh",
      "Không thể tải ảnh đại diện. Vui lòng kiểm tra kết nối hoặc URL ảnh."
    );
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Main")} // Sửa từ goBack() sang navigate("Main")
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cập nhật thông tin</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                userInfo.avatarUrl && !imageError
                  ? {
                      uri: `${userInfo.avatarUrl}?cacheBust=${Date.now()}`,
                      cache: "reload",
                    }
                  : require("../assets/a.png")
              }
              style={styles.avatar}
              onError={handleImageError}
              key={refreshKey}
            />
            {isEditing && (
              <TouchableOpacity
                style={styles.editIcon}
                onPress={handlePickImage}
              >
                <Ionicons name="camera" size={20} color="#FFF" />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Họ và tên</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={userInfo.fullName}
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, fullName: text })
              }
              editable={isEditing}
              placeholder="Họ và tên"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={userInfo.email}
              onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
              editable={isEditing}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={userInfo.phone}
              onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
              editable={isEditing}
              placeholder="Số điện thoại"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Địa chỉ</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={userInfo.address}
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, address: text })
              }
              editable={isEditing}
              placeholder="Địa chỉ"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => {
              if (isEditing) {
                handleUpdate();
              } else {
                setIsEditing(true);
              }
            }}
          >
            <Text style={styles.updateButtonText}>
              {isEditing ? "Cập nhật tài khoản" : "Chỉnh sửa thông tin"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}