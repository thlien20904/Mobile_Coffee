import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NGROK_BASE_URL } from "@env";
import styles from "../styles/Cart";

// Hình ảnh mặc định được sử dụng khi hình ảnh sản phẩm không tải được
const defaultImage = require("../assets/banner.png");

// Component chính của màn hình giỏ hàng, nhận route và navigation từ React Navigation
export default function Cart({ route, navigation }) {
  // Khởi tạo trạng thái:
  // - cartItems: Lưu danh sách sản phẩm trong giỏ hàng
  // - username: Lưu tên người dùng để xác định giỏ hàng thuộc về ai
  // - selectedItems: Lưu tập hợp các gioHangId của sản phẩm được chọn để thanh toán
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState(null);
  const [selectedItems, setSelectedItems] = useState(new Set());

  // useEffect: Kiểm tra và lấy thông tin người dùng từ AsyncStorage khi component được mount
  // Mục đích: Đảm bảo người dùng đã đăng nhập trước khi truy cập giỏ hàng
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        // Lấy dữ liệu người dùng từ AsyncStorage (lưu trữ cục bộ)
        const user = await AsyncStorage.getItem("userInfo");
        if (user) {
          // Parse dữ liệu JSON và lấy username
          const parsedUser = JSON.parse(user);
          setUsername(parsedUser.username);
        } else {
          // Nếu không có thông tin người dùng, hiển thị cảnh báo và chuyển hướng về màn hình đăng nhập
          console.error("No user info found in AsyncStorage");
          Alert.alert(
            "Không tìm thấy thông tin đăng nhập. Vui lòng đăng nhập lại."
          );
          navigation.navigate("Login");
        }
      } catch (error) {
        // Xử lý lỗi khi truy cập AsyncStorage
        console.error("Error getting user info:", error);
        Alert.alert("Đã xảy ra lỗi khi kiểm tra thông tin người dùng.");
        navigation.navigate("Login");
      }
    };
    getUserInfo();
  }, [navigation]); // Phụ thuộc vào navigation để đảm bảo điều hướng hoạt động đúng

  // useEffect: Lấy danh sách sản phẩm trong giỏ hàng từ API khi có username
  // Mục đích: Đồng bộ dữ liệu giỏ hàng từ server với giao diện người dùng
  useEffect(() => {
    const fetchCart = async () => {
      if (!username) return; // Không thực hiện nếu chưa có username

      try {
        // Gửi yêu cầu GET đến API để lấy giỏ hàng của người dùng
        const response = await fetch(
          `${NGROK_BASE_URL}/api/cart?username=${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache", // Đảm bảo không sử dụng cache để luôn lấy dữ liệu mới
              "ngrok-skip-browser-warning": "true", // Bỏ qua cảnh báo của ngrok
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          // Nếu thành công, cập nhật danh sách giỏ hàng và chọn mặc định tất cả sản phẩm
          console.log("Fetched cart items:", data);
          setCartItems(data);
          setSelectedItems(new Set(data.map((item) => item.gioHangId)));
        } else {
          // Nếu có lỗi từ server, hiển thị thông báo và đặt giỏ hàng rỗng
          Alert.alert(data.error || "Không thể lấy giỏ hàng.");
          setCartItems([]);
        }
      } catch (error) {
        // Xử lý lỗi mạng hoặc lỗi khác
        console.error("Error fetching cart:", error);
        Alert.alert("Đã xảy ra lỗi khi lấy giỏ hàng: " + error.message);
        setCartItems([]);
      }
    };

    fetchCart();
  }, [username, route.params?.cartUpdated]); // Phụ thuộc vào username và cartUpdated để làm mới giỏ hàng khi cần

  // useEffect: Thêm sản phẩm mới vào giỏ hàng khi nhận được newItem từ route.params
  // Mục đích: Xử lý thêm sản phẩm từ màn hình khác (ví dụ: màn hình chi tiết sản phẩm)
  useEffect(() => {
    const addToCart = async () => {
      if (!route.params?.newItem || !username) return; // Không thực hiện nếu thiếu newItem hoặc username

      const newItem = route.params.newItem;
      // Xác định giá sử dụng: ưu tiên giá giảm giá nếu có, nếu không thì dùng giá gốc
      const price =
        newItem.discountPrice && newItem.discountPrice > 0
          ? newItem.discountPrice
          : newItem.price;

      try {
        // Gửi yêu cầu POST để thêm sản phẩm vào giỏ hàng
        const response = await fetch(`${NGROK_BASE_URL}/api/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
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
          // Sau khi thêm thành công, làm mới giỏ hàng bằng cách lấy lại dữ liệu từ API
          const fetchResponse = await fetch(
            `${NGROK_BASE_URL}/api/cart?username=${username}`,
            {
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "ngrok-skip-browser-warning": "true",
              },
            }
          );
          const fetchData = await fetchResponse.json();
          if (fetchResponse.ok) {
            console.log("Updated cart after adding item:", fetchData);
            setCartItems(fetchData);
            setSelectedItems(new Set(fetchData.map((item) => item.gioHangId)));
          } else {
            Alert.alert("Không thể cập nhật giỏ hàng sau khi thêm sản phẩm.");
          }
        } else {
          Alert.alert(data.error || "Không thể thêm sản phẩm vào giỏ hàng.");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        Alert.alert("Đã xảy ra lỗi khi thêm sản phẩm: " + error.message);
      }
    };

    addToCart();
  }, [route.params?.newItem, username]); // Phụ thuộc vào newItem và username để xử lý khi có sản phẩm mới

  // Hàm tăng số lượng sản phẩm trong giỏ hàng
  // Mục đích: Cập nhật số lượng sản phẩm và tổng giá trên server và giao diện
  const increaseQuantity = async (gioHangId, price) => {
    const item = cartItems.find((item) => item.gioHangId === gioHangId);
    const newQuantity = item.quantity + 1;

    try {
      // Gửi yêu cầu PUT để cập nhật số lượng
      const response = await fetch(`${NGROK_BASE_URL}/api/cart/${gioHangId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          quantity: newQuantity,
          price,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Cập nhật giao diện với số lượng và tổng giá mới
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
        Alert.alert(data.error || "Không thể cập nhật số lượng.");
      }
    } catch (error) {
      console.error("Error increasing quantity:", error);
      Alert.alert("Đã xảy ra lỗi khi cập nhật số lượng: " + error.message);
    }
  };

  // Hàm giảm số lượng sản phẩm trong giỏ hàng
  // Mục đích: Giảm số lượng sản phẩm, nhưng không cho phép giảm dưới 1
  const decreaseQuantity = async (gioHangId, price) => {
    const item = cartItems.find((item) => item.gioHangId === gioHangId);
    if (item.quantity <= 1) return; // Ngăn giảm số lượng dưới 1

    const newQuantity = item.quantity - 1;

    try {
      // Gửi yêu cầu PUT để cập nhật số lượng
      const response = await fetch(`${NGROK_BASE_URL}/api/cart/${gioHangId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          quantity: newQuantity,
          price,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Cập nhật giao diện với số lượng và tổng giá mới
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
        Alert.alert(data.error || "Không thể cập nhật số lượng.");
      }
    } catch (error) {
      console.error("Error decreasing quantity:", error);
      Alert.alert("Đã xảy ra lỗi khi cập nhật số lượng: " + error.message);
    }
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  // Mục đích: Xóa sản phẩm khỏi giỏ hàng trên server và cập nhật giao diện
  const removeItem = async (gioHangId) => {
    try {
      // Gửi yêu cầu DELETE để xóa sản phẩm
      const response = await fetch(`${NGROK_BASE_URL}/api/cart/${gioHangId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      const data = await response.json();
      if (response.ok) {
        // Cập nhật giao diện bằng cách loại bỏ sản phẩm và bỏ chọn sản phẩm đó
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.gioHangId !== gioHangId)
        );
        setSelectedItems((prevSelected) => {
          const newSelected = new Set(prevSelected);
          newSelected.delete(gioHangId);
          return newSelected;
        });
      } else {
        Alert.alert(data.error || "Không thể xóa sản phẩm.");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      Alert.alert("Đã xảy ra lỗi khi xóa sản phẩm: " + error.message);
    }
  };

  // Hàm chuyển đổi trạng thái chọn/bỏ chọn một sản phẩm
  // Mục đích: Quản lý danh sách sản phẩm được chọn để thanh toán
  const toggleSelectItem = (gioHangId) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(gioHangId)) {
        newSelected.delete(gioHangId); // Bỏ chọn nếu đã được chọn
      } else {
        newSelected.add(gioHangId); // Chọn nếu chưa được chọn
      }
      return newSelected;
    });
  };

  // Hàm chọn tất cả sản phẩm trong giỏ hàng
  // Mục đích: Tiện lợi cho người dùng khi muốn chọn toàn bộ sản phẩm
  const selectAllItems = () => {
    setSelectedItems(new Set(cartItems.map((item) => item.gioHangId)));
  };

  // Hàm tính tổng số tiền của các sản phẩm được chọn
  // Mục đích: Hiển thị tổng tiền cần thanh toán trên giao diện
  const calculateTotal = () => {
    return cartItems
      .filter((item) => selectedItems.has(item.gioHangId))
      .reduce(
        (total, item) =>
          total + (item.totalPrice || item.price * item.quantity),
        0
      );
  };

  // Hàm xử lý thanh toán
  // Mục đích: Chuyển danh sách sản phẩm được chọn sang màn hình Checkout
  const handleCheckout = () => {
    const buyItems = cartItems.filter((item) =>
      selectedItems.has(item.gioHangId)
    );
    if (buyItems.length === 0) {
      // Ngăn thanh toán nếu không có sản phẩm nào được chọn
      Alert.alert(
        "Thông báo",
        "Vui lòng chọn ít nhất một sản phẩm để thanh toán."
      );
      return;
    }
    // Điều hướng đến màn hình Checkout với danh sách sản phẩm
    navigation.navigate("Checkout", { buyItems });
  };

  // Component con để hiển thị từng mục trong giỏ hàng
  // Sử dụng React.memo để tối ưu hóa hiệu suất, tránh render lại không cần thiết
  const CartItem = React.memo(({ item }) => (
    <View style={styles.cartItem}>
      {/* Nút chọn/bỏ chọn sản phẩm */}
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => toggleSelectItem(item.gioHangId)}
      >
        <Ionicons
          name={
            selectedItems.has(item.gioHangId) ? "checkbox" : "square-outline"
          }
          size={24}
          color={selectedItems.has(item.gioHangId) ? "#E57905" : "#000"}
        />
      </TouchableOpacity>
      {/* Hình ảnh sản phẩm */}
      <Image
        source={{ uri: item.image, cache: "reload" }}
        style={styles.itemImage}
        resizeMode="cover"
        defaultSource={defaultImage}
      />
      {/* Thông tin sản phẩm */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          {item.price.toLocaleString("vi-VN")} đ
        </Text>
        {/* Điều chỉnh số lượng */}
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
      {/* Nút xóa sản phẩm */}
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItem(item.gioHangId)}
      >
        <Ionicons name="trash-outline" size={24} color="#FF0000" />
      </TouchableOpacity>
    </View>
  ));

  // Hàm render từng mục trong FlatList
  const renderCartItem = ({ item }) => <CartItem item={item} />;

  // Giao diện chính của màn hình giỏ hàng
  return (
    <SafeAreaView style={styles.container}>
      {/* Thanh tiêu đề */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Main", { screen: "Home" })}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ hàng của bạn</Text>
      </View>

      {/* Hiển thị khi giỏ hàng trống */}
      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống!</Text>
          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={() => navigation.navigate("Main", { screen: "Home" })}
          >
            <Text style={styles.continueShoppingText}>Tiếp tục mua sắm</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Nút chọn tất cả sản phẩm */}
          <TouchableOpacity
            style={styles.selectAllButton}
            onPress={selectAllItems}
          >
            <Text style={styles.selectAllText}>Chọn tất cả</Text>
          </TouchableOpacity>
          {/* Danh sách sản phẩm trong giỏ hàng */}
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.gioHangId.toString()}
            contentContainerStyle={styles.cartList}
            initialNumToRender={10} // Số lượng mục được render ban đầu
            maxToRenderPerBatch={10} // Số lượng mục render mỗi lần
            windowSize={5} // Số lượng cửa sổ để tối ưu hóa hiệu suất
          />
          {/* Chân trang hiển thị tổng tiền và nút thanh toán */}
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
