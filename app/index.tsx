import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const route = useRouter();
  const { lon, lat } = useLocalSearchParams();
  const [pos, setPos] = useState({ lat: 0, lon: 0 });
  const [isFetch, setIsFetch] = useState<boolean>(false);

  // getting position
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
        console.log("fetching position...");
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
        <MaterialCommunityIcons name="map-search" size={24} />

        <View>
          <Text>Cileungsi</Text>
          <Text>14:43</Text>
        </View>

        <MaterialCommunityIcons name="menu" size={24} />
      </View>

      <View style={styles.Main}>
        <MaterialCommunityIcons name="weather-rainy" size={100} />
        <Text style={styles.TextMain}>28°</Text>
        <Text style={styles.TextMain}>Rainy</Text>
        <Text>
          Intensitas hujan yang mungkin terjadi diperkirakan ringan hingga
          sedang.
        </Text>
      </View>

      <View style={styles.UnderMain}>
        <View style={styles.Card}>
          <MaterialCommunityIcons name="cloud" />
          <Text>45%</Text>
          <Text>Clouds</Text>
        </View>
        <View style={styles.Card}>
          <MaterialCommunityIcons name="water-percent" />
          <Text>45%</Text>
          <Text>Humidity</Text>
        </View>
        <View style={styles.Card}>
          <MaterialCommunityIcons name="weather-windy" />
          <Text>45%</Text>
          <Text>Wind</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  Header: {
    width: "100%",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    backgroundColor: "#FFFFFF",
  },

  Container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 15,
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#708ADF",
    gap: 8,
  },

  Main: {
    alignItems: "center",
    display: "flex",
    gap: 8,
    justifyContent: "center",
    backgroundColor: "yellow",
    marginVertical: "auto",
  },

  UnderMain: {
    width: "100%",
    flexDirection: "row",
    marginTop: "100%",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },

  Card: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  TextMain: {
    fontSize: 48,
    fontWeight: "bold",
  },
});
