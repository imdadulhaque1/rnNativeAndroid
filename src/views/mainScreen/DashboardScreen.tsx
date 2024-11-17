import {StyleSheet, Text, View, Dimensions, Pressable} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {COLORS} from '@utils/COLORS';
import NoInternetModal from '@components/modal/NoInternetModal';
import {
  disableBluetooth,
  isBluetoothEnable,
  openBluetoothSettings,
} from '@utils/handler/openBluetoothSettings';
import MCIcon from '@components/icon/MCIcon';
import {isAvailableFingurePrint} from '@utils/handler/isAvailableFingurePrint';
import getDataFromFingurePrint from '@utils/handler/getDataFromFingurePrint';
import ToastMsg from '@utils/handler/ToastMsg';

const DashboardScreen: FC = () => {
  const [status, setStatus] = useState({
    isBluetoothEnabled: false,
    haveFingerprintOptions: false,
    fingerprintMsg: '',
  });

  useEffect(() => {
    // disableBluetooth();
    isBluetoothEnable().then(res =>
      setStatus(prev => ({...prev, isBluetoothEnabled: res})),
    );

    isAvailableFingurePrint().then(res =>
      setStatus(prev => ({...prev, haveFingerprintOptions: res})),
    );
  }, []);

  const authenticate = async () => {
    try {
      const result = await getDataFromFingurePrint.authenticate();
      setStatus(prev => ({...prev, fingerprintMsg: result}));
    } catch (error: any) {
      setStatus(prev => ({...prev, fingerprintMsg: error?.message}));
    }
  };

  console.log('Phone Status: ', JSON.stringify(status, null, 2));

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: status?.haveFingerprintOptions
            ? COLORS.snowLight95
            : COLORS.errorLight95,
        },
      ]}>
      {status && (
        <Text
          style={[
            styles.textStyle,
            {marginBottom: 20, color: COLORS.snowDeep40},
          ]}>
          {status?.fingerprintMsg}
        </Text>
      )}
      <View style={styles.btnContainerStyle}>
        <Pressable onPress={authenticate} style={styles.btnStyle}>
          <Text style={styles.textStyle}>Authenticate with Fingerprint</Text>
        </Pressable>
      </View>
      <View style={[styles.btnContainerStyle, {marginTop: 10}]}>
        <Pressable
          onPress={async () => {
            !status?.isBluetoothEnabled
              ? await openBluetoothSettings().then((res: any) => {
                  setTimeout(() => {
                    setStatus(prev => ({...prev, isBluetoothEnabled: true}));
                  }, 500);
                })
              : ToastMsg({
                  text1: 'Bluetooth already enabled !',
                  type: 'success',
                });
            // await openBluetoothSettings().then((res: any) => {
            //   ((res && res?.toLowerCase() === 'bluetooth is enabled') ||
            //     'bluetooth enable requested') &&
            //     setStatus(prev => ({...prev, isBluetoothEnabled: true}));
            // });
          }}
          style={styles.btnStyle}>
          <Text style={styles.textStyle}>Enable Bluetooth</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            status?.isBluetoothEnabled
              ? disableBluetooth().then((res: any) => {
                  setStatus(prev => ({...prev, isBluetoothEnabled: false}));
                })
              : ToastMsg({
                  text1: 'Bluetooth already disabled !',
                  type: 'success',
                });
          }}>
          <MCIcon
            name={status?.isBluetoothEnabled ? 'check-circle' : 'close-circle'}
            color={status?.isBluetoothEnabled ? 'green' : COLORS.errorLight85}
            size={25}
          />
        </Pressable>
      </View>

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
  btnContainerStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    backgroundColor: COLORS.snowLight80,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 100,
  },
});

export default DashboardScreen;
