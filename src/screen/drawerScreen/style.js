import {StyleSheet} from 'react-native';
import color from './../../utility/color';
import color1 from './../../utility/color';
export default StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  imageContainer: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  tabView: {
    height: '100%',
    flex: 1,
  },
  tabBar: {
    alignItems: 'center',
    height: '100%',
    flex: 1,
  },
  axiosContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 1,
    borderColor: 'red',
    borderWidth: 1,
    padding: 2,
    margin: 10,
  },

  IndicatorStyle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  avatarContainer: {
    width: 200,
    height: 200,
  },
  itemContainer: {alignItems: 'center', paddingTop: 60, paddingLeft: 10},
  userInfoSection: {
    marginTop: 10,
    width: '90%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    marginLeft: 20,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    paddingBottom: 10,
  },
  backArrowStyle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: 'red',
  },
  editStyle: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 1000,
    alignSelf: 'flex-end',
  },
  editStyles: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 1000,
    translateY: -40,
    marginLeft: 80,
  },
  line: {
    borderBottomColor: 'red',
    borderBottomWidth: 10,
  },
  titles: {
    fontSize: 20,
    paddingTop: 5,
  },
  inputStyle: {
    alignItems: 'flex-start',
    paddingLeft:20
  },
  modalContainer: {
    marginTop: 200,
    backgroundColor: color1.THEME_PRIMARY,
    borderRadius: 10,
    width: '80%',
    marginLeft: 30,
    paddingLeft: 30,
  },
  Container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lines: {
    borderBottomColor: 'red',
    borderBottomWidth: 1,
  },
  blackLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 20,
  },
  center:{alignItems: 'center'}
});
