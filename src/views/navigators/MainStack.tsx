import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from '@views/mainScreen/DashboardScreen';
import LoginScreen from '@views/auth/LoginScreen';
import FingurePrintScreen from '@views/mainScreen/FingurePrintScreen';

interface Props {}

const MainStack: FC<Props> = props => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="FingurePrint" component={FingurePrintScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
