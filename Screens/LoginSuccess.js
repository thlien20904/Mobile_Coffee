import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/LoginSuccess";

export default function LoginSuccess({ route, navigation }) {
  const { redirectTo = "Main", redirectParams = {} } = route.params || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(redirectTo, redirectParams);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation, redirectTo, redirectParams]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
        <Text style={styles.title}>Đăng nhập thành công!</Text>
        <Text style={styles.message}>
          Chào mừng bạn đã quay lại. Bạn sẽ được chuyển hướng trong giây lát...
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(redirectTo, redirectParams)}
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
