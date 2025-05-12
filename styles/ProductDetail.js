import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm toàn bộ không gian có sẵn
    backgroundColor: "#FEF8EF", // Màu nền be nhạt
  },
  backButton: {
    marginTop: 20, // Khoảng cách đỉnh (giảm từ 40 xuống 20)
    marginLeft: 16, // Khoảng cách trái
    marginBottom: 10, // Khoảng cách dưới
    padding: -20, // Khoảng cách (giá trị âm không hợp lệ, tăng vùng chạm)
  },
  productImage: {
    width: "90%", // Chiếm 90% chiều rộng để tạo khoảng cách hai bên
    height: 360, // Chiều cao ảnh
    borderRadius: 20, // Bo góc lớn hơn để trông mềm mại
    alignSelf: "center", // Căn giữa ảnh
    marginVertical: 10, // Khoảng cách trên dưới
  },
  productInfo: {
    paddingHorizontal: 16, // Khoảng cách ngang
    paddingVertical: 10, // Khoảng cách dọc (giảm để gọn hơn)
  },
  productName: {
    fontSize: 26, // Kích thước chữ lớn để nổi bật
    fontWeight: "bold", // Độ đậm chữ
    color: "#2A2A2A", // Màu đen đậm để tăng độ tương phản
    marginBottom: 8, // Khoảng cách dưới
  },
  productPrice: {
    fontSize: 22, // Kích thước chữ
    fontWeight: "600", // Độ đậm chữ
    color: "#E57905", // Màu cam
    marginBottom: 8, // Khoảng cách dưới
  },
  productDescription: {
    fontSize: 16, // Kích thước chữ
    color: "#666", // Màu xám đậm để dễ đọc
    lineHeight: 22, // Khoảng cách dòng để dễ đọc
  },
  quantityContainer: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    paddingHorizontal: 16, // Khoảng cách ngang
    marginVertical: 15, // Khoảng cách trên dưới
    justifyContent: "space-between", // Căn đều hai bên
  },
  quantityLabel: {
    fontSize: 16, // Kích thước chữ
    fontWeight: "bold", // Độ đậm chữ
    color: "#2A2A2A", // Màu đen đậm
  },
  quantitySelector: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    backgroundColor: "#FFF", // Màu nền trắng
    borderWidth: 1, // Độ dày viền
    borderColor: "#E57905", // Màu viền cam
    borderRadius: 10, // Bo góc mềm mại
    paddingHorizontal: 8, // Khoảng cách ngang
    paddingVertical: 4, // Khoảng cách dọc
    shadowColor: "#000", // Màu bóng
    shadowOpacity: 0.1, // Độ mờ bóng
    shadowRadius: 4, // Bán kính bóng
    elevation: 2, // Độ nổi (Android)
  },
  quantityButton: {
    padding: 8, // Khoảng cách bên trong
  },
  quantityText: {
    fontSize: 16, // Kích thước chữ
    fontWeight: "bold", // Độ đậm chữ
    color: "#2A2A2A", // Màu đen đậm
    marginHorizontal: 16, // Khoảng cách ngang
  },
  buttonContainer: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    justifyContent: "space-between", // Căn đều hai bên
    paddingHorizontal: 16, // Khoảng cách ngang
    marginVertical: 20, // Khoảng cách trên dưới
    marginBottom: 30, // Khoảng cách dưới để không sát đáy
  },
  addToCartButton: {
    flex: 1, // Chiếm không gian linh hoạt
    backgroundColor: "#F5A623", // Màu cam nhạt để phân biệt
    borderRadius: 10, // Bo góc mềm mại
    paddingVertical: 14, // Khoảng cách dọc để nút cao hơn
    alignItems: "center", // Căn giữa theo chiều dọc
    marginRight: 10, // Khoảng cách phải
    shadowColor: "#000", // Màu bóng
    shadowOpacity: 0.2, // Độ mờ bóng
    shadowRadius: 4, // Bán kính bóng
    elevation: 3, // Độ nổi (Android)
  },
  addToCartText: {
    color: "#FFF", // Màu chữ trắng
    fontSize: 16, // Kích thước chữ
    fontWeight: "bold", // Độ đậm chữ
  },
  buyNowButton: {
    flex: 1, // Chiếm không gian linh hoạt
    backgroundColor: "#E57905", // Màu cam đậm cho nút "Mua ngay"
    borderRadius: 10, // Bo góc mềm mại
    paddingVertical: 14, // Khoảng cách dọc
    alignItems: "center", // Căn giữa theo chiều dọc
    marginLeft: 10, // Khoảng cách trái
    shadowColor: "#000", // Màu bóng
    shadowOpacity: 0.2, // Độ mờ bóng
    shadowRadius: 4, // Bán kính bóng
    elevation: 3, // Độ nổi (Android)
  },
  buyNowText: {
    color: "#FFF", // Màu chữ trắng
    fontSize: 16, // Kích thước chữ
    fontWeight: "bold", // Độ đậm chữ
  },
  loadingContainer: {
    flex: 1, // Chiếm toàn bộ không gian
    justifyContent: "center", // Căn giữa theo chiều ngang
    alignItems: "center", // Căn giữa theo chiều dọc
  },
  errorContainer: {
    flex: 1, // Chiếm toàn bộ không gian
    justifyContent: "center", // Căn giữa theo chiều ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    padding: 20, // Khoảng cách bên trong
  },
  errorText: {
    color: "red", // Màu chữ đỏ
    fontSize: 16, // Kích thước chữ
    textAlign: "center", // Căn giữa văn bản
  },
});

export default styles;
