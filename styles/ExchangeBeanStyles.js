// styles/ExchangeBeanStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 0,
    marginTop: -50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 45,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  placeholderRight: {
    width: 30,
  },
  beanInfo: {
    flexDirection: "row", // Xếp icon và text theo hàng ngang
    alignItems: "center", // Canh giữa theo chiều dọc
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  beanIcon: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  beanText: {
    fontSize: 14,
    color: "#666",
  },
  beanCount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  viewAllText: {
    fontSize: 14,
    color: "#FFA500",
  },
  horizontalScroll: {
    paddingHorizontal: 15,
  },
  item: {
    width: 200, // Kích thước cố định để hiển thị 2 mục trong khung nhìn
    backgroundColor: "#fff",
    borderRadius: 8,
    marginRight: 15, // Khoảng cách giữa các item khi cuộn ngang
    padding: 10,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemImage: {
    width: "100%",
    height: 170,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  beanBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F5E6",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  beanAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#34C759",
    marginRight: 5,
  },
  beanLabel: {
    fontSize: 14,
    color: "#34C759",
  },
});
