import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/DiscoverMore";

// Dữ liệu giả lập cho tab "Ưu đãi đặc biệt"
const specialOffersData = [
  {
    id: "1",
    title: "Luôn Vui Tươi, Nhẹ Mới 30% + Freeship",
    date: "02/03",
    image: require("../assets/banner.png"),
  },
  {
    id: "2",
    title: "Deal Nhẹ Rộn Ràng, Chó Bạn Chột Đón!",
    date: "01/03",
    image: require("../assets/banner2.png"),
  },
];

// Dữ liệu giả lập cho tab "Cập nhật từ Nhà"
const updatesData = [
  {
    id: "1",
    title: "Tết Này, Mình Cà Phê Nhé!",
    date: "24/01",
    image: require("../assets/banner3.png"),
  },
  {
    id: "2",
    title: "Mê A-Mê, Uống Là Mê!",
    date: "14/01",
    image: require("../assets/banner5.png"),
  },
  {
    id: "3",
    title: "Minigame Trà Xanh Tây Bắc: Điệp Lực Phải Kho...",
    date: "29/08",
    image: require("../assets/banner6.png"),
  },
];

// Dữ liệu giả lập cho tab "#CoffeeLover"
const coffeeLoverData = [
  {
    id: "1",
    title: "Nghệ thuật pha chế - V60",
    date: "29/08",
    image: require("../assets/banner6.png"),
  },
  {
    id: "2",
    title: "Nghệ thuật pha chế - Kalita Wave",
    date: "28/08",
    image: require("../assets/banner2.png"),
  },
  {
    id: "3",
    title: "Nghệ thuật pha chế - Cold Brew",
    date: "27/08",
    image: require("../assets/banner3.png"),
  },
  {
    id: "4",
    title: "Nghệ thuật pha chế - Espresso",
    date: "26/08",
    image: require("../assets/banner4.png"),
  },
];

const DiscoverMore = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("specialOffers"); // Tab mặc định: Ưu đãi đặc biệt

  // Dữ liệu hiển thị dựa trên tab
  const dataToDisplay =
    activeTab === "specialOffers"
      ? specialOffersData
      : activeTab === "updates"
      ? updatesData
      : coffeeLoverData;

  // Component render cho từng mục
  const renderDiscoverItem = ({ item }) => (
    <TouchableOpacity style={styles.discoverItem}>
      <Image
        source={item.image}
        style={styles.discoverImage}
        resizeMode="cover"
      />
      <Text style={styles.discoverTitle}>{item.title}</Text>
      <View style={styles.discoverDateContainer}>
        <Ionicons name="calendar-outline" size={14} color="#777" />
        <Text style={styles.discoverDate}> {item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Khám phá thêm</Text>
        <View style={styles.placeholderRight} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "specialOffers" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("specialOffers")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "specialOffers" && styles.activeTabText,
            ]}
          >
            Ưu đãi đặc biệt ({specialOffersData.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "updates" && styles.activeTab]}
          onPress={() => setActiveTab("updates")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "updates" && styles.activeTabText,
            ]}
          >
            Cập nhật từ Nhà
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "coffeeLover" && styles.activeTab]}
          onPress={() => setActiveTab("coffeeLover")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "coffeeLover" && styles.activeTabText,
            ]}
          >
            #CoffeeLover
          </Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách với 2 cột */}
      <FlatList
        data={dataToDisplay}
        renderItem={renderDiscoverItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Hiển thị 2 cột
        columnWrapperStyle={styles.columnWrapper} // Style cho hàng
        ListEmptyComponent={
          <Text style={styles.emptyText}>Chưa có nội dung nào</Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default DiscoverMore;
