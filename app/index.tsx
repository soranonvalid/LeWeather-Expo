import { getCities } from "@/utils/calls";
import { useEffect, useRef, useState } from "react";
import { FlatList, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [search, setSearch] = useState<string>("");
  const [list, setList] = useState<any>();
  const debounceRef = useRef<number>(null);

  const handleChange = (text: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(text);
    }, 1500);
  };

  useEffect(() => {
    setList(getCities(search).then((res) => setList(res)));
  }, [search]);
  useEffect(() => {
    // GetResponse().then((res) => {
    //   console.log(res);
    // });
    // getWeather().then((res) => {
    //   console.log(res);
    // });
    // getCities("cap").then((res) => {
    //   console.log(res);
    // });
  }, []);
  return (
    <SafeAreaView>
      <TextInput onChangeText={handleChange} placeholder="Search" />
      <Text>{search}</Text>
      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ marginBottom: 10 }}>
            {item.city}, ({item.code})
          </Text>
        )}
      />
    </SafeAreaView>
  );
}
