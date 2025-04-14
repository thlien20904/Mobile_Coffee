import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF8EF", // Màu nền be nhạt, đồng bộ với các màn hình khác
  },
  content: {
    flex: 1,
    justifyContent: "flex-start", // Dịch nội dung lên trên
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 20, // Thêm khoảng cách từ đỉnh màn hình
  },
  icon: {
    marginBottom: 20, // Giảm khoảng cách dưới biểu tượng để không quá xa tiêu đề
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2A2A2A",
    marginBottom: 12, // Giảm khoảng cách dưới tiêu đề
  },
  message: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8, // Giảm khoảng cách để không quá xa dòng subMessage
    textAlign: "center",
    lineHeight: 22,
  },
  subMessage: {
    fontSize: 14,
    color: "#888",
    marginBottom: 25, // Giảm khoảng cách để nút không bị quá xa
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: "#E57905",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  continueText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});
