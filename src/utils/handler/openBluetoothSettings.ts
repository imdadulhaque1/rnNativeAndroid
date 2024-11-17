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
    console.log('Error enabling Bluetooth: ', error.message);
    return error.message;
  }
};

export const isBluetoothEnable = async () => {
  try {
    if (Platform.OS === 'android') {
      const isEnabled = await BluetoothSettings.isBluetoothEnabled();
      console.log(`Bluetooth is ${isEnabled ? 'enabled' : 'disabled'}`);
      return isEnabled;
    } else {
      console.log('Bluetooth status can only be checked on Android');
      return false;
    }
  } catch (error: any) {
    console.log('Error checking Bluetooth status:', error.message);
    return false;
  }
};

export const disableBluetooth = async () => {
  try {
    if (Platform.OS === 'android') {
      const disableResult = await BluetoothSettings.disableBluetooth();

      console.log('disableResult Got: ', disableResult);
    } else {
      console.log('Disable Bluetooth only on Android');
    }
  } catch (error: any) {
    console.log('Error disabling Bluetooth: ', error.message);
  }
};
