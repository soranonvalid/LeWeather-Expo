# Weatherly

![Expo](https://img.shields.io/badge/Expo-54.0-blue)
![React Native](https://img.shields.io/badge/React%20Native-Mobile-green)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A mobile weather app built with Expo. It uses geocoding for location search, a weather API for forecasts, and OpenRouter for AI analysis. It includes a settings page for temperature and wind units.

---

## Features

- Search locations and view current weather and short forecast.
- AI weather analysis powered by OpenRouter.
- Settings for Celsius or Fahrenheit, and km/h or mph.


## Tech Stack

- Expo (React Native)
- React Navigation
- Axios / fetch
- Geocoding API
- Weather API
- OpenRouter AI
- AsyncStorage

- ---

- Environment Variables

Create a .env file in the project root:
``` env
EXPO_PUBLIC_AI=
EXPO_PUBLIC_WEATHER=
OPENROUTER_GEO=
```


## Basic Flow

User searches a place.

App fetches coordinates with geocoding.

App requests weather data.

Optional AI summary call to OpenRouter.

---

License

MIT License. Feel free to reuse the code and adapt it to your needs.
