import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Keyboard,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { NGROK_BASE_URL } from "@env";
import styles from "../styles/StoreStyle";

// Ảnh mặc định (fallback) nếu không tải được ảnh từ URL
const defaultImage = require("../assets/banner.png");

// Tách API URL ra thành biến môi trường hoặc file config
const API_BASE_URL = NGROK_BASE_URL;

export default function StoreScreen({ navigation }) {
  const [stores, setStores] = useState([]); // Danh sách cửa hàng gốc
  const [filteredStores, setFilteredStores] = useState([]); // Danh sách cửa hàng đã lọc
  const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm
  const [errorMessage, setErrorMessage] = useState("");
  const searchInputRef = useRef(null); // Tham chiếu đến TextInput

  // Gọi API để lấy danh sách cửa hàng
  useEffect(() => {
    const API_URL = `${API_BASE_URL}/api/stores`;

    const fetchStores = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(
            `Phản hồi từ server không phải JSON (Status: ${
              response.status
            }): ${text.substring(0, 100)}...`
          );
        }

        if (!response.ok) {
          let errorMessage = `Lỗi từ server (Status: ${response.status})`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || "Lỗi khi lấy danh sách cửa hàng.";
          } catch (jsonError) {
            if (response.status === 421) {
              errorMessage =
                "Tunnel ngrok không khớp. Vui lòng kiểm tra URL ngrok.";
            } else if (response.status === 404) {
              errorMessage =
                "Không tìm thấy cửa hàng hoặc tunnel ngrok đang offline.";
            } else {
              errorMessage = response.statusText || errorMessage;
            }
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log("Stores from API:", data);
        setStores(data);
        setFilteredStores(data); // Ban đầu, danh sách lọc giống danh sách gốc
        setErrorMessage("");
      } catch (error) {
        console.error("Error fetching stores:", error.message);
        setErrorMessage("Lỗi khi lấy danh sách cửa hàng: " + error.message);
        setStores([]);
        setFilteredStores([]);
      }
    };

    fetchStores();
  }, []);

  // Hàm lọc cửa hàng dựa trên từ khóa tìm kiếm
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredStores(stores);
    } else {
      const filtered = stores.filter((store) =>
        store.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStores(filtered);
    }
  };

  // Component cửa hàng (tối ưu với React.memo)
  const StoreItem = React.memo(({ item, navigation }) => (
    <TouchableOpacity
      style={styles.storeCard}
      onPress={() => {
        Keyboard.dismiss(); // Ẩn bàn phím khi nhấn vào cửa hàng
        navigation.navigate("StoreDetail", { storeId: item.id });
      }}
    >
      <View style={styles.storeRow}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.storeImage}
            resizeMode="cover"
            defaultSource={defaultImage}
          />
        </View>
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{item.name}</Text>
          <Text style={styles.storeAddress}>{item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ));

  const renderStoreItem = ({ item }) => (
    <StoreItem item={item} navigation={navigation} />
  );

  // Header của FlatList
  const renderHeader = () => (
    <>
      {filteredStores.length > 0 && (
        <Text style={styles.sectionTitle}>Các cửa hàng khác</Text>
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      {/* Header và Search trong cùng một View với nền trắng */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerText}>Cửa hàng</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.navigate("Voucher")}
            >
              <MaterialCommunityIcons
                name="ticket-outline"
                size={24}
                color="#E57905"
                style={styles.icon}
              />
              <Text style={styles.iconText}>10</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.navigate("NotificationScreen")}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#000"
                style={styles.icon}
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Thanh tìm kiếm với panel bên ngoài */}
        <View style={styles.searchPanel}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#777"
              style={styles.searchIcon}
            />
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Tìm kiếm"
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor="#777"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
              blurOnSubmit={false}
            />
            <TouchableOpacity style={styles.mapButton}>
              <Ionicons name="map-outline" size={20} color="#777" />
              <Text style={styles.mapButtonText}>Bản đồ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {errorMessage ? (
        <View style={{ padding: 10, backgroundColor: "#ffcccc", margin: 10 }}>
          <Text style={{ color: "red", textAlign: "center" }}>
            {errorMessage}
          </Text>
        </View>
      ) : null}

      {/* Hiển thị thông báo nếu không tìm thấy cửa hàng */}
      {searchQuery.trim() !== "" && filteredStores.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>Không tìm thấy cửa hàng</Text>
        </View>
      ) : (
        <FlatList
          data={filteredStores}
          renderItem={renderStoreItem}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.storeSection}
          initialNumToRender={10}
          windowSize={5}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
        />
      )}
    </SafeAreaView>
  );
}
