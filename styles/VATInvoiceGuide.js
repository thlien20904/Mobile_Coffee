import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Căn trái để khớp với ảnh
    height: 60,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18, // Giảm size để khớp với ảnh
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10,
  },
  carouselContainer: {
    flexDirection: "row",
    justifyContent: "center", // Căn giữa carousel
    paddingVertical: 10,
  },
  carouselButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  carouselText: {
    fontSize: 14,
    color: "#e67e22",
    marginLeft: 5,
  },
  logoSection: {
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 2, // Khoảng cách giữa các chữ cái giống trong ảnh
  },
  contentScrollView: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 25,
    textAlign: "center",
    color: "#000",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginHorizontal: 0,
    marginBottom: 30,
  },
  section: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: "#333",
    marginBottom: 15,
  },
  invoiceImage: {
    width: "100%",
    height: 400,
    marginVertical: 15,
  },
  stepImage: {
    width: "100%",
    height: 300,
    marginVertical: 15,
  },
  supportButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e67e22",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  contactText: {
    fontSize: 16,
    color: "#FFF",
    marginLeft: 10,
  },
});

export default styles;
