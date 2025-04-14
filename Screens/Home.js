import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  Entypo,
  AntDesign,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NGROK_BASE_URL } from "@env";
import styles from "../styles/Home";

// Dữ liệu ảnh banner từ thư mục assets
const bannerImages = [
  require("../assets/banner1.png"),
  require("../assets/banner2.png"),
  require("../assets/banner3.png"),
  require("../assets/banner4.png"),
  require("../assets/banner5.png"),
];

// Dữ liệu ảnh cho các ưu đãi đặc biệt
const offerImages = [
  require("../assets/coffee_lover2.png"),
  require("../assets/coffee_lover3.png"),
  require("../assets/coffee_lover4.png"),
  require("../assets/f1.png"),
  require("../assets/f2.png"),
  require("../assets/banner6.png"),
];

// Ảnh mặc định (fallback) nếu không tải được ảnh từ URL
const defaultImage = require("../assets/banner.png");

// Lấy chiều rộng màn hình để set kích thước ảnh
const { width: screenWidth } = Dimensions.get("window");

export default function Home({ navigation, route }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    route.params?.isLoggedIn || false
  );
  const [userInfo, setUserInfo] = useState(route.params?.userInfo || null);
  const [searchQuery, setSearchQuery] = useState(""); // State cho tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // State cho phân trang
  const productsPerPage = 6; // 6 sản phẩm mỗi trang

  // Lọc sản phẩm dựa trên searchQuery
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  // Reset trang về 1 khi searchQuery thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Cập nhật trạng thái khi route.params thay đổi
  useEffect(() => {
    if (route.params?.isLoggedIn !== undefined) {
      setIsLoggedIn(route.params.isLoggedIn);
    }
    if (route.params?.userInfo) {
      setUserInfo(route.params.userInfo);
    }
  }, [route.params?.isLoggedIn, route.params?.userInfo]);

  // Kiểm tra AsyncStorage như dự phòng
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem("isLoggedIn");
        const user = await AsyncStorage.getItem("userInfo");
        console.log("isLoggedIn in Home:", loggedIn); // Debug
        console.log("userInfo in Home:", user); // Debug
        setIsLoggedIn(loggedIn === "true");
        setUserInfo(user ? JSON.parse(user) : null);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLoginStatus();
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
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setErrorMessage("Lỗi khi lấy danh sách sản phẩm: " + error.message);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // Hàm đăng xuất
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn");
      await AsyncStorage.removeItem("userInfo");
      setIsLoggedIn(false);
      setUserInfo(null);
      // Gọi updateLoginStatus nếu có
      if (route.params?.updateLoginStatus) {
        await route.params.updateLoginStatus();
      }
      navigation.navigate("Main");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Hàm điều hướng đến trang chi tiết sản phẩm
  const handleProductDetail = (productId) => {
    navigation.navigate("ProductDetail", { productId });
  };

  // Hàm điều hướng đến màn hình cửa hàng
  const handleNavigateToStore = () => {
    navigation.navigate("Store");
  };

  // Component render từng ảnh trong carousel
  const renderBannerItem = ({ item }) => {
    return (
      <View style={styles.promotionBanner}>
        <Image
          source={item}
          style={{
            width: "100%",
            height: 150,
            borderRadius: 12,
          }}
          resizeMode="cover"
        />
      </View>
    );
  };

  // Component render từng ưu đãi đặc biệt
  const renderOfferItem = ({ item, index }) => {
    const offerTitles = [
      "Luôn Vui Tươi, Nhẹ Mới 30% + Freeship",
      "Deal Nhẹ Rộn Ràng, Chó Bạn Cờ",
      "Cập Nhật Từ Nhà Tét Này, Mình Phê Nhé!",
      "Tết Này, Mình Cà Phê Nhé!",
      "Mê A-Mê, Uống Là Mê!",
      "Minigame Trà Xanh Tây Bắc: Đi...",
    ];
    const offerSubtitles = [
      "Ưu đãi đặc biệt",
      "Ưu đãi đặc biệt",
      "Cập nhật từ Nhà",
      "Cập nhật từ Nhà",
      "Cập nhật từ Nhà",
      "Cập nhật từ Nhà",
    ];
    const offerDates = ["02/03", "01/03", "24/01", "24/01", "14/01", "29/08"];
    const offerHashtags = [
      "Ưu đãi đặc biệt",
      "Ưu đãi đặc biệt",
      "Ưu đãi đặc biệt",
      "Ưu đãi đặc biệt",
      "#CoffeeLover",
      "#CoffeeLover",
    ];

    return (
      <TouchableOpacity key={index} style={styles.offerCard}>
        <Image
          source={item}
          style={{
            width: 180,
            height: 200,
            borderRadius: 8,
          }}
          resizeMode="cover"
        />
        <Text style={styles.offerSubtitle}>{offerSubtitles[index]}</Text>
        <Text style={styles.offerTitle}>{offerTitles[index]}</Text>
        <View style={styles.offerDateContainer}>
          <Ionicons name="calendar-outline" size={14} color="#777" />
          <Text style={styles.offerDate}> {offerDates[index]}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {errorMessage ? (
        <View style={{ padding: 10, backgroundColor: "#ffcccc", margin: 10 }}>
          <Text style={{ color: "red", textAlign: "center" }}>
            {errorMessage}
          </Text>
        </View>
      ) : null}

      {/* Header tùy thuộc trạng thái đăng nhập */}
      {isLoggedIn ? (
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.logoContainer}
              onPress={() => navigation.navigate("Cart")}
            >
              <Ionicons name="cart-outline" size={24} color="#E57905" />
            </TouchableOpacity>
            <Text style={styles.greeting}>Suli Coffee</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.userContainer}>
              {userInfo?.avatarUrl ? (
                <Image
                  source={{
                    uri: userInfo.avatarUrl,
                    headers: {
                      "ngrok-skip-browser-warning": "true",
                    },
                    cache: "reload",
                  }}
                  style={styles.avatar}
                  onError={(e) => {
                    console.log(
                      "Error loading avatar in Home:",
                      e.nativeEvent.error
                    );
                  }}
                  onLoad={() =>
                    console.log("Avatar loaded successfully in Home")
                  }
                />
              ) : (
                <Ionicons
                  name="person-circle-outline"
                  size={40}
                  color="#E57905"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.logoContainer}
              onPress={() => navigation.navigate("Cart")}
            >
              <Ionicons name="cart-outline" size={24} color="#E57905" />
            </TouchableOpacity>
            <Text style={styles.greeting}>
              Bạn ơi, Cà phê nhé! <Text style={{ fontSize: 18 }}>👋</Text>
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.ticketButton}>
              <FontAwesome name="ticket" size={20} color="#E57905" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Giao diện đăng nhập nếu chưa đăng nhập */}
        {!isLoggedIn && (
          <View style={styles.loginCard}>
            <View style={styles.loginCardContent}>
              <Text style={styles.loginTitle}>Chào bạn</Text>
              <Text style={styles.loginSubtitle}>
                Sử dụng app để tích điểm và đổi những ưu đãi chỉ dành riêng cho
                thành viên bạn nhé !
              </Text>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rewardButton}>
                <Text style={styles.rewardText}>SuLi Coffee Reward</Text>
                <Feather name="chevron-right" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Các phần dịch vụ, banner, và khám phá */}
        <View style={styles.serviceContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.serviceItem}>
              <View style={styles.serviceIconContainer}>
                <FontAwesome name="motorcycle" size={24} color="#E57905" />
              </View>
              <Text style={styles.serviceText}>Giao hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.serviceItem}
              onPress={() => navigation.navigate("Order")}
            >
              <View style={styles.serviceIconContainer}>
                <Ionicons name="hand-left-outline" size={24} color="#E57905" />
              </View>
              <Text style={styles.serviceText}>Mang đi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.serviceItem}
              onPress={() => navigation.navigate("ExchangeBean")}
            >
              <View style={styles.serviceIconContainer}>
                <Ionicons name="cafe-outline" size={24} color="#E57905" />
              </View>
              <Text style={styles.serviceText}>Cà phê hạt rang</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.serviceItem}
              onPress={() => navigation.navigate("ExchangeBean")}
            >
              <View style={styles.serviceIconContainer}>
                <MaterialIcons name="grain" size={24} color="#E57905" />
              </View>
              <Text style={styles.serviceText}>Đổi Bean</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.serviceItem}
              onPress={() => navigation.navigate("OrderHistory")}
            >
              <View style={styles.serviceIconContainer}>
                <MaterialIcons name="menu-book" size={24} color="#E57905" />
              </View>
              <Text style={styles.serviceText}>Đơn hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.serviceItem}
              onPress={() => navigation.navigate("Contact")}
            >
              <View style={styles.serviceIconContainer}>
                <MaterialIcons name="mail-outline" size={24} color="#E57905" />
              </View>
              <Text style={styles.serviceText}>Góp ý</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.serviceItem}
              onPress={() => navigation.navigate("Membership")}
            >
              <View style={styles.serviceIconContainer}>
                <MaterialIcons name="diamond" size={24} color="#E57905" />
              </View>
              <Text style={styles.serviceText}>Hạng thành viên</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.promotionContainer}>
          <Carousel
            data={bannerImages}
            renderItem={renderBannerItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth - 40}
            loop={true}
            autoplay={true}
            autoplayInterval={3000}
            onSnapToItem={(index) => setActiveSlide(index)}
            useNativeDriver={false}
          />
          <View style={styles.paginationDots}>
            {bannerImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === activeSlide ? styles.activeDot : null,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.discoverSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Khám phá thêm ✨</Text>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => navigation.navigate("DiscoverMore")}
            >
              <Text style={styles.viewMoreText}>Xem thêm</Text>
              <Feather name="chevron-right" size={16} color="#F37934" />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.offerContainer}
          >
            {offerImages.map((item, index) => renderOfferItem({ item, index }))}
          </ScrollView>
          <TouchableOpacity style={styles.deliveryInfoCard}>
            <View style={styles.deliveryIconContainer}>
              <FontAwesome name="motorcycle" size={24} color="#E57905" />
            </View>
            <View>
              <Text style={styles.deliveryInfoText}>Giao hàng</Text>
              <Text style={styles.deliverySubtext}>
                Các sản phẩm sẽ được giao đến địa chỉ của bạn
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Thanh tìm kiếm và menu sản phẩm */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            placeholderTextColor="#777"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <Ionicons
            name="search"
            size={24}
            color="#E57905"
            style={styles.searchIcon}
          />
        </View>

        {/* Phần hiển thị sản phẩm */}
        <View style={styles.productSection}>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => handleProductDetail(product.id)}
              >
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
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.productPriceContainer}>
                  <Text style={styles.productPrice}>
                    {(product.discountPrice && product.discountPrice > 0
                      ? product.discountPrice
                      : product.price
                    ).toLocaleString("vi-VN")}{" "}
                    đ
                  </Text>
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
        {filteredProducts.length > 0 && (
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
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
