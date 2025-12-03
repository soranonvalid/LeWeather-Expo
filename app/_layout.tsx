import { Stack } from "expo-router";
const debug = true;

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: debug ? true : false }} />;
}
