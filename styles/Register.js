// styles/Register.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 30,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginLeft: 80,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 25,
  },
  link: {
    color: "#077F7B",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: "#077F7B",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  signUpText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    marginVertical: 15,
    fontSize: 15,
    fontWeight: "bold",
    color: "#888",
  },
  haveaccountText: {
    fontSize: 14,
    top: -30,
    color: "#077F7B",
    fontWeight: "bold",
  },
  facebookButton: {
    flexDirection: "row",
    backgroundColor: "#4a61a8",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#53a0f4",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  socialText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default styles;
