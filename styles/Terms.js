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
    height: 50,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  placeholder: {
    width: 40,
  },
  storesBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  storesText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#333",
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuButton: {
    padding: 5,
  },
  logo: {
    height: 135,
    width: 180,
  },
  contentScrollView: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    color: "#000",
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingBottom: 30,
    borderColor: "#e67e22",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  section: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingLeft: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#000",
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
    marginBottom: 10,
  },
  listItem: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
    marginBottom: 10,
    paddingLeft: 5,
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
  // Styles for Contact Section
  contactHeader: {
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  bannerImage: {
    width: "100%",
    height: 150,
    marginBottom: 15,
  },
  socialMediaContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  contactOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  contactColumn: {
    flex: 1,
  },
  contactOptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },
  contactOptionText: {
    fontSize: 14,
    color: "#FFF",
    marginBottom: 8,
  },
  footerText: {
    color: "#FFF",
    textAlign: "left",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 5,
  },
});

export default styles;
