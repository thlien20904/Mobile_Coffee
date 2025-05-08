import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NGROK_BASE_URL } from "@env";
import styles from "../styles/OrderHistory";

// Component con cho OrderItem
const MemoizedOrderItem = React.memo(({ item }) => {
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
const MemoizedOrder = React.memo(({ order, onCancel }) => {
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
        {order.StatusId === 1 && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => onCancel(order.OrderId)}
          >
            <Text style={styles.cancelButtonText}>Hủy đơn</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

export default function OrderHistory({ navigation, route }) {
  const [allOrders, setAllOrders] = useState([]); // Tất cả đơn hàng từ server
  const [displayedOrders, setDisplayedOrders] = useState([]); // Đơn hàng hiển thị
  const [selectedTab, setSelectedTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
  const ordersPerLoad = 2; // Số đơn hàng load mỗi lần

  const fetchOrderHistory = async () => {
    try {
      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      let username = "";
      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        username = parsedUserInfo.username || "";
      }

      if (!username) {
        Alert.alert("Lỗi", "Vui lòng đăng nhập lại.");
        navigation.navigate("Login");
        return;
      }

      const API_URL = `${NGROK_BASE_URL}/api/order-history?username=${username}`;
      const response = await fetch(API_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (response.status === 200) {
        const orders = data.data.orders || [];
        setAllOrders(orders);
        // Hiển thị ban đầu: chỉ lấy ordersPerLoad đơn hàng đầu tiên
        const filtered = orders.filter(
          (order) => order.StatusId === selectedTab
        );
        setDisplayedOrders(filtered.slice(0, ordersPerLoad));
      } else {
        Alert.alert("Lỗi", "Không thể lấy lịch sử đơn hàng từ server.");
      }
    } catch (error) {
      Alert.alert("Lỗi kết nối", `Lỗi kết nối API: ${error.message}`);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const API_URL = `${NGROK_BASE_URL}/api/cancel-order`;
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await response.json();
      if (response.status === 200) {
        Alert.alert("Thành công", "Đơn hàng đã được hủy.");
        fetchOrderHistory();
      } else {
        Alert.alert("Lỗi", data.error || "Không thể hủy đơn hàng.");
      }
    } catch (error) {
      Alert.alert("Lỗi kết nối", `Lỗi kết nối API: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, [navigation]);

  // Cập nhật hiển thị khi chuyển tab
  useEffect(() => {
    const filtered = allOrders.filter(
      (order) => order.StatusId === selectedTab
    );
    setDisplayedOrders(filtered.slice(0, ordersPerLoad));
  }, [selectedTab, allOrders]);

  // Load thêm đơn hàng khi kéo đến cuối
  const loadMoreOrders = () => {
    if (isLoading) return; // Tránh load trùng

    const filteredOrders = allOrders.filter(
      (order) => order.StatusId === selectedTab
    );
    const currentLength = displayedOrders.length;

    // Kiểm tra nếu đã hiển thị hết đơn hàng
    if (currentLength >= filteredOrders.length) return;

    setIsLoading(true);
    // Giả lập delay để thấy hiệu ứng loading (có thể bỏ nếu không cần)
    setTimeout(() => {
      const nextOrders = filteredOrders.slice(0, currentLength + ordersPerLoad);
      setDisplayedOrders(nextOrders);
      setIsLoading(false);
    }, 500); // Giảm delay xuống 500ms cho trải nghiệm mượt hơn
  };

  const tabs = [
    { id: 1, name: "Chờ xác nhận" },
    { id: 2, name: "Chờ giao hàng" },
    { id: 3, name: "Đã giao" },
    { id: 5, name: "Đã hủy" },
  ];

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

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              selectedTab === tab.id && styles.tabButtonActive,
            ]}
            onPress={() => {
              setSelectedTab(tab.id);
            }}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab.id && styles.tabTextActive,
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={displayedOrders}
        renderItem={({ item }) => (
          <MemoizedOrder order={item} onCancel={cancelOrder} />
        )}
        keyExtractor={(item) => item.OrderId.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không có đơn hàng nào.</Text>
        }
        contentContainerStyle={styles.orderList}
        onEndReached={loadMoreOrders} // Load thêm khi kéo đến cuối
        onEndReachedThreshold={0.5} // Load khi còn 50% chiều dài danh sách
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator
              size="small"
              color="#27AE60"
              style={{ marginVertical: 10 }}
            />
          ) : null
        }
      />
    </SafeAreaView>
  );
}
