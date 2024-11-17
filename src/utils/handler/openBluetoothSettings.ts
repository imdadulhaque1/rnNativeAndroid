import {NativeModules, Platform} from 'react-native';

export const openBluetoothSettings = async () => {
  const {BluetoothSettings} = NativeModules;

  try {
    if (Platform.OS === 'android') {
      const result = await BluetoothSettings.enableBluetooth();
      console.log(result); // Logs success or error message
    } else {
      console.log('Bluetooth settings can only be opened on Android');
    }
  } catch (error: any) {
    console.log('Error enabling Bluetooth: ', error.message);
  }
};
