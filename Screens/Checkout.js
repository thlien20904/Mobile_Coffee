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
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NGROK_BASE_URL } from "@env";
import styles from "../styles/Checkout";

// Component TextInput
const CustomTextInput = React.forwardRef(
  ({ value, onChangeText, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        value={value || ""}
        onChangeText={onChangeText}
        keyboardType="default"
        autoFocus={false}
        autoCorrect={false}
        autoCapitalize="none"
        {...props}
      />
    );
  }
);

// Component OrderItem
const MemoizedOrderItem = React.memo(({ item }) => {
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
    id: null,
  });
  const [tempUserInfo, setTempUserInfo] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [selectedAddressText, setSelectedAddressText] = useState("");
  const [customAddress, setCustomAddress] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [voucherId, setVoucherId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("VN Pay");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const usernameRef = useRef(null);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const customAddressRef = useRef(null);
  const voucherRef = useRef(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        let username = "";
        let userId = null;
        if (storedUserInfo) {
          const parsedUserInfo = JSON.parse(storedUserInfo);
          username = parsedUserInfo.username || "";
          userId = parsedUserInfo.id || null;
        }

        if (username) {
          const API_URL = `${NGROK_BASE_URL}/api/user?username=${username}`;
          console.log("Fetching user info from:", API_URL);
          const response = await fetch(API_URL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
              errorData.error || `HTTP error! Status: ${response.status}`
            );
          }

          const data = await response.json();
          console.log("User data received:", data);
          setUserInfo({
            username: data.username || "",
            fullName: data.fullName || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            id: data.id || null,
          });
          setTempUserInfo({
            username: data.username || "",
            fullName: data.fullName || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
          });

          if (userId || data.id) {
            const addressUrl = `${NGROK_BASE_URL}/api/delivery-addresses?userId=${
              data.id || userId
            }`;
            console.log("Fetching addresses from:", addressUrl);
            const addressResponse = await fetch(addressUrl, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (!addressResponse.ok) {
              const errorData = await addressResponse.json().catch(() => ({}));
              throw new Error(
                errorData.error ||
                  `HTTP error! Status: ${addressResponse.status}`
              );
            }

            const addressData = await addressResponse.json();
            console.log("Delivery addresses fetched:", addressData);
            if (Array.isArray(addressData)) {
              setDeliveryAddresses(addressData);
              console.log("Set deliveryAddresses:", addressData);
              const defaultAddress = addressData.find((addr) => addr.IsDefault);
              if (defaultAddress) {
                setSelectedAddressId(defaultAddress.AddressId.toString());
                setSelectedAddressText(defaultAddress.Address);
                console.log(
                  "Set default address ID:",
                  defaultAddress.AddressId.toString()
                );
              }
            } else {
              console.log("No valid address data, setting empty array");
              setDeliveryAddresses([]);
            }
          }
        } else {
          Alert.alert("Lỗi", "Vui lòng đăng nhập lại.");
          navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error fetching user info:", error.message, error.stack);
        Alert.alert(
          "Lỗi kết nối",
          `Không thể lấy thông tin người dùng: ${error.message}`
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, [navigation]);

  const handleUpdateUserInfo = async () => {
    try {
      setIsLoading(true);
      const updatedUserInfo = {
        username: tempUserInfo.username,
        fullName: tempUserInfo.fullName,
        email: tempUserInfo.email,
        phone: tempUserInfo.phone,
        address: tempUserInfo.address,
      };

      const API_URL = `${NGROK_BASE_URL}/api/update-user`;
      console.log("Updating user info with:", updatedUserInfo);
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserInfo),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Cập nhật thông tin thất bại.");
      }

      const data = await response.json();
      setUserInfo((prev) => ({ ...prev, ...tempUserInfo }));
      await AsyncStorage.setItem(
        "userInfo",
        JSON.stringify({ ...userInfo, ...tempUserInfo })
      );
      Alert.alert("Thành công", "Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Error updating user info:", error);
      Alert.alert("Lỗi", `Lỗi: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDeliveryAddress = async () => {
    if (!customAddress) {
      Alert.alert("Lỗi", "Vui lòng nhập địa chỉ mới.");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        userId: parseInt(userInfo.id),
        address: customAddress.trim(),
        isDefault: deliveryAddresses.length === 0 ? 1 : 0,
      };
      console.log("Adding address with payload:", payload);
      const response = await fetch(
        `${NGROK_BASE_URL}/api/add-delivery-address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Không thể thêm địa chỉ.");
      }

      const data = await response.json();
      console.log("New address added:", data);
      setDeliveryAddresses((prev) => [...prev, data]);
      setCustomAddress("");
      setSelectedAddressId(data.AddressId.toString());
      setSelectedAddressText(data.Address);
      Alert.alert("Thành công", "Thêm địa chỉ giao hàng thành công!");
    } catch (error) {
      console.error("Error adding delivery address:", error.message);
      Alert.alert("Lỗi", `Không thể thêm địa chỉ: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyVoucher = async () => {
    if (!voucherCode) {
      Alert.alert("Lỗi", "Vui lòng nhập mã voucher.");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        code: voucherCode.trim().toUpperCase(),
        totalAmount: calculateSubtotal(),
      };
      console.log("Applying voucher with:", payload);
      const response = await fetch(`${NGROK_BASE_URL}/api/apply-voucher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Voucher response:", data);
      if (response.status === 200) {
        setDiscount(data.discount || 0);
        setVoucherId(data.voucherId);
        Alert.alert(
          "Thành công",
          `Giảm giá ${(data.discount || 0).toLocaleString("vi-VN")} đ!`
        );
      } else {
        setDiscount(0);
        setVoucherId(null);
        Alert.alert("Lỗi", data.error || "Mã voucher không hợp lệ.");
      }
    } catch (error) {
      console.error("Error applying voucher:", error.message);
      Alert.alert("Lỗi", `Không thể áp dụng voucher: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateSubtotal = () => {
    return items.reduce(
      (total, item) =>
        total + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );
  };

  const shippingFee = 20000;
  const total =
    calculateSubtotal() + Number(shippingFee) - Number(discount || 0);

  const handlePlaceOrder = async () => {
    let deliveryAddress = customAddress;
    if (selectedAddressId && !customAddress) {
      const selected = deliveryAddresses.find(
        (addr) => addr.AddressId.toString() === selectedAddressId
      );
      if (!selected) {
        Alert.alert("Lỗi", "Vui lòng chọn hoặc nhập địa chỉ giao hàng.");
        return;
      }
      deliveryAddress = selected.Address;
    }

    if (!deliveryAddress) {
      Alert.alert("Lỗi", "Vui lòng nhập hoặc chọn địa chỉ giao hàng.");
      return;
    }

    try {
      setIsLoading(true);
      const orderData = {
        username: userInfo.username,
        totalAmount: total,
        paymentMethod: paymentMethod,
        items: items.map((item) => ({
          foodId: item.id,
          sizeId: item.sizeId || null,
          toppingId: item.toppingId || null,
          quantity: item.quantity || 1,
          price: item.price || 0,
        })),
        deliveryAddress,
        voucherId: voucherId || null,
      };
      console.log("Placing order with:", orderData);

      const API_URL = `${NGROK_BASE_URL}/api/place-order`;
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Đặt hàng thất bại.");
      }

      Alert.alert("Thành công", "Đặt hàng thành công!");
      navigation.navigate("OrderConfirmation");
    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert("Lỗi", `Lỗi: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderHeader = () => {
    try {
      return (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate("Main")}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Thanh toán</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
            <View style={styles.inputContainer}>
              <CustomTextInput
                ref={usernameRef}
                style={styles.input}
                placeholder="Tên người dùng"
                placeholderTextColor="#999"
                value={tempUserInfo.username}
                onChangeText={(text) =>
                  setTempUserInfo((prev) => ({ ...prev, username: text }))
                }
                returnKeyType="next"
                onSubmitEditing={() => fullNameRef.current?.focus()}
                editable={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <CustomTextInput
                ref={fullNameRef}
                style={styles.input}
                placeholder="Họ và tên"
                placeholderTextColor="#999"
                value={tempUserInfo.fullName}
                onChangeText={(text) =>
                  setTempUserInfo((prev) => ({ ...prev, fullName: text }))
                }
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
              />
            </View>
            <View style={styles.inputContainer}>
              <CustomTextInput
                ref={emailRef}
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={tempUserInfo.email}
                onChangeText={(text) =>
                  setTempUserInfo((prev) => ({ ...prev, email: text }))
                }
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => phoneRef.current?.focus()}
              />
            </View>
            <View style={styles.inputContainer}>
              <CustomTextInput
                ref={phoneRef}
                style={styles.input}
                placeholder="Số điện thoại"
                placeholderTextColor="#999"
                value={tempUserInfo.phone}
                onChangeText={(text) =>
                  setTempUserInfo((prev) => ({ ...prev, phone: text }))
                }
                keyboardType="phone-pad"
                returnKeyType="next"
                onSubmitEditing={() => addressRef.current?.focus()}
              />
            </View>
            <View style={styles.inputContainer}>
              <CustomTextInput
                ref={addressRef}
                style={styles.input}
                placeholder="Địa chỉ"
                placeholderTextColor="#999"
                value={tempUserInfo.address}
                onChangeText={(text) =>
                  setTempUserInfo((prev) => ({ ...prev, address: text }))
                }
                returnKeyType="next"
                onSubmitEditing={() => customAddressRef.current?.focus()}
              />
            </View>
            <TouchableOpacity
              style={[styles.updateButton, isLoading && styles.disabledButton]}
              onPress={handleUpdateUserInfo}
              disabled={isLoading}
            >
              <Text style={styles.updateButtonText}>
                {isLoading ? "Đang cập nhật..." : "Cập nhật"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
            {isLoading ? (
              <Text style={styles.loadingText}>Đang tải địa chỉ...</Text>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.addressSelector}
                  onPress={() => setModalVisible(true)}
                  disabled={isLoading}
                >
                  <Text
                    style={[
                      styles.addressText,
                      !selectedAddressText && styles.placeholderText,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {selectedAddressText || "Chọn địa chỉ giao hàng"}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#333" />
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                      <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>
                          Chọn địa chỉ giao hàng
                        </Text>
                        <TouchableOpacity
                          onPress={() => setModalVisible(false)}
                        >
                          <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                      </View>
                      {deliveryAddresses.length === 0 ? (
                        <Text style={styles.noAddressText}>
                          Chưa có địa chỉ giao hàng
                        </Text>
                      ) : (
                        <FlatList
                          data={deliveryAddresses}
                          keyExtractor={(item) => item.AddressId.toString()}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              style={styles.addressItem}
                              onPress={() => {
                                setSelectedAddressId(item.AddressId.toString());
                                setSelectedAddressText(item.Address);
                                setCustomAddress("");
                                setModalVisible(false);
                                console.log(
                                  "Selected address:",
                                  item.AddressId,
                                  item.Address
                                );
                              }}
                            >
                              <Text style={styles.addressItemText}>
                                {item.Address}
                              </Text>
                              {item.IsDefault && (
                                <Text style={styles.defaultBadge}>
                                  Mặc định
                                </Text>
                              )}
                            </TouchableOpacity>
                          )}
                        />
                      )}
                    </View>
                  </View>
                </Modal>
                {deliveryAddresses.length === 0 && (
                  <Text style={styles.noAddressText}>
                    Bạn chưa có địa chỉ giao hàng. Vui lòng thêm địa chỉ mới.
                  </Text>
                )}
                <View style={styles.inputContainer}>
                  <CustomTextInput
                    ref={customAddressRef}
                    style={styles.input}
                    placeholder="Hoặc nhập địa chỉ mới"
                    placeholderTextColor="#999"
                    value={customAddress}
                    onChangeText={(text) => {
                      setCustomAddress(text);
                      setSelectedAddressId("");
                      setSelectedAddressText("");
                    }}
                    returnKeyType="next"
                    onSubmitEditing={() => voucherRef.current?.focus()}
                  />
                </View>
                <TouchableOpacity
                  style={[
                    styles.updateButton,
                    isLoading && styles.disabledButton,
                  ]}
                  onPress={handleAddDeliveryAddress}
                  disabled={isLoading}
                >
                  <Text style={styles.updateButtonText}>
                    {isLoading ? "Đang cập nhật..." : "Cập nhật địa chỉ"}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mã giảm giá</Text>
            <View style={styles.voucherContainer}>
              <View style={styles.voucherInput}>
                <CustomTextInput
                  ref={voucherRef}
                  style={styles.input}
                  placeholder="Nhập mã voucher"
                  placeholderTextColor="#999"
                  value={voucherCode}
                  onChangeText={setVoucherCode}
                  returnKeyType="done"
                  onSubmitEditing={handleApplyVoucher}
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.applyVoucherButton,
                  isLoading && styles.disabledButton,
                ]}
                onPress={handleApplyVoucher}
                disabled={isLoading}
              >
                <Text style={styles.applyVoucherText}>
                  {isLoading ? "Đang áp dụng..." : "Áp dụng"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => setPaymentMethod("VN Pay")}
            >
              <Ionicons
                name={
                  paymentMethod === "VN Pay"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={20}
                color="#F28C38"
              />
              <Text style={styles.paymentText}>VN Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => setPaymentMethod("COD")}
            >
              <Ionicons
                name={
                  paymentMethod === "COD"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={20}
                color="#F28C38"
              />
              <Text style={styles.paymentText}>COD</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
          </View>
        </>
      );
    } catch (error) {
      console.error("Render error:", error);
      return <Text>Lỗi hiển thị giao diện: {error.message}</Text>;
    }
  };

  const renderFooter = () => {
    try {
      return (
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
              <Text style={styles.summaryValue}>
                {(discount || 0).toLocaleString("vi-VN")} đ
              </Text>
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
              onPress={() => navigation.navigate("Cart")}
            >
              <Text style={styles.backToCartText}>Quay lại giỏ hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.placeOrderButton,
                isLoading && styles.disabledButton,
              ]}
              onPress={handlePlaceOrder}
              disabled={isLoading}
            >
              <Text style={styles.placeOrderText}>
                {isLoading ? "Đang đặt hàng..." : "Đặt hàng"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      );
    } catch (error) {
      console.error("Render footer error:", error);
      return <Text>Lỗi hiển thị footer: {error.message}</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Đặt offset về 0 để tránh đẩy quá nhiều
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.orderList}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            {renderHeader()}
            {items.length > 0 ? (
              items.map((item) => (
                <MemoizedOrderItem key={item.id.toString()} item={item} />
              ))
            ) : (
              <Text
                style={{ textAlign: "center", marginTop: 20, color: "#777" }}
              >
                Không có sản phẩm nào trong đơn hàng.
              </Text>
            )}
            {renderFooter()}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}