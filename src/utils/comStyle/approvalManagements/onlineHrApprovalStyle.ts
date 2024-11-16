import {COLORS} from '@utils/COLORS';
import {Dimensions, StyleSheet} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const onlineHrApprovalStyle = StyleSheet.create({
  inputStyle: {
    fontSize: screenWidth > 550 ? screenWidth / 40 : screenWidth / 35,
    color: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.snowLight70,
    borderRadius: 5,
    width: screenWidth / 4,
    height: screenWidth > 550 ? 40 : 35,
    textAlign: 'center',
  },

  modalInputStyle: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.snowColor,
    width: '95%',
    fontFamily: 'WorkSans-Regular',
    color: COLORS.black,
    fontSize: screenWidth > 550 ? screenWidth / 35 : screenWidth / 30,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
  },
});
export default onlineHrApprovalStyle;
