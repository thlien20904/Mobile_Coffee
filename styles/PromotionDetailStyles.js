import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    textAlign: "center",
    marginRight: 30, // Để cân bằng với nút back
    textTransform: "uppercase", // Chữ in hoa
  },
  placeholder: {
    width: 28, // Để cân bằng với nút back
  },
  promotionImageContainer: {
    position: "relative", // Để đặt overlay lên trên hình ảnh
    marginBottom: 20,
  },
  promotionImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  overlay: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Nền trắng với độ trong suốt
    padding: 10,
    borderRadius: 5,
  },
  overlayTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E67E22", // Chữ màu cam
    textAlign: "center",
    marginBottom: 5,
    textTransform: "uppercase",
  },
  overlaySubtitle: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  overlayCode: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E67E22", // Mã giảm giá màu cam
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#333", // Chữ màu đen
    marginBottom: 20,
    lineHeight: 24,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  code: {
    fontWeight: "bold",
    color: "#E67E22", // Mã giảm giá màu cam
  },
  note: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 20,
  },
  actionContainer: {
    marginBottom: 20,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  actionText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  actionLink: {
    fontSize: 16,
    color: "#1E90FF", // Link màu xanh dương
    textDecorationLine: "underline",
  },
});

export default styles;