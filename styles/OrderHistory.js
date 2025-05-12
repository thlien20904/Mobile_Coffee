import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm toàn bộ không gian có sẵn
    backgroundColor: "#F8F9FA", // Màu nền xám nhạt
  },
  header: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    justifyContent: "space-between", // Căn đều hai bên
    paddingHorizontal: 10, // Khoảng cách ngang
    paddingVertical: 25, // Khoảng cách dọc
    backgroundColor: "#fff", // Màu nền trắng
    borderBottomWidth: 1, // Độ dày viền dưới
    borderBottomColor: "#e0e0e0", // Màu viền dưới
    paddingTop: 60, // Khoảng cách đỉnh
    marginTop: -50, // Lệch lên trên
  },
  backButton: {
    padding: 5, // Khoảng cách bên trong
    backgroundColor: "#E0E0E0", // Màu nền xám nhạt
    borderRadius: 10, // Bo góc
  },
  headerTitle: {
    fontSize: 26, // Kích thước chữ
    fontWeight: "bold", // Độ đậm chữ
    color: "#000", // Màu chữ đen
    flex: 1, // Chiếm không gian linh hoạt
    textAlign: "center", // Căn giữa tiêu đề
  },
  tabContainer: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    backgroundColor: "#fff", // Màu nền trắng
    borderBottomWidth: 1, // Độ dày viền dưới
    borderBottomColor: "#e0e0e0", // Màu viền dưới
    paddingVertical: 5, // Khoảng cách dọc (giảm để gọn hơn)
  },
  tabButton: {
    flex: 1, // Chiếm không gian linh hoạt
    paddingVertical: 8, // Khoảng cách dọc
    alignItems: "center", // Căn giữa theo chiều dọc
    justifyContent: "center", // Căn giữa theo chiều ngang
    minWidth: 90, // Chiều rộng tối thiểu để chữ không xuống dòng
  },
  tabButtonActive: {
    borderBottomColor: "#27AE60", // Màu viền dưới xanh lá
    borderBottomWidth: 2, // Độ dày viền dưới
  },
  tabText: {
    fontSize: 14, // Kích thước chữ (giảm để vừa một hàng)
    color: "#666", // Màu chữ xám
    fontWeight: "500", // Độ đậm chữ
    textAlign: "center", // Căn giữa văn bản
  },
  tabTextActive: {
    color: "#27AE60", // Màu chữ xanh lá
    fontWeight: "600", // Độ đậm chữ
  },
  orderList: {
    paddingVertical: 0, // Khoảng cách dọc
    paddingHorizontal: 20, // Khoảng cách ngang
    marginTop: 10, // Khoảng cách đỉnh giữa tab và đơn hàng
  },
  orderContainer: {
    backgroundColor: "#FFF", // Màu nền trắng
    borderRadius: 15, // Bo góc
    marginBottom: 25, // Khoảng cách dưới
    padding: 20, // Khoảng cách bên trong
    elevation: 8, // Độ nổi (Android)
    shadowColor: "#000", // Màu bóng
    shadowOffset: { width: 0, height: 4 }, // Độ lệch bóng
    shadowOpacity: 0.15, // Độ mờ bóng
    shadowRadius: 6, // Bán kính bóng
    borderWidth: 1, // Độ dày viền
    borderColor: "#E8ECEF", // Màu viền
  },
  orderHeader: {
    marginBottom: 15, // Khoảng cách dưới
    borderBottomWidth: 1, // Độ dày viền dưới
    borderBottomColor: "#F1F3F5", // Màu viền dưới
    paddingBottom: 12, // Khoảng cách dưới
  },
  orderId: {
    fontSize: 18, // Kích thước chữ
    fontWeight: "700", // Độ đậm chữ
    color: "#34495E", // Màu chữ xanh đậm
  },
  orderDate: {
    fontSize: 14, // Kích thước chữ
    color: "#7F8C8D", // Màu chữ xám
    marginTop: 8, // Khoảng cách đỉnh
  },
  orderStatus: {
    fontSize: 14, // Kích thước chữ
    color: "#27AE60", // Màu chữ xanh lá
    marginTop: 8, // Khoảng cách đỉnh
    fontWeight: "600", // Độ đậm chữ
  },
  paymentMethod: {
    fontSize: 14, // Kích thước chữ
    color: "#7F8C8D", // Màu chữ xám
    marginTop: 8, // Khoảng cách đỉnh
  },
  orderDetailItem: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    justifyContent: "space-between", // Căn đều hai bên
    alignItems: "center", // Căn giữa theo chiều dọc
    paddingVertical: 12, // Khoảng cách dọc
    borderBottomWidth: 1, // Độ dày viền dưới
    borderBottomColor: "#F1F3F5", // Màu viền dưới
  },
  itemName: {
    fontSize: 16, // Kích thước chữ
    fontWeight: "600", // Độ đậm chữ
    color: "#2C3E50", // Màu chữ xanh đậm
    flex: 1, // Chiếm không gian linh hoạt
  },
  itemDetail: {
    fontSize: 13, // Kích thước chữ
    color: "#95A5A6", // Màu chữ xám nhạt
    marginTop: 4, // Khoảng cách đỉnh
    flex: 1, // Chiếm không gian linh hoạt
  },
  itemPrice: {
    fontSize: 15, // Kích thước chữ
    color: "#34495E", // Màu chữ xanh đậm
    fontWeight: "500", // Độ đậm chữ
  },
  itemQuantity: {
    fontSize: 15, // Kích thước chữ
    color: "#7F8C8D", // Màu chữ xám
    marginHorizontal: 15, // Khoảng cách ngang
  },
  itemTotal: {
    fontSize: 15, // Kích thước chữ
    fontWeight: "700", // Độ đậm chữ
    color: "#C0392B", // Màu chữ đỏ
  },
  orderFooter: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    justifyContent: "space-between", // Căn đều hai bên
    alignItems: "center", // Căn giữa theo chiều dọc
    marginTop: 15, // Khoảng cách đỉnh
    paddingTop: 15, // Khoảng cách đỉnh
    borderTopWidth: 1, // Độ dày viền trên
    borderTopColor: "#F1F3F5", // Màu viền trên
    backgroundColor: "#F8F9FA", // Màu nền xám nhạt
    paddingHorizontal: 12, // Khoảng cách ngang
    paddingVertical: 10, // Khoảng cách dọc
    borderRadius: 10, // Bo góc
  },
  totalLabel: {
    fontSize: 18, // Kích thước chữ
    fontWeight: "700", // Độ đậm chữ
    color: "#2C3E50", // Màu chữ xanh đậm
  },
  totalAmount: {
    fontSize: 18, // Kích thước chữ
    fontWeight: "700", // Độ đậm chữ
    color: "#C0392B", // Màu chữ đỏ
  },
  cancelButton: {
    backgroundColor: "#E74C3C", // Màu nền đỏ
    paddingVertical: 8, // Khoảng cách dọc
    paddingHorizontal: 15, // Khoảng cách ngang
    borderRadius: 8, // Bo góc
    marginLeft: 10, // Khoảng cách trái
  },
  cancelButtonText: {
    color: "#FFF", // Màu chữ trắng
    fontWeight: "600", // Độ đậm chữ
  },
  emptyText: {
    textAlign: "center", // Căn giữa văn bản
    marginTop: 10, // Khoảng cách đỉnh
    color: "#95A5A6", // Màu chữ xám nhạt
    fontSize: 16, // Kích thước chữ
    fontStyle: "italic", // Kiểu chữ nghiêng
  },
  paginationContainer: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    justifyContent: "space-between", // Căn đều hai bên
    alignItems: "center", // Căn giữa theo chiều dọc
    paddingVertical: 20, // Khoảng cách dọc
    paddingHorizontal: 20, // Khoảng cách ngang
    backgroundColor: "#FFF", // Màu nền trắng
    borderTopWidth: 1, // Độ dày viền trên
    borderTopColor: "#E5E5E5", // Màu viền trên
    marginTop: 20, // Khoảng cách đỉnh
  },
  paginationButton: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    paddingVertical: 10, // Khoảng cách dọc
    paddingHorizontal: 15, // Khoảng cách ngang
    backgroundColor: "#F8F9FA", // Màu nền xám nhạt
    borderRadius: 10, // Bo góc
  },
  paginationButtonDisabled: {
    opacity: 0.5, // Độ mờ khi nút bị vô hiệu hóa
  },
  paginationText: {
    fontSize: 14, // Kích thước chữ
    color: "#2C3E50", // Màu chữ xanh đậm
    marginHorizontal: 8, // Khoảng cách ngang
  },
  pageInfo: {
    fontSize: 14, // Kích thước chữ
    color: "#7F8C8D", // Màu chữ xám
    fontWeight: "600", // Độ đậm chữ
  },
});

export default styles;
