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
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import styles from "../styles/OffersStyles";
import { vouchersData, exchangeData } from "../data/offers"; // Import từ data/offers.js

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
            <Text style={styles.progressSubtext}>Chưa tích điểm</Text>
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