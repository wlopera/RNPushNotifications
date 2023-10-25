import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View } from "react-native";
import * as Notifications from "expo-notifications";

// Definir que debe manejarse las notificaciones que recibe el dispositivo
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  // Agregar detectores de notificaciones cuando refresque y que se elimene al cerrar el componente
  // Controladores de eventos (eliminar)
  useEffect(() => {
    const suscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(
          "Notificación peticion recibida:",
          JSON.stringify(notification, null, 2)
        );
        const username = notification.request.content.data.ususario;
        console.log(username);
      }
    );

    const suscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(
          "Notificación respuesta recibida:",
          JSON.stringify(response, null, 2)
        );
        const username = response.notification.request.content.data.ususario;
        console.log(username);
      }
    );
    return () => {
      suscription1.remove();
      suscription2.remove();
    };
  }, []);

  function scheduleNotificationHandler() {
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
