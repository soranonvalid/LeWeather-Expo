import { fontFamily, styles, styleSearch } from "@/lib/style";
import { getCities, location } from "@/utils/calls";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
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
  const [inp, setInp] = useState<string>("");
  const [list, setList] = useState<any>();
  const route = useRouter();
  const debounceRef = useRef<number>(null);
  const inputRef = useRef<TextInput>(null);
  const [isFetch, setIsFetch] = useState<boolean>(false);

  const handleChange = (text: string) => {
    setInp(text);
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
          opacity: isFetch ? 0.3 : 1,
        }}
      >
        <View style={[styleSearch.base]}>
          <MaterialIcons name="search" size={18} />
          <TextInput
            onChangeText={handleChange}
            style={{ fontSize: 16 }}
            placeholder="Search"
            ref={inputRef}
          />
        </View>
        {inp.trim() === "" ? (
          ""
        ) : (
          <MaterialIcons
            onPress={() => {
              inputRef.current?.clear();
              setList([]);
              setInp("");
            }}
            name="close"
            size={24}
          />
        )}
      </View>
      <View style={{ paddingTop: 20, display: isFetch ? "none" : "contents" }}>
        <FlatList
          data={list}
          keyExtractor={(item: location) => item.id.toString()}
          renderItem={({ item }) => {
            if (item.city && item.city.trim() !== "") {
              return (
                <TouchableOpacity
                  disabled={isFetch}
                  onPress={() => {
                    route.push({
                      pathname: "/",
                      params: {
                        lon: item.lon,
                        lat: item.lat,
                        loc: item.city,
                        status: "get",
                      },
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
          ListEmptyComponent={
            <View
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 500,
                gap: 10,
                opacity: 0.5,
              }}
            >
              <MaterialCommunityIcons name="clouds" size={110} />
              <Text>Start typing to search location.</Text>
            </View>
          }
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <TouchableOpacity
          disabled={isFetch}
          onPress={() => {
            route.push({
              pathname: "/",
              params: {
                status: "get",
              },
            });
          }}
          style={{
            backgroundColor: "#69a2ff",
            width: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "100%",
          }}
        >
          <MaterialIcons name="location-searching" color="white" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isFetch}
          onPress={() => {
            if (inp.trim() === "") {
              route.back();
              return;
            }
            setIsFetch(true);
            getCities(inp)
              .then((res) => {
                route.push({
                  pathname: "/",
                  params: {
                    lon: res[0].lon,
                    lat: res[0].lat,
                    loc: res[0].city,
                    status: "get",
                  },
                });
              })
              .finally(() => setIsFetch(false));
          }}
          style={{
            backgroundColor: "black",
            width: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "100%",
          }}
        >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
