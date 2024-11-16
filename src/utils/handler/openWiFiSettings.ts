import {NativeModules, Platform} from 'react-native';

export const openWiFiSettings = () => {
  const {WiFiSettings} = NativeModules;

  try {
    if (Platform.OS === 'android') {
      WiFiSettings.openWiFiSettings();
    } else {
      console.log('WiFi settings can only be opened on Android');
    }
  } catch (error) {
    // @ts-ignore
    console.log('Error to open WiFi settings: ', error?.message);
  }
};
