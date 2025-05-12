import { StyleSheet } from "react-native";
import { Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1, // Mở rộng toàn màn hình.
    backgroundColor: "#FFF", // Đặt nền trắng.
  },
  header: {
    flexDirection: "row", // Sắp xếp ngang.
    alignItems: "center", // Canh giữa dọc.
    paddingTop: Platform.OS === "ios" ? 50 : 30, // Điều chỉnh khoảng cách đầu theo hệ điều hành.
    paddingHorizontal: 15, // Tạo khoảng cách ngang.
    paddingBottom: 15, // Tạo khoảng cách dưới.
    backgroundColor: "#FFF", // Đặt nền trắng.
    borderBottomWidth: 1, // Thêm viền dưới.
    borderBottomColor: "#EEE", // Đặt màu viền.
    marginTop: -50, // Điều chỉnh vị trí header.
  },
  backButton: {
    padding: 5, // Tạo không gian nút back.
  },
  headerTitle: {
    fontSize: 20, // Đặt cỡ chữ tiêu đề.
    fontWeight: "bold", // Làm đậm chữ.
    marginLeft: 15, // Cách nút back.
  },
  section: {
    padding: 15, // Tạo không gian phần.
    backgroundColor: "#FFF", // Đặt nền trắng.
  },
  sectionTitle: {
    fontSize: 18, // Đặt cỡ chữ tiêu đề phần.
    fontWeight: "bold", // Làm đậm chữ.
    marginBottom: 15, // Cách nội dung dưới.
    color: "#333", // Đặt màu chữ.
  },
  inputContainer: {
    marginBottom: 20, // Cách ô nhập tiếp theo.
  },
  input: {
    height: 48, // Đặt chiều cao ô nhập.
    borderWidth: 1, // Thêm viền.
    borderColor: "#DDD", // Đặt màu viền.
    borderRadius: 8, // Bo góc ô.
    paddingHorizontal: 12, // Tạo khoảng cách ngang trong.
    paddingVertical: 10, // Tạo khoảng cách dọc trong.
    fontSize: 16, // Đặt cỡ chữ.
    backgroundColor: "#FFF", // Đặt nền trắng.
  },
  addressSelector: {
    flexDirection: "row", // Sắp xếp ngang.
    alignItems: "center", // Canh giữa dọc.
    justifyContent: "space-between", // Dàn đều hai bên.
    height: 48, // Đặt chiều cao.
    borderWidth: 1, // Thêm viền.
    borderColor: "#DDD", // Đặt màu viền.
    borderRadius: 8, // Bo góc.
    paddingHorizontal: 12, // Tạo khoảng cách ngang trong.
    backgroundColor: "#FFF", // Đặt nền trắng.
    marginBottom: 20, // Cách phần dưới.
  },
  addressText: {
    fontSize: 16, // Đặt cỡ chữ địa chỉ.
    color: "#333", // Đặt màu chữ.
    flex: 1, // Chiếm không gian còn lại.
    marginRight: 10, // Cách icon bên phải.
  },
  placeholderText: {
    color: "#999", // Tạo màu xám nhạt.
  },
  modalOverlay: {
    flex: 1, // Mở rộng toàn màn hình.
    backgroundColor: "rgba(0,0,0,0.5)", // Tạo nền mờ.
    justifyContent: "flex-end", // Đưa nội dung xuống dưới.
  },
  modalContent: {
    backgroundColor: "#FFF", // Đặt nền trắng.
    borderTopLeftRadius: 12, // Bo góc trên trái.
    borderTopRightRadius: 12, // Bo góc trên phải.
    maxHeight: "50%", // Giới hạn chiều cao tối đa.
    paddingBottom: 20, // Tạo khoảng cách dưới.
  },
  modalHeader: {
    flexDirection: "row", // Sắp xếp ngang.
    justifyContent: "space-between", // Dàn đều hai bên.
    alignItems: "center", // Canh giữa dọc.
    padding: 15, // Tạo khoảng cách trong.
    borderBottomWidth: 1, // Thêm viền dưới.
    borderBottomColor: "#EEE", // Đặt màu viền.
  },
  modalTitle: {
    fontSize: 18, // Đặt cỡ chữ tiêu đề.
    fontWeight: "bold", // Làm đậm chữ.
    color: "#333", // Đặt màu chữ.
  },
  addressItem: {
    padding: 15, // Tạo không gian mục địa chỉ.
    borderBottomWidth: 1, // Thêm viền dưới.
    borderBottomColor: "#EEE", // Đặt màu viền.
    flexDirection: "row", // Sắp xếp ngang.
    alignItems: "center", // Canh giữa dọc.
    justifyContent: "space-between", // Dàn đều hai bên.
  },
  addressItemText: {
    fontSize: 16, // Đặt cỡ chữ địa chỉ.
    color: "#333", // Đặt màu chữ.
    flex: 1, // Chiếm không gian còn lại.
  },
  defaultBadge: {
    fontSize: 12, // Đặt cỡ chữ badge.
    color: "#FFF", // Tạo chữ trắng.
    backgroundColor: "#F28C38", // Đặt màu nền cam.
    paddingHorizontal: 8, // Tạo khoảng cách ngang trong.
    paddingVertical: 4, // Tạo khoảng cách dọc trong.
    borderRadius: 12, // Bo góc badge.
  },
  voucherContainer: {
    flexDirection: "row", // Sắp xếp ngang.
    alignItems: "center", // Canh giữa dọc.
    marginBottom: 20, // Cách phần dưới.
  },
  voucherInput: {
    flex: 1, // Chiếm không gian còn lại.
    marginRight: 10, // Cách nút áp dụng.
  },
  applyVoucherButton: {
    backgroundColor: "#F28C38", // Đặt màu nền cam.
    paddingVertical: 12, // Tăng chiều cao nút.
    paddingHorizontal: 20, // Tăng chiều rộng nút.
    borderRadius: 8, // Bo góc nút.
    justifyContent: "center", // Canh giữa nội dung.
    height: 48, // Đảm bảo cùng chiều cao ô nhập.
  },
  applyVoucherText: {
    fontSize: 16, // Đặt cỡ chữ.
    color: "#FFF", // Tạo chữ trắng.
    fontWeight: "bold", // Làm đậm chữ.
    textAlign: "center", // Căn giữa chữ.
  },
  paymentOption: {
    flexDirection: "row", // Sắp xếp ngang.
    alignItems: "center", // Canh giữa dọc.
    marginBottom: 15, // Cách tùy chọn tiếp theo.
  },
  paymentText: {
    fontSize: 16, // Đặt cỡ chữ.
    marginLeft: 10, // Cách icon.
    color: "#333", // Đặt màu chữ.
  },
  orderList: {
    flexGrow: 1, // Mở rộng theo nội dung.
    backgroundColor: "#FFF", // Đặt nền trắng.
    paddingBottom: Platform.OS === "ios" ? 0 : 20, // Điều chỉnh khoảng cách dưới theo hệ điều hành.
  },
  orderItem: {
    flexDirection: "row", // Sắp xếp ngang.
    justifyContent: "space-between", // Dàn đều hai bên.
    padding: 15, // Tạo không gian trong.
    backgroundColor: "#FFF", // Đặt nền trắng.
    borderRadius: 8, // Bo góc item.
    marginHorizontal: 15, // Cách hai bên.
    marginBottom: 10, // Cách item tiếp theo.
    elevation: 2, // Tạo bóng trên Android.
    shadowColor: "#000", // Đặt màu bóng.
    shadowOffset: { width: 0, height: 1 }, // Đặt vị trí bóng.
    shadowOpacity: 0.1, // Đặt độ mờ bóng.
    shadowRadius: 2, // Đặt độ lan bóng.
  },
  itemName: {
    fontSize: 16, // Đặt cỡ chữ tên.
    fontWeight: "500", // Làm chữ hơi đậm.
    flex: 2, // Chiếm không gian lớn hơn.
    color: "#333", // Đặt màu chữ.
  },
  itemPrice: {
    fontSize: 16, // Đặt cỡ chữ giá.
    flex: 1, // Chiếm không gian đều.
    textAlign: "center", // Căn giữa chữ.
    color: "#666", // Đặt màu xám.
  },
  itemQuantity: {
    fontSize: 16, // Đặt cỡ chữ số lượng.
    flex: 1, // Chiếm không gian đều.
    textAlign: "center", // Căn giữa chữ.
    color: "#666", // Đặt màu xám.
  },
  itemTotal: {
    fontSize: 16, // Đặt cỡ chữ tổng.
    fontWeight: "bold", // Làm đậm chữ.
    flex: 1, // Chiếm không gian đều.
    textAlign: "right", // Căn phải chữ.
    color: "#F28C38", // Đặt màu cam.
  },
  summary: {
    marginTop: 10, // Cách phần trên.
    padding: 15, // Tạo không gian trong.
    backgroundColor: "#FFF", // Đặt nền trắng.
    marginHorizontal: 15, // Cách hai bên.
    borderRadius: 8, // Bo góc.
    elevation: 2, // Tạo bóng trên Android.
    shadowColor: "#000", // Đặt màu bóng.
    shadowOffset: { width: 0, height: 1 }, // Đặt vị trí bóng.
    shadowOpacity: 0.1, // Đặt độ mờ bóng.
    shadowRadius: 2, // Đặt độ lan bóng.
  },
  summaryRow: {
    flexDirection: "row", // Sắp xếp ngang.
    justifyContent: "space-between", // Dàn đều hai bên.
    marginBottom: 10, // Cách hàng tiếp theo.
  },
  summaryLabel: {
    fontSize: 16, // Đặt cỡ chữ nhãn.
    color: "#666", // Đặt màu xám.
  },
  summaryValue: {
    fontSize: 16, // Đặt cỡ chữ giá trị.
    color: "#333", // Đặt màu chữ.
  },
  summaryTotal: {
    fontSize: 18, // Đặt cỡ chữ tổng.
    fontWeight: "bold", // Làm đậm chữ.
    color: "#F28C38", // Đặt màu cam.
  },
  buttonContainer: {
    flexDirection: "row", // Sắp xếp ngang.
    justifyContent: "space-between", // Dàn đều hai bên.
    padding: 15, // Tạo không gian trong.
    backgroundColor: "#FFF", // Đặt nền trắng.
    paddingBottom: Platform.OS === "ios" ? 30 : 15, // Điều chỉnh khoảng cách dưới.
  },
  backToCartButton: {
    flex: 1, // Chiếm không gian đều.
    padding: 15, // Tạo không gian trong.
    borderWidth: 1, // Thêm viền.
    borderColor: "#F28C38", // Đặt màu viền.
    borderRadius: 8, // Bo góc nút.
    alignItems: "center", // Căn giữa nội dung.
    marginRight: 10, // Cách nút bên phải.
  },
  backToCartText: {
    fontSize: 16, // Đặt cỡ chữ.
    color: "#F28C38", // Đặt màu cam.
    fontWeight: "bold", // Làm đậm chữ.
  },
  placeOrderButton: {
    flex: 1, // Chiếm không gian đều.
    backgroundColor: "#F28C38", // Đặt màu nền cam.
    padding: 15, // Tạo không gian trong.
    borderRadius: 8, // Bo góc nút.
    alignItems: "center", // Căn giữa nội dung.
  },
  placeOrderText: {
    fontSize: 16, // Đặt cỡ chữ.
    color: "#FFF", // Tạo chữ trắng.
    fontWeight: "bold", // Làm đậm chữ.
  },
  updateButton: {
    backgroundColor: "#4CAF50", // Đặt màu nền xanh.
    padding: 12, // Tạo không gian trong.
    borderRadius: 8, // Bo góc nút.
    alignItems: "center", // Căn giữa nội dung.
    marginTop: 10, // Cách phần trên.
  },
  updateButtonText: {
    fontSize: 16, // Đặt cỡ chữ.
    color: "#FFF", // Tạo chữ trắng.
    fontWeight: "bold", // Làm đậm chữ.
  },
  disabledButton: {
    backgroundColor: "#ccc", // Đặt màu xám.
    opacity: 0.6, // Làm mờ nút.
  },
  noAddressText: {
    fontSize: 14, // Đặt cỡ chữ.
    color: "#666", // Đặt màu xám.
    marginBottom: 10, // Cách phần dưới.
    textAlign: "center", // Căn giữa chữ.
  },
  loadingText: {
    fontSize: 16, // Đặt cỡ chữ.
    color: "#333", // Đặt màu chữ.
    textAlign: "center", // Căn giữa chữ.
    marginBottom: 10, // Cách phần dưới.
  },
});
