import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/Checkout";

export default function Checkout({ route, navigation }) {
  const { buyItem, buyItems } = route.params || {};
  const items = buyItems || (buyItem ? [buyItem] : []);

  const [userInfo, setUserInfo] = useState({
    username: "user1",
    fullName: "Liên Nguyễn",
    email: "lien@gmail.com",
    phone: "0987654321",
    address: "Hồ Chí Minh",
  });
  const [deliveryAddress, setDeliveryAddress] = useState("Hồ Chí Minh");
  const [paymentMethod, setPaymentMethod] = useState("VNPay");

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const shippingFee = 20000;
  const total = calculateSubtotal() + shippingFee;

  const handlePlaceOrder = () => {
    // Xử lý đặt hàng (gửi API hoặc lưu đơn hàng)
    console.log("Đặt hàng:", {
      items,
      userInfo,
      deliveryAddress,
      paymentMethod,
      total,
    });
    navigation.navigate("OrderConfirmation");
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>
        {item.price.toLocaleString("vi-VN")} đ
      </Text>
      <Text style={styles.itemQuantity}>x{item.quantity}</Text>
      <Text style={styles.itemTotal}>
        {(item.price * item.quantity).toLocaleString("vi-VN")} đ
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
      </View>

      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
          <TextInput
            style={styles.input}
            placeholder="Tên người dùng"
            value={userInfo.username}
            onChangeText={(text) =>
              setUserInfo({ ...userInfo, username: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Họ và tên"
            value={userInfo.fullName}
            onChangeText={(text) =>
              setUserInfo({ ...userInfo, fullName: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={userInfo.email}
            onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={userInfo.phone}
            onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Địa chỉ"
            value={userInfo.address}
            onChangeText={(text) => setUserInfo({ ...userInfo, address: text })}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
          <TextInput
            style={styles.input}
            placeholder="Địa chỉ giao hàng"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setPaymentMethod("VNPay")}
          >
            <Ionicons
              name={
                paymentMethod === "VNPay"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={20}
              color="#E57905"
            />
            <Text style={styles.paymentText}>VNPay</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setPaymentMethod("COD")}
          >
            <Ionicons
              name={
                paymentMethod === "COD" ? "radio-button-on" : "radio-button-off"
              }
              size={20}
              color="#E57905"
            />
            <Text style={styles.paymentText}>COD</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
          <FlatList
            data={items}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.orderList}
          />
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tạm tính:</Text>
              <Text style={styles.summaryValue}>
                {calculateSubtotal().toLocaleString("vi-VN")} đ
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Phí vận chuyển:</Text>
              <Text style={styles.summaryValue}>
                {shippingFee.toLocaleString("vi-VN")} đ
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Giảm giá:</Text>
              <Text style={styles.summaryValue}>0 đ</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tổng cộng:</Text>
              <Text style={styles.summaryTotal}>
                {total.toLocaleString("vi-VN")} đ
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.backToCartButton}
          onPress={() => navigation.navigate("Cart")}
        >
          <Text style={styles.backToCartText}>Quay lại giỏ hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Đặt hàng</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
