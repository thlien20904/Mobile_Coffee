import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  // Gọi API để lấy danh sách danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      const API_URL =
        "https://060e-171-251-212-26.ngrok-free.app/api/categories";

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
          setErrorMessage(errorData.error || "Lỗi khi lấy danh mục.");
          setCategories([]);
          return;
        }

        const data = await response.json();
        console.log("Categories from API:", data);
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
      const API_URL = "https://060e-171-251-212-26.ngrok-free.app/api/products";

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
          setErrorMessage(errorData.error || "Lỗi khi lấy sản phẩm.");
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
    setCurrentPage(1);
  }, [selectedCategory, products, searchQuery]);

  // Tính toán sản phẩm hiển thị theo trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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

  // Hàm điều hướng đến ProductDetail
  const handleProductDetail = (productId) => {
    navigation.navigate("ProductDetail", { productId });
  };

  // Tìm tên danh mục được chọn
  const selectedCategoryName = categories.find(
    (category) => category.id === selectedCategory
  )?.name;

  return (
    <SafeAreaView style={styles.container}>
      {errorMessage ? (
        <View style={{ padding: 10, backgroundColor: "#ffcccc", margin: 10 }}>
          <Text style={{ color: "red", textAlign: "center" }}>
            {errorMessage}
          </Text>
        </View>
      ) : null}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header với "Danh mục" */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Danh mục</Text>
        </View>

        {/* Thanh tìm kiếm, danh mục, và icon tim trên cùng một hàng */}
        <View style={styles.filterContainer}>
          <View style={styles.searchContainer}>
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
            contentContainerStyle={styles.categoryList}
          >
            {categories.map((item) => (
              <TouchableOpacity
                key={item.id.toString()}
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
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.heartIconContainer}>
            <Ionicons name="heart-outline" size={24} color="#777" />
          </TouchableOpacity>
        </View>

        {/* Tiêu đề danh mục */}
        {selectedCategoryName && (
          <Text style={styles.categoryTitle}>{selectedCategoryName}</Text>
        )}

        {/* Phần hiển thị sản phẩm */}
        <View style={styles.productSection}>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <TouchableOpacity
                key={product.id.toString()}
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
                      onLoad={() =>
                        console.log(
                          "Image loaded successfully for",
                          product.name
                        )
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
                    onPress={() => handleProductDetail(product.id)}
                  >
                    <Ionicons name="add" size={20} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20, color: "#777" }}>
              Không tìm thấy sản phẩm nào.
            </Text>
          )}
        </View>

        {/* Phân trang */}
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={[
              styles.pageButton,
              currentPage === 1 && styles.disabledButton,
            ]}
            onPress={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <Text style={styles.pageButtonText}>Trước</Text>
          </TouchableOpacity>
          <Text style={styles.pageInfo}>
            Trang {currentPage} / {totalPages}
          </Text>
          <TouchableOpacity
            style={[
              styles.pageButton,
              currentPage === totalPages && styles.disabledButton,
            ]}
            onPress={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <Text style={styles.pageButtonText}>Tiếp</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
