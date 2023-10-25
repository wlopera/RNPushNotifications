import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View } from "react-native";
import * as Notifications from "expo-notifications";

// Definir como debe manejarse las notificaciones que recibe el dispositivo
Notifications.setNotificationHandler({
  handleNotification: async () => {
    console.log("Porcesar notificaciones")
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true
    };
  },
});

export default function App() {
  function scheduleNotificationHandler() {
    console.log("Enviar notificacion")
    Notifications.scheduleNotificationAsync({
      content: {
        title: "NOTIFICACION",
        body: "Cuerpo de la notificación",
        data: { ususario: "wlopera" },
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  return (
    <View style={styles.container}>
      <Button
        title="Programar Notificacione"
        onPress={scheduleNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
