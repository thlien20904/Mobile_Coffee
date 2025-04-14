import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { NGROK_BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Thêm import AsyncStorage
import styles from "../styles/StoreDetailStyles";

// Ảnh mặc định (fallback) nếu không tải được ảnh từ URL
const defaultImage = require("../assets/banner.png");

// Tách API URL ra thành biến môi trường hoặc file config
const API_BASE_URL = NGROK_BASE_URL;

export default function StoreDetailScreen({ route, navigation }) {
  const { storeId } = route.params; // Lấy storeId từ navigation
  const [store, setStore] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm state để kiểm tra đăng nhập

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem("isLoggedIn");
        setIsLoggedIn(loggedIn === "true");
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  // Gọi API để lấy chi tiết cửa hàng
  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/stores/${storeId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(
            `Phản hồi từ server không phải JSON (Status: ${
              response.status
            }): ${text.substring(0, 100)}...`
          );
        }

        if (!response.ok) {
          let errorMessage = `Lỗi từ server (Status: ${response.status})`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || "Lỗi khi lấy chi tiết cửa hàng.";
          } catch (jsonError) {
            errorMessage = response.statusText || errorMessage;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log("Store details from API:", data);
        setStore(data);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching store details:", error.message);
        setErrorMessage("Lỗi khi lấy chi tiết cửa hàng: " + error.message);
        setStore(null);
      }
    };

    fetchStoreDetails();
  }, [storeId]);

  // Hàm mở bản đồ (dùng địa chỉ để mở Google Maps)
  const openMap = () => {
    if (store?.address) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        store.address
      )}`;
      Linking.openURL(url).catch((err) =>
        console.error("Error opening map:", err)
      );
    }
  };

  // Hàm gọi điện
  const callStore = () => {
    if (store?.phone) {
      const url = `tel:${store.phone}`;
      Linking.openURL(url).catch((err) =>
        console.error("Error making call:", err)
      );
    }
  };

  // Hàm chia sẻ
  const shareStore = async () => {
    if (store) {
      try {
        await Share.share({
          message: `Hãy ghé thăm ${store.name} tại ${store.address}! Giờ mở cửa: ${store.openingHours}`,
        });
      } catch (error) {
        console.error("Error sharing store:", error);
      }
    }
  };

  // Hàm điều hướng đến Order hoặc Login
  const handleOrderNavigation = async () => {
    if (isLoggedIn) {
      navigation.navigate("Order", { storeId });
    } else {
      // Điều hướng đến Login và truyền thông tin màn hình đích
      navigation.navigate("Login", {
        redirectTo: "Order",
        redirectParams: { storeId },
      });
    }
  };

  if (!store && !errorMessage) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Đang tải...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Ảnh cửa hàng */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: store?.image }}
              style={styles.storeImage}
              resizeMode="cover"
              defaultSource={defaultImage}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close" size={24} color="#777" />
            </TouchableOpacity>
          </View>

          {/* Thông tin cửa hàng */}
          <View style={styles.infoContainer}>
            <Text style={styles.storeName}>{store?.name}</Text>
            <Text style={styles.storeAddress}>{store?.address}</Text>
            <Text style={styles.openingHours}>
              Giờ mở cửa: {store?.openingHours || "Không có thông tin"}
            </Text>
          </View>

          {/* Các tùy chọn */}
          <View style={styles.optionsContainer}>
            {/* Địa chỉ và mở bản đồ */}
            <TouchableOpacity style={styles.optionItem} onPress={openMap}>
              <Ionicons name="location-outline" size={24} color="#777" />
              <Text style={styles.optionText}>{store?.address}</Text>
            </TouchableOpacity>

            {/* Thêm vào danh sách yêu thích */}
            <TouchableOpacity style={styles.optionItem}>
              <Ionicons name="heart-outline" size={24} color="#777" />
              <Text style={styles.optionText}>
                Thêm vào danh sách yêu thích
              </Text>
            </TouchableOpacity>

            {/* Liên hệ */}
            <TouchableOpacity style={styles.optionItem} onPress={callStore}>
              <Ionicons name="call-outline" size={24} color="#777" />
              <Text style={styles.optionText}>Liên hệ</Text>
            </TouchableOpacity>

            {/* Chia sẻ với bạn bè */}
            <TouchableOpacity style={styles.optionItem} onPress={shareStore}>
              <Feather name="share" size={24} color="#777" />
              <Text style={styles.optionText}>Chia sẻ với bạn bè</Text>
            </TouchableOpacity>
          </View>

          {/* Các nút hành động */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleOrderNavigation} // Sử dụng hàm mới
            >
              <Text style={styles.actionButtonTextBold}>Đặt mang đi</Text>
              <Text style={styles.actionButtonText}>
                Tự đến lấy tại cửa hàng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonTextBold}>Đặt tại bàn</Text>
              <Text style={styles.actionButtonText}>
                Áp dụng đặt hàng QR "Đặt tại bàn"
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
