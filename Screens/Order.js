import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/OrderStyle";

// Ảnh mặc định (fallback) nếu không tải được ảnh từ URL
const defaultImage = require("../assets/banner.png");

export default function Order({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Gọi API để lấy danh sách danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      const API_URL =
        "https://9883-171-251-212-26.ngrok-free.app/api/categories";

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
          const text = await response.text();
          console.log("Phản hồi từ server không phải JSON:", text);
          throw new Error("Phản hồi từ server không phải JSON");
        }

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error || "Lỗi khi lấy danh sách danh mục.");
          setCategories([]);
          return;
        }

        const data = await response.json();
        console.log("Categories from API:", data);
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategory(data[0].id); // Chọn danh mục đầu tiên mặc định
        }
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        setErrorMessage("Lỗi khi lấy danh sách danh mục: " + error.message);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // Gọi API để lấy danh sách sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      const API_URL = "https://9883-171-251-212-26.ngrok-free.app/api/products";

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
          const text = await response.text();
          console.log("Phản hồi từ server không phải JSON:", text);
          throw new Error("Phản hồi từ server không phải JSON");
        }

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error || "Lỗi khi lấy danh sách sản phẩm.");
          setProducts([]);
          return;
        }

        const data = await response.json();
        console.log("Products from API:", data);
        setProducts(data);
        setFilteredProducts(data);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setErrorMessage("Lỗi khi lấy danh sách sản phẩm: " + error.message);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // Lọc sản phẩm theo danh mục
  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(
        (product) => product.categoryId === selectedCategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  // Render danh mục
  const renderCategoryItem = ({ item }) => (
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
  );

  // Render sản phẩm
  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <View style={styles.productRow}>
        <View style={styles.imageContainer}>
          {item.isNew === 1 && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          )}
          <Image
            source={{ uri: item.image, cache: "reload" }}
            style={styles.productImage}
            resizeMode="cover"
            defaultSource={defaultImage}
            onLoad={() =>
              console.log("Image loaded successfully for", item.name)
            }
            onError={(e) =>
              console.log(
                "Image load error for",
                item.name,
                ":",
                e.nativeEvent.error
              )
            }
          />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>
            {(item.discountPrice && item.discountPrice > 0
              ? item.discountPrice
              : item.price
            ).toLocaleString("vi-VN")}{" "}
            đ
          </Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Tìm tên danh mục được chọn
  const selectedCategoryName = categories.find(
    (category) => category.id === selectedCategory
  )?.name;

  // Header của FlatList
  const renderHeader = () => (
    <>
      {/* Header với "Danh mục" và các icon */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Danh mục</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons
              name="search"
              size={24}
              color="#777"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="heart-outline"
              size={24}
              color="#777"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Thanh danh mục */}
      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      {/* Tiêu đề danh mục */}
      {selectedCategoryName && (
        <Text style={styles.categoryTitle}>{selectedCategoryName}</Text>
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {errorMessage ? (
        <View style={{ padding: 10, backgroundColor: "#ffcccc", margin: 10 }}>
          <Text style={{ color: "red", textAlign: "center" }}>
            {errorMessage}
          </Text>
        </View>
      ) : null}

      {/* Danh sách sản phẩm */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.productSection}
        initialNumToRender={10}
        windowSize={5}
      />
    </SafeAreaView>
  );
}
