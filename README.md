# RNPushNotifications
React Native Envio de Notificaciones (Push Notifications)

![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/1881a4c9-e169-445d-b26b-460bead59e7d)
![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/f4e4448f-1985-4e23-a427-77f3d1fbef83)

* Uso de Notificaciones de Expo
  * https://docs.expo.dev/versions/latest/sdk/notifications/

* Instalamos la librería de notificaciones de EXPO
  * $> npx expo install expo-notifications

### Ver documento: doc/React Native Push Notifications.docx

#### Notificaciones Locales
```
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

``` 
![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/c0f79b33-4d4d-4710-ae8b-eabfab6d8d9c)
![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/cacfb272-bc99-4dd5-beca-c18290c4d842)
![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/78201de4-a863-407a-afbd-8791199c06aa)




