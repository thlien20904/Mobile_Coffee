import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/Reviews";

// Dữ liệu giả lập cho đánh giá
const reviewsData = [
  {
    id: "1",
    username: "t****4",
    rating: 5,
    date: "13-09-2023 14:46",
    content:
      "Trà sữa ô long truyền thống thơm mát, không quá ngọt, rất vừa miệng.",
    images: [require("../assets/ts_olongtqbo.png")],
    likes: 3,
    product: "Trà sữa Ô Long truyền thống",
    reply: null,
  },
  {
    id: "2",
    username: "tlien20904",
    rating: 5,
    date: "12-09-2023 11:20",
    content: "Trà sữa hồng đậm đà, topping dẻo ngon, sẽ ủng hộ dài lâu!",
    images: [require("../assets/hongtrasua.png")],
    likes: 5,
    product: "Hồng trà sữa trân châu",
    reply: null,
  },
  {
    id: "3",
    username: "t****4",
    rating: 4,
    date: "11-09-2023 09:15",
    content: "Dịch vụ tốt, nhân viên thân thiện. Uống hơi ngọt so với mình.",
    images: [],
    likes: 2,
    product: "Trà sữa mix vị",
    reply: null,
  },
];

// Dữ liệu giả lập cho sản phẩm chưa đánh giá
const pendingReviewsData = [
  {
    id: "1",
    shop: "quancafe_tphcm",
    title: "Trà sữa Thái Xanh thơm béo - Đậm vị lá dứa",
    bean: 200,
    image: require("../assets/db13.png"),
    daysToReview: 5,
  },
  {
    id: "2",
    shop: "cafe_kute",
    title: "Trà sữa Socola vị ngọt nhẹ, topping marshmallow",
    bean: 200,
    image: require("../assets/db14.png"),
    daysToReview: 1,
  },
  {
    id: "3",
    shop: "truesugar_boba",
    title: "Trà sữa Trân Châu Đường Đen – Ngon ngất ngây",
    bean: 200,
    image: require("../assets/db15.png"),
    daysToReview: 1,
  },
];

// Dữ liệu giả lập cho đánh giá nguồn mua
const sourceReviewsData = [
  {
    id: "1",
    username: "Commas",
    rating: 5,
    date: "13-01-2025 10:31",
    type: "Loại: Trà sữa truyền thống đường đen",
    content:
      "Vị trà đậm đà, topping dẻo ngon, đóng gói cẩn thận. Mình đã thử nhiều nơi nhưng trà sữa ở đây là best.",
    images: [require("../assets/tstcduongden.png")],
    product: "Trà sữa truyền thống đường đen",
    reply: null,
  },
  {
    id: "2",
    username: "Charme Store Official",
    rating: 5,
    date: "28-09-2023 08:37",
    type: "Loại: Trà sữa ô long",
    content:
      "Uống siêu mát, vị ô long thơm và không quá ngọt. Phù hợp cho những ai không thích vị béo nhiều. Sẽ ủng hộ dài dài!",
    images: [require("../assets/ts_olong.png")],
    product: "Trà sữa ô long",
    reply: null,
  },
  {
    id: "3",
    username: "247Store Fashion - 247Sto...",
    rating: 4,
    date: "23-08-2023 08:15",
    type: "Loại: Trà sữa thạch củ năng",
    content:
      "Trà sữa ngon nhưng giao hơi chậm. Thạch củ năng giòn sật rất ngon, vị trà ổn, không quá đắng.",
    images: [require("../assets/db15.png")],
    product: "Trà sữa thạch củ năng",
    reply: null,
  },
];

