import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "../styles/OrderConfirmation";

export default function OrderConfirmation({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Đặt hàng thành công!</Text>
        <Text style={styles.message}>
          Đơn hàng của bạn đã được đặt thành công.
        </Text>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.continueText}>Tiếp tục mua sắm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
