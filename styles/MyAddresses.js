import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24, // Tăng từ 16 lên 18
    fontWeight: "bold",
    color: "#000",
  },
  placeholderRight: {
    width: 28,
  },
  sectionTitle: {
    fontSize: 16, // Tăng từ 14 lên 16
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#FFF",
  },
  listContent: {
    paddingBottom: 20,
  },
  addressItem: {
    backgroundColor: "#FFF",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  name: {
    fontSize: 16, // Tăng từ 14 lên 16
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
  },
  phone: {
    fontSize: 14, // Tăng từ 12 lên 14
    color: "#666",
  },
  address: {
    fontSize: 14, // Tăng từ 12 lên 14
    color: "#666",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  actionButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 3,
    marginRight: 8,
    marginBottom: 5,
  },
  actionButtonText: {
    fontSize: 12, // Tăng từ 11 lên 12
    color: "#333",
  },
  editButton: {
    backgroundColor: "#E57905",
    borderColor: "#E57905",
  },
  editButtonText: {
    fontSize: 12, // Tăng từ 11 lên 12
    color: "#FFF",
    fontWeight: "bold",
  },
  defaultBadge: {
    borderWidth: 1,
    borderColor: "#E57905",
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 5,
  },
  defaultBadgeText: {
    fontSize: 12, // Tăng từ 11 lên 12
    color: "#E57905",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
    fontSize: 16, // Tăng từ mặc định lên 16
  },
  footerNotice: {
    backgroundColor: "#FFF9E6",
    padding: 10,
    marginTop: 10,
  },
  footerNoticeText: {
    fontSize: 12, // Tăng từ 11 lên 12
    color: "#666",
    textAlign: "center",
  },
});

export default styles;
