import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../styles/Settings";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Feather name="arrow-left" size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Cài đặt</Text>
    </View>
  );

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [faceIDEnabled, setFaceIDEnabled] = useState(false);

  const SettingsSwitchItem = ({ icon, title, value, onValueChange }) => (
    <View style={styles.settingsItem}>
      <View style={styles.settingsLeft}>
        {icon}
        <Text style={styles.settingsTitle}>{title}</Text>
      </View>
      <Switch
        trackColor={{ false: "#e0e0e0", true: "#ccc" }}
        thumbColor={value ? "#d17842" : "#f4f3f4"}
        ios_backgroundColor="#e0e0e0"
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );

  const SettingsLinkItem = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsLeft}>
        {icon}
        <Text style={styles.settingsTitle}>{title}</Text>
      </View>
      <Feather name="chevron-right" size={20} color="#aaa" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.container}>
        <SettingsSwitchItem
          icon={
            <Ionicons name="notifications-outline" size={22} color="#000" />
          }
          title="Nhận thông báo"
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
        <SettingsSwitchItem
          icon={<MaterialIcons name="face" size={22} color="#000" />}
          title="Đăng nhập bằng FaceID"
          value={faceIDEnabled}
          onValueChange={setFaceIDEnabled}
        />
        <SettingsLinkItem
          icon={<Feather name="link" size={22} color="#000" />}
          title="Liên kết tài khoản"
        />
        <SettingsLinkItem
          icon={<Feather name="info" size={22} color="#000" />}
          title="Về chúng tôi"
        />
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Phiên bản 5.9.37</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;
