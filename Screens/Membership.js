// Screens/Membership.js
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../styles/MembershipStyles";

const Membership = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("moi");

  // Các tab hạng thành viên
  const tabs = [
    { id: "moi", name: "Mới" },
    { id: "dong", name: "Đồng" },
    { id: "bac", name: "Bạc" },
    { id: "vang", name: "Vàng" },
    { id: "kimcuong", name: "Kim Cương" },
  ];

  // Dữ liệu ưu đãi cho từng tab
  const membershipBenefits = {
    moi: [],
    dong: [
      {
        id: "1",
        icon: "cake",
        title: "Tặng 01 phần bánh sinh nhật",
      },
      {
        id: "2",
        icon: "coffee",
        title: "Miễn phí 01 phần nước Cà phê / Trà trên 100,000đ",
      },
      {
        id: "3",
        icon: "cart",
        title: "Đặc quyền ĐỔI Ưu đãi bằng điểm BEAN tích lũy",
      },
    ],
    bac: [
      {
        id: "4",
        icon: "seed",
        title: "Được nhận 1.5 BEAN tích lũy",
      },
      {
        id: "5",
        icon: "cake",
        title: "Tặng 01 phần bánh sinh nhật",
      },
      {
        id: "6",
        icon: "coffee",
        title: "Miễn phí 01 phần nước bất kỳ",
      },
      {
        id: "7",
        icon: "star",
        title: "Nhận riêng Ưu đãi từ The Coffee House và đối tác khách",
      },
      {
        id: "8",
        icon: "gift",
        title: "Cơ hội trải nghiệm & hưởng đặc quyền đầu tiên",
      },
      {
        id: "9",
        icon: "cart",
        title: "Đặc quyền ĐỔI Ưu đãi bằng điểm BEAN tích lũy",
      },
    ],
    vang: [
      {
        id: "16",
        icon: "cake",
        title: "Tặng 03 phần bánh sinh nhật",
      },
      {
        id: "17",
        icon: "coffee",
        title: "Miễn phí 05 phần nước bất kỳ",
      },
      {
        id: "18",
        icon: "cart",
        title: "Đặc quyền ĐỔI Ưu đãi bằng điểm BEAN tích lũy",
      },
    ],
    kimcuong: [
      {
        id: "16",
        icon: "seed",
        title: "Được nhận 1.5 BEAN tích lũy",
      },
      {
        id: "17",
        icon: "cake",
        title: "Tặng 01 phần bánh sinh nhật",
      },
      {
        id: "18",
        icon: "coffee",
        title: "Miễn phí 01 phần nước bất kỳ",
      },
      {
        id: "19",
        icon: "star",
        title: "Nhận riêng Ưu đãi từ The Coffee House và đối tác khách",
      },
      {
        id: "20",
        icon: "gift",
        title: "Cơ hội trải nghiệm & hưởng đặc quyền đầu tiên",
      },
      {
        id: "21",
        icon: "cart",
        title: "Đặc quyền ĐỔI Ưu đãi bằng điểm BEAN tích lũy",
      },
    ],
  };

  // Lấy danh sách ưu đãi dựa vào tab đang chọn
  const getBenefitsByTab = () => {
    return membershipBenefits[activeTab] || [];
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
        <Text style={styles.headerTitle}>Hạng thành viên</Text>
        <View style={styles.placeholderRight} />
      </View>

      {/* Membership Info */}
      <View style={styles.membershipInfo}>
        <View style={styles.membershipCard}>
          <View style={styles.levelAndBeanContainer}>
            <View style={styles.levelContainer}>
              <Text style={styles.membershipLevel}>Mới</Text>
            </View>
            <Text style={styles.beanCount}>0 BEAN</Text>
          </View>
          <View style={styles.progressContainer}>
            <MaterialCommunityIcons
              name="seed"
              size={20}
              color="#fff"
              style={styles.levelIcon}
            />
            <Text style={styles.progressLabelLeft}>Mới</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: "0%" }]} />
            </View>
            <Text style={styles.progressLabelRight}>Đồng</Text>
          </View>
          <Text style={styles.membershipMessage}>
            Còn 100 BEAN nữa bạn sẽ thăng hạng{"\n"}
            Đổi quà không ảnh hưởng tới việc thăng hạng của bạn{"\n"}
            Chưa tích điểm
          </Text>
        </View>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activeTab === tab.id && {
                borderBottomColor: "#FFA500",
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && { color: "#FFA500" },
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Benefits List */}
      <ScrollView style={styles.scrollView}>
        {getBenefitsByTab().map((benefit) => (
          <View key={benefit.id} style={styles.benefitItem}>
            <MaterialCommunityIcons
              name={benefit.icon}
              size={24}
              color="#FFA500"
              style={styles.benefitIcon}
            />
            <Text style={styles.benefitTitle}>{benefit.title}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Membership;
