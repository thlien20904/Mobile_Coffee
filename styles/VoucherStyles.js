// styles/Voucher/VoucherStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingTop: 55,
    paddingBottom: 20,
    marginTop: -50,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  placeholderRight: {
    width: 30,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  countBadge: {
    backgroundColor: "#FFA500",
    color: "#fff",
    borderRadius: 10, // Bo tròn vừa phải
    width: 28, // Giảm kích thước để trông gọn hơn
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 15, // Giảm font để vừa với badge
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 18, // Đảm bảo text căn giữa theo chiều dọc
    overflow: "hidden",
    position: "absolute",
    top: 5, // Điều chỉnh vị trí lên trên
    right: -5, // Dịch ra xa tabText một chút
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  sectionHeader: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  voucherItem: {
    backgroundColor: "#fff",
    margin: 10,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: "row",
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  voucherLogo: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingTop: 25,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  voucherDivider: {
    width: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 10,
  },
  voucherInfo: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  voucherTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 10,
  },
  voucherExpiry: {
    fontSize: 14,
    color: "#888",
  },
});
