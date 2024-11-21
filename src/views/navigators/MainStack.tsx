import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from '@views/mainScreen/DashboardScreen';
import LoginScreen from '@views/auth/LoginScreen';
import FingurePrintScreen from '@views/mainScreen/FingurePrintScreen';
import BluetoothSettingScreen from '@views/mainScreen/BluetoothSettingScreen';
import CameraControlScreen from '@views/mainScreen/CameraControlScreen';
import CustomizedCameraScreen from '@views/mainScreen/CustomizedCameraScreen';

interface Props {}

const MainStack: FC<Props> = props => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="CameraControl" component={CameraControlScreen} />
      <Stack.Screen name="FingurePrint" component={FingurePrintScreen} />
      <Stack.Screen
        name="BluetoothSetting"
        component={BluetoothSettingScreen}
      />
      <Stack.Screen
        name="CustomizedCamera"
        component={CustomizedCameraScreen}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
