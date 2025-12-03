import { fontFamily, styles, styleSearch } from "@/lib/style";
import { getCities, LoadFont, location } from "@/utils/calls";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [search, setSearch] = useState<string>("");
  const [list, setList] = useState<any>();
  const route = useRouter();
  const debounceRef = useRef<number>(null);
  LoadFont();

  const handleChange = (text: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(text);
    }, 1500);
  };

  useEffect(() => {
    setList(getCities(search).then((res) => setList(res)));
  }, [search]);
  return (
    <SafeAreaView
      style={[
        styles.content,
        {
          backgroundColor: "#FFFFFF",
        },
      ]}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View style={[styleSearch.base]}>
          <MaterialIcons name="search" size={18} />
          <TextInput
            onChangeText={handleChange}
            style={{ fontSize: 16 }}
            placeholder="Search"
          />
        </View>
        <MaterialIcons
          onPress={() => {
            route.back();
          }}
          name="cancel"
          size={24}
        />
      </View>
      <View style={{ paddingTop: 20 }}>
        <FlatList
          data={list}
          keyExtractor={(item: location) => item.id.toString()}
          renderItem={({ item }) => {
            if (item.city && item.city.trim() !== "") {
              return (
                <TouchableOpacity
                  onPress={() => {
                    route.push({
                      pathname: "/",
                      params: { lon: item.lon, lat: item.lat },
                    });
                  }}
                  style={styleSearch.baseList}
                >
                  <Text style={[fontFamily.semiBold, { fontSize: 16 }]}>
                    {item.city}, {item.code}
                  </Text>
                  <MaterialIcons name="arrow-forward" size={20} outline={10} />
                </TouchableOpacity>
              );
            }
            return null;
          }}
        />
      </View>
    </SafeAreaView>
  );
}
