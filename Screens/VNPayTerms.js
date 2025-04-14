import React from "react";
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
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../styles/VNPayTerms";

const VNPayTerms = ({ navigation }) => {
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
        <Text style={styles.headerTitle}>Điều khoản VNPay</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Stores Count Banner */}
      <View style={styles.storesBanner}>
        <MaterialCommunityIcons name="motorbike" size={30} color="#e67e22" />
        <View style={styles.storesTextContainer}>
          <Text style={styles.storesText}>Giao hàng địa chỉ giao hàng</Text>
          <Text style={styles.storesSubText}>Tài: Nhập địa chỉ giao hàng</Text>
        </View>
        <View style={styles.storesIcons}>
          <TouchableOpacity>
            <Feather name="user" size={24} style={styles.storesIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="shopping-cart" size={24} style={styles.storesIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.contentScrollView}>
        {/* Main Title */}
        <Text style={styles.mainTitle}>
          HƯỚNG DẪN THANH TOÁN VNPAY TRÊN APP
        </Text>

        {/* Content Container */}
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>
            Công ty cổ phần Giải pháp Thanh toán Việt Nam (VNPAY) phát triển.
            Khách hàng sử dụng thẻ/tài khoản ngân hàng, tính năng QR
            Pay/VNPAY-QR được tích hợp sẵn trên ứng dụng Mobile Banking của các
            ngân hàng hoặc Ví điện tử liên kết để thanh toán các giao dịch và
            nhập mã giảm giá (nếu có).
          </Text>

          <Text style={styles.sectionTitle}>
            Quét mã VNPAY-QR trên 35+ Ứng dụng Mobile Banking và 15+ Ví điện tử
            liên kết
          </Text>
          <View style={styles.bankLogosContainer}>
            <Image
              source={require("../assets/vn1.png")}
              style={styles.bankLogo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.sectionTitle}>
            Các phương thức thanh toán qua VNPAY
          </Text>

          <View style={styles.section}>
            <Image
              source={require("../assets/vn2.png")}
              style={styles.vnpayLogo}
              resizeMode="contain"
            />
          </View>

          {/* Payment Steps */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              1. Phương thức thanh toán qua "Ứng dụng thanh toán hỗ trợ
              VNPAY-QR"
            </Text>
            <Text style={styles.paragraph}>
              Bước 1: Quý khách lựa chọn sản phẩm, dịch vụ và chọn Thanh toán
              ngay hoặc Đặt hàng Tải trang thanh toán, vui lòng kiểm tra lại sản
              phẩm đã đặt, điền đầy đủ thông tin nguồn nhận hàng, chọn phương
              thức thanh toán VNPAY và nhấn nút "Đặt hàng ngay".
            </Text>
            <Text style={styles.paragraph}>
              Bước 2: Màn hình thanh toán chuyển sang giao diện công thanh toán
              VNPAY. Chọn phương thức "Ứng dụng thanh toán hỗ trợ VNPAY-QR".
            </Text>
            <Text style={styles.paragraph}>
              Bước 3: Chọn Ứng dụng ngân hàng hoặc Ví điện tử liên kết thanh
              toán trong danh sách. *Lưu ý: Mã QR có hiệu lực trong 15 phút.
            </Text>
            <Text style={styles.paragraph}>
              Trường hợp 1: Ứng dụng tự động chuyển sang ứng dụng ngân hàng hoặc
              Ví điện tử liên kết.
            </Text>
            <Text style={styles.paragraph}>
              - Đăng nhập Ứng dụng ngân hàng hoặc Ví điện tử, màn hình chuyển
              sang thông tin thanh toán.
            </Text>
            <Text style={styles.paragraph}>
              - Kiểm tra thông tin, nhập mã giảm giá (nếu có) và hoàn tất thanh
              toán.
            </Text>
            <Text style={styles.paragraph}>
              Trường hợp 2: Ứng dụng hiển thông báo "Quý khách vui lòng sử dụng
              trình duyệt mặc định của thiết bị", tại màn hình hiện thị mã QR,
              chọn "Tải mã thanh toán" hoặc chụp màn hình mã QR thanh toán.
            </Text>
            <Text style={styles.paragraph}>
              - Đăng nhập Ứng dụng ngân hàng hoặc Ví điện tử, chọn tính năng
              quét mã QR.
            </Text>
            <Text style={styles.paragraph}>
              - Tải ảnh mã QR từ thư viện ảnh trong điện thoại, màn hình chuyển
              ngay sang thông tin thanh toán.
            </Text>
            <Text style={styles.paragraph}>
              - Kiểm tra thông tin, nhập mã giảm giá (nếu có) và hoàn tất thanh
              toán.
            </Text>

            <View style={styles.stepsContainer}>
              {/* Thêm 4 hình ảnh lớn */}
              <Image
                source={require("../assets/vn3.png")}
                style={styles.stepImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.stepCaption}>
              Giao diện thanh toán qua "Ứng dụng thanh toán hỗ trợ VNPAY-QR"
            </Text>
          </View>

          {/* Step 2 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              2. Phương thức thanh toán qua "Thẻ nội địa và tài khoản ngân hàng"
            </Text>
            <Text style={styles.paragraph}>
              Bước 1: Quý khách lựa chọn sản phẩm, dịch vụ và chọn Thanh toán
              ngay hoặc Đặt hàng Tải trang thanh toán, vui lòng kiểm tra lại sản
              phẩm đã đặt, điền đầy đủ thông tin nguồn nhận hàng, chọn phương
              thức thanh toán VNPAY và nhấn nút "Đặt hàng ngay".
            </Text>
            <Text style={styles.paragraph}>
              Bước 2: Màn hình thanh toán chuyển sang giao diện công thanh toán
              VNPAY. Chọn phương thức "Thẻ nội địa và tài khoản ngân hàng" và
              chọn ngân hàng muốn thanh toán thẻ trong danh sách.
            </Text>
            <Text style={styles.paragraph}>
              Bước 3: Quý khách vui lòng thực hiện nhập các thông tin: Tên thẻ,
              số thẻ, ngày phát hành (nếu có), mã OTP sẽ được gửi về điện thoại
              đăng ký, nhập mã OTP để hoàn tất giao dịch. *Lưu ý: Giao dịch sẽ
              hết hạn sau 15 phút.
            </Text>

            <View style={styles.stepsContainer1}>
              {/* Thêm 2 hình ảnh lớn */}
              <Image
                source={require("../assets/vn4.png")}
                style={styles.stepImage1}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.stepCaption1}>
              Giao diện thanh toán qua "Thẻ nội địa và tài khoản ngân hàng"
            </Text>

            <Text style={styles.paragraph}>
              Bước 4: Khi thực hiện thanh toán hoàn tất, màn hình quầy vé ứng
              dụng ban đầu & thông báo xác nhận đặt hàng thành công tại app.
            </Text>
          </View>

          {/* Step 3 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              3. Phương thức thanh toán qua "Thẻ thanh toán quốc tế (Visa,
              MasterCard, JCB, UnionPay)"
            </Text>
            <Text style={styles.paragraph}>
              Tương tự như phương thức thanh toán "Thẻ nội địa và tài khoản ngân
              hàng", quý khách vui lòng thực hiện các bước tương tự để thanh
              toán bằng thẻ VNPAY-QR.
            </Text>
          </View>

          {/* Step 4 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              4. Phương thức thanh toán qua "Ví điện tử VNPAY"
            </Text>
            <Text style={styles.paragraph}>
              Tương tự như phương thức thanh toán "Ứng dụng thanh toán hỗ trợ
              VNPAY-QR".
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VNPayTerms;
