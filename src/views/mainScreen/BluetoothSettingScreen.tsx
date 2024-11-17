import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {COLORS} from '@utils/COLORS';
import {openBluetoothSettings} from '@utils/handler/openBluetoothSettings';

interface Props {}

const BluetoothSettingScreen: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={openBluetoothSettings}
        style={{
          marginTop: 10,
          backgroundColor: COLORS.snowLight80,
          paddingVertical: 7,
          paddingHorizontal: 15,
          borderRadius: 100,
        }}>
        <Text style={styles.textStyle}>Open Bluetooth Settings</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textStyle: {
    fontSize: 17,
    color: '#111111',
    fontFamily: 'WorkSans-Regular',
  },
});

export default BluetoothSettingScreen;
