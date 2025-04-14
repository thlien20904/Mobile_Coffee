// Trong styles/DiscoverMore.js
import { StyleSheet, Dimensions } from "react-native";

// Lấy chiều rộng màn hình để tính toán kích thước cột
const { width } = Dimensions.get("window");
const itemWidth = (width - 40) / 2; // 40 là tổng padding trái phải và khoảng cách giữa các cột

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
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
    width: 28, // Giữ chỗ cho nút bên phải (nếu có)
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#E57905",
  },
  tabText: {
    fontSize: 14,
    color: "#999",
  },
  activeTabText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  listContent: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 15, // Khoảng cách giữa các hàng
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },
  discoverItem: {
    width: itemWidth, // Chiều rộng mỗi mục bằng 1/2 màn hình (trừ padding)
  },
  discoverImage: {
    width: "100%", // Ảnh chiếm toàn bộ chiều rộng của mục
    height: 100, // Giảm chiều cao ảnh để giống ảnh mẫu
    borderRadius: 8,
  },
  discoverTitle: {
    fontSize: 14, // Giảm kích thước chữ để giống ảnh mẫu
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
  },
  discoverDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  discoverDate: {
    fontSize: 12,
    color: "#777",
  },
});
