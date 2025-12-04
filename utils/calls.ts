import axios from "axios";

import { Roboto_100Thin } from "@expo-google-fonts/roboto/100Thin";
import { Roboto_100Thin_Italic } from "@expo-google-fonts/roboto/100Thin_Italic";
import { Roboto_200ExtraLight } from "@expo-google-fonts/roboto/200ExtraLight";
import { Roboto_200ExtraLight_Italic } from "@expo-google-fonts/roboto/200ExtraLight_Italic";
import { Roboto_300Light } from "@expo-google-fonts/roboto/300Light";
import { Roboto_300Light_Italic } from "@expo-google-fonts/roboto/300Light_Italic";
import { Roboto_400Regular } from "@expo-google-fonts/roboto/400Regular";
import { Roboto_400Regular_Italic } from "@expo-google-fonts/roboto/400Regular_Italic";
import { Roboto_500Medium } from "@expo-google-fonts/roboto/500Medium";
import { Roboto_500Medium_Italic } from "@expo-google-fonts/roboto/500Medium_Italic";
import { Roboto_600SemiBold } from "@expo-google-fonts/roboto/600SemiBold";
import { Roboto_600SemiBold_Italic } from "@expo-google-fonts/roboto/600SemiBold_Italic";
import { Roboto_700Bold } from "@expo-google-fonts/roboto/700Bold";
import { Roboto_700Bold_Italic } from "@expo-google-fonts/roboto/700Bold_Italic";
import { Roboto_800ExtraBold } from "@expo-google-fonts/roboto/800ExtraBold";
import { Roboto_800ExtraBold_Italic } from "@expo-google-fonts/roboto/800ExtraBold_Italic";
import { Roboto_900Black } from "@expo-google-fonts/roboto/900Black";
import { Roboto_900Black_Italic } from "@expo-google-fonts/roboto/900Black_Italic";
import { useFonts } from "@expo-google-fonts/roboto/useFonts";

export interface weather {
  date: string;
  weather: string | undefined;
  weather_id: number;
  temp: number;
  humidity: number;
  wind: number;
  clouds: number;
  loc: string | null;
}

export interface location {
  id: number | string;
  city: string;
  lon: number;
  lat: number;
  code: string;
}

export function getTemp(w: number) {
  if (w === 0) return "C";
  return "F";
}

export function getWind(w: number) {
  if (w === 0) return "km/h";
  if (w === 1) return "m/s";
  return "mph";
}

export async function GetResponse(data: weather, loc: string) {
  if (!data) return;
  console.log("Responding...");
  const key = process.env.EXPO_PUBLIC_AI;
  const body = {
    model: "google/gemma-3-27b-it:free",
    messages: [
      {
        role: "system",
        content:
          "Reply in plain text only. No markdown. No newline. Keep answers under 30 words. Short sentences. No lists.",
      },
      {
        role: "user",
        content: `As a professional weather forecaster with a sense of humor, analyze this current weather of ${data.weather} with temperature ${data.temp}°C, windspeed ${data.wind} m/s, humidity ${data.humidity} %, clouds ${data.clouds} % in ${loc}`,
      },
    ],
    max_tokens: 80,
    temperature: 0.3,
  };

  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      body,
      {
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    return res?.data?.choices[0]?.message?.content;
  } catch (error) {
    console.error("res", error);
    return "";
  }
}

export async function getWeather(lat: number = 0, lon: number = 0) {
  const key = process.env.EXPO_PUBLIC_WEATHER;
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
    );
    function groupWeather(id: number) {
      if (id === 800) return "Clear";
      if (id >= 801 && id <= 802) return "Cloudy";
      if (id >= 803 && id <= 804) return "Overcast";
      if (id >= 500 && id <= 531) return "Rainy";
      if (id >= 200 && id <= 232) return "Storm";
      if (id >= 300 && id <= 321) return "Drizzle";
      if (id >= 600 && id <= 622) return "Snow";
      if (id >= 701 && id <= 781) return "Fog";
      return;
    }
    return {
      date: Date(),
      weather: groupWeather(res.data.weather[0].id),
      weather_id: res.data.weather[0].id,
      temp: res.data.main.temp,
      humidity: res.data.main.humidity,
      wind: res.data.wind.speed,
      clouds: res.data.clouds.all,
      loc: res.data.name || res.data.sys.country,
    };
  } catch (err) {
    console.error("weather", err);
  }
}

export async function getCities(q: string) {
  const key = process.env.EXPO_PUBLIC_GEO;
  if (!q || q.trim() === "" || q.length < 3) return;
  try {
    const res = await axios.get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        q.toLowerCase()
      )}&apiKey=${key}`
    );
    const list = res.data.features.map((feature: any, idx: number) => ({
      id: idx,
      city:
        feature.properties.city ||
        feature.properties.name ||
        feature.properties.state,
      lon: feature.properties.lon,
      lat: feature.properties.lat,
      code: feature.properties.country_code.toUpperCase(),
    }));
    console.log(list);
    return list;
  } catch (err) {
    console.error("city", err);
  }
}

export const useLoadFont = () => {
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_200ExtraLight,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_600SemiBold,
    Roboto_700Bold,
    Roboto_800ExtraBold,
    Roboto_900Black,
    Roboto_100Thin_Italic,
    Roboto_200ExtraLight_Italic,
    Roboto_300Light_Italic,
    Roboto_400Regular_Italic,
    Roboto_500Medium_Italic,
    Roboto_600SemiBold_Italic,
    Roboto_700Bold_Italic,
    Roboto_800ExtraBold_Italic,
    Roboto_900Black_Italic,
  });

  return fontsLoaded;
};
