// Screens/OffersStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginTop: -50,
  },
  barcodePanel: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    width: 420,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  barcodeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black", // Đổi từ white sang black
  },
  scrollView: {
    flex: 1,
  },
  backgroundImageContainer: {
    position: "relative", // Để ảnh nền và nội dung đè lên nhau
  },
  backgroundImage: {
    width: "100%",
    height: 400, // hoặc tăng thêm nếu cần
    position: "absolute",
    top: -10, // dịch ảnh lên trên 20px
    left: 0,
  },
  headerContainer: {
    padding: 20,
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerInfo: {
    flex: 1,
    flexDirection: "column",
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginRight: 10,
  },
  headerSubtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  beanCount: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
  voucherButton: {
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 20,
  },
  voucherButtonText: {
    color: "#FFA500",
    marginLeft: 5,
    fontWeight: "500",
  },
  barcodeContainer: {
    margin: 10,
    padding: 20,
    alignItems: "center",
  },
  barcode: {
    width: "100%",
    height: 80,
  },
  progressContainer: {
    margin: 15,
    marginTop: -35,
    padding: 15,
    alignItems: "center",
    marginBottom: 20, // Thêm marginBottom để đảm bảo phần progress không bị cắt
  },
  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 3,
    marginVertical: 10,
  },
  progressIndicator: {
    width: "5%",
    height: 6,
    backgroundColor: "white",
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  progressLabelRight: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    position: "absolute",
    right: 15,
    top: 15,
  },
  progressText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginTop: 5,
  },
  progressSubtext: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
    marginTop: 5,
  },
  menuContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  menuItem: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemText: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  vouchersSection: {
    marginHorizontal: 15,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  viewAllText: {
    fontSize: 14,
    color: "#FFA500",
  },
  voucherItem: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    overflow: "hidden",
    padding: 12,
  },
  voucherImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 5,
  },
  voucherDivider: {
    width: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 10,
  },
  voucherInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  voucherTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 3,
  },
  voucherExpiry: {
    fontSize: 12,
    color: "#888",
  },
  exchangeSection: {
    marginHorizontal: 15,
    marginBottom: 15,
  },
  exchangeItem: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    padding: 10,
  },
  exchangeImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  exchangeInfo: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  exchangeTitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
    flexWrap: "wrap",
  },
  beanBadge: {
    backgroundColor: "#E6FFE6",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  beanCount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  beanLabel: {
    fontSize: 12,
    color: "#333",
    marginLeft: 5,
  },
  bottomNavigation: {
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingBottom: 20,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  navText: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
  },
  activeNavText: {
    color: "#FFA500",
  },
});
