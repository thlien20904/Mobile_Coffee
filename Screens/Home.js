import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
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
import styles from "../styles/Home";

// Dữ liệu ảnh banner từ thư mục assets
const bannerImages = [
  require("../assets/banner.png"),
  require("../assets/banner1.png"),
  require("../assets/banner2.png"),
  require("../assets/banner3.png"),
  require("../assets/banner4.png"),
];

// Dữ liệu ảnh cho các ưu đãi đặc biệt (có thể thay bằng ảnh từ backend)
const offerImages = [
  require("../assets/banner.png"), // Ảnh cho "Luôn Vui Tươi, Nhẹ Mới 30% + Freeship"
  require("../assets/banner2.png"), // Ảnh cho "Deal Nhẹ Rộn Ràng, Chó Bạn Cờ"
  require("../assets/banner3.png"), // Ảnh cho "Cập Nhật Từ Nhà Tét Này, Mình Phê Nhé!"
];

// Dữ liệu giả (mock data) để hiển thị sản phẩm khi API không hoạt động
const mockProducts = [
  {
    id: 1,
    name: "A-Mẻ Classic",
    price: 39000,
    discountPrice: 39000,
    image: "https://example.com/images/a-me-classic.jpg",
    isNew: false,
  },
  {
    id: 2,
    name: "A-Mẻ Đào",
    price: 55000,
    discountPrice: 55000,
    image: "https://example.com/images/a-me-dao.jpg",
    isNew: true,
  },
  {
    id: 3,
    name: "A-Mẻ Mơ",
    price: 55000,
    discountPrice: 55000,
    image: "https://example.com/images/a-me-mo.jpg",
    isNew: false,
  },
  {
    id: 4,
    name: "A-Mẻ Quất",
    price: 55000,
    discountPrice: 55000,
    image: "https://example.com/images/a-me-quat.jpg",
    isNew: false,
  },
];

// Lấy chiều rộng màn hình để set kích thước ảnh
const { width: screenWidth } = Dimensions.get("window");

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0); // State để theo dõi ảnh hiện tại trong carousel
  const [products, setProducts] = useState(mockProducts); // Dùng mock data tạm thời
  const [errorMessage, setErrorMessage] = useState(""); // State để lưu thông báo lỗi

  // Gọi API để lấy danh sách sản phẩm khi component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const API_URL = "https://d54b-171-251-212-25.ngrok-free.app/api/products"; // Cập nhật URL

      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error || "Lỗi khi lấy danh sách sản phẩm.");
          setProducts(mockProducts); // Dùng mock data nếu lỗi
          return;
        }

        const data = await response.json();
        setProducts(data);
        setErrorMessage(""); // Xóa thông báo lỗi nếu thành công
      } catch (error) {
        console.error("Error fetching products:", error);
        setErrorMessage("Lỗi khi lấy danh sách sản phẩm.");
        setProducts(mockProducts); // Dùng mock data nếu lỗi
      }
    };

    fetchProducts();
  }, []);

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
    ];
    const offerSubtitles = [
      "Ưu đãi đặc biệt",
      "Ưu đãi đặc biệt",
      "Cập nhật từ Nhà",
    ];
    const offerDates = ["02/03", "01/03", "24/01"];

    return (
      <TouchableOpacity key={index} style={styles.offerCard}>
        <Image
          source={item}
          style={{
            width: "100%",
            height: 100,
            borderRadius: 8,
          }}
          resizeMode="cover"
        />
        <Text style={styles.offerSubtitle}>{offerSubtitles[index]}</Text>
        <Text style={styles.offerTitle}>{offerTitles[index]}</Text>
        <View style={styles.offerDateContainer}>
          <Ionicons name="calendar-outline" size={16} color="#777" />
          <Text style={styles.offerDate}> {offerDates[index]}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hiển thị thông báo lỗi nếu có */}
      {errorMessage ? (
        <View style={{ padding: 10, backgroundColor: "#ffcccc", margin: 10 }}>
          <Text style={{ color: "red", textAlign: "center" }}>
            {errorMessage}
          </Text>
        </View>
      ) : null}

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <Ionicons name="cafe" size={24} color="#E57905" />
          </View>
          <Text style={styles.greeting}>
            Chào bạn mới <Text style={{ fontSize: 18 }}>👋</Text>
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

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Login Card */}
        <View style={styles.loginCard}>
          <View style={styles.loginCardContent}>
            <Text style={styles.loginTitle}>Đăng nhập</Text>
            <Text style={styles.loginSubtitle}>
              Sử dụng app để tích điểm và đổi những ưu đãi chỉ dành riêng cho
              thành viên bạn nhé !
            </Text>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rewardButton}>
              <Text style={styles.rewardText}>The Coffee House's Reward</Text>
              <Feather name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Service Icons */}
        <View style={styles.serviceContainer}>
          <TouchableOpacity style={styles.serviceItem}>
            <View style={styles.serviceIconContainer}>
              <FontAwesome name="motorcycle" size={24} color="#E57905" />
            </View>
            <Text style={styles.serviceText}>Giao hàng</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem}>
            <View style={styles.serviceIconContainer}>
              <Ionicons name="hand-left-outline" size={24} color="#E57905" />
            </View>
            <Text style={styles.serviceText}>Mang đi</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem}>
            <View style={styles.serviceIconContainer}>
              <Ionicons name="cafe-outline" size={24} color="#E57905" />
            </View>
            <Text style={styles.serviceText}>Cà phê{"\n"}hạt rang</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceItem}>
            <View style={styles.serviceIconContainer}>
              <MaterialIcons name="grain" size={24} color="#E57905" />
            </View>
            <Text style={styles.serviceText}>Đổi Bean</Text>
          </TouchableOpacity>
        </View>

        {/* Promotion Banner (Using react-native-snap-carousel) */}
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
          {/* Pagination Dots */}
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

        {/* Discover More Section */}
        <View style={styles.discoverSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Khám phá thêm ✨</Text>
            <TouchableOpacity>
              <Text style={styles.viewMoreText}>
                Xem thêm{" "}
                <Feather name="chevron-right" size={16} color="#F37934" />
              </Text>
            </TouchableOpacity>
          </View>

          {/* Special Offers (Ưu đãi đặc biệt) */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.offerContainer}
          >
            {offerImages.map((item, index) => renderOfferItem({ item, index }))}
          </ScrollView>

          {/* Delivery Info */}
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

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            placeholderTextColor="#777"
          />
          <Ionicons
            name="heart-outline"
            size={24}
            color="#E57905"
            style={styles.searchIcon}
          />
        </View>
        {/* Product List */}
        <View style={styles.productSection}>
          {products.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard}>
              {product.isNew === 1 && (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>NEW</Text>
                </View>
              )}
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.productPriceContainer}>
                <Text style={styles.productPrice}>
                  {/* Hiển thị giá giảm nếu có, nếu không thì hiển thị giá gốc */}
                  {(product.discountPrice && product.discountPrice > 0
                    ? product.discountPrice
                    : product.price
                  ).toLocaleString("vi-VN")}{" "}
                  đ
                </Text>
                <TouchableOpacity style={styles.addButton}>
                  <Ionicons name="add" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#F37934" />
          <Text style={[styles.navText, styles.activeNavText]}>Trang chủ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cafe-outline" size={24} color="#777777" />
          <Text style={styles.navText}>Đặt hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="storefront-outline" size={24} color="#777777" />
          <Text style={styles.navText}>Cửa hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="local-offer" size={24} color="#777777" />
          <Text style={styles.navText}>Ưu đãi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Feather name="menu" size={24} color="#777777" />
          <Text style={styles.navText}>Khác</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
