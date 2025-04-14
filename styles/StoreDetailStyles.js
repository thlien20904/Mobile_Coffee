// styles/StoreDetailStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  errorContainer: {
    padding: 10,
    backgroundColor: "#ffcccc",
    margin: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  imageContainer: {
    position: "relative",
    height: 200,
  },
  storeImage: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: "#fff",
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  storeAddress: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  openingHours: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  optionsContainer: {
    marginTop: 10,
    backgroundColor: "#fff",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#F37934",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 60,
  },
  actionButtonTextBold: {
    color: "#fff",
    fontSize: 12, 
    fontWeight: "bold", 
    textAlign: "center", 
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 12, 
    fontWeight: "normal", 
    textAlign: "center", 
  },
});