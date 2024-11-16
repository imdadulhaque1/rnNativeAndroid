import {COLORS} from '@utils/COLORS';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const drawerStyle = StyleSheet.create({
  txtStyle: {
    fontFamily: 'WorkSans-Regular',
    fontSize: width > 550 ? width / 35 : width / 27,
    color: COLORS.white,
  },
  cartTxtStyle: {
    fontFamily: 'WorkSans-Regular',
    color: COLORS.black,
    textAlign: 'center',
    fontSize: width > 550 ? width / 40 : width / 30,
  },
  btnContainerStyle: {
    backgroundColor: COLORS.snowLight90,
    borderRadius: 5,

    shadowColor: COLORS.snowDeep25,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
export default drawerStyle;
