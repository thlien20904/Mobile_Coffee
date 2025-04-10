import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF8EF", // Màu nền chính, khớp với ảnh
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFF", // Thêm background trắng cho header
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FEE5C9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  greeting: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  ticketButton: {
    marginRight: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FEE5C9",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  loginCard: {
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F5F5F5",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  loginCardContent: {
    padding: 16,
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "left", // Căn trái thay vì căn giữa
  },
  loginSubtitle: {
    fontSize: 14,
    textAlign: "left", // Căn trái
    lineHeight: 20,
    marginBottom: 20,
    color: "#777",
  },
  loginButton: {
    backgroundColor: "#E57905",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  rewardButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    padding: 16,
  },
  rewardText: {
    fontWeight: "500",
    fontSize: 16,
    color: "#E57905",
  },
  serviceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  serviceItem: {
    alignItems: "center",
    width: "22%",
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FEE5C9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  serviceText: {
    textAlign: "center",
    fontSize: 12,
    color: "#000",
  },
  promotionContainer: {
    marginHorizontal: 16, // Giảm padding để ảnh rộng hơn
    marginVertical: 10,
    alignItems: "center", // Căn giữa carousel
  },
  promotionBanner: {
    width: "100%",
    height: 150, // Giảm chiều cao để phù hợp với tỷ lệ ảnh
    borderRadius: 12,
    backgroundColor: "transparent", // Bỏ background màu xanh
    padding: 0, // Bỏ padding để ảnh full khung
    overflow: "hidden", // Đảm bảo ảnh không bị tràn ra ngoài
  },
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D3D3D3",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#E57905",
    width: 16,
  },
  discoverSection: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  viewMoreText: {
    color: "#F37934",
    fontWeight: "500",
    fontSize: 14,
  },
  offerContainer: {
    marginBottom: 15,
  },
  offerCard: {
    width: 200,
    marginRight: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  offerSubtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
  offerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#000",
  },
  offerDateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  offerDate: {
    fontSize: 12,
    color: "#777",
  },
  deliveryInfoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 10,
  },
  deliveryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FEE5C9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  deliveryInfoText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  deliverySubtext: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#777777",
  },
  searchContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#000",
  },
  searchIcon: {
    marginRight: 10,
  },
  productSection: {
    marginHorizontal: 16,
    marginVertical: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%", // 2 cột
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  newBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#E57905",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  newBadgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    resizeMode: "cover",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#000",
  },
  productPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 14,
    color: "#000",
  },
  addButton: {
    backgroundColor: "#E57905",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    backgroundColor: "white",
    paddingVertical: 8,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: "#777777",
  },
  activeNavText: {
    color: "#F37934",
    fontWeight: "500",
  },
});

export default styles;
