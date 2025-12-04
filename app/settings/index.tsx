import { View, Text, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Settings() {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Settings</Text>

      {/* Units */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="thermometer" size={28} />

          <Text style={styles.sectionTitle}>Units</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Temperature</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Wind Speed</Text>
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

        <Text style={styles.aboutText}>Leweather - Built with love.</Text>
        <Text style={styles.aboutText}>V.0.0.1</Text>
        <Text style={styles.aboutText}>KODEIN STUDENTS. XI GRADE</Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },

  section: {
    marginTop: 20,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  card: {
    justifyContent: "center",
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  label: {
    fontSize: 16,
  },

  picker: {
    height: 40,
    width: 120,
  },

  divider: {
    marginVertical: 20,
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
  },

  aboutText: {
    fontSize: 15,
    marginTop: 6,
    color: "#333",
  },
});
