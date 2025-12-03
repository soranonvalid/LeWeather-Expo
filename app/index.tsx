import { getWeather } from "@/utils/calls";
import { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Index() {
  useEffect(() => {
    // GetResponse().then((res) => {
    //   console.log(res);
    // });
    getWeather(6.2734, 106.9831).then((res) => {
      console.log(res);
    });
    // getCities("cap").then((res) => {
    //   console.log(res);
    // });
  }, []);
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
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#708ADF",
  },

  Header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
  },

  Main: {
    flex: 1, // buat berada di tengah
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "yellow",
    borderRadius: 16,
    padding: 20,
  },

  UnderMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
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
