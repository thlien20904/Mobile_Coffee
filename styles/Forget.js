import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 24,
    top: -300,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    top: -250,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  input: {
    height: 50,
    top: -250,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: "#ff6347",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    top: -250,
  },
  resetText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
