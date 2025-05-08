import { StyleSheet } from "react-native";
import { Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    marginTop: -40,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    maxWidth: 150, // Giới hạn chiều rộng để không chiếm hết không gian
  },
  searchInput: {
    flex: 1,
    height: 32,
    fontSize: 14,
    color: "#333",
    paddingVertical: 0,
  },
  searchIcon: {
    marginLeft: 5,
  },
  categoryContainer: {
    flex: 2, // Chiếm không gian lớn hơn để hiển thị danh mục
  },
  categoryList: {
    paddingVertical: 5,
  },
  categoryItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  selectedCategory: {
    borderBottomWidth: 2,
    borderBottomColor: "#E57905",
  },
  categoryText: {
    fontSize: 13,
    color: "#777",
    fontWeight: "500",
  },
  selectedCategoryText: {
    color: "#E57905",
    fontWeight: "bold",
  },
  heartIconContainer: {
    padding: 5,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginVertical: 10,
    color: "#000",
  },
  productSection: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 20,
  },
  productCard: {
    marginBottom: 15,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  imageContainer: {
    position: "relative",
    marginRight: 10,
  },
  newBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#E57905",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    zIndex: 1,
  },
  newBadgeText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    marginTop: -20,
  },
  pageButton: {
    backgroundColor: "#E57905",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  pageButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  pageInfo: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
});

export default styles;
