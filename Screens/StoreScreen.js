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
import MapView, { Marker, UrlTile } from "react-native-maps";
import * as Location from "expo-location";
import { NGROK_BASE_URL } from "@env";
import styles from "../styles/StoreStyle";
import axios from "axios";

// Ảnh mặc định (fallback) nếu không tải được ảnh từ URL
const defaultImage = require("../assets/banner.png");

// Tách API URL ra thành biến môi trường hoặc file config
const API_BASE_URL = NGROK_BASE_URL;

export default function StoreScreen({ navigation }) {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMapView, setIsMapView] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  const searchInputRef = useRef(null);

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

        if (!response.ok) {
          let errorMessage = `Lỗi từ server (Status: ${response.status})`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || "Lỗi khi lấy danh sách cửa hàng.";
          } catch (jsonError) {
            const errorText = await response.text();
            if (response.status === 421) {
              errorMessage =
                "Tunnel ngrok không khớp. Vui lòng kiểm tra URL ngrok.";
            } else if (response.status === 404) {
              errorMessage =
                "Không tìm thấy cửa hàng hoặc tunnel ngrok đang offline.";
            } else {
              errorMessage = errorText || errorMessage;
            }
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log("Stores from API:", data);
        setStores(data);
        setFilteredStores(data);
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

  // Lấy vị trí người dùng và sắp xếp cửa hàng theo khoảng cách
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        setErrorMessage("Cần cấp quyền vị trí để sắp xếp cửa hàng gần bạn.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const newUserLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(newUserLocation);

      if (stores.length > 0) {
        const sortedStores = [...stores].sort((a, b) => {
          if (!a.latitude || !a.longitude) return 1;
          if (!b.latitude || !b.longitude) return -1;
          const distA = getDistance(
            newUserLocation.latitude,
            newUserLocation.longitude,
            a.latitude,
            a.longitude
          );
          const distB = getDistance(
            newUserLocation.latitude,
            newUserLocation.longitude,
            b.latitude,
            b.longitude
          );
          return distA - distB;
        });
        setFilteredStores(sortedStores);
      }
    })();
  }, [stores]);

  // Hàm tính khoảng cách (km) giữa hai điểm tọa độ
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Hàm tìm kiếm địa chỉ qua Nominatim API
  const geocodeAddress = async (address) => {
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: address,
            format: "json",
            limit: 1,
          },
          headers: {
            "User-Agent": "SuliCoffeeApp/1.0",
          },
        }
      );

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        };
      }
      return null;
    } catch (error) {
      console.error("Error geocoding address:", error.message);
      return null;
    }
  };

  // Hàm lọc cửa hàng dựa trên từ khóa tìm kiếm
  const handleSearch = async (query) => {
    setSearchQuery(query);
    setSearchLocation(null);

    if (query.trim() === "") {
      if (userLocation) {
        const sortedStores = [...stores].sort((a, b) => {
          if (!a.latitude || !a.longitude) return 1;
          if (!b.latitude || !b.longitude) return -1;
          const distA = getDistance(
            userLocation.latitude,
            userLocation.longitude,
            a.latitude,
            a.longitude
          );
          const distB = getDistance(
            userLocation.latitude,
            userLocation.longitude,
            b.latitude,
            b.longitude
          );
          return distA - distB;
        });
        setFilteredStores(sortedStores);
      } else {
        setFilteredStores(stores);
      }
      setErrorMessage("");
      return;
    }

    let filtered = stores.filter((store) => {
      const matchesName = store.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesAddress = store.address
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesName || matchesAddress;
    });

    if (isMapView && (userLocation || searchLocation)) {
      if (!filtered.length && query.length > 10) {
        const coords = await geocodeAddress(query);
        if (coords) {
          setSearchLocation(coords);
          filtered = [...stores].sort((a, b) => {
            if (!a.latitude || !a.longitude) return 1;
            if (!b.latitude || !b.longitude) return -1;
            const distA = getDistance(
              coords.latitude,
              coords.longitude,
              a.latitude,
              a.longitude
            );
            const distB = getDistance(
              coords.latitude,
              coords.longitude,
              b.latitude,
              b.longitude
            );
            return distA - distB;
          });
        }
      } else if (filtered.length && userLocation) {
        filtered.sort((a, b) => {
          if (!a.latitude || !a.longitude) return 1;
          if (!b.latitude || !b.longitude) return -1;
          const distA = getDistance(
            userLocation.latitude,
            userLocation.longitude,
            a.latitude,
            a.longitude
          );
          const distB = getDistance(
            userLocation.latitude,
            userLocation.longitude,
            b.latitude,
            b.longitude
          );
          return distA - distB;
        });
      }
    }

    setFilteredStores(filtered);
    setErrorMessage(
      filtered.length === 0 ? "Không tìm thấy cửa hàng phù hợp." : ""
    );
  };

  const StoreItem = React.memo(({ item, navigation }) => (
    <TouchableOpacity
      style={styles.storeCard}
      onPress={() => {
        Keyboard.dismiss();
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
            onError={(e) =>
              console.log(`Failed to load image for ${item.name}:`, e.nativeEvent.error)
            }
          />
        </View>
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{item.name}</Text>
          <Text style={styles.storeAddress}>{item.address}</Text>
          {userLocation && item.latitude && item.longitude && (
            <Text style={styles.storeDistance}>
              Khoảng cách:{" "}
              {getDistance(
                userLocation.latitude,
                userLocation.longitude,
                item.latitude,
                item.longitude
              ).toFixed(2)}{" "}
              km
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  ));

  const renderStoreItem = ({ item }) => (
    <StoreItem item={item} navigation={navigation} />
  );

  const renderHeader = () => (
    <>
      {filteredStores.length > 0 && (
        <Text style={styles.sectionTitle}>
          {searchQuery.trim() === "" ? "Tất cả cửa hàng" : "Kết quả tìm kiếm"}
        </Text>
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
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
              placeholder="Tìm kiếm tên hoặc địa chỉ"
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor="#777"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
              blurOnSubmit={false}
            />
            <TouchableOpacity
              style={styles.mapButton}
              onPress={async () => {
                setIsMapView(!isMapView);
                if (!userLocation) {
                  let { status } =
                    await Location.requestForegroundPermissionsAsync();
                  if (status === "granted") {
                    let location = await Location.getCurrentPositionAsync({});
                    setUserLocation({
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    });
                  }
                }
              }}
            >
              <Ionicons name="map-outline" size={20} color="#777" />
              <Text style={styles.mapButtonText}>
                {isMapView ? "Danh sách" : "Bản đồ"}
              </Text>
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

      {isMapView ? (
        <MapView
          style={styles.mapContainer}
          initialRegion={
            searchLocation || userLocation
              ? {
                  latitude: (searchLocation || userLocation).latitude,
                  longitude: (searchLocation || userLocation).longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }
              : {
                  latitude: 21.0285,
                  longitude: 105.8542,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }
          }
        >
          <UrlTile
            urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            subdomains={["a", "b", "c"]}
          />
          {filteredStores.map((store) =>
            store.latitude && store.longitude ? (
              <Marker
                key={store.id.toString()}
                coordinate={{
                  latitude: store.latitude,
                  longitude: store.longitude,
                }}
                title={store.name}
                description={store.address}
                onPress={() => {
                  Keyboard.dismiss();
                  navigation.navigate("StoreDetail", { storeId: store.id });
                }}
              />
            ) : null
          )}
        </MapView>
      ) : filteredStores.length === 0 ? (
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