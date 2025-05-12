import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "../styles/Contact";

// B1: Component Contact hiển thị thông tin liên hệ và góp ý
const Contact = () => {
  // B2: Sử dụng hook useNavigation để điều hướng
  const navigation = useNavigation();

  // B3: Component Header hiển thị tiêu đề và nút quay lại
  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Feather name="arrow-left" size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Liên hệ và góp ý</Text>
    </View>
  );

  // B4: Component ContactItem hiển thị mỗi mục liên hệ (số điện thoại, email,...)
  const ContactItem = ({ icon, title, value, showChevron = true }) => (
    <TouchableOpacity style={styles.contactItem}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>{title}</Text>
        <Text style={styles.contactValue}>{value}</Text>
      </View>
      {/* B5: Hiển thị mũi tên bên phải nếu showChevron là true */}
      {showChevron && <Feather name="chevron-right" size={20} color="#aaa" />}
    </TouchableOpacity>
  );

  // B6: Giao diện chính với danh sách các mục liên hệ
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        {/* B7: Hiển thị các mục liên hệ cố định */}
        <ContactItem
          icon={<Feather name="phone" size={22} color="#000" />}
          title="Tổng đài"
          value="18006936"
        />
        <ContactItem
          icon={<MaterialIcons name="email" size={22} color="#000" />}
          title="Email"
          value="hi@sulicoffee.vn"
        />
        <ContactItem
          icon={<MaterialIcons name="language" size={22} color="#000" />}
          title="Website"
          value="www.sulicoffee.com"
        />
        <ContactItem
          icon={<FontAwesome name="facebook" size={22} color="#000" />}
          title="Facebook"
          value="facebook.com/Suli.Coffee.2025"
        />
        {/* B8: Nút gửi góp ý riêng, không dùng ContactItem */}
        <TouchableOpacity style={styles.feedbackButton}>
          <MaterialIcons name="warning" size={22} color="#000" />
          <Text style={styles.feedbackText}>Gửi góp ý về ứng dụng</Text>
          <Feather name="chevron-right" size={20} color="#aaa" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// B9: Xuất component để sử dụng
export default Contact;
