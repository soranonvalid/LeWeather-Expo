import { getWeather } from "@/utils/calls";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  useEffect(() => {
    // GetResponse().then((res) => {
    //   console.log(res);
    // });
    getWeather().then((res) => {
      console.log(res);
    });
    // getCities("cap").then((res) => {
    //   console.log(res);
    // });
  }, []);
  return (
    <SafeAreaView>
      <View>
        <Text>Udh ready lur</Text>
      </View>
    </SafeAreaView>
  );
}
