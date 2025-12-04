import { Settingstyles as styles } from "@/lib/style";
import { SettingsContext } from "@/utils/context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const { setTunits, setWunits, tunits, wunits } = useContext(SettingsContext);
  const route = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="thermometer" size={28} />

          <Text style={styles.sectionTitle}>Units</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Temperature</Text>
            <Picker
              onValueChange={(v) => setTunits(Number(v))}
              style={{ width: 200 }}
              selectedValue={String(tunits)}
            >
              <Picker.Item label="Celsius" value="0" />
              <Picker.Item label="Fahrenheit" value="1" />
            </Picker>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Wind Speed</Text>
            <Picker
              onValueChange={(v) => setWunits(Number(v))}
              selectedValue={String(wunits)}
              style={{ width: 200 }}
            >
              <Picker.Item label="km/h" value="0" />
              <Picker.Item label="m/s" value="1" />
              <Picker.Item label="mph" value="2" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      {/* About App */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="information-outline" size={28} />
          <Text style={styles.sectionTitle}>About App</Text>
        </View>

        <Text style={styles.aboutText}>Leweather - Built with pawangers.</Text>
        <Text style={styles.aboutText}>V.0.0.1</Text>
        <Text style={styles.aboutText}>KODEIN STUDENTS. XI GRADE</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          route.back();
        }}
        style={styles.return}
      >
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={30}
          color="white"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
