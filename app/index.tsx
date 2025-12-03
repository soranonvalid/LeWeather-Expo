import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
    <View>
      <Text>{isFetch ? "fetching" : `${pos.lat}, ${pos.lon}`}</Text>
      <TouchableOpacity
        onPress={() => {
          route.push("/search");
        }}
      >
        <Text>search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
