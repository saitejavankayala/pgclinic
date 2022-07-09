import {Dimensions, Platform, StyleSheet} from 'react-native';
import color from '../utility/color';
import Color from '../utility/colorConstant';
import Constant from '../utility/constant';
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  spinnerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#333',
    opacity: 0.8,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  IndicatorStyle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: color.INDICATOR,
  },
  marginTopHeader: {
    flex: 1,
    //marginTop: Platform.OS === 'ios' ? (XR || X || XS ? 35 : 20) : 0,
  },
  menuContainer: {
    marginLeft: 10,
    padding: 5,
  },
  menuStyle: {
    height: 22,
    width: 22,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    minWidth: '50%',
    alignSelf: 'center',
    height: 40,
    backgroundColor: Color.blue,
    borderRadius: 4,
    padding: 5,
    width: '90%',
  },
  socialButtonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    minWidth: '50%',
    alignSelf: 'center',
    borderRadius: 4,
    height: 40,
    borderWidth: 1,
    borderColor: Color.TEXT_SECONDARY,
    padding: 5,
    width: '90%',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  Link: {
    alignSelf: 'baseline',
  },
  buttonText: {
    fontSize: 16,
    color: Color.TEXT_PRIMARY,
    fontFamily: Constant.FONT_PRIMARY,
  },
  buttonUniversityText: {
    fontSize: 16,
    color: Color.TEXT_SECONDARY,
    fontFamily: Constant.FONT_PRIMARY,
  },
  buttonTextContainer: {
    paddingLeft: 20,
  },
  downArrowContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: 0,
  },
  linkText: {
    fontSize: 20,
    color: Color.TEXT_SECONDARY,
    fontFamily: Constant.FONT_PRIMARY,
    textDecorationLine: 'underline',
  },
  iconStyle: {
    width: width * 0.75,
    height: 88,
    resizeMode: 'contain',
  },
  headerTitleStyle: {
    fontSize: 20,
    color: Color.TEXT_PRIMARY,
    fontFamily: Constant.FONT_PRIMARY,
  },
  headerStyle: {
    backgroundColor: Color.HEADER_PRIMARY,
    color: Color.TEXT_PRIMARY,
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  rowTextContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  secondaryLinkText: {
    fontSize: 16,
    fontFamily: Constant.FONT_SECONDARY,
  },
  secondaryTextStyle: {
    fontSize: 16,
    fontFamily: Constant.FONT_SECONDARY,
    color: '#3A3A3A',
  },
  titleHeaderStyle: {
    fontSize: 20,
    color: Color.TEXT_PRIMARY,
    fontFamily: Constant.FONT_PRIMARY,
  },
  paddingVertical10: {
    paddingVertical: 10,
  },
  textInputStyle: {
    width: '90%',
    color: '#000',
    fontSize: 16,
    marginTop: 10,
    paddingLeft: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  textAreaStyle: {
    maxHeight: 100,
    color: '#000',
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: '#F4F4F4',
  },
  backIconStyle: {
    width: 40,
    height: 40,
    marginLeft: 20,
    resizeMode: 'contain',
  },
});

export default styles;
