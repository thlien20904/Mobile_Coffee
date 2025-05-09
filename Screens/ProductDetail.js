import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NGROK_BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/ProductDetail";

// Ảnh mặc định (fallback) nếu không tải được ảnh từ URL
const defaultImage = require("../assets/banner.png");

export default function ProductDetail({ route, navigation }) {
  const { productId } = route.params || {};
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Base URL của server chứa ảnh (không có dấu / ở cuối)
  const BASE_IMAGE_URL = NGROK_BASE_URL;

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem("isLoggedIn");
        setIsLoggedIn(loggedIn === "true");
      } catch (error) {
        console.error("Error checking login status:", error.message);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  // Gọi API để lấy chi tiết sản phẩm
  useEffect(() => {
    const fetchProductDetail = async () => {
      const API_URL = `${BASE_IMAGE_URL}/api/products/${productId}`;

      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error || "Lỗi khi lấy thông tin sản phẩm.");
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log("Product from API:", data);

        // Xử lý đường dẫn ảnh
        if (data.image && !data.image.startsWith("http")) {
          const cleanImagePath = data.image.replace(/^\/+|\/+$/g, "");
          if (!cleanImagePath.startsWith("images/")) {
            data.image = `${BASE_IMAGE_URL}/images/${cleanImagePath}`;
          } else {
            data.image = `${BASE_IMAGE_URL}/${cleanImagePath}`;
          }
        }
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product detail:", error.message);
        setErrorMessage("Lỗi khi lấy thông tin sản phẩm: " + error.message);
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Hàm xử lý thêm vào giỏ hàng
  const handleAddToCart = async () => {
    if (!product) return;

    const cartItem = {
      id: product.id,
      name: product.name,
      price:
        product.discountPrice && product.discountPrice > 0
          ? product.discountPrice
          : product.price,
      quantity: quantity,
      image: product.image,
    };

    if (isLoggedIn) {
      console.log(`Thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng`);
      navigation.navigate("CartTab", {
        screen: "CartScreen",
        params: { newItem: cartItem },
      });
    } else {
      // Điều hướng đến Login và truyền thông tin màn hình đích
      navigation.navigate("Login", {
        redirectTo: "CartTab",
        redirectParams: {
          screen: "CartScreen",
          params: { newItem: cartItem },
        },
      });
    }
  };

  // Hàm xử lý mua ngay
  const handleBuyNow = async () => {
    if (!product) return;

    const buyItem = {
      id: product.id,
      name: product.name,
      price:
        product.discountPrice && product.discountPrice > 0
          ? product.discountPrice
          : product.price,
      quantity: quantity,
      image: product.image,
    };

    if (isLoggedIn) {
      console.log(`Mua ngay ${quantity} sản phẩm "${product.name}"`);
      navigation.navigate("CartTab", {
        screen: "Checkout",
        params: { buyItem },
      });
    } else {
      // Điều hướng đến Login và truyền thông tin màn hình đích
      navigation.navigate("Login", {
        redirectTo: "CartTab",
        redirectParams: {
          screen: "Checkout",
          params: { buyItem },
        },
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E57905" />
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>

        <Image
          source={{ uri: product.image, cache: "reload" }}
          style={styles.productImage}
          resizeMode="cover"
          defaultSource={defaultImage}
          onLoad={() =>
            console.log("Image loaded successfully for", product.name)
          }
          onError={(e) =>
            console.log(
              "Image load error for",
              product.name,
              ":",
              e.nativeEvent.error
            )
          }
        />

        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>
            {(product.discountPrice && product.discountPrice > 0
              ? product.discountPrice
              : product.price
            ).toLocaleString("vi-VN")}{" "}
            đ
          </Text>
          <Text style={styles.productDescription}>
            {product.description || "Không có mô tả."}
          </Text>
        </View>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Số lượng:</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={decreaseQuantity}
              disabled={quantity === 1}
            >
              <Ionicons
                name="remove"
                size={20}
                color={quantity === 1 ? "#777" : "#E57905"}
              />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={increaseQuantity}
            >
              <Ionicons name="add" size={20} color="#E57905" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
            <Text style={styles.buyNowText}>Mua ngay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
