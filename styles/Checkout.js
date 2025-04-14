import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFF",
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
    backgroundColor: "#FFF",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 10, // Thêm để đảm bảo khoảng cách
  },
  input: {
    height: 48, // Thêm height rõ ràng
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  paymentText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  orderList: {
    flexGrow: 1, // Đảm bảo ScrollView mở rộng
    paddingBottom: 20,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginHorizontal: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    flex: 2,
    color: "#333",
  },
  itemPrice: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
    color: "#666",
  },
  itemQuantity: {
    fontSize: 16,
    flex: 1,
    textAlign: "center",
    color: "#666",
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
    color: "#E57905",
  },
  summary: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#FFF",
    marginHorizontal: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666",
  },
  summaryValue: {
    fontSize: 16,
    color: "#333",
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E57905",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#FFF",
  },
  backToCartButton: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E57905",
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  backToCartText: {
    fontSize: 16,
    color: "#E57905",
    fontWeight: "bold",
  },
  placeOrderButton: {
    flex: 1,
    backgroundColor: "#E57905",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  placeOrderText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  updateButtonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});
