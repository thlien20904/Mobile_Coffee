import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    backgroundColor: "#FFF", // Nền trắng cho toàn bộ header và search
    paddingBottom: 10,
    marginTop: -50,
    paddingTop: 50,
  },
  headerTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    position: "relative",
  },
  icon: {
    marginRight: 5,
  },
  iconText: {
    fontSize: 14,
    color: "#E57905",
    fontWeight: "bold",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF0000",
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontSize: 10,
    color: "#FFF",
    fontWeight: "bold",
  },
  searchPanel: {
    marginHorizontal: 16,
    backgroundColor: "#FFF", // Panel bên ngoài màu trắng
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0", // Màu nền xám nhạt cho thanh tìm kiếm
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 0,
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  mapButtonText: {
    fontSize: 14,
    color: "#777",
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginVertical: 10,
  },
  storeSection: {
    paddingBottom: 20,
  },
  storeCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 5,
    elevation: 2,
  },
  storeRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: "hidden",
  },
  storeImage: {
    width: "100%",
    height: "100%",
  },
  storeInfo: {
    flex: 1,
    marginLeft: 10,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  storeAddress: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: "#777",
  },
  mapContainer: {
    flex: 1,
    height: "100%",
  },
  storeDistance: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
});