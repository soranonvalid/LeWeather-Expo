import { Stack } from "expo-router";
const debug = false;

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: debug ? true : false }} />;
}
