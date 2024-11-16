import {COLORS} from '@utils/COLORS';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const treeReqStyle = StyleSheet.create({
  txtStyle: {
    fontFamily: 'WorkSans-Regular',
    fontSize: width > 550 ? width / 33 : width / 25,
    color: COLORS.black,
  },
  btnContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: width > 550 ? width / 50 : width / 40,
  },
  reqDetailsContainerStyle: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  dividerStyle: {
    borderColor: COLORS.white,
    borderWidth: 0.1,
    width: '100%',
    alignSelf: 'center',
  },
  wrapperContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  treeImgContainer: {
    height: width > 550 ? width / 5 : width / 4.5,
    width: '100%',
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  tableViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
    // borderWidth: 0.7,
  },
  tableHeaderText: {
    color: COLORS.white,
    fontFamily: 'WorkSans-SemiBold',
    fontSize: width > 550 ? width / 38 : width / 30,
    paddingVertical: 2,
  },
});
export default treeReqStyle;
