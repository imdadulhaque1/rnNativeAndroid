import {COLORS} from '@utils/COLORS';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const attandenceReportStyle = StyleSheet.create({
  txtStyle: {
    fontFamily: 'WorkSans-Regular',
    fontSize: width > 550 ? width / 40 : width / 32,
    color: COLORS.black,
  },
});
export default attandenceReportStyle;
