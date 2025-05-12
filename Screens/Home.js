import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NGROK_BASE_URL } from "@env";
import styles from "../styles/Home";
import { offerDetails } from "../data/offers";

// B1: Dữ liệu ảnh banner tĩnh từ assets
const bannerImages = [
  require("../assets/banner1.png"),
  require("../assets/banner2.png"),
  require("../assets/banner3.png"),
  require("../assets/banner4.png"),
  require("../assets/banner5.png"),
];

// B2: Ảnh mặc định khi ảnh từ server không tải được
const defaultImage = require("../assets/banner.png");

// B3: Lấy chiều rộng màn hình để tối ưu kích thước ảnh
const { width: screenWidth } = Dimensions.get("window");

// B4: Component BannerCarousel hiển thị carousel quảng cáo
const BannerCarousel = ({ navigation }) => {
  // B5: State quản lý slide đang hiển thị
  const [activeSlide, setActiveSlide] = useState(0);
  // B6: Ref để điều khiển FlatList
  const bannerRef = useRef(null);

  // B7: Tự động chuyển slide mỗi 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => {
        const nextSlide = (prev + 1) % bannerImages.length;
        if (bannerRef.current) {
          bannerRef.current.scrollToIndex({
            index: nextSlide,
            animated: true,
          });
        }
        return nextSlide;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // B8: Hàm render mỗi banner
  const renderBannerItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.promotionBanner}
        onPress={() => navigation.navigate("Order")}
      >
        <Image
          source={item}
          style={{
            width: screenWidth - 40,
            height: 150,
            borderRadius: 12,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    ),
    [navigation]
  );

  // B9: Hàm tối ưu layout cho banner
  const getBannerItemLayout = (data, index) => ({
    length: screenWidth - 40,
    offset: (screenWidth - 40) * index,
    index,
  });

  // B10: Giao diện carousel với dots phân trang
  return (
    <View style={[styles.promotionContainer, { height: 150 }]}>
      <FlatList
        ref={bannerRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={bannerImages}
        renderItem={renderBannerItem}
        keyExtractor={(item, index) => index.toString()}
        onMomentumScrollEnd={(event) => {
          const slideIndex = Math.round(
            event.nativeEvent.contentOffset.x / (screenWidth - 40)
          );
          setActiveSlide(slideIndex);
        }}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={2}
        getItemLayout={getBannerItemLayout}
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
  );
};

