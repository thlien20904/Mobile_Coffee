import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA", // Màu nền nhẹ nhàng, sang trọng
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 70, // Tăng chiều cao header
    paddingHorizontal: 20,
    backgroundColor: "#FFF", // Nền trắng cho header
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    backgroundColor: "#F0F0F0", // Nền nút quay lại nhẹ
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 20, // Tăng kích thước chữ
    fontWeight: "700",
    color: "#2C3E50", // Màu chữ đậm, sang trọng
    marginLeft: 15,
    fontFamily: "System", // Có thể thay bằng font sang trọng như "Roboto"
  },
  orderList: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  orderContainer: {
    backgroundColor: "#FFF", // Nền trắng cho khung đơn hàng
    borderRadius: 15, // Bo góc mềm mại hơn
    marginBottom: 20,
    padding: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: "#E8ECEF", // Viền nhẹ
  },
  orderHeader: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F5", // Đường phân cách nhẹ
    paddingBottom: 10,
  },
  orderId: {
    fontSize: 18, // Tăng kích thước chữ
    fontWeight: "700",
    color: "#34495E", // Màu chữ đậm
  },
  orderDate: {
    fontSize: 14,
    color: "#7F8C8D", // Màu xám nhẹ, tinh tế
    marginTop: 6,
  },
  orderStatus: {
    fontSize: 14,
    color: "#27AE60", // Màu xanh lá cho trạng thái, thể hiện thành công
    marginTop: 6,
    fontWeight: "600",
  },
  paymentMethod: {
    fontSize: 14,
    color: "#7F8C8D",
    marginTop: 6,
  },
  orderDetailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F5",
  },
  itemName: {
    fontSize: 16, // Tăng kích thước chữ tên sản phẩm
    fontWeight: "600",
    color: "#2C3E50",
    flex: 1,
  },
  itemDetail: {
    fontSize: 13,
    color: "#95A5A6", // Màu xám nhạt cho chi tiết
    marginTop: 4,
    flex: 1,
  },
  itemPrice: {
    fontSize: 15,
    color: "#34495E",
    fontWeight: "500",
  },
  itemQuantity: {
    fontSize: 15,
    color: "#7F8C8D",
    marginHorizontal: 12,
  },
  itemTotal: {
    fontSize: 15,
    fontWeight: "700",
    color: "#C0392B", // Màu đỏ đậm cho tổng tiền sản phẩm
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F1F3F5",
    backgroundColor: "#F8F9FA", // Nền nhẹ cho footer
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2C3E50",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#C0392B",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "#95A5A6",
    fontSize: 16,
    fontStyle: "italic",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  paginationButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
  },
  paginationButtonDisabled: {
    opacity: 0.5,
  },
  paginationText: {
    fontSize: 14,
    color: "#2C3E50",
    marginHorizontal: 5,
  },
  pageInfo: {
    fontSize: 14,
    color: "#7F8C8D",
    fontWeight: "600",
  },
});

export default styles;
