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

// B1: Ảnh mặc định - Tải ảnh từ assets để dùng khi cần.
const defaultImage = require("../assets/a4.png");

// B2: Dữ liệu thông báo - Danh sách giả lập để hiển thị.
const notifications = [
  {
    id: "1",
    title: "Chào bạn mới",
    message: "Lần đầu đến với Nhà, Nhà mong bạn có thật nhiều niềm vui nhé!",
    time: "24/12",
    image: defaultImage,
  },
  // Thêm thông báo khác nếu cần
];

export default function NotificationScreen({ navigation }) {
  // B3: Component thông báo - Hiển thị từng mục, tối ưu bằng React.memo.
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

  // B4: Render thông báo - Truyền item vào NotificationItem.
  const renderNotificationItem = ({ item }) => <NotificationItem item={item} />;

  // B5: Giao diện chính - Hiển thị header và danh sách thông báo.
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Thông báo</Text>
        <TouchableOpacity>
          <Ionicons name="checkmark-done" size={24} color="#000" />
        </TouchableOpacity>
      </View>
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
