import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF8EF", // Giữ màu nền be nhạt
  },
  backButton: {
    marginTop: 20, // Dịch lên trên (giảm từ 40 xuống 20)
    marginLeft: 16,
    marginBottom: 10,
    padding: -20, // Tăng vùng chạm
  },
  productImage: {
    width: "90%", // Giảm chiều rộng để tạo khoảng cách hai bên
    height: 360, // Giảm chiều cao từ 300 xuống 200
    borderRadius: 20, // Bo góc lớn hơn để trông mềm mại
    alignSelf: "center", // Căn giữa ảnh
    marginVertical: 10, // Thêm khoảng cách trên dưới
  },
  productInfo: {
    paddingHorizontal: 16,
    paddingVertical: 10, // Giảm padding dọc để gọn hơn
  },
  productName: {
    fontSize: 26, // Tăng kích thước chữ để nổi bật
    fontWeight: "bold",
    color: "#2A2A2A", // Màu đen đậm hơn để tăng độ tương phản
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 22, // Tăng kích thước chữ
    fontWeight: "600",
    color: "#E57905", // Giữ màu cam
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    color: "#666", // Màu xám đậm hơn một chút để dễ đọc
    lineHeight: 22, // Tăng khoảng cách dòng để dễ đọc
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 15, // Tăng khoảng cách trên dưới
    justifyContent: "space-between", // Căn đều hai bên
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2A2A2A", // Màu đen đậm hơn
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF", // Thêm màu nền trắng
    borderWidth: 1,
    borderColor: "#E57905",
    borderRadius: 10, // Bo góc mềm mại hơn
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: "#000", // Thêm đổ bóng
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2A2A2A",
    marginHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginVertical: 20,
    marginBottom: 30, // Thêm khoảng cách dưới để không sát đáy
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#F5A623", // Màu cam nhạt hơn để phân biệt với "Mua ngay"
    borderRadius: 10, // Bo góc mềm mại hơn
    paddingVertical: 14, // Tăng padding dọc để nút cao hơn
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#000", // Thêm đổ bóng
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addToCartText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "#E57905", // Giữ màu cam đậm cho nút "Mua ngay"
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginLeft: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buyNowText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});

export default styles;
