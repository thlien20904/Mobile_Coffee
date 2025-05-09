import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyCartText: {
    fontSize: 18,
    color: "#777",
    marginBottom: 20,
  },
  continueShoppingButton: {
    backgroundColor: "#E57905",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  continueShoppingText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartList: {
    padding: 15,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  selectButton: {
    padding: 10,
    marginRight: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "#E57905",
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    padding: 5,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  removeButton: {
    padding: 5,
  },
  selectAllButton: {
    padding: 10,
    backgroundColor: "#E57905",
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 10,
  },
  selectAllText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#E57905",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
