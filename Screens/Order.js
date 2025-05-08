import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NGROK_BASE_URL } from "@env";
import styles from "../styles/OrderStyle";

// Ảnh mặc định (fallback) nếu không tải được ảnh từ URL
const defaultImage = require("../assets/banner.png");

export default function Order({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const productsPerLoad = 5;

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem("isLoggedIn");
        setIsLoggedIn(loggedIn === "true");
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLoginStatus();
  }, []);

  // Gọi API để lấy danh sách danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      const API_URL = `${NGROK_BASE_URL}/api/categories`;

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

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Phản hồi từ server không phải JSON");
        }

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error || "Lỗi khi lấy danh mục.");
          setCategories([]);
          return;
        }

        const data = await response.json();
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategory(data[0].id);
        }
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        setErrorMessage("Lỗi khi lấy danh mục: " + error.message);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // Gọi API để lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      const API_URL = `${NGROK_BASE_URL}/api/products`;

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

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Phản hồi từ server không phải JSON");
        }

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error || "Lỗi khi lấy sản phẩm.");
          setProducts([]);
          return;
        }

        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setDisplayedProducts(data.slice(0, productsPerLoad));
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setErrorMessage("Lỗi khi lấy sản phẩm: " + error.message);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // Lọc sản phẩm theo danh mục và tìm kiếm
  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.categoryId === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setDisplayedProducts(filtered.slice(0, productsPerLoad));
  }, [selectedCategory, products, searchQuery]);

  // Load thêm sản phẩm khi kéo đến cuối
  const loadMoreProducts = () => {
    if (isLoading) return;

    const currentLength = displayedProducts.length;
    if (currentLength >= filteredProducts.length) return;

    setIsLoading(true);
    setTimeout(() => {
      const nextProducts = filteredProducts.slice(
        0,
        currentLength + productsPerLoad
      );
      setDisplayedProducts(nextProducts);
      setIsLoading(false);
    }, 500);
  };

  // Hàm điều hướng đến ProductDetail
  const handleProductDetail = (productId) => {
    navigation.navigate("ProductDetail", { productId });
  };

  // Hàm thêm vào giỏ hàng
  const handleAddToCart = (product) => {
    if (!product) return;

    if (isLoggedIn) {
      const cartItem = {
        id: product.id,
        name: product.name,
        price:
          product.discountPrice && product.discountPrice > 0
            ? product.discountPrice
            : product.price,
        quantity: 1,
        image: product.image,
      };
      navigation.navigate("Cart", { newItem: cartItem });
    } else {
      navigation.navigate("Login", {
        redirectTo: "Cart",
        redirectParams: {
          newItem: {
            id: product.id,
            name: product.name,
            price:
              product.discountPrice && product.discountPrice > 0
                ? product.discountPrice
                : product.price,
            quantity: 1,
            image: product.image,
          },
        },
      });
    }
  };

  // Tìm tên danh mục được chọn
  const selectedCategoryName = categories.find(
    (category) => category.id === selectedCategory
  )?.name;

  // Component con cho mỗi sản phẩm
  const ProductItem = React.memo(({ product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductDetail(product.id)}
    >
      <View style={styles.productRow}>
        <View style={styles.imageContainer}>
          {product.isNew === 1 && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          )}
          <Image
            source={{ uri: product.image, cache: "reload" }}
            style={styles.productImage}
            resizeMode="cover"
            defaultSource={defaultImage}
          />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>
            {(product.discountPrice && product.discountPrice > 0
              ? product.discountPrice
              : product.price
            ).toLocaleString("vi-VN")}{" "}
            đ
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToCart(product)}
        >
          <Ionicons name="add" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ));

  // Header của FlatList
  const renderHeader = () => (
    <>
      {errorMessage ? (
        <View style={{ padding: 10, backgroundColor: "#ffcccc", margin: 10 }}>
          <Text style={{ color: "red", textAlign: "center" }}>
            {errorMessage}
          </Text>
        </View>
      ) : null}

      <View style={styles.header}>
        <Text style={styles.headerText}>Danh mục</Text>
      </View>

      <View style={styles.filterContainer}>
        <View style={[styles.searchContainer, { flexShrink: 1 }]}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm..."
            placeholderTextColor="#777"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <Ionicons
            name="search"
            size={20}
            color="#E57905"
            style={styles.searchIcon}
          />
        </View>
        <View style={{ flex: 2 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  selectedCategory === item.id && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(item.id)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === item.id && styles.selectedCategoryText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.categoryList}
          />
        </View>
        <TouchableOpacity style={styles.heartIconContainer}>
          <Ionicons name="heart-outline" size={24} color="#777" />
        </TouchableOpacity>
      </View>

      {selectedCategoryName && (
        <Text style={styles.categoryTitle}>{selectedCategoryName}</Text>
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={displayedProducts}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: "#777" }}>
            Không tìm thấy sản phẩm nào.
          </Text>
        }
        contentContainerStyle={styles.productSection}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator
              size="small"
              color="#E57905"
              style={{ marginVertical: 20 }}
            />
          ) : null
        }
      />
    </SafeAreaView>
  );
}
