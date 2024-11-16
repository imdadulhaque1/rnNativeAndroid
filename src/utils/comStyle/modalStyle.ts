import {COLORS} from '@utils/COLORS';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const modalStyle = StyleSheet.create({
  messageContainer: {
    marginBottom: 20,
  },

  iconContainer: {
    alignItems: 'center',
    marginBottom: width / 25,
    marginTop: 10,
  },

  profileHeaderTextStyle: {
    fontFamily: 'WorkSans-SemiBold',
    fontSize: width / 25,
    color: COLORS.black,
  },

  txtStyle: {
    color: COLORS.black,
    fontFamily: 'WorkSans-Regular',
    fontSize: width / 28,
    marginLeft: 5,
  },
  proDividerStyle: {
    borderColor: COLORS.snowLight60,
    borderWidth: 0.17,
    width: 1,
    height: '100%',
    alignSelf: 'center',
  },
});
export default modalStyle;
