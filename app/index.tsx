import { fontFamily, Mainstyles as styles } from "@/lib/style";
import { LoadFont } from "@/utils/calls";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  LoadFont();
  const route = useRouter();
  const { lon, lat } = useLocalSearchParams();
  const [pos, setPos] = useState({ lat: 0, lon: 0 });
  const [isFetch, setIsFetch] = useState<boolean>(false);

  const [bg, setBg] = useState<string>("");
  const [cl, setCl] = useState<string>("");

  useEffect(() => {
    const getPosition = async () => {
      setIsFetch(true);
      if (lon && lat) {
        console.log("local base");
        setPos({
          lon: parseFloat(lon as string),
          lat: parseFloat(lat as string),
        });
        setIsFetch(false);
        return;
      }
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPos({ lat: 51.5072, lon: 0.1276 });
        return;
      }
      try {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        const { latitude, longitude } = loc.coords;
        setPos({
          lat: latitude,
          lon: longitude,
        });
      } catch (err) {
        console.log(err, Location.PermissionStatus);
        setPos({ lat: 51.5072, lon: 0.1276 });
      } finally {
        setIsFetch(false);
      }
    };
    getPosition();
  }, [lon, lat]);
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Header}>
        <MaterialCommunityIcons
          onPress={() => {
            route.push("/search");
          }}
          name="map-search"
          size={24}
        />

        <View>
          <Text>Cileungsi</Text>
          <Text>14:43</Text>
        </View>

        <MaterialCommunityIcons name="menu" size={24} />
      </View>

      <View style={styles.Main}>
        <MaterialCommunityIcons name="weather-rainy" size={150} />
        <Text
          style={[fontFamily.bold, styles.TextMain]}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          28°
        </Text>
        <Text
          style={[fontFamily.semiBold, styles.TextUnderMain]}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          Rainy
        </Text>
        <Text style={{ fontSize: 14, textAlign: "center" }}>
          Intensitas hujan yang mungkin terjadi diperkirakan ringan hingga
          sedang.
        </Text>
      </View>

      <View style={styles.UnderMain}>
        <View style={styles.Card}>
          <MaterialCommunityIcons size={24} name="cloud" />
          <Text>45%</Text>
          <Text>Clouds</Text>
        </View>
        <View style={styles.Card}>
          <MaterialCommunityIcons size={24} name="water-percent" />
          <Text>45%</Text>
          <Text>Humidity</Text>
        </View>
        <View style={styles.Card}>
          <MaterialCommunityIcons size={24} name="weather-windy" />
          <Text>45%</Text>
          <Text>Wind</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
