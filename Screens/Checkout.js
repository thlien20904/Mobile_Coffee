import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/Checkout";

// Component TextInput được memoized và hỗ trợ ref
const MemoizedTextInput = React.memo(
  React.forwardRef(({ value, onChangeText, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    );
  })
);

// Component con cho OrderItem
const MemoizedOrderItem = React.memo(({ item }) => {
  console.log("Rendering OrderItem:", item.name); // Debug render
  return (
    <View style={styles.orderItem}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>
        {(item.price || 0).toLocaleString("vi-VN")} đ
      </Text>
      <Text style={styles.itemQuantity}>x{item.quantity || 1}</Text>
      <Text style={styles.itemTotal}>
        {(item.price * (item.quantity || 1)).toLocaleString("vi-VN")} đ
      </Text>
    </View>
  );
});

export default function Checkout({ route, navigation }) {
  const { buyItem, buyItems } = route.params || {};
  const items = buyItems || (buyItem ? [buyItem] : []);

  const [userInfo, setUserInfo] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [tempUserInfo, setTempUserInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("VN Pay");

  // Refs để kiểm soát focus
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const deliveryAddressRef = useRef(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        let username = "";
        if (storedUserInfo) {
          const parsedUserInfo = JSON.parse(storedUserInfo);
          username = parsedUserInfo.username || "";
        }

        if (username) {
          const API_URL = `https://060e-171-251-212-26.ngrok-free.app/api/user?username=${username}`;
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
            setUserInfo({
              username: data.username || "",
              fullName: data.fullName || "",
              email: data.email || "",
              phone: data.phone || "",
              address: data.address || "",
            });
            setTempUserInfo({
              fullName: data.fullName || "",
              email: data.email || "",
              phone: data.phone || "",
              address: data.address || "",
            });
            setDeliveryAddress(data.address || "");
          } else {
            console.error("Error fetching user info from API:", data.error);
            Alert.alert("Lỗi", "Không thể lấy thông tin người dùng từ server.");
          }
        } else {
          console.error("No username found in AsyncStorage");
          Alert.alert(
            "Lỗi",
            "Không tìm thấy thông tin đăng nhập. Vui lòng đăng nhập lại."
          );
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        Alert.alert("Lỗi kết nối", `Lỗi kết nối API: ${error.message}`);
      }
    };
    fetchUserInfo();
  }, [navigation]);

  const handleUpdateUserInfo = async () => {
    try {
      const updatedUserInfo = {
        username: userInfo.username,
        fullName: tempUserInfo.fullName,
        email: tempUserInfo.email,
        phone: tempUserInfo.phone,
        address: tempUserInfo.address,
      };

      const API_URL =
        "https://060e-171-251-212-26.ngrok-free.app/api/update-user";
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserInfo),
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
        setUserInfo(updatedUserInfo);
        setTempUserInfo(updatedUserInfo); // Đồng bộ tempUserInfo với userInfo
        setDeliveryAddress(updatedUserInfo.address); // Cập nhật deliveryAddress
        await AsyncStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        Alert.alert("Thành công", "Cập nhật thông tin thành công!");
        Keyboard.dismiss(); // Ẩn bàn phím sau khi cập nhật
      } else {
        Alert.alert("Lỗi", data.error || "Cập nhật thông tin thất bại.");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      Alert.alert("Lỗi kết nối", `Lỗi kết nối API: ${error.message}`);
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const shippingFee = 20000;
  const total = calculateSubtotal() + shippingFee;

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        username: userInfo.username,
        totalAmount: total,
        paymentMethod: paymentMethod,
        items: items.map((item) => ({
          foodId: item.id,
          sizeId: item.sizeId || null,
          toppingId: item.toppingId || null,
          quantity: item.quantity || 1,
          price: item.price,
        })),
        deliveryAddress: deliveryAddress,
      };

      const API_URL =
        "https://060e-171-251-212-26.ngrok-free.app/api/place-order";
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Response is not JSON:", text);
        Alert.alert("Lỗi", "Phản hồi từ server không hợp lệ.");
        return;
      }

      const data = await response.json();

      if (response.status === 201) {
        Alert.alert("Thành công", "Đặt hàng thành công!");
        navigation.navigate("OrderConfirmation");
      } else {
        Alert.alert("Lỗi", data.error || "Đặt hàng thất bại.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert("Lỗi kết nối", `Lỗi kết nối API: ${error.message}`);
    }
  };

  const RenderHeader = React.memo(() => (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            Keyboard.dismiss(); // Ẩn bàn phím khi nhấn nút Back
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
        <View style={styles.inputContainer}>
          <MemoizedTextInput
            style={styles.input}
            placeholder="Tên người dùng"
            placeholderTextColor="#777"
            value={userInfo.username}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <MemoizedTextInput
            ref={fullNameRef}
            style={styles.input}
            placeholder="Họ và tên"
            placeholderTextColor="#777"
            value={tempUserInfo.fullName}
            onChangeText={(text) =>
              setTempUserInfo((prev) => ({ ...prev, fullName: text }))
            }
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            blurOnSubmit={false}
            autoFocus={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <MemoizedTextInput
            ref={emailRef}
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#777"
            value={tempUserInfo.email}
            onChangeText={(text) =>
              setTempUserInfo((prev) => ({ ...prev, email: text }))
            }
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => phoneRef.current?.focus()}
            blurOnSubmit={false}
            autoFocus={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <MemoizedTextInput
            ref={phoneRef}
            style={styles.input}
            placeholder="Số điện thoại"
            placeholderTextColor="#777"
            value={tempUserInfo.phone}
            onChangeText={(text) =>
              setTempUserInfo((prev) => ({ ...prev, phone: text }))
            }
            keyboardType="phone-pad"
            returnKeyType="next"
            onSubmitEditing={() => addressRef.current?.focus()}
            blurOnSubmit={false}
            autoFocus={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <MemoizedTextInput
            ref={addressRef}
            style={styles.input}
            placeholder="Địa chỉ"
            placeholderTextColor="#777"
            value={tempUserInfo.address}
            onChangeText={(text) =>
              setTempUserInfo((prev) => ({ ...prev, address: text }))
            }
            returnKeyType="next"
            onSubmitEditing={() => deliveryAddressRef.current?.focus()}
            blurOnSubmit={false}
            autoFocus={false}
          />
        </View>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateUserInfo}
        >
          <Text style={styles.updateButtonText}>Cập nhật</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
        <View style={styles.inputContainer}>
          <MemoizedTextInput
            ref={deliveryAddressRef}
            style={styles.input}
            placeholder="Địa chỉ giao hàng"
            placeholderTextColor="#777"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()} // Ẩn bàn phím khi nhấn Done
            blurOnSubmit={true}
            autoFocus={false}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => {
            Keyboard.dismiss(); // Ẩn bàn phím khi chọn phương thức thanh toán
            setPaymentMethod("VN Pay");
          }}
        >
          <Ionicons
            name={
              paymentMethod === "VN Pay"
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={20}
            color="#E57905"
          />
          <Text style={styles.paymentText}>VN Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => {
            Keyboard.dismiss(); // Ẩn bàn phím khi chọn phương thức thanh toán
            setPaymentMethod("COD");
          }}
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
      </View>
    </>
  ));

  const RenderFooter = React.memo(() => (
    <>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backToCartButton}
          onPress={() => {
            Keyboard.dismiss(); // Ẩn bàn phím khi nhấn nút Quay lại giỏ hàng
            navigation.navigate("Cart");
          }}
        >
          <Text style={styles.backToCartText}>Quay lại giỏ hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={() => {
            Keyboard.dismiss(); // Ẩn bàn phím khi nhấn nút Đặt hàng
            handlePlaceOrder();
          }}
        >
          <Text style={styles.placeOrderText}>Đặt hàng</Text>
        </TouchableOpacity>
      </View>
    </>
  ));

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.orderList}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <RenderHeader />
          {items.length > 0 ? (
            items.map((item) => (
              <MemoizedOrderItem key={item.id.toString()} item={item} />
            ))
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20, color: "#777" }}>
              Không có sản phẩm nào trong đơn hàng.
            </Text>
          )}
          <RenderFooter />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
