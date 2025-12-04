import { useLoadFont } from "@/utils/calls";
import { SettingsProvider } from "@/utils/context";
import { Stack } from "expo-router";
const debug = false;

export default function RootLayout() {
  const loadedFont = useLoadFont();
  return (
    <SettingsProvider>
      <Stack screenOptions={{ headerShown: debug ? true : false }} />
    </SettingsProvider>
  );
}
