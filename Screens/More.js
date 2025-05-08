import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/More";

const More = ({ route }) => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra trạng thái đăng nhập từ AsyncStorage
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem("isLoggedIn");
        console.log("isLoggedIn in More:", loggedIn);
        setIsLoggedIn(loggedIn === "true");
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Khác</Text>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.ticketContainer}
          onPress={() => navigation.navigate("Voucher")}
        >
          <MaterialIcons name="confirmation-number" size={20} color="#d17842" />
          <Text style={styles.ticketText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notificationContainer}
          onPress={() => navigation.navigate("NotificationScreen")}
        >
          <Ionicons name="notifications-outline" size={24} color="#000" />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const SectionTitle = ({ title }) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  const TienIchItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.tienIchItem} onPress={onPress}>
      {icon}
      <Text style={styles.tienIchTitle}>{title}</Text>
    </TouchableOpacity>
  );

  const MenuItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIconContainer}>{icon}</View>
      <Text style={styles.menuTitle}>{title}</Text>
      <Feather name="chevron-right" size={20} color="#aaa" />
    </TouchableOpacity>
  );

  const handleNavigation = (screen, params = {}) => {
    console.log(`Navigating to ${screen}, isLoggedIn: ${isLoggedIn}`);
    if (isLoggedIn) {
      navigation.navigate(screen, params);
    } else {
      navigation.navigate("Login", {
        redirectTo: screen,
        redirectParams: params,
      });
    }
  };

  const handleLogout = async () => {
    try {
      // Xóa AsyncStorage
      await AsyncStorage.removeItem("isLoggedIn");
      await AsyncStorage.removeItem("userInfo");

      // Kiểm tra xem AsyncStorage đã xóa sạch chưa
      const loggedIn = await AsyncStorage.getItem("isLoggedIn");
      const userInfo = await AsyncStorage.getItem("userInfo");
      console.log(
        "After logout - isLoggedIn:",
        loggedIn,
        "userInfo:",
        userInfo
      );

      // Cập nhật state
      setIsLoggedIn(false);

      // Reset stack về Main để làm mới MainTabs
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });

      console.log("Đã đăng xuất và reset về Main");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login", {
      redirectTo: "Home",
      redirectParams: {},
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Header />
      <ScrollView style={styles.scrollView}>
        <SectionTitle title="Tiện ích" />
        <View style={styles.tienIchContainer}>
          <TienIchItem
            icon={<MaterialIcons name="receipt" size={24} color="#d17842" />}
            title="Lịch sử đơn hàng"
            onPress={() => handleNavigation("OrderHistory")}
          />
          <TienIchItem
            icon={
              <MaterialIcons name="description" size={24} color="#9c7af1" />
            }
            title="Điều khoản"
            onPress={() => navigation.navigate("Terms")}
          />
        </View>
        <View style={styles.tienIchContainer}>
          <TienIchItem
            icon={
              <MaterialIcons name="description" size={24} color="#9c7af1" />
            }
            title="Điều khoản VNPay"
            onPress={() => navigation.navigate("VNPayTerms")}
          />
        </View>

        <SectionTitle title="Hỗ trợ" />
        <View style={styles.menuContainer}>
          <MenuItem
            icon={<AntDesign name="star" size={20} color="#000" />}
            title="Đánh giá đơn hàng"
            onPress={() => handleNavigation("Reviews")}
          />
          <MenuItem
            icon={<Ionicons name="chatbubble-outline" size={20} color="#000" />}
            title="Liên hệ và góp ý"
            onPress={() => navigation.navigate("Contact")}
          />
          <MenuItem
            icon={<Feather name="file-text" size={20} color="#000" />}
            title="Hướng dẫn xuất hoá đơn GTGT"
            onPress={() => navigation.navigate("VATInvoiceGuide")}
          />
        </View>

        <SectionTitle title="Tài khoản" />
        <View style={styles.menuContainer}>
          <MenuItem
            icon={<Feather name="user" size={20} color="#000" />}
            title="Thông tin cá nhân"
            onPress={() => handleNavigation("UserProfile")}
          />
          <MenuItem
            icon={<Feather name="bookmark" size={20} color="#000" />}
            title="Địa chỉ"
            onPress={() => handleNavigation("MyAddresses")}
          />
          <MenuItem
            icon={<Feather name="settings" size={20} color="#000" />}
            title="Cài đặt"
            onPress={() => navigation.navigate("Settings")}
          />
          <MenuItem
            icon={
              <Feather
                name={isLoggedIn ? "log-out" : "log-in"}
                size={20}
                color="#000"
              />
            }
            title={isLoggedIn ? "Đăng xuất" : "Đăng nhập"}
            onPress={isLoggedIn ? handleLogout : handleLogin}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default More;