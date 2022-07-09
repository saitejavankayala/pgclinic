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
} from 'react-native';
import styles from './style';
import _ from 'lodash';
import PasswordIcon from 'react-native-vector-icons/Octicons';
import strings from '../utility/string';
import colors from '../utility/color';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'react-native-axios';
import constant from '../utility/constant';
import NetInfo from '@react-native-community/netinfo';
import icons from '../utility/icons';
import Button from '../component/button';
import colorConstant from '../utility/colorConstant';
import Toast from 'react-native-simple-toast';
import Spinner from '../component/spinner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
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
    if (variable === strings.Email) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (text.length < 1) {
        return `${variable} enter value`;
      } else if (reg.test(text) === false) {
        return `${variable} is Not Correct`;
      }
    } else if (variable === strings.Password) {
      if (text.length < 1) {
        return `${variable} enter value`;
      }
    }
  };
  showAlert = msg => {
    this.setState({visible: true, message: msg});
  };
  hitLoginApi = () => {
    const {email, password} = this.state;
    const {
      navigation: {navigate},
    } = this.props;
    const validateError =
      this.validate(strings.Email, email.trim()) ||
      this.validate(strings.Password, password.trim());
    if (validateError) {
      Toast.show(validateError);
    } else {
      var raw = JSON.stringify({
        email: email.trim(),
        pass: password.trim(),
      });

      var requestOptions = {
        method: 'post',
        url: 'https://teradoctorapp.herokuapp.com/auth/login',
        headers: {
          'Content-Type': 'application/json',
        },
        data: raw,
      };
      this.setState({isLoading: true});
      new Promise((resolve, reject) => {
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            axios(requestOptions)
              .then(response => {
                this.setState({data: response.data});
                this.setState({isLoading: false});
                resolve(response.data);
                console.log(response);
                if (response.data.success) {
                  AsyncStorage.setItem(
                    constant.REMEMBER_ME,
                    JSON.stringify({
                      userEmail: email.trim(),
                      userPassword: password.trim(),
                      token: response.data.token,
                      role: response.data.role,
                    }),
                  );
                  this.setState({email: '', password: ''});
                  navigate('Home1');
                } else {
                  // console.log(response);
                  Alert.alert('message', response.data.msg);
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
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          alwaysBounceVertical={false}
          contentContainerStyle={{flexGrow: 1}}>
          <Image
            source={icons.DOCTOR}
            style={{
              width: '100%',
              height: '40%',
              resizeMode: 'contain',
              marginTop: '20%',
            }}
          />
          <View style={styles.textInputContianer}>
            <EmailIcon
              name={'email-outline'}
              style={{marginLeft: 50}}
              size={25}
              color={colors.GRAY}
            />
            <TextInput
              value={this.state.email}
              onChangeText={email => this.setState({email: email})}
              placeholder={strings.Email}
              placeholderTextColor={colors.GRAY}
              style={styles.inputStyle}
              keyboardType="email-address"
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
              autoCorrect={false}
              spellCheck={false}
              secureTextEntry={true}
            />
          </View>
          <View style={{paddingLeft: 10, paddingVertical: 10}}>
            <Button
              buttonText="LOG IN"
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
              You don't have account?
            </Text>
            <TouchableOpacity onPress={() => navigate('Register')}>
              <Text
                style={{
                  color: colorConstant.blue,
                  fontSize: 18,
                  marginHorizontal: 5,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        <Spinner value={this.state.isLoading} />
      </SafeAreaView>
    );
  }
}
