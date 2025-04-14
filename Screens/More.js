import React from "react";
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
import styles from "../styles/More";

const More = () => {
  const navigation = useNavigation();

  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Khác</Text>
      <View style={styles.headerRight}>
        <View style={styles.ticketContainer}>
          <MaterialIcons name="confirmation-number" size={20} color="#d17842" />
          <Text style={styles.ticketText}>6</Text>
        </View>
        <View style={styles.notificationContainer}>
          <Ionicons name="notifications-outline" size={24} color="#000" />
          <View style={styles.badge} />
        </View>
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
            onPress={() => navigation.navigate("OrderHistory")}
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
            onPress={() => navigation.navigate("UserProfile")}
          />
          <MenuItem
            icon={<Feather name="bookmark" size={20} color="#000" />}
            title="Địa chỉ đã lưu"
          />
          <MenuItem
            icon={<Feather name="settings" size={20} color="#000" />}
            title="Cài đặt"
            onPress={() => navigation.navigate("Settings")}
          />
          <MenuItem
            icon={<Feather name="log-out" size={20} color="#000" />}
            title="Đăng xuất"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default More;
