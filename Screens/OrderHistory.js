import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

export default function OrderHistory({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const limit = 5; // Số đơn hàng mỗi trang

  const fetchOrderHistory = async (page = 1) => {
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

      // Gọi API để lấy lịch sử đơn hàng với phân trang
      const API_URL = `https://060e-171-251-212-26.ngrok-free.app/api/order-history?username=${username}&page=${page}&limit=${limit}`;
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
        setOrders(data.data.orders || []); // Dữ liệu đơn hàng
        setTotalPages(data.data.totalPages || 1); // Tổng số trang
        setCurrentPage(page); // Cập nhật trang hiện tại
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
    fetchOrderHistory(1); // Lấy trang đầu tiên khi component mount
  }, [navigation]);

  // Chuyển đến trang trước
  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchOrderHistory(currentPage - 1);
    }
  };

  // Chuyển đến trang sau
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchOrderHistory(currentPage + 1);
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
        data={orders}
        renderItem={({ item }) => <MemoizedOrder order={item} />}
        keyExtractor={(item) => item.OrderId.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Bạn chưa có đơn hàng nào.</Text>
        }
        contentContainerStyle={styles.orderList}
      />

      {/* Phân trang */}
      {orders.length > 0 && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={[
              styles.paginationButton,
              currentPage === 1 && styles.paginationButtonDisabled,
            ]}
            onPress={handlePrevPage}
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
            onPress={handleNextPage}
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
