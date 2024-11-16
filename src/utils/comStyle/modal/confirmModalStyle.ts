import {COLORS} from '@utils/COLORS';
import {Dimensions, StyleSheet} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

const confirmModalStyle = StyleSheet.create({
  modalContainer: {
    width: '100%',
    padding: 10,
    paddingTop: screenWidth > 550 ? 35 : 20,
    alignItems: 'center',
    backgroundColor: COLORS.errorLight95,
    borderRadius: 10,
  },
  headerStyle: {
    fontSize: screenWidth > 550 ? screenWidth / 26 : screenWidth / 20,
    textAlign: 'center',
    fontFamily: 'WorkSans-SemiBold',
    textTransform: 'capitalize',
    color: COLORS.black,
  },
  messageStyle: {
    fontSize: screenWidth > 550 ? screenWidth / 35 : screenWidth / 27,
    textAlign: 'center',
    fontFamily: 'WorkSans-Regular',
    color: COLORS.black,
  },
  cancelBtnStyle: {
    backgroundColor: COLORS.errorColor,
    borderRadius: 8,
  },
  deleteBtnStyle: {
    backgroundColor: COLORS.snowLight60,
    borderRadius: 8,
  },
});
export default confirmModalStyle;
