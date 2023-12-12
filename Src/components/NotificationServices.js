import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { Linking, PermissionsAndroid } from 'react-native'

export async function requestUserPermission() {
  try {
    console.log('calllllllllllll');

    PushNotification.checkPermissions((permissions) => {
      console.log('Notification Permissions:', permissions);
      if (!permissions.alert && !permissions.badge && !permissions.sound) {
        // Notifications are disabled

        // Linking.openSettings();

      }
    });
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    console.log('enabled===', enabled);
    if (enabled) {
      console.log('Authorization status:', authStatus);
      let res = getfcmToken();
      return res
    } else {
      requestUserPermission()
    }
  } catch (error) {
    console.log('requestUserPermission', error);
  }
  PushNotification.localNotification({
    title: 'remoteMessage.notification.title',
    message: ' remoteMessage.notification.body',
    channelId: "switcheroo",

  })
}


const getfcmToken = async () => {

  try {


    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(`the new generated token `, fcmToken);




      return fcmToken;
    }
  } catch (error) {
    console.log(`error raised in fcm token`, error);
  }
};


export const notificationListener = async () => {

  try {


    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });


    // // forground mesages
    // messaging().onMessage(async remoteMessage => {
    //   console.log('A new FCM message arrived!', remoteMessage.notification.title, remoteMessage.notification.body);
    //   PushNotification.localNotification({

    //     title: remoteMessage.notification.title,
    //     message: remoteMessage.notification.body,
    //     channelId: "switcheroo",

    //     // other properties...
    //   });
    // });


  } catch (error) {
    console.log('notificationListener', error);
  }
};
