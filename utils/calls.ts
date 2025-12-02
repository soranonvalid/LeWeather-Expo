import axios from "axios";

export interface weather {
  date: string;
  weather: string;
  temp: number;
  humidity: number;
  wind: number;
  clouds: number;
  loc: string | null;
}

export async function GetResponse(data: weather) {
  if (!data) return;
  console.log("start process");
  const key = process.env.EXPO_PUBLIC_AI;
  const body = {
    model: "google/gemma-3-27b-it:free",
    messages: [
      {
        role: "system",
        content:
          "Reply in plain text only. No markdown. No newline. Keep answers under 45 words. Short sentences. No lists.",
      },
      {
        role: "user",
        content: `As a professional weather forecaster with a sense of humor, analyze this current weather of ${data.weather} with temperature ${data.temp}°C, windspeed ${data.wind} m/s, humidity ${data.humidity} %, clouds ${data.clouds} % in ${data.loc}`,
      },
    ],
    max_tokens: 100,
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
    return res.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
}

export async function getWeather(lon: number = 0, lat: number = 0) {
  const key = process.env.EXPO_PUBLIC_WEATHER;
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}.8&units=metric&appid=${key}`
    );
    return {
      date: Date(),
      weather: res.data.weather[0].main,
      temp: res.data.main.temp,
      humidity: res.data.main.humidity,
      wind: res.data.wind.speed,
      clouds: res.data.clouds.all,
      loc: res.data.sys.country || null,
    };
  } catch (err) {
    console.error(err);
  }
}

export async function getCities(q: string) {
  const key = process.env.EXPO_PUBLIC_GEO;
  if (!q || q.trim() === "" || q.length < 3) return;
  try {
    const res = await axios.get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${q.toLowerCase()}&apiKey=${key}`
    );
    const list = res.data.features.map((feature: any, idx: number) => ({
      id: idx,
      city: feature.properties.city || feature.properties.name,
      lon: feature.properties.lon,
      lat: feature.properties.lat,
      code: feature.properties.country_code.toUpperCase(),
    }));
    return list;
  } catch (err) {
    console.error(err);
  }
}
