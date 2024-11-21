import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {COLORS} from '@utils/COLORS';

interface Props {}

const CameraControlScreen: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Camera Control Screen</Text>
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
    fontSize: screenWidth > 550 ? screenWidth / 30 : screenWidth / 27,
    color: COLORS.black,
    fontFamily: 'WorkSans-Regular',
  },
});

export default CameraControlScreen;
