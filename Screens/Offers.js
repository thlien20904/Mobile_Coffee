// Screens/Offers.js
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
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import styles from "../styles/OffersStyles";

// Dữ liệu ảnh cho phần "Đổi Bean" từ thư mục assets
const exchangeImages = [
  require("../assets/b1.png"), // [BTASKEE] Giảm 20K tất cả các dịch vụ
  require("../assets/b2.png"), // [BTASKEE] Giảm 30% dịch vụ Tổng vệ sinh
  require("../assets/b3.png"), // [BTASKEE] Giảm 85K cho khách hàng mới của bTaskee
  require("../assets/b4.png"), // Cơm Nhà, Pizza, Pasta giảm 10K
  require("../assets/db2.png"), // Bánh Mochi Kem chỉ 10K
];

const Offers = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <ScrollView style={styles.scrollView}>
        {/* Phần header, barcode, progress được bao trong một View với ảnh nền */}
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
            <Text style={styles.progressSubtext}>Chưa tích điểmđiểm</Text>
          </View>
        </View>

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

        <View style={styles.vouchersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Phiếu ưu đãi của bạn</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Voucher")}>
              <Text style={styles.viewAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.voucherItem}>
            <Image
              source={require("../assets/v1.png")}
              style={styles.voucherImage}
              resizeMode="contain"
            />
            <View style={styles.voucherDivider} />
            <View style={styles.voucherInfo}>
              <Text style={styles.voucherTitle}>Giảm 30K Đơn Từ 99K</Text>
              <Text style={styles.voucherExpiry}>Hết hạn 30/04/2025</Text>
            </View>
          </View>

          <View style={styles.voucherItem}>
            <Image
              source={require("../assets/v2.png")}
              style={styles.voucherImage}
              resizeMode="contain"
            />
            <View style={styles.voucherDivider} />
            <View style={styles.voucherInfo}>
              <Text style={styles.voucherTitle}>
                Giảm 30% + Freeship Đơn Từ 5 Ly
              </Text>
              <Text style={styles.voucherExpiry}>Hết hạn 30/04/2025</Text>
            </View>
          </View>
        </View>

        <View style={styles.exchangeSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Đổi Bean</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ExchangeBean")}
            >
              <Text style={styles.viewAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.exchangeItem}>
            <Image source={exchangeImages[0]} style={styles.exchangeImage} />
            <View style={styles.exchangeInfo}>
              <Text style={styles.exchangeTitle}>
                [BTASKEE] Giảm 20K tất cả các dịch vụ
              </Text>
              <View style={styles.beanBadge}>
                <Text style={styles.beanCount}>99</Text>
                <Text style={styles.beanLabel}>BEAN</Text>
              </View>
            </View>
          </View>

          <View style={styles.exchangeItem}>
            <Image source={exchangeImages[1]} style={styles.exchangeImage} />
            <View style={styles.exchangeInfo}>
              <Text style={styles.exchangeTitle}>
                [BTASKEE] Giảm 30% dịch vụ Tổng vệ sinh
              </Text>
              <View style={styles.beanBadge}>
                <Text style={styles.beanCount}>99</Text>
                <Text style={styles.beanLabel}>BEAN</Text>
              </View>
            </View>
          </View>

          <View style={styles.exchangeItem}>
            <Image source={exchangeImages[2]} style={styles.exchangeImage} />
            <View style={styles.exchangeInfo}>
              <Text style={styles.exchangeTitle}>
                [BTASKEE] Giảm 85K cho khách hàng mới của bTaskee
              </Text>
              <View style={styles.beanBadge}>
                <Text style={styles.beanCount}>99</Text>
                <Text style={styles.beanLabel}>BEAN</Text>
              </View>
            </View>
          </View>

          <View style={styles.exchangeItem}>
            <Image source={exchangeImages[3]} style={styles.exchangeImage} />
            <View style={styles.exchangeInfo}>
              <Text style={styles.exchangeTitle}>
                Cơm Nhà, Pizza, Pasta giảm 10K
              </Text>
              <View style={styles.beanBadge}>
                <Text style={styles.beanCount}>400</Text>
                <Text style={styles.beanLabel}>BEAN</Text>
              </View>
            </View>
          </View>

          <View style={styles.exchangeItem}>
            <Image source={exchangeImages[4]} style={styles.exchangeImage} />
            <View style={styles.exchangeInfo}>
              <Text style={styles.exchangeTitle}>Bánh Mochi Kem chỉ 10K</Text>
              <View style={styles.beanBadge}>
                <Text style={styles.beanCount}>400</Text>
                <Text style={styles.beanLabel}>BEAN</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Offers;
