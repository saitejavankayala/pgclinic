import {StyleSheet} from 'react-native';
import color1 from '../utility/color';
export default StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  imageContainer: {
    height: 25,
    width: 25,
  },
  drawerProfilemageContainer: {
    margin: 5,
    height: 70,
    width: 70,
    resizeMode: 'contain',
    borderRadius: 1000,
  },
  drawerContainer: {
    flexDirection: 'row',
    backgroundColor: color1.InputBorder,
    alignItems: 'center',
    height: 120,
  },
  name: {
    padding: 6,
    flexDirection: 'column',
  },
  drawerSection: {
    marginTop: 20,
  },
  drawerImageContainer: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    alignSelf: 'center',
    position: 'absolute',
    right: 10,
  },
  tabView: {
    alignItems: 'center',
    height: '100%',
    flex: 1,
  },
  tabBar: {
    alignItems: 'center',
    height: '100%',
    flex: 1,
  },
  x_mark: {width: 45, height: 45, resizeMode: 'contain'},
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    marginTop: 50,
  },
  backArrowStyle: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 5,
    borderRadius: 1000,
  },
});
