import {COLORS} from '@utils/COLORS';
import {Dimensions, StyleSheet} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const punchEntryStyle = StyleSheet.create({
  txtStyle: {
    fontFamily: 'WorkSans-Regular',
    color: COLORS.white,
    fontSize: screenWidth > 550 ? screenWidth / 35 : screenWidth / 30,
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btnStyle: {
    backgroundColor: COLORS.snowDeep40,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: screenWidth > 550 ? screenWidth / 12 : screenWidth / 11,
    minWidth: screenWidth > 550 ? screenWidth / 4 : screenWidth / 3.5,
    borderRadius: 3,
  },
  punchOutBtn: {
    backgroundColor: COLORS.snowLight80,
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 3,
  },
});
export default punchEntryStyle;
