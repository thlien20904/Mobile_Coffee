// Screens/ExchangeBean.js
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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; // Thêm import
import styles from "../styles/ExchangeBeanStyles";

const ExchangeBean = ({ navigation }) => {
  // Dữ liệu cho phần "TỪ SULI COFFEE"
  const coffeeHouseItems = [
    {
      id: "1",
      image: require("../assets/db13.png"),
      title: "Mua 2 Tặng 1 Trà Xanh, Trà Xanh Latte Đậm Vị",
      bean: 400,
    },
    {
      id: "2",
      image: require("../assets/db14.png"),
      title: "Mua 1 A-Mê quất tặng 1 A-Mê bất kìkì",
      bean: 400,
    },

    {
      id: "3",
      image: require("../assets/db3.png"),
      title: "Miễn phí upsize nước M lên L",
      bean: 400,
    },
    {
      id: "4",
      image: require("../assets/db4.png"),
      title: "Mua 1 ly A-Mê Trái Cây, tặng 1 ly A-Mê Classic",
      bean: 400,
    },
    {
      id: "55",
      image: require("../assets/db1.png"),
      title: "Mua 1 Tặng 1 A-Mê tùy chọn",
      bean: 590,
    },
    {
      id: "6",
      image: require("../assets/db.png"),
      title: "Bánh Mì Quế Pate Cột Đen chỉ 10K",
      bean: 400,
    },
  ];

  // Dữ liệu cho phần "TỪ SIGNATURE BY THE COFFEE..."
  const signatureItems = [
    {
      id: "5",
      image: require("../assets/db5.png"),
      title: "Espresso Sour cân bằng",
      bean: 1390,
    },
    {
      id: "6",
      image: require("../assets/db6.png"),
      title: "Frosty chỉ 69K",
      bean: 320,
    },
    {
      id: "7",
      image: require("../assets/db7.png"),
      title: "CloudFee Creme Brulee",
      bean: 1290,
    },
    {
      id: "8",
      image: require("../assets/db8.png"),
      title: "Bếp nhà đỏ lửa, món Á",
      bean: 490,
    },
    {
      id: "9",
      image: require("../assets/db9.png"),
      title: "Steak thượng hạng",
      bean: 490,
    },
  ];

  // Dữ liệu cho phần "TỪ ĐỐI TÁC"
  const partnerItems = [
    {
      id: "9",
      image: require("../assets/db17.png"),
      title: "[BTASKEE] Giảm 20K tất cả các dịch vụ",
      bean: 99,
    },
    {
      id: "10",
      image: require("../assets/db15.png"),
      title: "[BTASKEE] Giảm 30% dịch vụ Tổng vệ sinh",
      bean: 99,
    },
    {
      id: "11",
      image: require("../assets/db16.png"),
      title: "[BTASKEE] Giảm 85K cho khách hàng mới của bTaskee",
      bean: 99,
    },
    {
      id: "12",
      image: require("../assets/db10.png"),
      title: "[BTASKEE] Giảm 85K cho khách hàng mới của bTaskee",
      bean: 99,
    },
  ];

  // Component render từng mục đổi bean
  const renderExchangeItem = ({ item }) => {
    return (
      <TouchableOpacity key={item.id} style={styles.item}>
        <Image
          source={item.image}
          style={styles.itemImage}
          resizeMode="cover"
        />
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.beanBadge}>
          <Text style={styles.beanAmount}>{item.bean}</Text>
          <Text style={styles.beanLabel}>BEAN</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đổi Bean</Text>
        <View style={styles.placeholderRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.beanInfo}>
          <Image
            source={require("../assets/bean.png")}
            style={styles.beanIcon}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.beanText}>Số bean hiện tại của bạn</Text>
            <Text style={styles.beanCount}>0 Bean</Text>
          </View>
        </View>
        {/* Phần "TỪ SULI COFFEE" */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TỪ SULI COFFEE</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {coffeeHouseItems.map((item) => renderExchangeItem({ item }))}
          </ScrollView>
        </View>

        {/* Phần "TỪ SIGNATURE BY SULI COFFEE..." */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              TỪ SIGNATURE BY SULI COFFEE...
            </Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {signatureItems.map((item) => renderExchangeItem({ item }))}
          </ScrollView>
        </View>

        {/* Phần "TỪ ĐỐI TÁC" */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TỪ ĐỐI TÁC</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {partnerItems.map((item) => renderExchangeItem({ item }))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExchangeBean;
