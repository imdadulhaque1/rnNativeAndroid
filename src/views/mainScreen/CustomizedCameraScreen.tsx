import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {COLORS} from '@utils/COLORS';
import {useNavigation} from '@react-navigation/native';

interface Props {}

const CustomizedCameraScreen: FC<Props> = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={[styles.btnContainerStyle, {marginTop: 10}]}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.btnStyle}>
          <Text style={styles.textStyle}>Go Back</Text>
        </Pressable>
      </View>
    </View>
  );
};

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
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
    paddingHorizontal: 30,
    borderRadius: 100,
  },
});

export default CustomizedCameraScreen;
