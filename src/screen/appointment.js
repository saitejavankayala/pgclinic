/* eslint-disable no-lone-blocks */
/* eslint-disable no-new */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TextInput,
  Text,
  View,
  Alert,
  TouchableOpacity,
  AsyncStorage,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import styles from './style';
import _ from 'lodash';
import strings from '../utility/string';
import colors from '../utility/color';
import Icon from 'react-native-vector-icons/Feather';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PasswordIcon from 'react-native-vector-icons/Octicons';
import axios from 'react-native-axios';
import constant from '../utility/constant';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NetInfo from '@react-native-community/netinfo';
import icons from '../utility/icons';
import Button from '../component/button';
import colorConstant from '../utility/colorConstant';
import Dialog, {DialogContent, ScaleAnimation} from 'react-native-popup-dialog';
import string from '../utility/string';
import color from '../utility/color';
import style from './style';
import Spinner from '../component/spinner';
import {TabBar, TabView} from 'react-native-tab-view';
import TodayAppointmentScreen from './todayappointment';
import AllAppointmentScreen from './allappointment';

export default class AppointmentScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      hidePass: true,
      hideRemember: false,
      emailError: '',
      passwordError: '',
      viewOne: true,
      searchText: '',
      data: [],
      isLoading: false,
      allAppointments: [],
      selectedResources: [],
      addAppointmentStatus: false,
      userRole: '',
      index: 0,
      routes: [
        {key: 'today', title: 'today'},
        {key: 'all', title: 'all'},
      ],
    };
  }

  renderScene = ({route}) => {
    switch (route.key) {
      case 'today':
        return (
          <TodayAppointmentScreen showAlert={this.showAlert} {...this.props} />
        );
      case 'all':
        return (
          <AllAppointmentScreen showAlert={this.showAlert} {...this.props} />
        );
      default:
        return null;
    }
  };
  renderTabBar = props => (
    <TabBar
      getLabelText={screen => screen.route.title}
      style={styles.topTabStyle}
      labelStyle={styles.touchableLabelStyle}
      activeColor={color.TEXT_SECONDARY}
      inactiveColor={color.BLACK}
      indicatorStyle={{backgroundColor: color.TEXT_SECONDARY}}
      {...props}
    />
  );
  render() {
    const {
      navigation: {navigate},
    } = this.props;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <TabView
          navigationState={this.state}
          renderScene={this.renderScene}
          onIndexChange={index => this.setState({index})}
          renderTabBar={this.renderTabBar}
        />
        <Spinner value={this.state.isLoading} />
      </SafeAreaView>
    );
  }
}
