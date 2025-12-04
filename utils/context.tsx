import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export interface SettingsContextType {
  wunits: number;
  tunits: number;
  setTunits: React.Dispatch<React.SetStateAction<number>>;
  setWunits: React.Dispatch<React.SetStateAction<number>>;
}

const defaultSettings = { saveT: 0, saveW: 0 };

export const SettingsContext = createContext<SettingsContextType>({
  wunits: 0,
  tunits: 0,

  setTunits: () => {},
  setWunits: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [tunits, setTunits] = useState<number>(0);
  const [wunits, setWunits] = useState<number>(0);

  useEffect(() => {
    async function loadSettings() {
      try {
        const raw = await AsyncStorage.getItem("settings");
        const parsed = raw ? JSON.parse(raw) : defaultSettings;
        setTunits(typeof parsed.saveT === "number" ? parsed.saveT : 0);
        setWunits(typeof parsed.saveW === "number" ? parsed.saveW : 0);
      } catch (e) {
        console.warn("Failed to load settings", e);
        setTunits(defaultSettings.saveT);
        setWunits(defaultSettings.saveW);
      }
    }
    loadSettings();
  }, []);

  useEffect(() => {
    async function save() {
      try {
        const payload = { saveT: tunits, saveW: wunits };
        await AsyncStorage.setItem("settings", JSON.stringify(payload));
      } catch (e) {
        console.warn("Failed to save settings", e);
      }
    }
    save();
  }, [tunits, wunits]);

  return (
    <SettingsContext.Provider value={{ wunits, tunits, setTunits, setWunits }}>
      {children}
    </SettingsContext.Provider>
  );
}
