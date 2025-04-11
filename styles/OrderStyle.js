import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF8EF",
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
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
  categoryContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  categoryList: {
    paddingVertical: 5,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
  },
  selectedCategory: {
    borderBottomWidth: 2,
    borderBottomColor: "#E57905",
  },
  categoryText: {
    fontSize: 14,
    color: "#777",
    fontWeight: "500",
  },
  selectedCategoryText: {
    color: "#E57905",
    fontWeight: "bold",
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
});

export default styles;
