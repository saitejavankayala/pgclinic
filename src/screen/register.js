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
import NetInfo from '@react-native-community/netinfo';
import icons from '../utility/icons';
import Button from '../component/button';
import colorConstant from '../utility/colorConstant';
import Toast from 'react-native-simple-toast';

export default class loginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      phone: '',
      password: '',
      retype_password: '',
      hidePass: true,
      hideRemember: false,
      emailError: '',
      passwordError: '',
      viewOne: true,
      searchText: '',
      data: [],
      isLoading: false,
    };
  }
  validate = (variable, text) => {
    if (text === '') {
      return `please enter the ${variable}`;
    }
    if (variable === 'Name') {
      if (text.length < 1) {
        return `${variable} enter value`;
      }
    } else if (variable === strings.Email) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (text.length < 1) {
        return `${variable} enter value`;
      } else if (reg.test(text) === false) {
        return `${variable} is Not Correct`;
      }
    } else if (variable === strings.Password) {
      if (text.length < 1) {
        return `${variable} enter value`;
      } else if (text !== this.state.retype_password) {
        return 'Password doesnot match';
      }
    } else if (variable === 'Phone') {
      if (text.length !== 10) {
        return 'Please enter ten digits phone number only';
      }
    }
  };
  hitLoginApi = () => {
    const {email, password, username, phone} = this.state;
    const {
      navigation: {navigate},
    } = this.props;
    const validateError =
      this.validate('Name', username.trim()) ||
      this.validate(strings.Email, email.trim()) ||
      this.validate('Phone', phone.trim()) ||
      this.validate(strings.Password, password.trim());
    if (validateError) {
      Toast.show(validateError);
    } else {
      var data = JSON.stringify({
        data: {
          name: username.trim(),
          email: email.trim(),
          phone: phone.trim(),
          pass: password.trim(),
          cpass: password.trim(),
        },
      });

      var config = {
        method: 'post',
        url: 'https://teradoctorapp.herokuapp.com/auth/register',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };
      console.log(config);
      this.setState({isLoading: true});
      new Promise((resolve, reject) => {
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            axios(config)
              .then(response => {
                this.setState({data: response.data});
                this.setState({isLoading: false});
                resolve(response.data);
                console.log(response);
                if (response.data.success) {
                  Toast.showWithGravity(
                    response.data.msg,
                    Toast.LONG,
                    Toast.TOP,
                  );
                  navigate('Login');
                } else {
                  // console.log(response);
                  Toast.showWithGravity(
                    response.data.error,
                    Toast.LONG,
                    Toast.TOP,
                  );
                }
                console.log(this.state.data.access_token);
              })
              .catch(error => {
                reject(error);
                this.setState({isLoading: false});
                console.log(error.Error);
                Alert.alert('message:', 'Bad credentails');
                throw error;
              });
          } else {
            this.setState({isLoading: false});
            Alert.alert('message', 'Please try again!');
          }
        });
      });
    }
  };
  render() {
    const {
      navigation: {navigate},
    } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={icons.DOCTOR}
          style={{
            width: '100%',
            height: '25%',
            resizeMode: 'contain',
            marginTop: '10%',
          }}
        />
        <ScrollView>
          <View style={styles.textInputContianer}>
            <Icon
              name={'user'}
              style={{marginLeft: 50}}
              size={25}
              color={colors.GRAY}
            />
            <TextInput
              value={this.state.username}
              onChangeText={username => this.setState({username: username})}
              placeholder={strings.Username}
              placeholderTextColor={colors.GRAY}
              style={styles.inputStyle}
            />
          </View>
          <View style={[styles.textInputContianer, {marginTop: 20}]}>
            <EmailIcon
              name={'email-outline'}
              style={{marginLeft: 50}}
              size={25}
              color={colors.GRAY}
            />
            <TextInput
              value={this.state.email}
              onChangeText={username => this.setState({email: username})}
              placeholder={strings.Email}
              placeholderTextColor={colors.GRAY}
              style={styles.inputStyle}
              keyboardType="email-address"
            />
          </View>
          <View style={[styles.textInputContianer, {marginTop: 20}]}>
            <Icon
              name={'phone'}
              style={{marginLeft: 50}}
              size={25}
              color={colors.GRAY}
            />
            <TextInput
              value={this.state.phone}
              onChangeText={username => this.setState({phone: username})}
              placeholder={strings.Phone}
              placeholderTextColor={colors.GRAY}
              style={styles.inputStyle}
              keyboardType="number-pad"
            />
          </View>
          <View style={[styles.textInputContianer, {marginTop: 20}]}>
            <PasswordIcon
              name={'key'}
              style={{marginLeft: 50}}
              size={25}
              color={colors.GRAY}
            />
            <TextInput
              value={this.state.password}
              onChangeText={username => this.setState({password: username})}
              placeholder={strings.Password}
              placeholderTextColor={colors.GRAY}
              style={styles.inputStyle}
              secureTextEntry={true}
            />
          </View>
          <View style={[styles.textInputContianer, {marginTop: 20}]}>
            <PasswordIcon
              name={'key'}
              style={{marginLeft: 50}}
              size={25}
              color={colors.GRAY}
            />
            <TextInput
              value={this.state.retype_password}
              onChangeText={username =>
                this.setState({retype_password: username})
              }
              placeholder={strings.Confirm_Password}
              placeholderTextColor={colors.GRAY}
              style={styles.inputStyle}
              secureTextEntry={true}
            />
          </View>
          <View style={{paddingLeft: 10, paddingVertical: 10}}>
            <Button
              buttonText="SIGN UP"
              handleSubmit={() => this.hitLoginApi()}
            />
          </View>
          <View
            style={{
              marginTop: -10,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text style={{color: colorConstant.BLACK, fontSize: 18}}>
              Do you have account?
            </Text>
            <TouchableOpacity onPress={() => navigate('Login')}>
              <Text
                style={{
                  color: colorConstant.blue,
                  fontSize: 18,
                  marginHorizontal: 5,
                }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
