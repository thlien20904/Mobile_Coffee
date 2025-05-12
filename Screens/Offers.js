import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import styles from "../styles/OffersStyles";
import { vouchersData, exchangeData } from "../data/offers"; // Import từ data/offers.js

// B1: Offers - Màn hình ưu đãi chính.
// - Mục đích: Hiển thị ưu đãi và đổi Bean.
// - Cách thực hiện: Dùng ScrollView, điều hướng qua navigation.
// - Lý do: ScrollView cho cuộn, navigation chuyển màn.
const Offers = ({ navigation }) => {
  // B2: Giao diện chính - Chứa toàn bộ nội dung.
  // - Mục đích: Tổ chức layout ưu đãi.
  // - Cách thực hiện: Dùng SafeAreaView và ScrollView.
  // - Lý do: SafeAreaView tránh notch, ScrollView quản lý dài.
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <ScrollView style={styles.scrollView}>
        {/* B3: Header với ảnh nền - Hiển thị tiêu đề và nút.
// - Mục đích: Tạo giao diện đẹp với info.
// - Cách thực hiện: Image làm nền, View chứa header.
// - Lý do: Image tăng thẩm mỹ, TouchableOpacity cho tương tác. */}
        <View style={styles.backgroundImageContainer}>
          <Image
            source={require("../assets/a2.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
          <View style={styles.headerContainer}>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Ưu đãi</Text>
              <Text style={styles.headerSubtitle}>Mới</Text>
              <Text style={styles.beanCount}>0 BEAN</Text>
            </View>
            <TouchableOpacity
              style={styles.voucherButton}
              onPress={() => navigation.navigate("Voucher")}
            >
              <MaterialCommunityIcons
                name="ticket-percent-outline"
                size={20}
                color="#FFA500"
              />
              <Text style={styles.voucherButtonText}>Voucher của tôi</Text>
            </TouchableOpacity>
          </View>

          {/* B4: Barcode - Hiển thị mã vạch.
// - Mục đích: Cung cấp mã cho người dùng.
// - Cách thực hiện: Dùng Image và Text.
// - Lý do: Image hiển thị mã, Text bổ sung info. */}
          <View style={styles.barcodeContainer}>
            <View style={styles.barcodePanel}>
              <Image
                source={require("../assets/a1.png")}
                style={{ width: 5500, height: 50, marginBottom: 8 }}
                resizeMode="contain"
              />
              <Text style={styles.barcodeText}>M68686868</Text>
            </View>
          </View>

          {/* B5: Thanh tiến độ - Hiển thị cấp độ và thông tin.
// - Mục đích: Cập nhật tiến độ thăng hạng.
// - Cách thực hiện: Dùng View và Text.
// - Lý do: View làm thanh, Text hiển thị chi tiết. */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>MỚI</Text>
            <Text style={styles.progressLabelRight}>ĐỒNG</Text>
            <View style={styles.progressBar}>
              <View style={styles.progressIndicator} />
            </View>
            <Text style={styles.progressText}>
              Còn 100 BEAN nữa bạn sẽ thăng hạng.
            </Text>
            <Text style={styles.progressSubtext}>
              Đổi quà không ảnh hưởng tới việc thăng hạng của bạn
            </Text>
            <Text style={styles.progressSubtext}>Chưa tích điểm</Text>
          </View>
        </View>

        {/* B6: Menu - Hiển thị các tùy chọn điều hướng.
// - Mục đích: Cung cấp truy cập nhanh.
// - Cách thực hiện: Dùng TouchableOpacity và icons.
// - Lý do: TouchableOpacity cho tương tác, icons làm đẹp. */}
        <View style={styles.menuContainer}>
          <View style={styles.menuRow}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate("Membership")}
            >
              <Ionicons name="star-outline" size={24} color="#FFA500" />
              <Text style={styles.menuItemText}>Hạng thành viên</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate("ExchangeBean")}
            >
              <AntDesign name="gift" size={24} color="#FFA500" />
              <Text style={styles.menuItemText}>Đổi Bean</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menuRow}>
            <TouchableOpacity style={styles.menuItem}>
              <MaterialCommunityIcons
                name="coffee-outline"
                size={24}
                color="#FFA500"
              />
              <Text style={styles.menuItemText}>Lịch sử BEAN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate("Voucher")}
            >
              <Ionicons name="shield-outline" size={24} color="#1E90FF" />
              <Text style={styles.menuItemText}>Quyền lợi của bạn</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* B7: Phần phiếu ưu đãi - Hiển thị danh sách voucher.
// - Mục đích: Cung cấp danh sách ưu đãi.
// - Cách thực hiện: Dùng map để render vouchersData.
// - Lý do: Map lặp qua mảng, TouchableOpacity cho tương tác. */}
        <View style={styles.vouchersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Phiếu ưu đãi của bạn</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Voucher")}>
              <Text style={styles.viewAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          {vouchersData.map((voucher) => (
            <TouchableOpacity
              key={voucher.id}
              style={styles.voucherItem}
              onPress={() =>
                navigation.navigate("PromotionDetail", { promotion: voucher })
              }
            >
              <Image
                source={voucher.image}
                style={styles.voucherImage}
                resizeMode="contain"
              />
              <View style={styles.voucherDivider} />
              <View style={styles.voucherInfo}>
                <Text style={styles.voucherTitle}>{voucher.title}</Text>
                <Text style={styles.voucherExpiry}>{voucher.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* B8: Phần đổi Bean - Hiển thị danh sách đổi quà.
// - Mục đích: Cung cấp danh sách đổi Bean.
// - Cách thực hiện: Dùng map để render exchangeData.
// - Lý do: Map lặp qua mảng, TouchableOpacity cho tương tác. */}
        <View style={styles.exchangeSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Đổi Bean</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ExchangeBean")}
            >
              <Text style={styles.viewAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          {exchangeData.map((exchange) => (
            <TouchableOpacity
              key={exchange.id}
              style={styles.exchangeItem}
              onPress={() =>
                navigation.navigate("PromotionDetail", { promotion: exchange })
              }
            >
              <Image source={exchange.image} style={styles.exchangeImage} />
              <View style={styles.exchangeInfo}>
                <Text style={styles.exchangeTitle}>{exchange.title}</Text>
                <View style={styles.beanBadge}>
                  <Text style={styles.beanCount}>{exchange.beanCost}</Text>
                  <Text style={styles.beanLabel}>BEAN</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Offers;
