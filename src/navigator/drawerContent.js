import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import icons from '../utility/icons';
import {Drawer} from 'react-native-paper';
import styles from './style';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerActions} from '@react-navigation/native';
import color1 from '../utility/color';
import constant from '../utility/constant';
import {StackActions, useNavigation} from '@react-navigation/native';

export function DrawerContent(props) {
  const navigation = useNavigation();
  const [profile, setProfile] = useState('');
  const [userRole, setUserRole] = useState('user');
  AsyncStorage.getItem(constant.REMEMBER_ME, (_err, result) => {
    const results = JSON.parse(result);
    //console.log(results);
    setUserRole(results.role);
    if (results !== null) {
      setProfile(results.profile_image);
    }
  });
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{paddingTop: 0}}>
        <View style={styles.drawerContainer}>
          <View>
            <Image
              source={icons.MEN}
              style={styles.drawerProfilemageContainer}
            />
          </View>
          <View style={styles.name}>
            <Text style={{fontSize: 18}}>{userRole}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.dispatch(DrawerActions.closeDrawer())
            }>
            <Image source={icons.x_marker} style={styles.x_mark} />
          </TouchableOpacity>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={() => (
              <Image
                source={icons.MESSAGE}
                style={styles.drawerImageContainer}
              />
            )}
            label="Account"
            onPress={() => {
              props.navigation.navigate('MyAccount');
            }}
          />

          <DrawerItem
            icon={() => (
              <Image
                source={icons.LOGOUT}
                style={styles.drawerImageContainer}
              />
            )}
            labelStyle={{
              color: color1.RED,
            }}
            label="Logout"
            onPress={() => {
              AsyncStorage.removeItem(constant.AUTH_USER)
                .then(props.navigation.closeDrawer())
                .then(() => props.navigation.navigate('Login'));
              //navigation.dispatch(StackActions.popToTop());
              /** 
              const resetNavigator = StackActions.reset({
                index: 0,
                key: null,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'Login',
                  }),
                ],
              });
              props.navigation.dispatch(resetNavigator);
              */
              //
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
}

export default DrawerContent;
