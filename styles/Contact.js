import { StyleSheet, Platform, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },

  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  iconContainer: {
    width: 24,
    alignItems: "center",
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    color: "#000",
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    color: "#555",
  },
  feedbackButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  feedbackText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: "#000",
  },
});
export default styles;
