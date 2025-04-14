import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 60,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    backgroundColor: "#FFF",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative", // Để định vị icon sửa ảnh
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#E5E5E5",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: "35%", // Đặt ở góc phải dưới của ảnh
    backgroundColor: "#666",
    borderRadius: 15,
    padding: 5,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#000",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  inputDisabled: {
    backgroundColor: "#E5E5E5",
    color: "#666",
  },
  updateButton: {
    backgroundColor: "#E5E5E5",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  updateButtonText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
});

export default styles;
