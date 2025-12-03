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
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
  },

  Main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "yellow",
    borderRadius: 16,
    padding: 16,
  },

  UnderMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
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
    fontSize: 60,
    maxWidth: "90%",
    textAlign: "center",
  },

  TextUnderMain: {
    fontSize: 26,
    maxWidth: "90%",
    textAlign: "center",
  },
});
