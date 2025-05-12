import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/MyAddresses";

// B1: Dữ liệu giả lập danh sách địa chỉ
const addressesData = [
  {
    id: "1",
    name: "THÚY LIÊN",
    phone: "(+84) 366 413 924",
    address: "Số 273, Trấn Đường Ninh, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội",
    isDefault: true,
    isPickup: false,
    isReturn: false,
  },
  {
    id: "2",
    name: "PHƯƠNG ANH",
    phone: "(+84) 866 691 643",
    address:
      "Số Nhà 8, Ngách 91 Ngõ 488 TRẦN Cung, Phường Cổ Nhuế 1, Quận Bắc Từ Liêm, Hà Nội",
    isDefault: false,
    isPickup: false,
    isReturn: false,
  },
  {
    id: "3",
    name: "PHƯƠNG LONG",
    phone: "(+84) 366 561 201",
    address: "khu 5, Xã Quang Húc, Huyện Tam Nông, Phú Thọ",
    isDefault: false,
    isPickup: false,
    isReturn: false,
  },
  {
    id: "4",
    name: "PHƯƠNG LONG",
    phone: "(+84) 336 886 678",
    address:
      "Số 81, Ngõ Ga Ngõ Ga Hà Đông, Phường Phú La, Quận Hà Đông, Hà Nội",
    isDefault: false,
    isPickup: false,
    isReturn: false,
  },
  {
    id: "5",
    name: "THÚY LIÊN",
    phone: "(+84) 366 413 924",
    address:
      "37, Phố Trần Quốc Hoàn, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Hà Nội",
    isDefault: false,
    isPickup: false,
    isReturn: false,
  },
  {
    id: "6",
    name: "BẢO SƠN",
    phone: "(+84) 349 979 876",
    address: "172/69 Đường Phú Diễn, Phường Phú Diễn, Quận Bắc Từ Liêm, Hà Nội",
    isDefault: false,
    isPickup: false,
    isReturn: false,
  },
  {
    id: "7",
    name: "THÚY LIÊN",
    phone: "(+84) 366 413 924",
    address:
      "Thôn Quang Vinh, nhá Tài Thu, Thị Trấn Ba Hiền, Huyện Bình Xuyên, Vĩnh Phúc",
    isDefault: false,
    isPickup: false,
    isReturn: false,
  },
];

// B2: Component MyAddresses hiển thị danh sách địa chỉ
const MyAddresses = ({ navigation }) => {
  // B3: Hàm render từng mục địa chỉ
  const renderAddressItem = ({ item }) => (
    <View style={styles.addressItem}>
      <View style={styles.addressHeader}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>
      <Text style={styles.address}>{item.address}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
          <Text style={styles.editButtonText}>SỬA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Địa chỉ lấy hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Địa chỉ trả hàng</Text>
        </TouchableOpacity>
        {item.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultBadgeText}>MẶC ĐỊNH</Text>
          </View>
        )}
      </View>
    </View>
  );

  // B4: Giao diện chính
  return (
    <SafeAreaView style={styles.container}>
      {/* B5: Header với nút quay lại */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.navigate("Main"); // Sửa từ goBack() sang navigate("Main")
          }}
        >
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Địa chỉ của tui</Text>
        <View style={styles.placeholderRight} />
      </View>

      {/* B6: Danh sách địa chỉ với FlatList */}
      <FlatList
        data={addressesData}
        renderItem={renderAddressItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Chưa có địa chỉ nào</Text>
        }
        ListHeaderComponent={<Text style={styles.sectionTitle}>Địa chỉ</Text>}
        ListFooterComponent={
          <View style={styles.footerNotice}>
            <Text style={styles.footerNoticeText}>
              Để tiện thoại hoặc địa chỉ nhận hàng chưa chính xác, vui lòng kiểm
              tra và cập nhật.
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

// B7: Xuất component
export default MyAddresses;
