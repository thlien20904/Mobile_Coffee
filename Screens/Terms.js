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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "../styles/Terms";

const Terms = ({ navigation }) => {
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
        <Text style={styles.headerTitle}>Điều khoản</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Stores Count Banner */}
      <View style={styles.storesBanner}>
        <Ionicons name="location-outline" size={24} color="#e67e22" />
        <Text style={styles.storesText}>93 Cửa hàng khắp cả nước</Text>
      </View>

      {/* Logo Section */}
      <View style={styles.logoSection}>
        <TouchableOpacity style={styles.menuButton}>
          <Feather name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Image
          source={require("../assets/logo.png")} // Đường dẫn tới ảnh logo của bạn
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.contentScrollView}>
        {/* Main Title */}
        <Text style={styles.mainTitle}>ĐIỀU KHOẢN SỬ DỤNG</Text>

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Section 1 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Giới thiệu chung</Text>
            <Text style={styles.paragraph}>
              Khi khách hàng truy cập vào ứng dụng The Coffee House, website
              order.thecoffeehouse.com hoặc đặt hàng qua hotline 18006936 của
              The Coffee House có nghĩa là khách hàng đã đồng ý với các điều
              khoản này. The Coffee House có quyền thay đổi, chỉnh sửa, thêm
              hoặc lược bỏ bất kỳ phần nào trong Điều khoản sử dụng này vào bất
              cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang
              web, ứng dụng mà không cần thông báo trước. Khi khách hàng tiếp
              tục sử dụng dịch vụ giao hàng của The Coffee House, sau khi các
              thay đổi về Điều khoản này được đăng tải, có nghĩa là khách hàng
              chấp nhận với những thay đổi đó.
            </Text>
            <Text style={styles.paragraph}>
              Khách hàng vui lòng kiểm tra thường xuyên các quy định và điều
              khoản dưới đây để cập nhật những thay đổi của chúng tôi.
            </Text>
          </View>

          {/* Section 2 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Chính sách Tài khoản Người dùng
            </Text>
            <Text style={styles.paragraph}>
              Khách hàng cam kết và cung cấp thông tin chính xác nhằm mục đích
              nhận được phục vụ tốt nhất từ The Coffee House.
            </Text>
            <Text style={styles.paragraph}>
              Mỗi số điện thoại chỉ tạo được một (01) tài khoản cho mục đích sử
              dụng cá nhân.
            </Text>
            <Text style={styles.paragraph}>
              Để đảm bảo quyền lợi, khách hàng không chia sẻ thông tin tài khoản
              (tên truy cập và mật khẩu) cho người khác sử dụng tài khoản The
              Coffee House, hoặc chuyển nhượng tài khoản cho bất kỳ ai khác mà
              chưa thông qua The Coffee House.
            </Text>
            <Text style={styles.paragraph}>
              The Coffee House có quyền khóa tài khoản hoặc khóa một phần tính
              năng của tài khoản (như tính năng Đặt hàng/ Tích điểm..) của khách
              hàng khi The Coffee House phát hiện khách hàng vi phạm điều khoản
              hoặc chính sách của công ty hoặc có hành vi mua hàng không trung
              thực diễn hình như:
            </Text>
            <Text style={styles.listItem}>
              Tạo các đơn hàng ảo, hoặc đánh giá ảo.
            </Text>
            <Text style={styles.listItem}>
              Không nhận đơn hàng đã đặt mà không cung cấp lý do chính đáng.
            </Text>
            <Text style={styles.listItem}>
              Có dấu hiệu lừa đảo hoặc lạm dụng các mã giảm giá và chương trình
              khuyến mãi để trục lợi.
            </Text>
            <Text style={styles.listItem}>
              Các trường hợp khác mà hệ thống của The Coffee House phát hiện
              được. Tùy từng trường hợp, The Coffee House sẽ có biện pháp xử lý
              phù hợp.
            </Text>
          </View>

          {/* Section 3 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Giới thiệu về các loại dịch vụ
            </Text>
            <Text style={styles.paragraph}>
              Dịch vụ "Giao hàng": là dịch vụ mà khách hàng đặt sản phẩm ngay
              tại nhà và được The Coffee House giao hàng tận nơi.
            </Text>
            <Text style={styles.paragraph}>
              Sau khi khách hàng đặt hàng thành công, The Coffee House sẽ thực
              hiện đơn hàng và giao hàng đến địa chỉ mà khách hàng đã chọn.
            </Text>
            <Text style={styles.paragraph}>
              Dịch vụ "Mang đi" (tại ứng dụng The Coffee House): là dịch vụ mà
              khách hàng có thể đặt món trước và đến The Coffee House nhận sản
              phẩm mang đi.
            </Text>
            <Text style={styles.paragraph}>
              Sau khi chọn hình thức "Mang Đi" và đặt hàng thành công, khách
              hàng chủ động đến Cửa hàng The Coffee House đã chọn trên đơn hàng
              để nhận sản phẩm.
            </Text>
          </View>

          {/* Section 4 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chính sách sử dụng dịch vụ</Text>
            <Text style={styles.paragraph}>
              Khách hàng được quyền chủ động chọn loại dịch vụ để sử dụng khi
              bắt đầu đặt đơn hàng.
            </Text>
            <Text style={styles.paragraph}>
              Với đơn hàng của dịch vụ "Giao hàng" và "Mang đi", khách hàng vui
              lòng không sử dụng tại Cửa hàng.
            </Text>
            <Text style={styles.paragraph}>
              The Coffee House có quyền từ chối hỗ trợ giao hàng với đơn hàng
              của dịch vụ "Mang đi".
            </Text>
          </View>

          {/* Section 5: Thay đổi thông tin đặt hàng */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thay đổi thông tin đặt hàng</Text>
            <Text style={styles.paragraph}>
              The Coffee House xác nhận đơn hàng qua cuộc gọi nếu thông tin
              không chính xác.
            </Text>
            <Text style={styles.paragraph}>
              The Coffee House có quyền hủy đơn nếu không liên hệ được khách
              hàng.
            </Text>
            <Text style={styles.paragraph}>
              Trong 3 lần liên hệ không thành công, đơn hàng sẽ bị hủy.
            </Text>
          </View>

          {/* Section 6: Hủy bỏ đặt hàng */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hủy bỏ đặt hàng</Text>
            <Text style={styles.paragraph}>
              Khách hàng hủy đơn "Giao hàng" hoặc "Mang đi" vui lòng liên hệ
              hotline 18006936.
            </Text>
            <Text style={styles.paragraph}>
              Nếu khách không thể hủy qua app, vui lòng liên hệ ngay để được hỗ
              trợ.
            </Text>
            <Text style={styles.paragraph}>
              The Coffee House rất tiếc nếu đơn bị hủy do lỗi từ hệ thống.
            </Text>
          </View>

          {/* Section 7: Phương thức thanh toán */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
            <Text style={styles.paragraph}>
              Thanh toán tiền mặt (COD): trả khi nhận hàng.
            </Text>
            <Text style={styles.paragraph}>
              Thanh toán trực tuyến (ATM, Visa,...): qua cổng thanh toán.
            </Text>
            <Text style={styles.paragraph}>
              Thanh toán qua ví (Momo, Zalo Pay,...): theo hướng dẫn ví.
            </Text>
          </View>

          {/* Section 8: Chính sách hoàn tiền */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chính sách hoàn tiền</Text>
            <Text style={styles.paragraph}>
              The Coffee House không hỗ trợ hoàn tiền cho đơn hàng đã thanh
              toán.
            </Text>
            <Text style={styles.paragraph}>
              Khách hàng có thể tham khảo thời gian hoàn tiền từ ví hoặc ngân
              hàng.
            </Text>
            <Text style={styles.paragraph}>
              Ví (ATM): 7 ngày; Ví quốc tế (Visa,...): 30-45 ngày.
            </Text>
          </View>

          {/* Section 9: Chính sách hủy trả hàng */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chính sách hủy trả hàng</Text>
            <Text style={styles.paragraph}>
              Ngay tại thời điểm nhận hàng tại xe, khách hàng kiểm tra sản phẩm.
            </Text>
            <Text style={styles.paragraph}>
              The Coffee House không hỗ trợ hủy trả nếu khách đã nhận hàng.
            </Text>
            <Text style={styles.paragraph}>
              Khách hàng liên hệ hotline 18006936 để được hỗ trợ.
            </Text>
          </View>

          {/* Section 10: Khoảng cách giao hàng */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Khoảng cách giao hàng</Text>
            <Text style={styles.paragraph}>
              The Coffee House hỗ trợ giao hàng trong phạm vi 5km từ cửa hàng.
            </Text>
            <Text style={styles.paragraph}>
              Đơn hàng ngoài phạm vi 5km có thể được giao với phí tùy thuộc cửa
              hàng.
            </Text>
          </View>

          {/* Section 11: Phí giao hàng */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Phí giao hàng</Text>
            <Text style={styles.paragraph}>
              Phí giao hàng áp dụng dựa trên giá trị đơn hàng và thời gian giao.
            </Text>
            <Text style={styles.paragraph}>
              Đơn hàng thanh toán tiền mặt có thể chịu phí giao hàng cao hơn.
            </Text>
          </View>

          {/* Section 12: Thời gian giao hàng */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thời gian giao hàng</Text>
            <Text style={styles.paragraph}>
              Khung giờ giao hàng: 7:00 - 20:30.
            </Text>
            <Text style={styles.paragraph}>
              Khung giờ khách nhận hàng: 7:30 - 21:00.
            </Text>
          </View>

          {/* Section 13: Hình thức đặt hàng */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hình thức đặt hàng</Text>
            <Text style={styles.paragraph}>
              1. Qua ứng dụng The Coffee House.
            </Text>
            <Text style={styles.paragraph}>
              2. Trên website: https://order.thecoffeehouse.com/.
            </Text>
            <Text style={styles.paragraph}>
              3. Hotline 18006936 (hỗ trợ thanh toán tiền mặt).
            </Text>
            <Text style={styles.paragraph}>
              4. Qua ví: Momo, Zalo Pay, Shopee Pay.
            </Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: "#1E2526" }]}>
          <View style={styles.contactHeader}>
            <Text style={[styles.sectionTitle, { color: "#FFF" }]}>
              Liên hệ
            </Text>
            <Text style={[styles.paragraph, { color: "#FFF" }]}>
              Đặt hàng: 1800 6936
            </Text>

            <Text style={[styles.paragraph, { color: "#FFF", marginTop: 4 }]}>
              Tầng 7, Trung Tâm Thương Mại Gigamall, 240 - 242 Phạm Văn Đồng, P.
              Hiệp Bình Chánh, TP. Thủ Đức, TP.HCM
            </Text>
          </View>

          {/* Banner */}
          <Image
            source={require("../assets/banner5.png")}
            style={styles.bannerImage}
            resizeMode="cover"
          />

          {/* Social Media Icons */}
          <View style={styles.socialMediaContainer}>
            <TouchableOpacity>
              <FontAwesome name="facebook-square" size={30} color="#4267B2" />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="instagram" size={30} color="#C13584" />
            </TouchableOpacity>
          </View>

          {/* Contact Options */}
          <View style={styles.contactOptionsContainer}>
            <View style={styles.contactColumn}>
              <Text style={[styles.contactOptionTitle, { color: "#FFF" }]}>
                Giới thiệu
              </Text>
              <Text style={[styles.contactOptionText, { color: "#FFF" }]}>
                Về Chúng Tôi
              </Text>
              <Text style={[styles.contactOptionText, { color: "#FFF" }]}>
                Sản phẩm
              </Text>
              <Text style={[styles.contactOptionText, { color: "#FFF" }]}>
                Khuyến mãi
              </Text>
              <Text style={[styles.contactOptionText, { color: "#FFF" }]}>
                Chuyện cà phê
              </Text>
              <Text style={[styles.contactOptionText, { color: "#FFF" }]}>
                Cửa Hàng
              </Text>
              <Text style={[styles.contactOptionText, { color: "#FFF" }]}>
                Tuyển dụng
              </Text>
            </View>
            <View style={styles.contactColumn}>
              <Text style={[styles.contactOptionTitle, { color: "#FFF" }]}>
                Điều khoản
              </Text>
              <Text style={[styles.contactOptionText, { color: "#FFF" }]}>
                Điều khoản sử dụng
              </Text>
              <Text style={[styles.contactOptionText, { color: "#FFF" }]}>
                Chính sách bảo mật thông tin
              </Text>
              <Text style={[styles.contactOptionText, { color: "#FFF" }]}>
                Hướng dẫn xuất hóa đơn GTGT
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View
          style={[
            styles.section,
            { backgroundColor: "#1E2526", borderTopWidth: 0 },
          ]}
        >
          <Text
            style={[styles.paragraph, { color: "#FFF", textAlign: "left" }]}
          >
            Công ty cổ phần thương mại dịch vụ Trà Cà Phê VN
          </Text>
          <Text
            style={[styles.paragraph, { color: "#FFF", textAlign: "left" }]}
          >
            Mã số DN: 0312867172 do sở kế hoạch và đầu tư tp. HCM cấp ngày
            23/07/2014
          </Text>
          <Text
            style={[styles.paragraph, { color: "#FFF", textAlign: "left" }]}
          >
            Địa chỉ: 86-88 Cao Thắng, phường 04, quận 3, tp. Hồ Chí Minh
          </Text>
          <Text
            style={[styles.paragraph, { color: "#FFF", textAlign: "left" }]}
          >
            Điện thoại: (028) 7107 8079 Email: hi@thecoffeehouse.vn
          </Text>
          <Text
            style={[styles.paragraph, { color: "#FFF", textAlign: "left" }]}
          >
            © 2014-2022 Công ty cổ phần thương mại dịch vụ Trà Cà Phê VN mọi
            quyền bảo lưu
          </Text>
        </View>
      </ScrollView>

      {/* Customer Support Button */}
      <TouchableOpacity style={styles.supportButton}>
        <MaterialCommunityIcons name="headphones" size={28} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Terms;
