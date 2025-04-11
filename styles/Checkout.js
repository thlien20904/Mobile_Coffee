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
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  paymentText: {
    fontSize: 16,
    marginLeft: 10,
  },
  orderList: {
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  itemName: {
    fontSize: 16,
    flex: 2,
  },
  itemPrice: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  itemQuantity: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  itemTotal: {
    fontSize: 16,
    flex: 1,
    textAlign: "right",
  },
  summary: {
    marginTop: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E57905",
  },
  backToCartButton: {
    margin: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E57905",
    borderRadius: 5,
    alignItems: "center",
  },
  backToCartText: {
    fontSize: 16,
    color: "#E57905",
  },
  placeOrderButton: {
    margin: 15,
    backgroundColor: "#E57905",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  placeOrderText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});
