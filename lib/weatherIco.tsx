import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

const WeatherIco = (id: number = 800, cl: string) => {
  function getWeather(id: number) {
    if (id === 800) return "weather-sunny";

    if (
      (id >= 801 && id <= 802) ||
      (id >= 600 && id <= 622) ||
      (id >= 701 && id <= 781)
    )
      return "clouds";

    if (id >= 803 && id <= 804) return "weather-partly-cloudy";

    if (
      (id >= 200 && id <= 232) ||
      (id >= 300 && id <= 321) ||
      (id >= 500 && id <= 531)
    )
      return "weather-rainy";

    return "clouds";
  }
  return <MaterialCommunityIcons name={getWeather(id)} color={cl} size={150} />;
};

export default WeatherIco;
