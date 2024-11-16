import {COLORS} from '@utils/COLORS';
import {Dimensions, StyleSheet} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const profileStyle = StyleSheet.create({
  proImgContainer: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.snowLight60,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenWidth > 550 ? screenWidth / 4.6 : screenWidth / 3.2,
    width: screenWidth > 550 ? screenWidth / 4.6 : screenWidth / 3.2,
  },
  proImgStyle: {
    padding: 5,
    height: screenWidth > 550 ? screenWidth / 5 : screenWidth / 3.5,
    width: screenWidth > 550 ? screenWidth / 5 : screenWidth / 3.5,
    borderRadius: 100,
  },
  txtStyle: {
    fontFamily: 'WorkSans-Regular',
    color: COLORS.black,
    fontSize: screenWidth > 550 ? screenWidth / 35 : screenWidth / 30,
    textAlign: 'center',
  },
  datePickerBtnContainer: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLORS.black,
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    minWidth: screenWidth > 550 ? screenWidth / 3 : screenWidth / 2.7,
    // justifyContent: 'center',
  },
});
export default profileStyle;
