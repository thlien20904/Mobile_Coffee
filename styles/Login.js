import { StyleSheet } from "react-native";

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm toàn bộ không gian có sẵn
    paddingHorizontal: 25, // Khoảng cách ngang
    backgroundColor: "#F8F9FA", // Màu nền xám nhạt
    justifyContent: "center", // Căn giữa theo chiều ngang
  },
  backButton: {
    position: "absolute", // Vị trí tuyệt đối
    top: 50, // Lệch lên trên
    left: 20, // Lệch sang trái
  },
  title: {
    fontSize: 35, // Kích thước chữ
    top: -37, // Lệch lên trên
    left: 130, // Lệch sang trái
    right: 0, // Lệch sang phải
    fontWeight: "bold", // Độ đậm chữ
    textAlign: "center", // Căn giữa văn bản
    marginBottom: 4, // Khoảng cách dưới
    color: "#333", // Màu chữ xám đậm
  },
  welcomeText: {
    fontSize: 25, // Kích thước chữ
    fontWeight: "bold", // Độ đậm chữ
    color: "#333", // Màu chữ xám đậm
    marginBottom: 8, // Khoảng cách dưới
    marginTop: -30, // Khoảng cách đỉnh (lệch lên trên)
  },
  subtitle: {
    fontSize: 15, // Kích thước chữ
    color: "#666", // Màu chữ xám
    marginBottom: 25, // Khoảng cách dưới
  },
  inputContainer: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    backgroundColor: "#fff", // Màu nền trắng
    borderRadius: 12, // Bo góc
    padding: 14, // Khoảng cách bên trong
    marginVertical: 10, // Khoảng cách dọc
    borderWidth: 1, // Độ dày viền
    borderColor: "#ddd", // Màu viền xám nhạt
    shadowColor: "#000", // Màu bóng
    shadowOpacity: 0.1, // Độ mờ bóng
    shadowRadius: 6, // Bán kính bóng
    elevation: 3, // Độ nổi (Android)
  },
  icon: {
    marginRight: 100, // Khoảng cách phải
  },
  input: {
    flex: 1, // Chiếm không gian linh hoạt
    fontSize: 16, // Kích thước chữ
  },
  rememberContainer: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    justifyContent: "space-between", // Căn đều hai bên
    alignItems: "center", // Căn giữa theo chiều dọc
    width: "100%", // Chiếm toàn bộ chiều rộng
    paddingHorizontal: 10, // Khoảng cách ngang
    marginTop: 10, // Khoảng cách đỉnh
  },
  rememberRow: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    gap: 8, // Khoảng cách giữa các phần tử
  },
  forgetText: {
    fontSize: 14, // Kích thước chữ
    color: "#077F7B", // Màu chữ xanh lam
    fontWeight: "bold", // Độ đậm chữ
  },
  signInButton: {
    backgroundColor: "#077F7B", // Màu nền xanh lam
    padding: 16, // Khoảng cách bên trong
    borderRadius: 12, // Bo góc
    alignItems: "center", // Căn giữa theo chiều dọc
    marginVertical: 15, // Khoảng cách dọc
    shadowColor: "#000", // Màu bóng
    shadowOpacity: 0.2, // Độ mờ bóng
    shadowRadius: 6, // Bán kính bóng
    elevation: 4, // Độ nổi (Android)
  },
  signInText: {
    color: "white", // Màu chữ trắng
    fontSize: 18, // Kích thước chữ
    fontWeight: "bold", // Độ đậm chữ
  },
  signupText: {
    textAlign: "center", // Căn giữa văn bản
    fontSize: 15, // Kích thước chữ
    color: "#666", // Màu chữ xám
    marginVertical: 8, // Khoảng cách dọc
  },
  signupLink: {
    color: "#077F7B", // Màu chữ xanh lam
    fontWeight: "bold", // Độ đậm chữ
  },
  orText: {
    textAlign: "center", // Căn giữa văn bản
    marginVertical: 15, // Khoảng cách dọc
    fontSize: 15, // Kích thước chữ
    fontWeight: "bold", // Độ đậm chữ
    color: "#888", // Màu chữ xám
  },
  facebookButton: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    backgroundColor: "#4a61a8", // Màu nền xanh của Facebook
    padding: 14, // Khoảng cách bên trong
    borderRadius: 12, // Bo góc
    alignItems: "center", // Căn giữa theo chiều dọc
    justifyContent: "center", // Căn giữa theo chiều ngang
    marginVertical: 5, // Khoảng cách dọc
  },
  googleButton: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    backgroundColor: "#53a0f4", // Màu nền xanh của Google
    padding: 14, // Khoảng cách bên trong
    borderRadius: 12, // Bo góc
    alignItems: "center", // Căn giữa theo chiều dọc
    justifyContent: "center", // Căn giữa theo chiều ngang
    marginVertical: 5, // Khoảng cách dọc
  },
  socialText: {
    color: "white", // Màu chữ trắng
    fontSize: 16, // Kích thước chữ
    fontWeight: "bold", // Độ đậm chữ
    marginLeft: 10, // Khoảng cách trái
  },
});

export default styles;
