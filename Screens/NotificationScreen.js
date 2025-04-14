import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/NotificationStyle";

// Ảnh mặc định (lấy từ máy)
const defaultImage = require("../assets/a4.png");

// Dữ liệu giả lập cho thông báo
const notifications = [
  {
    id: "1",
    title: "Chào bạn mới",
    message: "Lần đầu đến với Nhà, Nhà mong bạn có thật nhiều niềm vui nhé!",
    time: "24/12",
    image: defaultImage,
  },
  // Có thể thêm các thông báo khác nếu cần
];

export default function NotificationScreen({ navigation }) {
  // Component mục thông báo (tối ưu với React.memo)
  const NotificationItem = React.memo(({ item }) => (
    <View style={styles.notificationCard}>
      <View style={styles.notificationRow}>
        <View style={styles.imageContainer}>
          <Image
            source={item.image}
            style={styles.notificationImage}
            resizeMode="cover"
            defaultSource={defaultImage}
          />
        </View>
        <View style={styles.notificationInfo}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
        </View>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </View>
  ));

  const renderNotificationItem = ({ item }) => <NotificationItem item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      {/* Header với tiêu đề "Thông báo" và các biểu tượng */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thông báo</Text>
        <TouchableOpacity>
          <Ionicons name="checkmark-done" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Danh sách thông báo */}
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationSection}
        initialNumToRender={10}
        windowSize={5}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
      />
    </SafeAreaView>
  );
}
