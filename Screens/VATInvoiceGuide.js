import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../styles/VATInvoiceGuide";

const VATInvoiceGuide = ({ navigation }) => {
  const [currentText, setCurrentText] = useState(0);
  const carouselItems = ["Đặt hàng: 1800.6936", "93 Cửa hàng khắp cả nước"];

  // Carousel effect: Chuyển đổi sau 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) =>
        prev === carouselItems.length - 1 ? 0 : prev + 1
      );
    }, 1000); // 3 giây
    return () => clearInterval(interval); // Cleanup khi component unmount
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hướng dẫn xuất hóa đơn GTGT</Text>
      </View>

      {/* Carousel Section */}
      <View style={styles.carouselContainer}>
        <TouchableOpacity style={styles.carouselButton}>
          <Feather
            name={currentText === 0 ? "phone" : "map-pin"}
            size={16}
            color="#e67e22"
          />
          <Text style={styles.carouselText}>{carouselItems[currentText]}</Text>
        </TouchableOpacity>
      </View>

      {/* Logo Section */}
      <View style={styles.logoSection}>
        <Text style={styles.logoText}>SULI COFFEE</Text>
      </View>

      <ScrollView style={styles.contentScrollView}>
        {/* Main Title */}
        <Text style={styles.mainTitle}>HƯỚNG DẪN XUẤT HÓA ĐƠN GTGT</Text>

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Step 1 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Bước 1: Scan mã QR trên hóa đơn hoặc truy cập website:
              https://evat.thecoffeehouse.com/
            </Text>
            <Image
              source={require("../assets/hd1.png")}
              style={styles.invoiceImage}
              resizeMode="contain"
            />
            <Text style={styles.paragraph}>Lưu ý:</Text>
            <Text style={styles.paragraph}>
              - Khách hàng vui lòng thực hiện xuất hóa đơn GTGT ngay khi nhận
              được hóa đơn thanh toán.
            </Text>
            <Text style={styles.paragraph}>
              - Nếu khách hàng không nhận được hóa đơn thanh toán giao kèm với
              đơn hàng, vui lòng liên hệ 02 087 088 để được hỗ trợ.
            </Text>
          </View>
          {/* Step 2 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Bước 2: Nhập thông tin xuất hóa đơn
            </Text>
            <Text style={styles.paragraph}>
              Tại màn hình THÔNG TIN XUẤT HÓA ĐƠN, khách hàng vui lòng nhập các
              thông tin theo hướng dẫn dưới đây:
            </Text>
            <Text style={styles.paragraph}>
              a. Nhập đầy đủ kỳ tự gồm chữ và số của Số Bill vào ô "Nhập số
              bill"
            </Text>
            <Image
              source={require("../assets/hd2.png")}
              style={styles.stepImage}
              resizeMode="contain"
            />
            <Text style={styles.paragraph}>
              b. Nhập số điện thoại di động của khách hàng
            </Text>
            <Image
              source={require("../assets/hd3.png")}
              style={styles.stepImage}
              resizeMode="contain"
            />
            <Text style={styles.paragraph}>c. Nhập mã số thuế</Text>
            <Text style={styles.paragraph}>Lưu ý:</Text>
            <Text style={styles.paragraph}>
              - Khi nhập dung mã số thuế ở bước số 3, thông tin tên công ty và
              địa chỉ sẽ được tự động hiện thị. Trường hợp địa chỉ đăng ký với
              cơ quan thuế của bạn không cần phải nhập.
            </Text>
            <Text style={styles.paragraph}>
              - Thông tin tên công ty và địa chỉ được lấy theo mã số thuế mà
              doanh nghiệp đăng ký với Tổng Cục Thuế.
            </Text>
            <Image
              source={require("../assets/hd4.png")}
              style={styles.stepImage}
              resizeMode="contain"
            />
            <Text style={styles.paragraph}>
              d. Nhập địa chỉ email nhận hóa đơn
            </Text>
            <Image
              source={require("../assets/hd5.png")}
              style={styles.stepImage}
              resizeMode="contain"
            />
            <Text style={styles.paragraph}>
              e. Kiểm tra lại toàn bộ thông tin
            </Text>
            <Image
              source={require("../assets/hd6.png")}
              style={styles.stepImage}
              resizeMode="contain"
            />
          </View>
          {/* Step 3 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bước 3: Bấm "Gửi thông tin"</Text>
            <Image
              source={require("../assets/hd7.png")}
              style={styles.stepImage}
              resizeMode="contain"
            />
          </View>
          {/* Step 4 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bước 4: Nhận hóa đơn</Text>
            <Text style={styles.paragraph}>
              - Sau khi khách hàng Gửi thông tin, Hóa đơn điện tử sẽ được gửi về
              email mà khách hàng đã cung cấp trước đó.
            </Text>
            <Text style={styles.paragraph}>
              - Hệ thống sẽ gửi hóa đơn GTGT về email trong thời gian tối đa là
              5 phút (tính từ thời gian khách hàng hoàn tất form).
            </Text>
            <Text style={styles.paragraph}>
              - Khi nhận được hóa đơn, Khách hàng vui lòng kiểm tra lại nội dung
              hóa đơn.
            </Text>
            <Text style={styles.paragraph}>
              - Mọi thắc mắc về hóa đơn GTGT xin liên hệ 02871 087 088.
            </Text>
            <Text style={styles.paragraph}>
              - Thuế suất được tính theo thuế suất hiện hành tại thời điểm xuất
              hóa đơn.
            </Text>
            <Image
              source={require("../assets/hd8.png")}
              style={styles.invoiceImage}
              resizeMode="contain"
            />
          </View>
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>Đặt hàng: 1800 6936</Text>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => navigation.navigate("Contact")}
            >
              <Feather name="phone" size={20} color="#FFF" />
              <Text style={styles.contactText}>Liên hệ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Support Button */}
      <TouchableOpacity
        style={styles.supportButton}
        onPress={() => navigation.navigate("Contact")}
      >
        <MaterialCommunityIcons name="headphones" size={24} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VATInvoiceGuide;
