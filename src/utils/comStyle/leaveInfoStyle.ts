import {COLORS} from '@utils/COLORS';
import {Dimensions, StyleSheet} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const leaveInfoStyle = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  txtStyle: {
    fontSize: screenWidth > 550 ? screenWidth / 40 : screenWidth / 35,
    color: COLORS.black,
    paddingVertical: 2,
  },
  headerRightContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.white,
    borderRightColor: COLORS.white,
    borderRightWidth: 1,
    width: '65%',
    alignItems: 'center',
    paddingVertical: 3,
  },
  multiRowContainer: {
    width: screenWidth / 1.5,
    borderRightWidth: 1,
    borderColor: COLORS.snowColor,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    flexDirection: 'row',
  },
  leftTxtContainer: {
    borderRightColor: COLORS.snowColor,
    borderRightWidth: 1,
    width: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  rightTxtContainer: {
    width: '35%',
    alignItems: 'center',
    paddingVertical: 3,
    borderTopWidth: 1,
    borderTopColor: COLORS.white,
  },
});
export default leaveInfoStyle;
