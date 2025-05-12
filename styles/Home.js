import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm toàn bộ không gian có sẵn
    backgroundColor: "#FEF8EF", // Màu nền
  },
  header: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    justifyContent: "space-between", // Căn đều hai bên
    alignItems: "center", // Căn giữa theo chiều dọc
    paddingHorizontal: 16, // Khoảng cách ngang
    paddingVertical: 40, // Khoảng cách dọc
    backgroundColor: "#FFF", // Màu nền trắng
    borderBottomWidth: 1, // Độ dày viền dưới
    borderBottomColor: "#EEEEEE", // Màu viền dưới
    marginTop: -55, // Lệch lên trên
    paddingTop: 60, // Khoảng cách đỉnh
  },
  headerLeft: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
  },
  headerRight: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
  },
  logoContainer: {
    width: 40, // Chiều rộng
    height: 40, // Chiều cao
    borderRadius: 20, // Bo góc hình tròn
    backgroundColor: "#FEE5C9", // Màu nền
    justifyContent: "center", // Căn giữa theo chiều ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    marginRight: 8, // Khoảng cách phải
  },
  cartBadge: {
    position: "relative", // Vị trí tương đối
  },
  cartCount: {
    position: "absolute", // Vị trí tuyệt đối
    top: -5, // Lệch lên trên
    right: -5, // Lệch sang phải
    backgroundColor: "#FF4444", // Màu nền đỏ
    borderRadius: 10, // Bo góc hình tròn
    minWidth: 18, // Chiều rộng tối thiểu
    height: 18, // Chiều cao
    textAlign: "center", // Căn giữa văn bản
    color: "#FFF", // Màu chữ trắng
    fontSize: 12, // Kích thước chữ
    fontWeight: "bold", // Độ đậm chữ
    paddingHorizontal: 2, // Khoảng cách ngang
  },
  greeting: {
    fontSize: 20, // Kích thước chữ
    fontWeight: "bold", // Độ đậm chữ
    color: "#000", // Màu chữ đen
  },
  userContainer: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    marginRight: 3, // Khoảng cách phải
  },
  avatar: {
    width: 40, // Chiều rộng
    height: 40, // Chiều cao
    borderRadius: 20, // Bo góc hình tròn
  },
  userName: {
    fontSize: 16, // Kích thước chữ
    fontWeight: "bold", // Độ đậm chữ
    color: "#000", // Màu chữ đen
  },
  logoutButton: {
    padding: -12, // Khoảng cách (giá trị âm không hợp lệ)
  },
  logoutText: {
    fontSize: 14, // Kích thước chữ
    color: "#E57905", // Màu chữ cam
    fontWeight: "bold", // Độ đậm chữ
  },
  ticketButton: {
    marginRight: 16, // Khoảng cách phải
    width: 36, // Chiều rộng
    height: 36, // Chiều cao
    borderRadius: 18, // Bo góc hình tròn
    backgroundColor: "#FEE5C9", // Màu nền
    justifyContent: "center", // Căn giữa theo chiều ngang
    alignItems: "center", // Căn giữa theo chiều dọc
  },
  notificationButton: {
    width: 40, // Chiều rộng
    height: 40, // Chiều cao
    borderRadius: 20, // Bo góc hình tròn
    backgroundColor: "white", // Màu nền trắng
    justifyContent: "center", // Căn giữa theo chiều ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    shadowColor: "#000", // Màu bóng
    shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng
    shadowOpacity: 0.1, // Độ mờ bóng
    shadowRadius: 4, // Bán kính bóng
    elevation: 2, // Độ nổi (Android)
  },
  loginCard: {
    backgroundColor: "white", // Màu nền trắng
    borderRadius: 16, // Bo góc
    marginHorizontal: 16, // Khoảng cách ngang
    marginVertical: 10, // Khoảng cách dọc
    overflow: "hidden", // Ẩn nội dung tràn
    borderWidth: 1, // Độ dày viền
    borderColor: "#F5F5F5", // Màu viền
    elevation: 3, // Độ nổi (Android)
    shadowColor: "#000", // Màu bóng
    shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng
    shadowOpacity: 0.1, // Độ mờ bóng
    shadowRadius: 5, // Bán kính bóng
  },
  loginCardContent: {
    padding: 16, // Khoảng cách bên trong
  },
  loginTitle: {
    fontSize: 22, // Kích thước chữ
    fontWeight: "bold", // Độ đậm chữ
    marginBottom: 8, // Khoảng cách dưới
    textAlign: "left", // Căn trái văn bản
  },
  loginSubtitle: {
    fontSize: 14, // Kích thước chữ
    textAlign: "left", // Căn trái văn bản
    lineHeight: 20, // Khoảng cách dòng
    marginBottom: 20, // Khoảng cách dưới
    color: "#777", // Màu chữ xám
  },
  loginButton: {
    backgroundColor: "#E57905", // Màu nền cam
    borderRadius: 8, // Bo góc
    paddingVertical: 12, // Khoảng cách dọc
    alignItems: "center", // Căn giữa theo chiều dọc
    marginBottom: 16, // Khoảng cách dưới
  },
  loginButtonText: {
    color: "white", // Màu chữ trắng
    fontWeight: "bold", // Độ đậm chữ
    fontSize: 16, // Kích thước chữ
  },
  rewardButton: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    justifyContent: "space-between", // Căn đều hai bên
    alignItems: "center", // Căn giữa theo chiều dọc
    backgroundColor: "#F6F6F6", // Màu nền xám nhạt
    borderRadius: 8, // Bo góc
    padding: 16, // Khoảng cách bên trong
  },
  rewardText: {
    fontWeight: "500", // Độ đậm chữ
    fontSize: 16, // Kích thước chữ
    color: "#E57905", // Màu chữ cam
  },
  searchContainer: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    backgroundColor: "#FFF", // Màu nền trắng
    borderRadius: 8, // Bo góc
    marginHorizontal: 15, // Khoảng cách ngang
    marginVertical: 10, // Khoảng cách dọc
    paddingHorizontal: 10, // Khoảng cách ngang
    shadowColor: "#000", // Màu bóng
    shadowOpacity: 0.1, // Độ mờ bóng
    shadowRadius: 5, // Bán kính bóng
    elevation: 3, // Độ nổi (Android)
  },
  searchInput: {
    flex: 1, // Chiếm toàn bộ không gian
    padding: 10, // Khoảng cách bên trong
    fontSize: 16, // Kích thước chữ
    color: "#000", // Màu chữ đen
    backgroundColor: "#FFF", // Màu nền trắng
  },
  searchIcon: {
    marginRight: 10, // Khoảng cách phải
    color: "#E57905", // Màu biểu tượng cam
  },
  serviceContainer: {
    marginVertical: 10, // Khoảng cách dọc
    marginHorizontal: 10, // Khoảng cách ngang
    backgroundColor: "#FFFFFF", // Màu nền trắng
    borderRadius: 10, // Bo góc
    paddingVertical: 15, // Khoảng cách dọc
    paddingHorizontal: 0, // Khoảng cách ngang
    shadowColor: "#000", // Màu bóng
    shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng
    shadowOpacity: 0.1, // Độ mờ bóng
    shadowRadius: 4, // Bán kính bóng
    marginTop: 20, // Khoảng cách đỉnh
    elevation: 3, // Độ nổi (Android)
  },
  serviceItem: {
    alignItems: "center", // Căn giữa theo chiều dọc
    marginHorizontal: 10, // Khoảng cách ngang
    marginTop: 10, // Khoảng cách đỉnh
  },
  serviceIconContainer: {
    width: 50, // Chiều rộng
    height: 50, // Chiều cao
    borderRadius: 25, // Bo góc hình tròn
    backgroundColor: "#FEE5C9", // Màu nền
    justifyContent: "center", // Căn giữa theo chiều ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    marginBottom: 8, // Khoảng cách dưới
  },
  serviceText: {
    textAlign: "center", // Căn giữa văn bản
    fontSize: 12, // Kích thước chữ
    color: "#000", // Màu chữ đen
  },
  promotionContainer: {
    marginHorizontal: 16, // Khoảng cách ngang
    marginVertical: 10, // Khoảng cách dọc
    alignItems: "center", // Căn giữa theo chiều dọc
  },
  promotionBanner: {
    width: "100%", // Chiếm toàn bộ chiều rộng
    height: 150, // Chiều cao
    borderRadius: 12, // Bo góc
    backgroundColor: "transparent", // Màu nền trong suốt
    padding: 0, // Khoảng cách
    overflow: "hidden", // Ẩn nội dung tràn
  },
  paginationDots: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    justifyContent: "center", // Căn giữa theo chiều ngang
    marginTop: 10, // Khoảng cách đỉnh
  },
  paginationDot: {
    width: 8, // Chiều rộng
    height: 8, // Chiều cao
    borderRadius: 4, // Bo góc hình tròn
    backgroundColor: "#D3D3D3", // Màu nền xám
    marginHorizontal: 4, // Khoảng cách ngang
  },
  activeDot: {
    backgroundColor: "#E57905", // Màu nền cam
    width: 16, // Chiều rộng
  },
  discoverSection: {
    marginHorizontal: 16, // Khoảng cách ngang
    marginBottom: 0, // Khoảng cách dưới
  },
  sectionHeader: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    justifyContent: "space-between", // Căn đều hai bên
    alignItems: "center", // Căn giữa theo chiều dọc
    marginBottom: 12, // Khoảng cách dưới
  },
  sectionTitle: {
    fontSize: 18, // Kích thước chữ
    fontWeight: "bold", // Độ đậm chữ
    color: "#000", // Màu chữ đen
  },
  viewMoreText: {
    color: "#F37934", // Màu chữ cam
    fontWeight: "500", // Độ đậm chữ
    fontSize: 14, // Kích thước chữ
  },
  offerContainer: {
    marginBottom: 15, // Khoảng cách dưới
  },
  offerCard: {
    width: 200, // Chiều rộng
    marginRight: 10, // Khoảng cách phải
    backgroundColor: "#FFF", // Màu nền trắng
    borderRadius: 8, // Bo góc
    padding: 10, // Khoảng cách bên trong
    paddingTop: 10, // Khoảng cách đỉnh
    paddingBottom: 20, // Khoảng cách dưới
    elevation: 3, // Độ nổi (Android)
    shadowColor: "#000", // Màu bóng
    shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng
    shadowOpacity: 0.1, // Độ mờ bóng
    shadowRadius: 5, // Bán kính bóng
    alignItems: "center", // Căn giữa theo chiều dọc
    justifyContent: "center", // Căn giữa theo chiều ngang
  },
  offerSubtitle: {
    fontSize: 12, // Kích thước chữ
    color: "#777", // Màu chữ xám
    marginTop: 5, // Khoảng cách đỉnh
  },
  offerTitle: {
    fontSize: 14, // Kích thước chữ
    fontWeight: "bold", // Độ đậm chữ
    marginVertical: 5, // Khoảng cách dọc
    color: "#000", // Màu chữ đen
  },
  offerDateContainer: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
  },
  offerDate: {
    fontSize: 12, // Kích thước chữ
    color: "#777", // Màu chữ xám
  },
  deliveryInfoCard: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    backgroundColor: "white", // Màu nền trắng
    borderRadius: 12, // Bo góc
    padding: 16, // Khoảng cách bên trong
    shadowColor: "#000", // Màu bóng
    shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng
    shadowOpacity: 0.1, // Độ mờ bóng
    shadowRadius: 4, // Bán kính bóng
    elevation: 2, // Độ nổi (Android)
    marginTop: 10, // Khoảng cách đỉnh
  },
  deliveryIconContainer: {
    width: 40, // Chiều rộng
    height: 40, // Chiều cao
    borderRadius: 20, // Bo góc hình tròn
    backgroundColor: "#FEE5C9", // Màu nền
    justifyContent: "center", // Căn giữa theo chiều ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    marginRight: 16, // Khoảng cách phải
  },
  deliveryInfoText: {
    fontSize: 16, // Kích thước chữ
    fontWeight: "500", // Độ đậm chữ
    color: "#000", // Màu chữ đen
  },
  deliverySubtext: {
    fontSize: 14, // Kích thước chữ
    fontWeight: "normal", // Độ đậm chữ
    color: "#777777", // Màu chữ xám
  },
  productSection: {
    marginHorizontal: 16, // Khoảng cách ngang
    marginVertical: 10, // Khoảng cách dọc
  },
  productList: {
    flexGrow: 1, // Mở rộng để chứa nội dung
    paddingBottom: 10, // Khoảng cách dưới
  },
  productCard: {
    width: "48%", // Chiếm 48% chiều rộng
    backgroundColor: "#FFF", // Màu nền trắng
    borderRadius: 10, // Bo góc
    padding: 10, // Khoảng cách bên trong
    marginBottom: 10, // Khoảng cách dưới
    elevation: 3, // Độ nổi (Android)
    shadowColor: "#000", // Màu bóng
    shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng
    shadowOpacity: 0.1, // Độ mờ bóng
    shadowRadius: 5, // Bán kính bóng
  },
  newBadge: {
    position: "absolute", // Vị trí tuyệt đối
    top: 10, // Lệch lên trên
    left: 10, // Lệch sang trái
    backgroundColor: "#E57905", // Màu nền cam
    borderRadius: 5, // Bo góc
    paddingHorizontal: 5, // Khoảng cách ngang
    paddingVertical: 2, // Khoảng cách dọc
  },
  newBadgeText: {
    color: "#FFF", // Màu chữ trắng
    fontSize: 10, // Kích thước chữ
    fontWeight: "bold", // Độ đậm chữ
  },
  productImage: {
    width: "100%", // Chiếm toàn bộ chiều rộng
    height: 120, // Chiều cao
    borderRadius: 8, // Bo góc
  },
  productName: {
    fontSize: 14, // Kích thước chữ
    fontWeight: "bold", // Độ đậm chữ
    marginVertical: 5, // Khoảng cách dọc
    color: "#000", // Màu chữ đen
  },
  productPriceContainer: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    justifyContent: "space-between", // Căn đều hai bên
    alignItems: "center", // Căn giữa theo chiều dọc
  },
  productPrice: {
    fontSize: 14, // Kích thước chữ
    color: "#000", // Màu chữ đen
  },
  addButton: {
    backgroundColor: "#E57905", // Màu nền cam
    borderRadius: 15, // Bo góc hình tròn
    width: 30, // Chiều rộng
    height: 30, // Chiều cao
    justifyContent: "center", // Căn giữa theo chiều ngang
    alignItems: "center", // Căn giữa theo chiều dọc
  },
});

export default styles;
