import { StyleSheet, Platform, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: 20,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    position: "relative",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 44,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: Platform.OS === "android" ? StatusBar.currentHeight : 44,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  settingsLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsTitle: {
    fontSize: 16,
    color: "#000",
    marginLeft: 15,
  },
  versionContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    color: "#aaa",
  },
});
export default styles;
