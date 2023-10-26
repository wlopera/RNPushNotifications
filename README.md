# RNPushNotifications
React Native Envio de Notificaciones (Push Notifications)

### Ver documento: doc/React Native Push Notifications.docx

![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/1881a4c9-e169-445d-b26b-460bead59e7d)
![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/f4e4448f-1985-4e23-a427-77f3d1fbef83)

* Uso de Notificaciones de Expo
  * https://docs.expo.dev/versions/latest/sdk/notifications/

* Instalamos la librería de notificaciones de EXPO
  * $> npx expo install expo-notifications

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

#### Push Notifications (Notificaciones automáticas)

Puede que nuestro Backend o desde nuestro dispositivo o de algún otro medio externo se envié una notificación (ejemplo: chat o información de marketing) a nuestro dispositivo.

![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/b56e3bd7-084c-41a7-ba5d-d9069079893f)

Se puede enviar mensajes a un dispositivo o a cientos o miles de dispositivos
Por medida de seguridad, un dispositivo no puede enviar notificaciones directamente a otro dispositivo

![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/374b9767-22a0-49e8-b750-ef5a3890aa84)

Uso de proveedores para enviar Push Notifications, por ejemplo, EXPO (Expose Push Notification Server) permite hablar con un servidor para enviar notificaciones a múltiples dispositivos y múltiples plataformas

![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/b6c61eb7-1c4d-4817-af38-cd2e36951300)
 
El Backend puede solicitar a Expo el envió de notificaciones automáticas o se puede hacer directamente desde el dispositivo. El Servidor de Expo a través de Google o Apple quienes son los que se comunican con los dispositivos y envían las notificaciones

![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/e827827e-b49b-43a2-8890-fb6393ab788a)

Se debe utilizar la documentación. Para poder enviar notificaciones automáticas desde Backend o a través del dispositivo uso del Servidor de Expo 

![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/e6ad9a03-1268-4847-a8e8-f524a16baeb1)

Se debe generar un Token para enviar el Push Notifications
Para las notificaciones automáticas debemos utilizar dispositivos reales
Cada dispositivo IOS o Android debe generar su propio token 
La idea es identificar los dispositivos a los que se le debe enviar los mensajes. Y la dirección de cada dispositivo sería el token de inserción de cada dispositivo
Recuerda que Push Notifications solo se puede correr en dispositivos reales

![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/6d899902-fa50-4194-9168-18be442c155d)

* Se debe solicitar los permisos (requeridos por IOS) y en el caso de Android la función 
getExpoPushTokenAsync, requiere un projectId

![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/ec0076c1-39c9-4683-b969-6d3dec3ab8ff)
https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid

![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/c6b27bbe-a1cd-4da7-b58f-976f2bcc3010)
 
* Se debe obtener el projectId de expo-constants de la configuración de la APP
```
token = await Notifications.getExpoPushTokenAsync({
  projectId: Constants.expoConfig.extra.eas.projectId,
});
```
 $> npx expo install expo-constants


### Enviar notificaciones
![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/d4be0c26-c2db-4943-b852-87f26b0c9cbc)
https://expo.dev/notifications

![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/68050719-173e-4234-a8d7-6b17af16055f)

Utilizar herramienta de Expo Notifications para enviar notificaciones
Tomar token enviado por Expo ExponentPushToken[-d4Y1xLNDsXZvjxzQcbU3q]

![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/0d4e25c3-21fa-4c28-a463-56136e28b31c)
![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/1e639bed-80f9-4266-857e-6d1a3aafbfb3)

Se envía y llega el Push Notification a mi dispositivo real

![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/f4e6f90a-54b7-4461-804e-66b6c017a9e6)
 
Para enviar Push Notifications por desarrollo (Backend) ver documentación

![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/ba6793cf-faac-4738-9b28-f49f67cb58e2)
![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/3a5be52f-5bea-4a96-844a-2f78fd37d388)
![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/b52bc8aa-a633-410f-9757-728c40c1a897)

También podemos hacerlo desde nuestra interfaz
Vamos a consumir un servicio API Send Notification de Expo desde fetch

* To do so, send a POST request to https://exp.host/--/api/v2/push/send with the following HTTP headers:

Los tokens que se generen se pueden almacenar en una base de datos y luego consultarlos para enviar notificaciones programadas desde el dispositivo
A modo de demostración se va a enviar una Push Notification desde el dispositivo colocando el Token directamente, pero este valor debería venir de una DB o servicio que consulte la información (Token) almacenada.

![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/06df9418-db13-4052-b7c7-1648f5a45264)

## Subo y pruebo el APP
   
![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/05dea9a4-692d-4eea-9539-8fc205407fb2)
![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/5c213553-1dc3-42c4-bbfb-9131776023c9)
![image](https://github.com/wlopera/RNPushNotifications/assets/7141537/18a0c6c6-4d86-422d-bbc6-0649a4ba9f2d)





