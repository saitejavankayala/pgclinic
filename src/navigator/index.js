import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from './style';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from '../screen/login';
import RegisterScreen from '../screen/register';
import DashBoardScreen from '../screen/dashboard';
import AppointmentScreen from '../screen/appointment';
import AppointmentBookingScreen from '../screen/appointmentbooking';
import {Image} from 'react-native';
import colors from '../utility/color';
import icons from '../utility/icons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CalendarScreen from '../screen/drawerScreen/calendarScreen';
import {DrawerContent} from './drawerContent';
import {DrawerActions} from '@react-navigation/native';
import MorningAppointmentScreen from '../screen/morningappointment';
import EveningAppointmentScreen from '../screen/eveningappointment';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerWidth: 100,
      }}>
      <Drawer.Screen name="Home" component={TabStackNavigator} />
      <Drawer.Screen name="Appointment" component={AppointmentScreen} />
      <Drawer.Screen name="MyAccount" component={CalendarScreen} />
    </Drawer.Navigator>
  );
};

const TabStackNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          let iconName;

          if (route.name === 'Home') {
            iconName = icons.TAB_DASHBOARD;
            return <Image source={iconName} style={styles.imageContainer} />;
          } else if (route.name === 'Appointment') {
            iconName = icons.TAB_LEARNING;
            return <Image source={iconName} style={{width: 30, height: 30}} />;
          }
        },
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.GRAY,
        style: styles.tabBar,
        tabBarStyle: {
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          paddingBottom: 5,
          paddingTop: 2,
        },
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen name="Appointment" component={AppointmentScreen} />
    </Tab.Navigator>
  );
};
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="AppointmentBooking"
        component={AppointmentBookingScreen}
      />
      <Stack.Screen
        name="MorningAppointmentBooking"
        component={MorningAppointmentScreen}
      />
      <Stack.Screen
        name="EveningAppointmentBooking"
        component={EveningAppointmentScreen}
      />
      <Stack.Screen name="Dashboard" component={DashBoardScreen} />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home1" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export {MainStackNavigator};

/**
 * {
            AsyncStorage.getItem('profile', (_err, result) => {
              const results = JSON.parse(result);

              if (results !== null) {
                console.log('profile_image', results);
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.dispatch(DrawerActions.openDrawer())
                    }>
                    <Image
                      source={{
                        uri: `${constant.PROFILE_URL}${results.profile_image}`,
                      }}
                    />
                  </TouchableOpacity>
                );
              } else {
                console.log('something went wrong');
              }
            });
          },


 */
/**
const AppNavigator=createSwitch=>{

}

const MainNavigator=()=>{
return(

)
}
*/
