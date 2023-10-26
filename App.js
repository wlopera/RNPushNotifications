import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, Button, Platform, StyleSheet, View } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

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
  // Obtener Token de insercion (funcion asincrona - promesa)
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      // No tenewmos permiso
      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      // Envio mensaje de Alerta al dispositivo
      if (finalStatus !== "granted") {
        Alert.alert(
          "Permisos Requeridos",
          "Push Notifications necesita los permisos apropiados"
        );
        return;
      }

      // console.log("Proyect id--------> ", JSON.stringify(Constants.expoConfig, null, 2));

      const pushTokenData = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      console.log("Token de inserción:", pushTokenData);

      if (Platform.OS === "android") {
        // definir en que canal se debe recibir la notificacion
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT, // Definir nivel de prioridad
        });
      }
    }

    configurePushNotifications();
  }, []);

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

  //   curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/send" -d '{
  //   "to": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
  //   "title":"hello",
  //   "body": "world"
  // }'

  function sendPushNotificationHandler() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "ExponentPushToken[-d4Y1xLNDsXZvjxzQcbU3q]",
        title: "PUSH NOTIFICATION DE PRUEBA",
        body: "Notificación Automática enviada desde mi Redmi 9A",
      }),
    });
  }
  return (
    <View style={styles.container}>
      <Button
        title="Enviar Notificación Manual"
        onPress={scheduleNotificationHandler}
      />
      <Button
        title="Enviar Notificación Automática"
        onPress={sendPushNotificationHandler}
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
