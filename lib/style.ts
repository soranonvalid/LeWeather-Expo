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
