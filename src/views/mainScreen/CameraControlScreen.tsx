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

/*


1. imlements qrCode and barCode scanning module with hole-view
2. hole-view: is used to show the camera preview with a hole in the center of the screen and scanning code will be showed on the palce of hole-view after scanning
3. now qrCode and barCode scanning is implemented in react native 
4. console the scanning code from react native
5. use the TypeScript
note: step by step folder wise comlete the coding do it in optimized way

react native and kotlin will be implements in same projects as package name is : com.snowtexcivilsystem




*/
