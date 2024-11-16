import {COLORS} from '@utils/COLORS';
import {Dimensions, StyleSheet} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const refreshStyle = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.snowLight90,
    borderColor: COLORS.snowLight65,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,

    shadowColor: COLORS.snowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
export default refreshStyle;
