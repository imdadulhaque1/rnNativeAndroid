import {COLORS} from '@utils/COLORS';
import {Dimensions, StyleSheet} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const generalApprovalStyle = StyleSheet.create({
  calenderContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: screenWidth > 550 ? 15 : 10,
  },
  toTextContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toTextStyle: {
    fontFamily: 'WorkSans-SemiBold',
    textAlign: 'center',
    fontSize: screenWidth / 25,
    color: COLORS.snowColor,
  },
  calenderBtnStyle: {
    backgroundColor: COLORS.white,
    paddingVertical: 7,
    paddingHorizontal: 2,
    borderColor: COLORS.snowColor,
  },
});
export default generalApprovalStyle;
