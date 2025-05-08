// Screens/Voucher/Voucher.js
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/VoucherStyles";

const Voucher = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("giaohang");

  // Các tab dùng để lọc phiếu ưu đãi
  const tabs = [
    { id: "giaohang", name: "Giao hàng", count: 5 },
    { id: "taicuahang", name: "Tại cửa hàng", count: 0 },
    { id: "mangdi", name: "Mang đi", count: 2 },
  ];

  // Danh sách voucher dựa trên tab DELIVERY (Giao hàng)
  const deliveryVouchers = [
    {
      id: "1",
      logo: require("../assets/v1.png"),
      title:
        "Nhập mã GIAM10KM - Giảm 40% + FREESHIP Đơn từ 10 Ly (tối đa 500K)",
      expiryDate: "30/04/2025",
    },
    {
      id: "2",
      logo: require("../assets/v2.png"),
      title: "Nhập mã GIAM30K - Giảm 30K Đơn Từ 99K",
      expiryDate: "30/04/2025",
    },
    {
      id: "3",
      logo: require("../assets/v3.png"),
      title: "Nhập mã GIAM30KM - Giảm 30% + Freeship Đơn Từ 5 Ly",
      expiryDate: "30/04/2025",
    },
    {
      id: "4",
      logo: require("../assets/v4.png"),
      title: "Nhập mã GIAM20K - Giảm 20K Đơn Từ 60K",
      expiryDate: "30/04/2025",
    },
    {
      id: "5",
      logo: require("../assets/v5.png"),
      title: "Nhập mã FREESHIP - Miễn phí vận chuyển",
      expiryDate: "30/04/2025",
    },
  ];

  // Danh sách voucher dựa trên tab PICKUP (Mang đi)
  const pickupVouchers = [
    {
      id: "6",
      logo: require("../assets/v1.png"),
      title: "Đồng giá Cà Phê Việt Nam (M) 35K",
      expiryDate: "30/04/2025",
    },
    {
      id: "7",
      logo: require("../assets/v6.png"),
      title: "Giảm 10% Đơn từ 2 Món",
      expiryDate: "30/04/2025",
    },
  ];

  // Lấy danh sách voucher dựa vào tab đang chọn
  const getVouchersByTab = () => {
    switch (activeTab) {
      case "giaohang":
        return deliveryVouchers;
      case "mangdi":
        return pickupVouchers;
      case "taicuahang":
        return [];
      default:
        return [];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Phiếu ưu đãi của bạn</Text>
        <View style={styles.placeholderRight} />
      </View>

      {/* Tab Bar */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activeTab === tab.id && {
                borderBottomColor: "#FFA500",
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && { color: "#FFA500" },
              ]}
            >
              {tab.name} <Text style={styles.countBadge}>{tab.count}</Text>
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Voucher List Section */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sẵn sàng sử dụng</Text>
        </View>

        {getVouchersByTab().map((voucher) => (
          <View key={voucher.id} style={styles.voucherItem}>
            <View style={styles.voucherLogo}>
              <Image source={voucher.logo} style={styles.logoImage} />
              <View style={styles.logoTextContainer}>
                <Text style={styles.logoMainText}>{voucher.logoText}</Text>
                {voucher.logoSubtext ? (
                  <Text style={styles.logoSubText}>{voucher.logoSubtext}</Text>
                ) : null}
              </View>
            </View>
            <View style={styles.voucherDivider} />
            <View style={styles.voucherInfo}>
              <Text style={styles.voucherTitle}>{voucher.title}</Text>
              <Text style={styles.voucherExpiry}>
                Hết hạn {voucher.expiryDate}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Voucher;