const Reviews = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("pending"); // Tab mặc định: Chưa đánh giá

  // Dữ liệu hiển thị dựa trên tab
  const dataToDisplay =
    activeTab === "pending"
      ? pendingReviewsData
      : activeTab === "reviewed"
      ? reviewsData
      : sourceReviewsData;

  // Component render cho sản phẩm chưa đánh giá
  const renderPendingItem = ({ item }) => (
    <View style={styles.pendingItem}>
      <Image
        source={item.image}
        style={styles.pendingImage}
        resizeMode="cover"
      />
      <View style={styles.pendingInfo}>
        <Text style={styles.shopName}>{item.shop}</Text>
        <Text style={styles.pendingTitle}>{item.title}</Text>
        <Text style={styles.daysToReview}>
          Còn {item.daysToReview} ngày để đánh giá
        </Text>
      </View>
      <TouchableOpacity style={styles.reviewButton}>
        <Text style={styles.reviewButtonText}>Đánh giá</Text>
        <Text style={styles.reviewButtonBean}>+{item.bean}</Text>
      </TouchableOpacity>
    </View>
  );

  // Component render cho đánh giá đã gửi hoặc đánh giá nguồn mua
  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewUsername}>{item.username}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(item.rating)].map((_, index) => (
            <Ionicons key={index} name="star" size={14} color="#FFD700" />
          ))}
        </View>
      </View>
      <Text style={styles.reviewDate}>{item.date}</Text>
      {item.type && <Text style={styles.reviewType}>{item.type}</Text>}
      <Text style={styles.reviewContent}>{item.content}</Text>
      {item.images && item.images.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {item.images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={styles.reviewImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      )}
      {item.product && <Text style={styles.reviewProduct}>{item.product}</Text>}
      <View style={styles.reviewFooter}>
        <TouchableOpacity style={styles.likeContainer}>
          <Ionicons name="thumbs-up-outline" size={16} color="#777" />
          <Text style={styles.likeCount}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.replyButton}>
          <Text style={styles.replyButtonText}>Phản hồi...</Text>
        </TouchableOpacity>
      </View>
    </View>
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
        <Text style={styles.headerTitle}>Đánh giá của tui</Text>
        <View style={styles.placeholderRight} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "pending" && styles.activeTab]}
          onPress={() => setActiveTab("pending")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "pending" && styles.activeTabText,
            ]}
          >
            Chưa đánh giá ({pendingReviewsData.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "reviewed" && styles.activeTab]}
          onPress={() => setActiveTab("reviewed")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "reviewed" && styles.activeTabText,
            ]}
          >
            Đã đánh giá
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "source" && styles.activeTab]}
          onPress={() => setActiveTab("source")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "source" && styles.activeTabText,
            ]}
          >
            Đánh giá nguồn mua
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bộ lọc sao (hiển thị cho tab "Đã đánh giá" và "Đánh giá nguồn mua") */}
      {activeTab !== "pending" && (
        <View style={styles.ratingFilterContainer}>
          <View style={styles.averageRating}>
            <Text style={styles.averageRatingText}>5.0</Text>
            <View style={styles.ratingStars}>
              {[...Array(5)].map((_, index) => (
                <Ionicons key={index} name="star" size={14} color="#FFD700" />
              ))}
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.ratingFilterButton}>
              <Text style={styles.ratingFilterText}>Tất cả (30)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ratingFilterButton}>
              <Text style={styles.ratingFilterText}>5 Sao (30)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ratingFilterButton}>
              <Text style={styles.ratingFilterText}>4 Sao (0)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ratingFilterButton}>
              <Text style={styles.ratingFilterText}>3 Sao (0)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ratingFilterButton}>
              <Text style={styles.ratingFilterText}>2 Sao (0)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ratingFilterButton}>
              <Text style={styles.ratingFilterText}>1 Sao (0)</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Danh sách */}
      <FlatList
        data={dataToDisplay}
        renderItem={
          activeTab === "pending" ? renderPendingItem : renderReviewItem
        }
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {activeTab === "pending"
              ? "Không còn đánh giá nào"
              : "Chưa có đánh giá nào"}
          </Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default Reviews;
