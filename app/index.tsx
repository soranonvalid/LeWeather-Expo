/* eslint-disable react-hooks/exhaustive-deps */
import { fontFamily, Mainstyles as styles } from "@/lib/style";
import WeatherIco from "@/lib/weatherIco";
import { GetResponse, getWeather, getWind, weather } from "@/utils/calls";
import { SettingsContext } from "@/utils/context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const route = useRouter();
  const { lon, lat, loc, status } = useLocalSearchParams();
  const { tunits, wunits } = useContext(SettingsContext);

  // str
  const [com, setCom] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [tm, setTm] = useState<Date | undefined>();
  const [pckg, setPckg] = useState<weather | null>(null);

  // flag
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const [res, isRes] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);

  // tone
  const [bg, setBg] = useState<string>("#131313");
  const [cl, setCl] = useState<string>("#ffffff");

  useEffect(() => {
    console.log("Page initializing");
    const timer = setInterval(() => {
      setTm(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (
      pckg &&
      com &&
      com.trim() !== "" &&
      com !== undefined &&
      tm &&
      tm !== undefined
    )
      setReady(true);
  }, [pckg, com, tm]);

  useEffect(() => {
    const getPosition = async () => {
      if (lon && lat) {
        console.log("local base");
        return {
          lon: parseFloat(lon as string),
          lat: parseFloat(lat as string),
        };
      }
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return { lat: 51.5072, lon: 0.1276 };
      }
      try {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        const { latitude, longitude } = loc.coords;
        return {
          lat: latitude,
          lon: longitude,
        };
      } catch (err) {
        console.log(err, Location.PermissionStatus);
        return { lat: 51.5072, lon: 0.1276 };
      }
    };

    const fetchRes = (pckg: weather, cityN: string) => {
      isRes(true);
      GetResponse(pckg, cityN)
        .then((res) => {
          setCom(res);
        })
        .catch((err) => {
          setCom("");
        })
        .finally(() => {
          isRes(false);
        });
    };

    const fetch = async () => {
      setIsFetch(true);
      const pos = await getPosition();
      console.log(pos);
      getWeather(pos.lat, pos.lon).then((res) => {
        if (res) {
          console.log(res);
          setPckg(res);
          if (!loc && res.loc) setCity(res.loc);
          else setCity(Array.isArray(loc) ? loc[0] : loc || "");

          function getBG(id: number | undefined) {
            if (id === undefined) return "#131313";
            if (id === 800) return "#FFED79";

            if (
              (id >= 801 && id <= 802) ||
              (id >= 600 && id <= 622) ||
              (id >= 701 && id <= 781)
            )
              return "#B7B4B4";

            if (id >= 803 && id <= 804) return "#FFCA7B";

            if (
              (id >= 200 && id <= 232) ||
              (id >= 300 && id <= 321) ||
              (id >= 500 && id <= 531)
            )
              return "#708ADF";

            return "#B7B4B4";
          }

          function getCL(color: string | undefined) {
            if (color === "#FFED79" || color === "#FFCA7B") return "#131313";
            return "#ffffff";
          }
          const calcBG = getBG(res?.weather_id);
          const calcCL = getCL(calcBG);
          setBg(calcBG);
          setCl(calcCL);
          fetchRes(res, city);
          setIsFetch(false);
        }
      });
    };
    fetch();
  }, []);

  function convTemp(p: number, c: number = 1) {
    if (p === 0) return Number(c.toFixed(1));
    const f = (c * 9) / 5 + 32;
    return Number(f.toFixed(1));
  }

  function convWind(p: number, w: number = 1) {
    if (p === 0) return w;
    if (p === 1) {
      const kms = w / 3.6;
      return Number(kms.toFixed(2));
    }
    const mph = w / 1.609;
    return Number(mph.toFixed(2));
  }

  const displayTemp = pckg ? convTemp(tunits, pckg.temp) : "--";
  const displayWind = pckg ? convWind(wunits, pckg.wind) : "--";

  return (
    <SafeAreaView style={[styles.Container, { backgroundColor: bg }]}>
      {ready && (
        <View style={styles.Header}>
          <MaterialCommunityIcons
            color={cl}
            onPress={() => {
              route.push("/search");
            }}
            name="map-search"
            size={24}
          />

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Text style={[fontFamily.black, { fontSize: 16 }, { color: cl }]}>
              {isFetch ? "" : city}
            </Text>
            <Text style={[fontFamily.regular, { color: cl }]}>
              {!tm ? "" : tm?.getHours()}:{tm?.getMinutes()}
            </Text>
          </View>

          <MaterialCommunityIcons
            onPress={() => {
              route.push("/settings");
            }}
            color={cl}
            name="menu"
            size={24}
          />
        </View>
      )}

      <View style={styles.Main}>
        {WeatherIco(pckg?.weather_id ?? 0, cl)}
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text
            style={[fontFamily.bold, styles.TextMain, { color: cl }]}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {isFetch ? "--" : displayTemp}
          </Text>
          <Text
            style={[fontFamily.regular, styles.TextIndicator, { color: cl }]}
          >
            °
          </Text>
        </View>
        <Text
          style={[fontFamily.semiBold, styles.TextUnderMain, { color: cl }]}
          numberOfLines={1}
        >
          {isFetch ? "" : pckg?.weather}
        </Text>
        <Text style={{ fontSize: 14, textAlign: "center", color: cl }}>
          {!isFetch && !res && ready ? com : ""}
        </Text>
        {!ready && (
          <Text style={{ opacity: 0.5, color: cl }}>
            {!status ? "Fetching weather..." : "fetching location..."}
          </Text>
        )}
      </View>

      {ready && (
        <View style={styles.UnderMain}>
          <View style={styles.Card}>
            <MaterialCommunityIcons size={24} color={cl} name="cloud" />
            <Text style={{ color: cl }}>{isFetch ? "--" : pckg?.clouds}%</Text>
            <Text style={{ color: cl }}>Clouds</Text>
          </View>
          <View style={styles.Card}>
            <MaterialCommunityIcons size={24} color={cl} name="water-percent" />
            <Text style={{ color: cl }}>
              {isFetch ? "--" : pckg?.humidity}%
            </Text>
            <Text style={{ color: cl }}>Humidity</Text>
          </View>
          <View style={styles.Card}>
            <MaterialCommunityIcons size={24} color={cl} name="weather-windy" />
            <Text style={{ color: cl }}>
              {isFetch ? "--" : displayWind}
              {getWind(wunits)}
            </Text>
            <Text style={{ color: cl }}>Wind</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Index;
