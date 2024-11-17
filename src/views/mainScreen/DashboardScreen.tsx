import {StyleSheet, Text, View, Dimensions, Pressable} from 'react-native';
import React, {FC, useState} from 'react';
import {COLORS} from '@utils/COLORS';
import NoInternetModal from '@components/modal/NoInternetModal';
import {openBluetoothSettings} from '@utils/handler/openBluetoothSettings';

const DashboardScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={openBluetoothSettings} style={styles.btnStyle}>
        <Text style={styles.textStyle}>Open Bluetooth Settings</Text>
      </Pressable>

      <NoInternetModal />
    </View>
  );
};

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textStyle: {
    fontFamily: 'WorkSans-Regular',
    fontSize: screenWidth / 28,
    color: COLORS.black,
  },
  btnStyle: {
    marginTop: 10,
    backgroundColor: COLORS.snowLight80,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 100,
  },
});

export default DashboardScreen;
