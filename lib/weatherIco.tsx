import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

const WeatherIco = (id: number = 800, cl: string) => {
  function getWeather(id: number) {
    if (id === 800) return "weather-sunny";
    if (id >= 801 && id <= 802) return "weather-cloudy";
    if (id >= 803 && id <= 804) return "weather-partly-cloudy";
    if (id >= 500 && id <= 531) return "weather-rainy";
    if (id >= 200 && id <= 232) return "weather-lightning";
    if (id >= 300 && id <= 321) return "weather-pouring";
    if (id >= 600 && id <= 622) return "weather-snowy-heavy";
    if (id >= 701 && id <= 781) return "weather-fog";
    return "weather-cloudy";
  }
  return <MaterialCommunityIcons name={getWeather(id)} color={cl} size={150} />;
};

export default WeatherIco;
