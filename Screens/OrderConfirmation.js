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

export default function OrderConfirmation({ navigation }) {
  const scaleValue = new Animated.Value(0); // Giá trị ban đầu của scale

  useEffect(() => {
    // Tạo animation phóng to
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

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
          onPress={() => navigation.navigate("Main", { screen: "Order" })}
        >
          <Text style={styles.continueText}>Tiếp tục mua sắm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
