import {NativeModules, Platform} from 'react-native';
const {BluetoothSettings} = NativeModules;

export const openBluetoothSettings = async () => {
  try {
    if (Platform.OS === 'android') {
      const result = await BluetoothSettings.enableBluetooth();
      return result;
    } else {
      console.log('Bluetooth settings can only be opened on Android');
    }
  } catch (error: any) {
    return error.message;
  }
};

export const isBluetoothEnable = async () => {
  try {
    if (Platform.OS === 'android') {
      const isEnabled = await BluetoothSettings.isBluetoothEnabled();
      return isEnabled;
    } else {
      return false;
    }
  } catch (error: any) {
    return false;
  }
};

export const disableBluetooth = async () => {
  try {
    if (Platform.OS === 'android') {
      const disableResult = await BluetoothSettings.disableBluetooth();
      return disableResult;
    } else {
      console.log('Disable Bluetooth only on Android');
    }
  } catch (error: any) {
    console.log('Error disabling Bluetooth: ', error.message);
  }
};
