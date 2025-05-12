import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/PromotionDetailStyles"; // Đường dẫn đến file styles

const PromotionDetail = ({ route, navigation }) => {
  const { promotion } = route.params; // Nhận dữ liệu từ route.params

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.headerSection}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              size={28}
              color="#000"
              style={styles.backButton}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{promotion.title}</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Hình ảnh khuyến mãi với overlay */}
        <View style={styles.promotionImageContainer}>
          <Image
            source={promotion.image}
            style={styles.promotionImage}
            resizeMode="cover"
          />
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>
              Luôn vui tươi giảm 30% +freeship
            </Text>
            <Text style={styles.overlaySubtitle}>
              Áp dụng cho đơn Giao hàng từ 5 ly bất kỳ
            </Text>
            <Text style={styles.overlayCode}>{promotion.code}</Text>
          </View>
        </View>

        {/* Mô tả */}
        <View style={styles.section}>
          <Text style={styles.description}>{promotion.description}</Text>
        </View>

        {/* Thông tin chi tiết: Thời gian áp dụng, mã khuyến mãi, ghi chú */}
        <View style={styles.infoContainer}>
          {promotion.validity && (
            <Text style={styles.infoText}>
              Từ {promotion.validity} team mở app The Coffee House nhập mã:{" "}
              <Text style={styles.code}>{promotion.code}</Text>
            </Text>
          )}
          {promotion.note && <Text style={styles.note}>*{promotion.note}</Text>}
        </View>

        {/* Phần hành động */}
        <View style={styles.actionContainer}>
          <Text style={styles.actionTitle}>Minh cà phê nhé!</Text>
          <Text style={styles.actionText}>
            Chốt đơn ngay:{" "}
            <Text
              style={styles.actionLink}
              onPress={() =>
                Linking.openURL("https://tchapp.page.link/menu609")
              }
            >
              https://tchapp.page.link/menu609
            </Text>
          </Text>
          <Text style={styles.actionText}>Điện thoại: 18006936</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PromotionDetail;
