import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1, // Mục đích: Mở rộng toàn màn hình.
    backgroundColor: "#FFF", // Mục đích: Đặt nền trắng.
  },
  header: {
    flexDirection: "row", // Mục đích: Sắp xếp ngang.
    alignItems: "center", // Mục đích: Canh giữa dọc.
    padding: 15, // Mục đích: Tạo khoảng cách trong.
    borderBottomWidth: 1, // Mục đích: Thêm viền dưới.
    borderBottomColor: "#EEE", // Mục đích: Đặt màu viền.
  },
  backButton: {
    padding: 5, // Mục đích: Tạo không gian nút back.
  },
  headerTitle: {
    fontSize: 20, // Mục đích: Đặt cỡ chữ tiêu đề.
    fontWeight: "bold", // Mục đích: Làm đậm chữ.
    marginLeft: 15, // Mục đích: Cách nút back.
  },
  emptyCartContainer: {
    flex: 1, // Mục đích: Canh giữa nội dung trống.
    justifyContent: "center", // Mục đích: Đưa nội dung vào giữa dọc.
    alignItems: "center", // Mục đích: Căn giữa ngang.
    padding: 20, // Mục đích: Tạo không gian quanh text.
  },
  emptyCartText: {
    fontSize: 18, // Mục đích: Đảm bảo text dễ đọc.
    color: "#777", // Mục đích: Tạo màu xám nhẹ.
    marginBottom: 20, // Mục đích: Cách nút tiếp tục.
  },
  continueShoppingButton: {
    backgroundColor: "#E57905", // Mục đích: Tạo nút nổi bật.
    paddingVertical: 10, // Mục đích: Tăng chiều cao nút.
    paddingHorizontal: 20, // Mục đích: Tăng chiều rộng nút.
    borderRadius: 5, // Mục đích: Bo góc nút.
  },
  continueShoppingText: {
    color: "#FFF", // Mục đích: Tạo text trắng.
    fontSize: 16, // Mục đích: Đảm bảo dễ đọc.
    fontWeight: "bold", // Mục đích: Nhấn mạnh text.
  },
  cartList: {
    padding: 15, // Mục đích: Tạo không gian danh sách.
  },
  cartItem: {
    flexDirection: "row", // Mục đích: Xếp ngang nội dung.
    backgroundColor: "#F9F9F9", // Mục đích: Tạo nền sáng.
    borderRadius: 10, // Mục đích: Bo góc item.
    padding: 10, // Mục đích: Tạo không gian nội dung.
    marginBottom: 10, // Mục đích: Cách item tiếp theo.
    alignItems: "center", // Mục đích: Canh giữa dọc.
  },
  selectButton: {
    padding: 10, // Mục đích: Tạo không gian nút chọn.
    marginRight: 10, // Mục đích: Cách nội dung bên cạnh.
  },
  itemImage: {
    width: 60, // Mục đích: Xác định chiều rộng ảnh.
    height: 60, // Mục đích: Xác định chiều cao ảnh.
    borderRadius: 5, // Mục đích: Bo góc ảnh.
  },
  itemDetails: {
    flex: 1, // Mục đích: Chiếm không gian còn lại.
    marginLeft: 10, // Mục đích: Cách ảnh.
  },
  itemName: {
    fontSize: 16, // Mục đích: Đặt cỡ chữ tên.
    fontWeight: "bold", // Mục đích: Làm đậm tên.
  },
  itemPrice: {
    fontSize: 14, // Mục đích: Đặt cỡ chữ giá.
    color: "#E57905", // Mục đích: Tạo màu cam.
    marginVertical: 5, // Mục đích: Cách trên dưới.
  },
  quantityContainer: {
    flexDirection: "row", // Mục đích: Xếp ngang số lượng.
    alignItems: "center", // Mục đích: Canh giữa dọc.
  },
  quantityButton: {
    padding: 5, // Mục đích: Tạo không gian nút số lượng.
  },
  quantityText: {
    fontSize: 16, // Mục đích: Đặt cỡ chữ số lượng.
    marginHorizontal: 10, // Mục đích: Cách hai nút.
  },
  removeButton: {
    padding: 5, // Mục đích: Tạo không gian nút xóa.
  },
  selectAllButton: {
    padding: 10, // Mục đích: Tạo không gian nút chọn tất cả.
    backgroundColor: "#E57905", // Mục đích: Tạo nút nổi bật.
    borderRadius: 5, // Mục đích: Bo góc nút.
    alignItems: "center", // Mục đích: Căn giữa nội dung.
    marginHorizontal: 15, // Mục đích: Cách hai bên.
    marginBottom: 10, // Mục đích: Cách footer.
  },
  selectAllText: {
    color: "#FFF", // Mục đích: Tạo text trắng.
    fontSize: 16, // Mục đích: Đảm bảo dễ đọc.
    fontWeight: "bold", // Mục đích: Nhấn mạnh text.
  },
  footer: {
    padding: 15, // Mục đích: Tạo không gian footer.
    borderTopWidth: 1, // Mục đích: Thêm viền trên.
    borderTopColor: "#EEE", // Mục đích: Đặt màu viền.
    flexDirection: "row", // Mục đích: Xếp ngang nội dung.
    justifyContent: "space-between", // Mục đích: Dàn đều hai bên.
    alignItems: "center", // Mục đích: Canh giữa dọc.
  },
  totalText: {
    fontSize: 18, // Mục đích: Đặt cỡ chữ tổng.
    fontWeight: "bold", // Mục đích: Làm đậm chữ.
  },
  checkoutButton: {
    backgroundColor: "#E57905", // Mục đích: Tạo nút nổi bật.
    paddingVertical: 10, // Mục đích: Tăng chiều cao nút.
    paddingHorizontal: 20, // Mục đích: Tăng chiều rộng nút.
    borderRadius: 5, // Mục đích: Bo góc nút.
  },
  checkoutText: {
    color: "#FFF", // Mục đích: Tạo text trắng.
    fontSize: 16, // Mục đích: Đảm bảo dễ đọc.
    fontWeight: "bold", // Mục đích: Nhấn mạnh text.
  },
});
