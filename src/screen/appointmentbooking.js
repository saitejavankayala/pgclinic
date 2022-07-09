/* eslint-disable no-new */
/* eslint-disable no-sparse-arrays */
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
  DatePickerAndroid,
} from 'react-native';
import styles from './style';
import _ from 'lodash';
import strings from '../utility/string';
import colors from '../utility/color';
import Icon from 'react-native-vector-icons/Feather';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PasswordIcon from 'react-native-vector-icons/Octicons';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'react-native-axios';
import constant from '../utility/constant';
import NetInfo from '@react-native-community/netinfo';
import icons from '../utility/icons';
import Button from '../component/button';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colorConstant from '../utility/colorConstant';
import Toast from 'react-native-simple-toast';
import Spinner from '../component/spinner';
import {Modal} from 'react-native-paper';

export default class AppointmentBookingScreen extends React.Component {
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
      date: new Date(),
      mode: 'date',
      show: false,
      slotDropDownSelected: 0,
      typeDropDownSelected: 0,
      locationDropDownSelected: 0,
      slotError: undefined,
      selected_slot: '',
      AppointmentType: '',
      location: '',
      pname: '',
      phone: '',
      addAppointmentStatus: false,
      description: '',
    };
  }
  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: false,
      date,
    });
  };

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  };

  datepicker = () => {
    this.show('date');
  };

  timepicker = () => {
    this.show('time');
  };

  validate = (variable, text) => {
    if (text === '') {
      return `please enter the ${variable}`;
    }
    if (variable === 'Phone') {
      if (text.length != 10) {
        return `${variable} enter 10 digits only`;
      }
    }
    if (
      variable === 'Name' ||
      variable === 'Type' ||
      variable === 'Phone' ||
      variable === 'Slot' ||
      variable === 'Type' ||
      variable === 'Location'
    ) {
      if (text.length < 1) {
        return `${variable} enter value`;
      }
    } else if (variable == strings.Password) {
      if (text.length < 1) {
        return `${variable} enter value`;
      }
    }
  };
  addDescription = () => {
    const {
      navigation: {navigate},
    } = this.props;

    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#F4F4F4',
            marginHorizontal: 20,
            height: 250,
          }}>
          <ScrollView>
            <Text
              style={{
                color: 'black',
                fontSize: 24,
                paddingHorizontal: 20,
                marginTop: 10,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
              numberOfLines={4}>
              {this.state.description}
            </Text>
            <View style={{paddingLeft: 10}}>
              <Button
                buttonText="VIEW APPOINTMENTS"
                handleSubmit={() => navigate('Appointment')}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                paddingHorizontal: 20,
                marginBottom: 5,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
              numberOfLines={4}>
              Please visit your doctor, {this.props.route.params.doctorName} on
              time.
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  };
  hitAppointmentApi = () => {
    const {pname, phone, date, selected_slot, AppointmentType, location} =
      this.state;
    const {
      navigation: {navigate},
    } = this.props;
    console.log(date.toISOString().split('T')[0]);
    const validateError =
      this.validate('Name', pname.trim()) ||
      this.validate('Phone', phone.trim()) ||
      this.validate('Slot', selected_slot.trim()) ||
      this.validate('Type', AppointmentType.trim()) ||
      this.validate('Location', location.trim());
    if (validateError) {
      Toast.show(validateError);
    } else {
      var data = JSON.stringify({
        data: {
          pname: pname.trim(),
          phone: phone.trim(),
          date: date.toISOString().split('T')[0],
          slot: selected_slot.trim(),
          AppointmentType: AppointmentType.trim(),
          location: location.trim(),
        },
        id: this.props.route.params.doctorId,
      });

      this.setState({isLoading: true});
      new Promise((resolve, reject) => {
        AsyncStorage.getItem(constant.REMEMBER_ME).then(authUser => {
          NetInfo.fetch().then(state => {
            if (state.isConnected) {
              const authUserData = JSON.parse(authUser);
              var config = {
                method: 'post',
                url: 'https://teradoctorapp.herokuapp.com/user/bookAppointment',
                headers: {
                  Authorization: `Bearer ${authUserData.token}`,
                  'Content-Type': 'application/json',
                },
                data: data,
              };
              axios(config)
                .then(response => {
                  this.setState({data: response.data});
                  this.setState({isLoading: false});
                  resolve(response.data);
                  console.log(response);
                  if (response.data.success) {
                    //navigate('Appointment');
                    this.setState({
                      addAppointmentStatus: true,
                      description: response.data.msg,
                    });
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
      });
    }
  };
  validateSlot = () => {
    const {selected_slot} = this.state;
    if (selected_slot === 'Select a Slot') {
      this.setState({
        slotError: 'Please Select a Slot',
      });
      return false;
    } else {
      this.setState({slotError: undefined});
      return true;
    }
  };
  render() {
    const {pname, phone, selected_slot, AppointmentType, location} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={icons.BOOKING}
          style={{
            width: '100%',
            height: '25%',
            resizeMode: 'contain',
            marginTop: '10%',
          }}
        />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          alwaysBounceVertical={false}
          contentContainerStyle={{flexGrow: 1}}>
          <ScrollView>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                paddingHorizontal: 40,
                marginTop: 10,
                marginBottom: 5,
              }}>
              Name
            </Text>
            <View style={styles.textInputContianer}>
              <TextInput
                value={this.state.pname}
                onChangeText={username => this.setState({pname: username})}
                placeholder="Name"
                placeholderTextColor={colors.GRAY}
                style={styles.inputStyle}
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                paddingHorizontal: 40,
                marginTop: 10,
                marginBottom: 5,
              }}>
              Your Phone
            </Text>
            <View style={styles.textInputContianer}>
              <TextInput
                value={this.state.phone}
                onChangeText={phones => this.setState({phone: phones})}
                placeholder={strings.Phone}
                placeholderTextColor={colors.GRAY}
                style={styles.inputStyle}
                keyboardType="number-pad"
              />
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                paddingHorizontal: 40,
                marginTop: 10,
                marginBottom: 5,
              }}>
              Select a appointment date
            </Text>
            <TouchableOpacity
              onPress={this.datepicker}
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                borderWidth: 0.5,
                borderColor: '#000',
                height: 50,
                borderRadius: 10,
                marginLeft: 30,
                marginRight: 30,
                padding: 10,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  paddingHorizontal: 10,
                }}>
                {this.state.date.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {this.state.show && (
              <DateTimePicker
                value={this.state.date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={this.setDate}
                style={{backgroundColor: 'white'}}
                minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
              />
            )}
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                paddingHorizontal: 40,
                marginTop: 10,
                marginBottom: 5,
              }}>
              Select a slot
            </Text>
            <View style={{marginHorizontal: 30}}>
              <View
                style={{
                  height: this.state.slotDropDownSelected === 1 ? 120 : 50,
                }}>
                {this.state.selected_slot !== undefined && (
                  <DropDownPicker
                    items={[
                      {
                        label: 'Morning',
                        value: 'morning',
                      },
                      {
                        label: 'Evening',
                        value: 'evening',
                      },
                    ]}
                    placeholder="Select a Slot"
                    containerStyle={{height: 40}}
                    style={{backgroundColor: colorConstant.THEME_PRIMARY}}
                    labelStyle={{color: '#555555'}}
                    arrowColor={colorConstant.TEXT_SECONDARY}
                    itemStyle={{
                      justifyContent: 'flex-start',
                      marginStart: 5,
                    }}
                    dropDownStyle={{
                      backgroundColor: colorConstant.THEME_PRIMARY,
                    }}
                    onChangeItem={item =>
                      this.setState(
                        {selected_slot: item.value},
                        this.validateSlot,
                      )
                    }
                    dropDownMaxHeight={
                      this.state.slotDropDownSelected === 1 ? 90 : 48
                    }
                    onOpen={() => {
                      this.setState({slotDropDownSelected: 1});
                    }}
                    onClose={() => {
                      this.setState({slotDropDownSelected: 0});
                    }}
                  />
                )}
              </View>
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                paddingHorizontal: 40,
                marginTop: 10,
                marginBottom: 5,
              }}>
              Select a appointment type
            </Text>
            <View style={{marginHorizontal: 30}}>
              <View
                style={{
                  height: this.state.typeDropDownSelected === 1 ? 150 : 50,
                }}>
                {this.state.AppointmentType !== undefined && (
                  <DropDownPicker
                    items={[
                      {
                        label: 'Normal',
                        value: 'normal',
                      },
                      {
                        label: 'Vaccination',
                        value: 'vaccination',
                      },
                      {
                        label: 'Emergency',
                        value: 'emergency',
                      },
                    ]}
                    placeholder="Select a Type"
                    containerStyle={{height: 40}}
                    style={{backgroundColor: colorConstant.THEME_PRIMARY}}
                    labelStyle={{color: '#555555'}}
                    arrowColor={colorConstant.TEXT_SECONDARY}
                    itemStyle={{
                      justifyContent: 'flex-start',
                      marginStart: 5,
                    }}
                    dropDownStyle={{
                      backgroundColor: colorConstant.THEME_PRIMARY,
                    }}
                    onChangeItem={item =>
                      this.setState(
                        {AppointmentType: item.value},
                        this.validateSlot,
                      )
                    }
                    dropDownMaxHeight={
                      this.state.typeDropDownSelected === 1 ? 150 : 48
                    }
                    onOpen={() => {
                      this.setState({typeDropDownSelected: 1});
                    }}
                    onClose={() => {
                      this.setState({typeDropDownSelected: 0});
                    }}
                  />
                )}
              </View>
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                paddingHorizontal: 40,
                marginTop: 10,
                marginBottom: 5,
              }}>
              Location
            </Text>
            <View style={{marginHorizontal: 30}}>
              <View
                style={{
                  height: this.state.locationDropDownSelected === 1 ? 100 : 50,
                }}>
                <DropDownPicker
                  items={[
                    {
                      label: 'kamarajar nagar',
                      value: 'kamarajar nagar',
                    },
                    {
                      label: 'paruthipet',
                      value: 'paruthipet',
                    },
                  ]}
                  placeholder="Select a Location"
                  containerStyle={{height: 40}}
                  style={{backgroundColor: colorConstant.THEME_PRIMARY}}
                  labelStyle={{color: '#555555'}}
                  arrowColor={colorConstant.TEXT_SECONDARY}
                  itemStyle={{
                    justifyContent: 'flex-start',
                    marginStart: 5,
                  }}
                  dropDownStyle={{
                    backgroundColor: colorConstant.THEME_PRIMARY,
                  }}
                  onChangeItem={item =>
                    this.setState({location: item.value}, this.validateSlot)
                  }
                  dropDownMaxHeight={
                    this.state.locationDropDownSelected === 1 ? 150 : 48
                  }
                  onOpen={() => {
                    this.setState({locationDropDownSelected: 1});
                  }}
                  onClose={() => {
                    this.setState({locationDropDownSelected: 0});
                  }}
                />
              </View>
            </View>
            {this.state.slotError && (
              <Text style={styles.errorText}>{this.state.slotError}</Text>
            )}
            <View style={{paddingLeft: 10, paddingVertical: 10}}>
              <Button
                buttonText="BOOK NOW"
                handleSubmit={() => this.hitAppointmentApi()}
              />
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
        <Modal visible={this.state.addAppointmentStatus}>
          <View>{this.addDescription()}</View>
        </Modal>
        <Spinner value={this.state.isLoading} />
      </SafeAreaView>
    );
  }
}
