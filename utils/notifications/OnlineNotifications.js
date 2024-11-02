import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import * as Notifications from "expo-notifications";

// ios için düzenlemeler...
export async function requestPermissionsAsync() {
    const result =  await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: false,
        allowAnnouncements: true,
      },
    });

    return result;

  }

// android için düzenlemeler
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

const OnlineNotifications = () => {

    const [data, setData] = useState("");
    const [pushToken, setPushToken] = useState();

    useEffect(() => {
        const alertForPermission = () => {
          Notifications.getPermissionsAsync().then((statusobj) => {
            if (statusobj.status !== "granted") {
              requestPermissionsAsync();
            }

            return statusobj;
          })
          .then((statusobj) => {
            if(statusobj.status != "granted") {
                throw new Error("Permission not granted");
            }
          })
          .then(() => {
            console.log("Getting token");
            return Notifications.getExpoPushTokenAsync();
          })
          .then((response) => {
            const token = response.data;
            setPushToken(token);
            console.log(token);
          })
          .catch((err) => {
            console.log(err);
            return null;
          });
        };
        alertForPermission();
      }, []);


    useEffect(() => {
        const backgroundsubscription =
          Notifications.addNotificationResponseReceivedListener((response) => {
            let data = response.notification.request.content.data.MyData;
            setData(data);
          });
    
        const subscription = Notifications.addNotificationReceivedListener(
          (notification) => {
            console.log(notification);
          }
        );
    
        return () => {
          subscription.remove();
          backgroundsubscription.remove();
        };
      }, []);


  
  const triggerNotification = () =>{

    Notifications.scheduleNotificationAsync({
      content:{
        title:"momHera",
        body:"Geliyoruz... 2026 Ocak",
        data: { MyData: "Kendimize Ait Data" },
      },
      trigger:{
        seconds:10,
      }
    });

    // fetch("https://exp.host/--/api/v2/push/send", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Accept-Encoding": "gzip, deflate",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       to: pushToken,
    //       data: { extraData: "Ekstra data" },
    //       title: "Uygulamadan gönderilen ",
    //       body: "bu bildirim uygulama içinden gönderildi",
    //     }),
    //   });
    };

  
  return (
    <View style={styles.container}>
     <Button onPress={triggerNotification} title="Bildirimi Tetikle"></Button>
     <Text>{data}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OnlineNotifications