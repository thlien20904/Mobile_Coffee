import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NGROK_BASE_URL } from "@env";
import styles from "../styles/Cart";

const defaultImage = require("../assets/banner.png");

export default function Cart({ route, navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState(null);

  // Lấy username từ AsyncStorage và kiểm tra đăng nhập
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await AsyncStorage.getItem("userInfo");
        if (user) {
          const parsedUser = JSON.parse(user);
          setUsername(parsedUser.username);
        } else {
          console.error("No user info found in AsyncStorage");
          Alert.alert(
            "Lỗi",
            "Không tìm thấy thông tin đăng nhập. Vui lòng đăng nhập lại."
          );
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error getting user info:", error);
        Alert.alert("Lỗi", "Đã xảy ra lỗi khi kiểm tra thông tin người dùng.");
        navigation.navigate("Login");
      }
    };
    getUserInfo();
  }, [navigation]);

  // Lấy giỏ hàng từ API khi username đã có
  useEffect(() => {
    const fetchCart = async () => {
      if (!username) return;

      try {
        const response = await fetch(
          `${NGROK_BASE_URL}/api/cart?username=${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setCartItems(data);
        } else {
          Alert.alert("Lỗi", data.error || "Không thể lấy giỏ hàng.");
        }
      } catch (error) {
        Alert.alert("Lỗi", "Đã xảy ra lỗi khi lấy giỏ hàng: " + error.message);
      }
    };

    fetchCart();
  }, [username]);

  // Thêm sản phẩm mới vào giỏ hàng
  useEffect(() => {
    const addToCart = async () => {
      if (!route.params?.newItem || !username) return;

      const newItem = route.params.newItem;
      const price =
        newItem.discountPrice && newItem.discountPrice > 0
          ? newItem.discountPrice
          : newItem.price;

      try {
        const response = await fetch(`${NGROK_BASE_URL}/api/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            foodId: newItem.id,
            quantity: newItem.quantity,
            price,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Thêm sản phẩm vào giỏ hàng thành công!");
          const fetchResponse = await fetch(
            `${NGROK_BASE_URL}/api/cart?username=${username}`
          );
          const fetchData = await fetchResponse.json();
          if (fetchResponse.ok) {
            setCartItems(fetchData);
          }
        } else {
          Alert.alert(
            "Lỗi",
            data.error || "Không thể thêm sản phẩm vào giỏ hàng."
          );
        }
      } catch (error) {
        Alert.alert("Lỗi", "Đã xảy ra lỗi khi thêm sản phẩm: " + error.message);
      }
    };

    addToCart();
  }, [route.params?.newItem, username]);

  const increaseQuantity = async (gioHangId, price) => {
    const item = cartItems.find((item) => item.gioHangId === gioHangId);
    const newQuantity = item.quantity + 1;

    try {
      const response = await fetch(`${NGROK_BASE_URL}/api/cart/${gioHangId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: newQuantity,
          price,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.gioHangId === gioHangId
              ? {
                  ...item,
                  quantity: newQuantity,
                  totalPrice: price * newQuantity,
                }
              : item
          )
        );
      } else {
        Alert.alert("Lỗi", data.error || "Không thể cập nhật số lượng.");
      }
    } catch (error) {
      Alert.alert(
        "Lỗi",
        "Đã xảy ra lỗi khi cập nhật số lượng: " + error.message
      );
    }
  };

  const decreaseQuantity = async (gioHangId, price) => {
    const item = cartItems.find((item) => item.gioHangId === gioHangId);
    if (item.quantity <= 1) return;

    const newQuantity = item.quantity - 1;

    try {
      const response = await fetch(`${NGROK_BASE_URL}/api/cart/${gioHangId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity: newQuantity,
          price,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.gioHangId === gioHangId
              ? {
                  ...item,
                  quantity: newQuantity,
                  totalPrice: price * newQuantity,
                }
              : item
          )
        );
      } else {
        Alert.alert("Lỗi", data.error || "Không thể cập nhật số lượng.");
      }
    } catch (error) {
      Alert.alert(
        "Lỗi",
        "Đã xảy ra lỗi khi cập nhật số lượng: " + error.message
      );
    }
  };

  const removeItem = async (gioHangId) => {
    try {
      const response = await fetch(`${NGROK_BASE_URL}/api/cart/${gioHangId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.gioHangId !== gioHangId)
        );
      } else {
        Alert.alert("Lỗi", data.error || "Không thể xóa sản phẩm.");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa sản phẩm: " + error.message);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.totalPrice || item.price * item.quantity),
      0
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigation.navigate("Checkout", { buyItems: cartItems });
  };

  const CartItem = React.memo(({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.image, cache: "reload" }}
        style={styles.itemImage}
        resizeMode="cover"
        defaultSource={defaultImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          {item.price.toLocaleString("vi-VN")} đ
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseQuantity(item.gioHangId, item.price)}
            disabled={item.quantity === 1}
          >
            <Ionicons
              name="remove"
              size={20}
              color={item.quantity === 1 ? "#777" : "#E57905"}
            />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => increaseQuantity(item.gioHangId, item.price)}
          >
            <Ionicons name="add" size={20} color="#E57905" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItem(item.gioHangId)}
      >
        <Ionicons name="trash-outline" size={24} color="#FF0000" />
      </TouchableOpacity>
    </View>
  ));

  const renderCartItem = ({ item }) => <CartItem item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Main")}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ hàng của bạn</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống!</Text>
          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={() => navigation.navigate("Main")}
          >
            <Text style={styles.continueShoppingText}>Tiếp tục mua sắm</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.gioHangId.toString()}
            contentContainerStyle={styles.cartList}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
          />
          <View style={styles.footer}>
            <Text style={styles.totalText}>
              Tổng tiền: {calculateTotal().toLocaleString("vi-VN")} đ
            </Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutText}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}