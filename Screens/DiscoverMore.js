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
import {
  specialOffersData,
  updatesData,
  coffeeLoverData,
} from "../data/offers"; // Import từ data/offers.js

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
    <TouchableOpacity
      style={styles.discoverItem}
      onPress={() =>
        navigation.navigate("PromotionDetail", { promotion: item })
      }
    >
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
            Cập nhật từ Nhà ({updatesData.length})
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
            #CoffeeLover ({coffeeLoverData.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách với 2 cột */}
      <FlatList
        data={dataToDisplay}
        renderItem={renderDiscoverItem}
        keyExtractor={(item) => item.id.toString()}
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