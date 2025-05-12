import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/OrderConfirmation";

// B1: Khởi tạo Animated - Tạo hiệu ứng thu phóng.
// - Mục đích: Tạo hiệu ứng cho icon.
// - Cách thực hiện: Dùng Animated.Value.
// - Lý do: Animated hỗ trợ animation mượt.
export default function OrderConfirmation({ navigation }) {
  const scaleValue = new Animated.Value(0);

  // B2: Hiệu ứng animation - Chạy khi component mount.
  // - Mục đích: Thu phóng icon thành công.
  // - Cách thực hiện: Dùng Animated.spring.
  // - Lý do: Spring cho hiệu ứng tự nhiên.
  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  // B3: Giao diện chính - Hiển thị xác nhận đặt hàng.
  // - Mục đích: Thông báo đặt hàng thành công.
  // - Cách thực hiện: Dùng SafeAreaView, Animated.View, và TouchableOpacity.
  // - Lý do: SafeAreaView tránh notch, Animated.View cho hiệu ứng, TouchableOpacity cho nút.
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Ionicons
            name="checkmark-circle"
            size={80}
            color="#4CAF50"
            style={styles.icon}
          />
        </Animated.View>
        <Text style={styles.title}>Đặt hàng thành công!</Text>
        <Text style={styles.message}>
          Đơn hàng của bạn đã được đặt thành công. Cảm ơn bạn đã mua sắm tại
          Suli Coffee!
        </Text>
        <Text style={styles.subMessage}>
          Chúng tôi sẽ gửi email xác nhận đơn hàng cho bạn.
        </Text>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() =>
            navigation.navigate("Main", {
              screen: "Home",
              params: { cartUpdated: true },
            })
          }
        >
          <Text style={styles.continueText}>Tiếp tục mua sắm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
