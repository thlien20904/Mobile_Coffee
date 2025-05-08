import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 25,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingTop: 60,
    marginTop: -50,
  },
  backButton: {
    padding: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    textAlign: "center", // Căn giữa tiêu đề
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 5, // Giảm padding để gọn hơn
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 90, // Tăng chiều rộng để chữ không xuống dòng
  },
  tabButtonActive: {
    borderBottomColor: "#27AE60",
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 14, // Giảm kích thước chữ để vừa một hàng
    color: "#666",
    fontWeight: "500",
    textAlign: "center",
  },
  tabTextActive: {
    color: "#27AE60",
    fontWeight: "600",
  },
  orderList: {
    paddingVertical: 0,
    paddingHorizontal: 20,
    marginTop: 10, // Thêm khoảng cách giữa tab và đơn hàng
  },
  orderContainer: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginBottom: 25,
    padding: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: "#E8ECEF",
  },
  orderHeader: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F5",
    paddingBottom: 12,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "700",
    color: "#34495E",
  },
  orderDate: {
    fontSize: 14,
    color: "#7F8C8D",
    marginTop: 8,
  },
  orderStatus: {
    fontSize: 14,
    color: "#27AE60",
    marginTop: 8,
    fontWeight: "600",
  },
  paymentMethod: {
    fontSize: 14,
    color: "#7F8C8D",
    marginTop: 8,
  },
  orderDetailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F5",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    flex: 1,
  },
  itemDetail: {
    fontSize: 13,
    color: "#95A5A6",
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
    marginHorizontal: 15,
  },
  itemTotal: {
    fontSize: 15,
    fontWeight: "700",
    color: "#C0392B",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F1F3F5",
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
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
  cancelButton: {
    backgroundColor: "#E74C3C",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 10, // Thêm khoảng cách cho empty text
    color: "#95A5A6",
    fontSize: 16,
    fontStyle: "italic",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    marginTop: 20,
  },
  paginationButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F8F9FA",
    borderRadius: 10,
  },
  paginationButtonDisabled: {
    opacity: 0.5,
  },
  paginationText: {
    fontSize: 14,
    color: "#2C3E50",
    marginHorizontal: 8,
  },
  pageInfo: {
    fontSize: 14,
    color: "#7F8C8D",
    fontWeight: "600",
  },
});

export default styles;
