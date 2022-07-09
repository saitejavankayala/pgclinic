import {StyleSheet} from 'react-native';

import color1 from '../utility/color';
import constant from '../utility/constant';
export default StyleSheet.create({
  lineStyle: {
    backgroundColor: color1.InputBorder,
    marginTop: 10,
    marginBottom: 15,
    height: 2,
    width: '90%',
  },
  cancelBtnTextStyle: {
    color: '#555555',
    fontSize: 16,
    marginHorizontal: 10,
    fontFamily: 'Roboto-Regular',
  },
  selectItemIconStyle: {
    marginTop: 5,
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  nameContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  navTextStyle: {
    color: '#000',
    fontSize: 20,
    paddingLeft: '5%',
    fontWeight: 'bold',
    fontFamily: constant.FONT_PRIMARY,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  keyboard: {flexGrow: 1},
  container: {
    flex: 1,
    backgroundColor: color1.THEME_PRIMARY,
  },
  logo: {
    marginTop: 90,
    marginBottom: 10,
    width: 200,
    height: 160,
    resizeMode: 'contain',
  },
  text1: {
    fontSize: 18,
    color: color1.THEME_PRIMARY,
    fontWeight: 'bold',
  },
  rememberContainer: {
    flexDirection: 'row',
    borderColor: color1.TEXT_SECONDARY,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: color1.THEME_PRIMARY,
    marginLeft: 180,
    alignItems: 'center',
    paddingVertical: 5,
  },
  forgotContainer: {
    color: color1.SPINNER_PRIMARY,
    fontSize: 18,
    marginTop: 20,
    marginBottom: 5,
  },
  inputStyle: {
    width: '95%',
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
    paddingVertical: 5,
    color: color1.BLACK,
    borderColor: color1.InputBorder,
    margin: 5,
  },
  cardContainer: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    left: '10%',
    top: '45%',
    height: 250,
    width: '80%',
    flex: 1,
  },
  cardContainer1: {
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    height: 360,
    marginLeft: '5%',
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  textInputContianer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 50,
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
  },
  appointmentTextStyle: {
    color: 'black',
    fontSize: 16,
    paddingTop: 5,
    paddingLeft: 10,
  },
  buttonContainer: {
    backgroundColor: color1.TEXT_SECONDARY,
    paddingVertical: 15,
    paddingHorizontal: 140,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: color1.InputBorder,
    width: '90%',
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: color1.THEME_PRIMARY,
    textAlign: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 15,
  },
  universityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: color1.RED,
    padding: 5,
    width: '90%',
    borderRadius: 5,
  },
  loginUniversityIdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: color1.RED,
    padding: 5,
    width: '90%',
    backgroundColor: color1.TAB_GRAY,
  },
  viewContainerUniversity: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  imageContainerUniversity: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  imageContainerIdUniversity: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  textUniversityContainer: {
    color: color1.SPINNER_PRIMARY,
    paddingLeft: 20,
    fontSize: 20,
  },
  rememberMe: {
    color: color1.SPINNER_PRIMARY,
    fontSize: 18,
  },
  textUniversityIdContainer: {
    color: color1.BLACK,
    paddingLeft: 20,
    fontSize: 20,
  },
  textInput: {
    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: color1.InputBorder,
    borderRadius: 8,
    backgroundColor: color1.TEXT_PRIMARY,
  },

  shadow: {
    paddingTop: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  IndicatorStyle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: color1.BLACK,
  },
  universityView: {
    alignSelf: 'stretch',
    flex: 1,
  },
  universityData: {
    flexDirection: 'row',
    padding: 10,
  },
});