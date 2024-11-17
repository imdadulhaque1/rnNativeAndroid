import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {FC, useState} from 'react';
import {COLORS} from '@utils/COLORS';
import NoInternetModal from '@components/modal/NoInternetModal';

const DashboardScreen: FC = () => {
  return (
    <View style={styles.container}>
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
});

export default DashboardScreen;

interface comViewInterface {
  title: any;
  viewWidth?: number;
  isBorderShow?: boolean;
  titleColor?: string;
  borderRightColor?: string;
}

const ComView: FC<comViewInterface> = React.memo(
  ({title, viewWidth, isBorderShow, titleColor, borderRightColor}) => {
    return (
      <View
        style={{
          width: viewWidth,
          justifyContent: 'center',
          alignItems: 'center',
          borderRightWidth: isBorderShow ? 0.8 : 0,
          borderRightColor: borderRightColor,
          paddingHorizontal: 3,
        }}>
        <Text style={[styles.textStyle, {color: titleColor || COLORS.black}]}>
          {title}
        </Text>
      </View>
    );
  },
);
