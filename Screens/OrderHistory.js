import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NGROK_BASE_URL } from "@env";
import styles from "../styles/OrderHistory";

// Component con cho OrderItem
const MemoizedOrderItem = React.memo(({ item }) => {
  console.log("Rendering OrderItem in History:", item.FoodName); // Debug render
  return (
    <View style={styles.orderDetailItem}>
      <Text style={styles.itemName}>{item.FoodName}</Text>
      {item.SizeName && (
        <Text style={styles.itemDetail}>Kích thước: {item.SizeName}</Text>
      )}
      {item.ToppingName && (
        <Text style={styles.itemDetail}>Topping: {item.ToppingName}</Text>
      )}
      <Text style={styles.itemPrice}>
        {(item.Price || 0).toLocaleString("vi-VN")} đ
      </Text>
      <Text style={styles.itemQuantity}>x{item.Quantity || 1}</Text>
      <Text style={styles.itemTotal}>
        {(item.Price * (item.Quantity || 1)).toLocaleString("vi-VN")} đ
      </Text>
    </View>
  );
});

// Component con cho mỗi đơn hàng
const MemoizedOrder = React.memo(({ order }) => {
  return (
    <View style={styles.orderContainer}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Mã đơn hàng: {order.OrderId}</Text>
        <Text style={styles.orderDate}>
          Ngày đặt: {new Date(order.OrderDate).toLocaleDateString("vi-VN")}
        </Text>
        <Text style={styles.orderStatus}>Trạng thái: {order.StatusName}</Text>
        <Text style={styles.paymentMethod}>
          Phương thức thanh toán: {order.PaymentMethod}
        </Text>
      </View>
      <FlatList
        data={order.items}
        renderItem={({ item }) => <MemoizedOrderItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />
      <View style={styles.orderFooter}>
        <Text style={styles.totalLabel}>Tổng cộng:</Text>
        <Text style={styles.totalAmount}>
          {(order.TotalAmount || 0).toLocaleString("vi-VN")} đ
        </Text>
      </View>
    </View>
  );
});

export default function OrderHistory({ navigation, route }) {
  const [allOrders, setAllOrders] = useState([]); // Lưu toàn bộ đơn hàng
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const ordersPerPage = 2; // Số đơn hàng tối đa mỗi trang

  // Lấy toàn bộ đơn hàng từ API
  const fetchOrderHistory = async () => {
    try {
      // Lấy username từ AsyncStorage
      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      let username = "";
      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        username = parsedUserInfo.username || "";
      }

      if (!username) {
        console.error("No username found in AsyncStorage");
        Alert.alert(
          "Lỗi",
          "Không tìm thấy thông tin đăng nhập. Vui lòng đăng nhập lại."
        );
        navigation.navigate("Login");
        return;
      }

      // Gọi API để lấy tất cả lịch sử đơn hàng
      const API_URL = `${NGROK_BASE_URL}/api/order-history?username=${username}`;
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Response is not JSON:", text);
        Alert.alert("Lỗi", "Phản hồi từ server không hợp lệ.");
        return;
      }

      const data = await response.json();
      if (response.status === 200) {
        setAllOrders(data.data.orders || []); // Lưu toàn bộ đơn hàng
      } else {
        console.error("Error fetching order history from API:", data.error);
        Alert.alert("Lỗi", "Không thể lấy lịch sử đơn hàng từ server.");
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
      Alert.alert("Lỗi kết nối", `Lỗi kết nối API: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchOrderHistory(); // Lấy tất cả đơn hàng khi component mount
  }, [navigation]);

  // Tính toán đơn hàng hiển thị theo trang
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = allOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(allOrders.length / ordersPerPage);

  // Hàm chuyển trang
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử đơn hàng</Text>
      </View>

      <FlatList
        data={currentOrders}
        renderItem={({ item }) => <MemoizedOrder order={item} />}
        keyExtractor={(item) => item.OrderId.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Bạn chưa có đơn hàng nào.</Text>
        }
        contentContainerStyle={styles.orderList}
      />

      {/* Phân trang */}
      {allOrders.length > 0 && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={[
              styles.paginationButton,
              currentPage === 1 && styles.paginationButtonDisabled,
            ]}
            onPress={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={currentPage === 1 ? "#95A5A6" : "#2C3E50"}
            />
            <Text style={styles.paginationText}>Trang trước</Text>
          </TouchableOpacity>

          <Text style={styles.pageInfo}>
            Trang {currentPage} / {totalPages}
          </Text>

          <TouchableOpacity
            style={[
              styles.paginationButton,
              currentPage === totalPages && styles.paginationButtonDisabled,
            ]}
            onPress={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <Text style={styles.paginationText}>Trang sau</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={currentPage === totalPages ? "#95A5A6" : "#2C3E50"}
            />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
