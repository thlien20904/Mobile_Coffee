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

// B1: Component DiscoverMore hiển thị danh sách ưu đãi, cập nhật, hoặc bài viết
const DiscoverMore = ({ navigation }) => {
  // B2: State quản lý tab đang chọn (mặc định: specialOffers)
  const [activeTab, setActiveTab] = useState("specialOffers");

  // B3: Chọn dữ liệu hiển thị dựa trên tab đang chọn
  const dataToDisplay =
    activeTab === "specialOffers"
      ? specialOffersData
      : activeTab === "updates"
      ? updatesData
      : coffeeLoverData;

  // B4: Hàm render mỗi mục (ưu đãi, bài viết) với ảnh, tiêu đề, ngày
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

  // B5: Giao diện chính của màn hình
  return (
    <SafeAreaView style={styles.container}>
      {/* B6: Header với nút quay lại và tiêu đề */}
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

      {/* B7: Tabs để chọn loại nội dung (Ưu đãi, Cập nhật, CoffeeLover) */}
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

      {/* B8: Hiển thị danh sách nội dung dạng lưới 2 cột */}
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

// B9: Xuất component để sử dụng trong ứng dụng
export default DiscoverMore;
