import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import BottomHalfModal from './BottomHalfModal';
import MCIcon from '@components/icon/MCIcon';
import {COLORS} from '@utils/COLORS';
import NetInfo from '@react-native-community/netinfo';
import {openWiFiSettings} from '@utils/handler/openWiFiSettings';
import Button from '@components/button/Button';

interface Props {}

const NoInternetModal: FC<Props> = props => {
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      if (!state.isConnected) {
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }
    });

    // Clean up subscription when component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <BottomHalfModal
      isVisible={isModalVisible}
      onClose={() => {}}
      modalAnimationIn="slideInUp"
      modalAnimationOut="slideOutDown"
      modalHeight="30%" // Customize modal height
    >
      <View
        style={{
          // backgroundColor: COLORS.snowLight100,
          width: screenWidth,
          alignItems: 'center',
          top: 10,
          position: 'absolute',
        }}>
        <MCIcon
          name={'wifi-off'}
          size={screenWidth > 550 ? screenWidth / 8 : screenWidth / 6}
          color={COLORS.errorLight85}
        />
      </View>
      <Text
        style={[
          styles.wifiTxtStyle,
          {
            color: COLORS.errorLight80,
          },
        ]}>
        No internet connections !
      </Text>
      <Text style={styles.wifiTxtStyle}>
        {`Turn on mobile data Or connect to a Wifi.`}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: screenWidth,
          paddingHorizontal: 20,
          position: 'absolute',
          bottom: 20,
        }}>
        <Button
          style={{
            backgroundColor: COLORS.snowLight90,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: screenWidth > 550 ? screenWidth / 15 : screenWidth / 10,
            minWidth: screenWidth > 550 ? screenWidth / 4 : screenWidth / 2.8,
            borderRadius: 50,
          }}
          onPress={async () => {
            openWiFiSettings();
          }}>
          <Text style={[styles.wifiTxtStyle, {fontFamily: 'WorkSans-Medium'}]}>
            Open Settings
          </Text>
        </Button>
        <Button
          style={{
            backgroundColor: COLORS.errorLight95,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: screenWidth > 550 ? screenWidth / 15 : screenWidth / 10,
            minWidth: screenWidth > 550 ? screenWidth / 7 : screenWidth / 5,
            borderRadius: 50,
          }}
          onPress={async () => {
            await setModalVisible(false);
          }}>
          <Text style={[styles.wifiTxtStyle, {fontFamily: 'WorkSans-Medium'}]}>
            Okay
          </Text>
        </Button>
      </View>
    </BottomHalfModal>
  );
};

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const styles = StyleSheet.create({
  wifiTxtStyle: {
    color: COLORS.black,
    fontFamily: 'WorkSans-Regular',
    fontSize: screenWidth > 550 ? screenWidth / 35 : screenWidth / 25,
    textAlign: 'center',
  },
});

export default NoInternetModal;
