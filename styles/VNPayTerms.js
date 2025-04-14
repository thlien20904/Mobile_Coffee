import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  placeholder: {
    width: 40,
  },
  storesBanner: {
    backgroundColor: "#FF8C00",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  storesTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  storesText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  storesSubText: {
    fontSize: 14,
    color: "#666",
  },
  storesIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  storesIcon: {
    marginLeft: 15,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 5,
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuButton: {
    padding: 5,
  },
  logo: {
    height: 160,
    width: 200,
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
    marginHorizontal: 0, // Giảm margin để tận dụng không gian
    marginBottom: 30,
  },
  section: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginTop: -10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
    marginTop: -5,
  },
  sectionSubTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 15,
    color: "#000",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: "#333",
    marginBottom: 15,
    marginTop: -10,
  },
  bankLogosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  bankLogo: {
    width: 370,
    height: 500,
    margin: 8,
    resizeMode: "contain",
    marginTop: -20,
  },
  vnpayLogo: {
    width: 370,
    height: 500,
    marginBottom: 15,
    resizeMode: "contain",
    marginTop: -60,
  },
  paymentMethod: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  paymentIcon: {
    width: 40,
    height: 40,
  },
  stepsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Căn đều các hình ảnh
    marginVertical: 15,
    marginTop: -180,
    paddingHorizontal: 10, // Thêm padding để giảm khoảng trống thừa
  },
  stepImage: {
    width: 370,
    height: 500,
    marginBottom: 15,
    resizeMode: "contain",
  },
  stepCaption: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: -200,
    marginBottom: -10, // Thêm khoảng cách dưới chú thích
  },
  stepsContainer1: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Căn đều các hình ảnh
    marginVertical: 15,
    marginTop: -110,
    paddingHorizontal: 10, // Thêm padding để giảm khoảng trống thừa
  },
  stepImage1: {
    width: 370,
    height: 500,
    marginBottom: 15,
    resizeMode: "contain",
  },
  stepCaption1: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: -130,
    marginBottom: 10, // Thêm khoảng cách dưới chú thích
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
});

export default styles;
