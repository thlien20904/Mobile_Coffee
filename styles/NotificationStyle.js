import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF", // Nền trắng giống ảnh
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE", // Đường viền dưới header
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  notificationSection: {
    paddingBottom: 20,
  },
  notificationCard: {
    backgroundColor: "#FFF8E1", // Màu nền vàng nhạt giống ảnh
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 8,
  },
  notificationRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    overflow: "hidden",
  },
  notificationImage: {
    width: "100%",
    height: "100%",
  },
  notificationInfo: {
    flex: 1,
    marginLeft: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  notificationTime: {
    fontSize: 12,
    color: "#777",
    marginLeft: 10,
  },
});
