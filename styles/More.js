import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginTop: -50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "#FFF",
    paddingTop: 0,
    marginTop: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 50,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },
  ticketContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  ticketText: {
    marginLeft: 5,
    fontWeight: "500",
    color: "#000",
  },
  notificationContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
    marginHorizontal: 15,
    color: "#000",
  },
  tienIchContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  tienIchItem: {
    width: "50%",
    padding: 15,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  tienIchTitle: {
    marginTop: 10,
    fontSize: 14,
    color: "#000",
  },
  menuContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  menuIconContainer: {
    width: 24,
    alignItems: "center",
    marginRight: 10,
  },
  menuTitle: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
});

export default styles;