// B11: Component Home là màn hình chính của ứng dụng
export default function Home({ navigation, route }) {
  // B12: State quản lý trạng thái và dữ liệu
  const [activeSlide, setActiveSlide] = useState(0); // Không dùng trực tiếp
  const [products, setProducts] = useState([]); // Danh sách sản phẩm từ API
  const [displayedProducts, setDisplayedProducts] = useState([]); // Sản phẩm hiển thị
  const [errorMessage, setErrorMessage] = useState(""); // Thông báo lỗi
  const [isLoggedIn, setIsLoggedIn] = useState(
    route.params?.isLoggedIn || false
  ); // Trạng thái đăng nhập
  const [userInfo, setUserInfo] = useState(route.params?.userInfo || null); // Thông tin người dùng
  const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm
  const [isLoading, setIsLoading] = useState(false); // Trạng thái tải thêm
  const [cartCount, setCartCount] = useState(0); // Số lượng sản phẩm trong giỏ
  const productsPerLoad = 6; // Số sản phẩm tải mỗi lần
  const bannerRef = useRef(null); // Không dùng trực tiếp

  // B13: Tự động chuyển slide (không dùng, đã thay bằng BannerCarousel)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => {
        const nextSlide = (prev + 1) % bannerImages.length;
        if (bannerRef.current) {
          bannerRef.current.scrollToIndex({
            index: nextSlide,
            animated: true,
          });
        }
        return nextSlide;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // B14: Lọc sản phẩm theo tìm kiếm
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // B15: Cập nhật danh sách sản phẩm hiển thị ban đầu
  useEffect(() => {
    setDisplayedProducts(filteredProducts.slice(0, productsPerLoad));
  }, [filteredProducts]);

  // B16: Cập nhật trạng thái đăng nhập từ route.params
  useEffect(() => {
    if (route.params?.isLoggedIn !== undefined) {
      setIsLoggedIn(route.params.isLoggedIn);
    }
    if (route.params?.userInfo) {
      setUserInfo(route.params.userInfo);
    }
  }, [route.params?.isLoggedIn, route.params?.userInfo]);

  // B17: Kiểm tra trạng thái đăng nhập từ AsyncStorage
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem("isLoggedIn");
        const user = await AsyncStorage.getItem("userInfo");
        console.log("isLoggedIn from AsyncStorage:", loggedIn);
        console.log("userInfo from AsyncStorage:", user);
        setIsLoggedIn(loggedIn === "true");
        setUserInfo(user ? JSON.parse(user) : null);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLoginStatus();
  }, []);

  // B18: Gọi API lấy danh sách sản phẩm
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
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error || "Lỗi khi lấy danh sách sản phẩm.");
          setProducts([]);
          return;
        }

        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching products:", error);
        setErrorMessage("Lỗi khi lấy danh sách sản phẩm: " + error.message);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // B19: Lấy số lượng sản phẩm trong giỏ hàng
  const fetchCartCount = async () => {
    if (!isLoggedIn || !userInfo?.username) {
      setCartCount(0);
      return;
    }

    try {
      const response = await fetch(
        `${NGROK_BASE_URL}/api/cart?username=${userInfo.username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const totalQuantity = data.reduce(
          (total, item) => total + (item.quantity || 0),
          0
        );
        console.log("Cart count updated:", totalQuantity);
        setCartCount(totalQuantity);
      } else {
        console.error("Error fetching cart count:", data.error);
        setCartCount(0);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCartCount(0);
    }
  };

  // B20: Cập nhật số lượng giỏ hàng khi userInfo hoặc cartUpdated thay đổi
  useEffect(() => {
    fetchCartCount();
  }, [userInfo, route.params?.cartUpdated]);

  // B21: Hàm đăng xuất
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn");
      await AsyncStorage.removeItem("userInfo");
      console.log("AsyncStorage cleared");
      setIsLoggedIn(false);
      setUserInfo(null);
      setCartCount(0);
      navigation.navigate("Main");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // B22: Hàm điều hướng đến chi tiết sản phẩm
  const handleProductDetail = useCallback(
    (productId) => {
      navigation.navigate("ProductDetail", { productId });
    },
    [navigation]
  );

  // B23: Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = useCallback(
    async (product) => {
      if (!product) return;

      if (!isLoggedIn) {
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
        return;
      }

      const username = userInfo?.username;
      if (!username) {
        setErrorMessage(
          "Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại."
        );
        return;
      }

      const API_URL = `${NGROK_BASE_URL}/api/cart`;
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({
            username,
            foodId: product.id,
            quantity: 1,
            price:
              product.discountPrice && product.discountPrice > 0
                ? product.discountPrice
                : product.price,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrorMessage(errorData.error || "Lỗi khi thêm vào giỏ hàng.");
          return;
        }

        await response.json();
        setErrorMessage("");
        fetchCartCount();
        navigation.navigate("Cart");
      } catch (error) {
        console.error("Error adding to cart:", error);
        setErrorMessage("Lỗi khi thêm vào giỏ hàng: " + error.message);
      }
    },
    [isLoggedIn, userInfo, navigation]
  );

  // B24: Hàm tải thêm sản phẩm khi kéo đến cuối
  const loadMoreProducts = useCallback(() => {
    if (isLoading) return;

    const currentLength = displayedProducts.length;
    if (currentLength >= filteredProducts.length) return;

    console.log("Loading more products... Current length:", currentLength);
    setIsLoading(true);
    setTimeout(() => {
      const nextProducts = filteredProducts.slice(
        0,
        currentLength + productsPerLoad
      );
      setDisplayedProducts(nextProducts);
      setIsLoading(false);
      console.log("Loaded more products. New length:", nextProducts.length);
    }, 500);
  }, [isLoading, displayedProducts, filteredProducts]);

  // B25: Hàm render banner (không dùng trực tiếp, đã thay bằng BannerCarousel)
  const renderBannerItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.promotionBanner}
        onPress={() => navigation.navigate("Order")}
      >
        <Image
          source={item}
          style={{
            width: screenWidth - 40,
            height: 150,
            borderRadius: 12,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    ),
    [navigation]
  );

  // B26: Hàm render ưu đãi đặc biệt
  const renderOfferItem = useCallback(
    ({ item, index }) => (
      <TouchableOpacity
        key={index}
        style={styles.offerCard}
        onPress={() =>
          navigation.navigate("PromotionDetail", { promotion: item })
        }
      >
        <Image
          source={item.image}
          style={{
            width: 180,
            height: 200,
            borderRadius: 8,
          }}
          resizeMode="cover"
          defaultSource={defaultImage}
        />
        <Text style={styles.offerSubtitle}>{item.subtitle}</Text>
        <Text style={styles.offerTitle}>{item.title}</Text>
        <View style={styles.offerDateContainer}>
          <Ionicons name="calendar-outline" size={14} color="#777" />
          <Text style={styles.offerDate}> {item.date}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PromotionDetail", { promotion: item })
          }
        >
          <Text style={{ color: "#E57905", fontSize: 12, marginTop: 5 }}>
            Khám phá thêm
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    ),
    [navigation]
  );

  // B27: Hàm render sản phẩm
  const renderProductItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        key={item.id}
        style={styles.productCard}
        onPress={() => handleProductDetail(item.id)}
      >
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
        />
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.productPriceContainer}>
          <Text style={styles.productPrice}>
            {(item.discountPrice && item.discountPrice > 0
              ? item.discountPrice
              : item.price
            ).toLocaleString("vi-VN")}{" "}
            đ
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
          >
            <Ionicons name="add" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ),
    [handleProductDetail, handleAddToCart]
  );

  // B28: Hàm tối ưu layout cho banner (không dùng trực tiếp)
  const getBannerItemLayout = (data, index) => ({
    length: screenWidth - 40,
    offset: (screenWidth - 40) * index,
    index,
  });

  // B29: Hàm tối ưu layout cho ưu đãi
  const getOfferItemLayout = (data, index) => ({
    length: 200,
    offset: 200 * index,
    index,
  });

  // B30: Hàm tối ưu layout cho sản phẩm
  const getProductItemLayout = (data, index) => ({
    length: 180,
    offset: 180 * Math.floor(index / 2),
    index,
  });

  // B31: Hàm render header của FlatList
  const renderHeader = useCallback(
    () => (
      <>
        {/* B32: Hiển thị thông báo lỗi nếu có */}
        {errorMessage ? (
          <View style={{ padding: 10, backgroundColor: "#ffcccc", margin: 10 }}>
            <Text style={{ color: "red", textAlign: "center" }}>
              {errorMessage}
            </Text>
          </View>
        ) : null}

        {/* B33: Header cho người đã đăng nhập */}
        {isLoggedIn ? (
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                style={styles.logoContainer}
                onPress={() =>
                  navigation.navigate("Cart", { cartUpdated: true })
                }
              >
                <View style={styles.cartBadge}>
                  <Ionicons name="cart-outline" size={24} color="#E57905" />
                  {cartCount > 0 && (
                    <Text style={styles.cartCount}>{cartCount}</Text>
                  )}
                </View>
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
                      cache: "force-cache", // Sử dụng cache để tránh load lại
                    }}
                    style={styles.avatar}
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
          /* B34: Header cho người chưa đăng nhập */
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                style={styles.logoContainer}
                onPress={() =>
                  navigation.navigate("Cart", { cartUpdated: true })
                }
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
                <Ionicons name="notifications-outline" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* B35: Card khuyến khích đăng nhập nếu chưa đăng nhập */}
        {!isLoggedIn && (
          <View style={styles.loginCard}>
            <View style={styles.loginCardContent}>
              <Text style={styles.loginTitle}>Chào bạn</Text>
              <Text style={styles.loginSubtitle}>
                Sử dụng app để tích điểm và đổi những ưu đãi chỉ dành riêng cho
                thành viên bạn nhé!
              </Text>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rewardButton}>
                <Text style={styles.rewardText}>SuLi Coffee Reward</Text>
                <Feather name="chevron-right" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* B36: Danh sách dịch vụ */}
        <View style={styles.serviceContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[
              { key: "Giao hàng", icon: "motorcycle", screen: null },
              { key: "Mang đi", icon: "hand-left-outline", screen: "Order" },
              {
                key: "Cà phê hạt rang",
                icon: "cafe-outline",
                screen: "ExchangeBean",
              },
              { key: "Đổi Bean", icon: "grain", screen: "ExchangeBean" },
              { key: "Đơn hàng", icon: "menu-book", screen: "OrderHistory" },
              { key: "Góp ý", icon: "mail-outline", screen: "Contact" },
              {
                key: "Hạng thành viên",
                icon: "diamond",
                screen: "Membership",
              },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.serviceItem}
                onPress={() => {
                  if (item.screen === "OrderHistory" && !isLoggedIn) {
                    navigation.navigate("Login", {
                      redirectTo: "OrderHistory",
                    });
                  } else if (item.screen) {
                    navigation.navigate(item.screen);
                  }
                }}
              >
                <View style={styles.serviceIconContainer}>
                  {item.icon === "motorcycle" || item.icon === "ticket" ? (
                    <FontAwesome name={item.icon} size={24} color="#E57905" />
                  ) : item.icon === "grain" ||
                    item.icon === "menu-book" ||
                    item.icon === "mail-outline" ||
                    item.icon === "diamond" ? (
                    <MaterialIcons name={item.icon} size={24} color="#E57905" />
                  ) : (
                    <Ionicons name={item.icon} size={24} color="#E57905" />
                  )}
                </View>
                <Text style={styles.serviceText}>{item.key}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.key}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            windowSize={3}
          />
        </View>

        {/* B37: Sử dụng BannerCarousel */}
        <BannerCarousel navigation={navigation} />

        {/* B38: Phần khám phá thêm */}
        <View style={styles.discoverSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Khám phá thêm ✨</Text>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => navigation.navigate("DiscoverMore")}
            >
              <Text style={styles.viewMoreText}>Xem thêm</Text>
              <Feather name="chevron-right" size={16} color="#E57905" />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={offerDetails}
            renderItem={renderOfferItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.offerContainer}
            removeClippedSubviews={true}
            initialNumToRender={2}
            maxToRenderPerBatch={2}
            windowSize={1}
            getItemLayout={getOfferItemLayout}
          />
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

        {/* B39: Ô tìm kiếm sản phẩm */}
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

        {/* B40: Tiêu đề danh sách sản phẩm */}
        <View style={styles.productSection}>
          <Text style={styles.sectionTitle}>Sản phẩm</Text>
        </View>
      </>
    ),
    [isLoggedIn, userInfo, errorMessage, cartCount, navigation, renderOfferItem]
  );

  // B41: Giao diện chính với FlatList sản phẩm
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={displayedProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: "#777" }}>
            Không tìm thấy sản phẩm nào.
          </Text>
        }
        contentContainerStyle={styles.productList}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator
              size="small"
              color="#E57905"
              style={{ marginVertical: 10 }}
            />
          ) : null
        }
        removeClippedSubviews={true}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={3}
        getItemLayout={getProductItemLayout}
      />
    </SafeAreaView>
  );
}
