import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    marginTop: -510,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    paddingHorizontal: 30,
    paddingTop: 0, // Push content down to avoid status bar overlap
    paddingBottom: 50, // Add padding at the bottom for balance
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#28A745",
    marginTop: 20,
    marginBottom: 15,
    textAlign: "center", // Ensure text is centered
  },
  message: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10, // Add padding to prevent text from touching edges
  },
  button: {
    backgroundColor: "#E57905",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: -20,
    alignSelf: "center", // Ensure button is centered
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center", // Center the text inside the button
  },
});
