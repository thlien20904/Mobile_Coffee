// styles/MembershipStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  placeholderRight: {
    width: 30,
  },
  membershipInfo: {
    padding: 15,
    backgroundColor: "#fff",
  },
  membershipCard: {
    backgroundColor: "#FF8C00",
    borderRadius: 10,
    padding: 15,
  },
  levelAndBeanContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Sắp xếp "Mới" bên trái, "0 BEAN" bên phải
    alignItems: "center",
    marginBottom: 10,
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelIcon: {
    marginRight: 5,
  },
  membershipLevel: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  beanCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  progressLabelLeft: {
    fontSize: 14,
    color: "#fff",
    marginRight: 5,
  },
  progressBarContainer: {
    flex: 1,
    height: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FFA500",
    borderRadius: 5,
  },
  progressLabelRight: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 5,
  },
  membershipMessage: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    lineHeight: 20,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  benefitIcon: {
    marginRight: 10,
  },
  benefitTitle: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
});
