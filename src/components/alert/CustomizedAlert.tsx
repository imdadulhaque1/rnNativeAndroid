import MCIcon from '@components/icon/MCIcon';
import {COLORS} from '@utils/COLORS';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

type Props = {
  isAlertOpen: any;
  onDataReceived: any;
  title: string;
  message: string;
  cancel: string;
  confirmText: string;
  alertContainerStyle: any;
  messageStyle: any;
  titleStyle: any;
  onPress?: () => void;
};

const CustomizedAlert = ({
  onPress,
  isAlertOpen,
  onDataReceived,
  title,
  message,
  cancel,
  confirmText,
  alertContainerStyle,
  messageStyle,
  titleStyle,
}: Props) => {
  return (
    <View>
      <AwesomeAlert
        contentContainerStyle={alertContainerStyle}
        show={isAlertOpen}
        showProgress={false}
        title={title}
        titleStyle={titleStyle}
        // message={message}
        customView={
          <Pressable onPress={onPress} style={styles.messageContainer}>
            <Text style={[messageStyle, styles.copyTxt]}>{`${message} `}</Text>
            {/* <MCIcon
                name={'content-copy'}
                size={16}
                color={COLORS.snowColor}
              />
            <Text style={[messageStyle, {textAlign: 'center'}]}>
              {`Copy your Device ID & send it to IT to set in your payroll !`}
            </Text> */}
          </Pressable>
        }
        messageStyle={messageStyle}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText={cancel}
        confirmText={confirmText}
        confirmButtonColor={COLORS.snowLight65}
        cancelButtonColor={COLORS.errorColor}
        onCancelPressed={() => {
          onDataReceived(false);
        }}
        onConfirmPressed={() => {
          onDataReceived(false);
        }}
      />
    </View>
  );
};

export default CustomizedAlert;

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyTxt: {
    textAlign: 'center',
    // backgroundColor: COLORS.snowLight80,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});
