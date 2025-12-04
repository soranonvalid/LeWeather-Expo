import { StyleSheet } from "react-native";

export const fontFamily = StyleSheet.create({
  regular: {
    fontFamily: "Roboto_400Regular",
  },
  bold: {
    fontFamily: "Roboto_700Bold",
  },
  semiBold: {
    fontFamily: "Roboto_600SemiBold",
  },
  black: {
    fontFamily: "Roboto_900Black",
  },
});

export const styles = StyleSheet.create({
  content: {
    padding: 10,
    flex: 1,
  },
});

export const styleSearch = StyleSheet.create({
  base: {
    display: "flex",
    backgroundColor: "#ECEDF1",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10,
    borderRadius: 40,
    flex: 1,
  },
  baseList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
});

export const Mainstyles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#708ADF",
  },

  Header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
  },

  Main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 16,
    padding: 16,
  },

  UnderMain: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 8,
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },

  Card: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  TextMain: {
    fontSize: 80,
    textAlign: "center",
    position: "relative",
  },

  TextIndicator: { fontSize: 50, position: "absolute", right: -20 },

  TextUnderMain: {
    fontSize: 60,
    textAlign: "center",
  },
});

export const Settingstyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  section: {
    marginTop: 20,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  card: {
    justifyContent: "center",
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  label: {
    fontSize: 16,
  },

  picker: {
    height: 40,
    width: 120,
  },

  divider: {
    marginVertical: 20,
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
  },

  aboutText: {
    fontSize: 15,
    marginTop: 6,
    color: "#333",
  },
  return: {
    backgroundColor: "black",
    width: 60,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    position: "absolute",
    bottom: 30,
    right: 30,
  },
});
