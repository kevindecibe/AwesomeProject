import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Alert,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { Pressable } from "react-native";
import germanyFlag from "./assets/Flag_of_Germany.png";
import franceFlag from "./assets/Flag_of_France.png";
import japanFlag from "./assets/Flag_of_Japan.png";

export default function App() {
  const fetchTime = async (timezone, city) => {
    try {
      const response = await axios.get(
        `https://worldtimeapi.org/api/timezone/${timezone}`
      );

      if (response.data && response.data.datetime) {
        const date = new Date(response.data.datetime);
        const timeString = date.toLocaleTimeString("es-ES", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        Alert.alert(
          `Hora en ${city}`,
          `La hora actual en ${city} es: ${timeString}`,
          [{ text: "OK", onPress: () => {} }],
          { cancelable: true }
        );
      } else {
        throw new Error(
          "La propiedad 'datetime' no está disponible en la respuesta de la API."
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        `No se pudo obtener la hora: ${error.message}`,
        [{ text: "OK" }],
        { cancelable: true }
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Pressable
        style={styles.button}
        onPress={() => fetchTime("Europe/Paris", "París")}
        android_ripple={{ color: "rgba(255,255,255,0.2)" }}
        activeOpacity={0.6}
      >
        <ImageBackground source={franceFlag} style={styles.flag}>
          <Text style={styles.buttonText}>Mostrar la hora en París</Text>
        </ImageBackground>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => fetchTime("Asia/Tokyo", "Tokio")}
        android_ripple={{ color: "rgba(255,255,255,0.2)" }}
        activeOpacity={0.6}
      >
        <ImageBackground source={japanFlag} style={styles.flag}>
          <Text style={styles.buttonText}>Mostrar la hora en Tokio</Text>
        </ImageBackground>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => fetchTime("Europe/Berlin", "Berlín")}
        android_ripple={{ color: "rgba(255,255,255,0.2)" }}
        activeOpacity={1.6}
      >
        <ImageBackground source={germanyFlag} style={styles.flag}>
          <Text style={styles.buttonText}>Mostrar la hora en Berlín</Text>
        </ImageBackground>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  flag: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
