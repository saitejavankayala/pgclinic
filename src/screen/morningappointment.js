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
  ToastAndroid,
} from 'react-native';
import styles from './style';
import _ from 'lodash';
import {TabView, TabBar} from 'react-native-tab-view';

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
import DateTimePicker from '@react-native-community/datetimepicker';
import colorConstant from '../utility/colorConstant';
import Dialog, {DialogContent, ScaleAnimation} from 'react-native-popup-dialog';
import string from '../utility/string';
import color from '../utility/color';
import style from './style';
import Spinner from '../component/spinner';
import moment from 'moment';
import {Modal} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

export default class MorningAppointmentScreen extends React.Component {
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
      updateItem: '',
      pname: '',
      phone: '',
      AppointmentType: '',
      itemId: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem(constant.REMEMBER_ME).then(authUser => {
      const authUserData = JSON.parse(authUser);
      this.setState({userRole: authUserData.role});
    });
    this.fetchGetAllAppointments();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.fetchGetAllAppointments();
    });
  }

  fetchGetAllAppointments = () => {
    this.setState({isLoading: true});
    new Promise((resolve, reject) => {
      AsyncStorage.getItem(constant.REMEMBER_ME).then(authUser => {
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            const authUserData = JSON.parse(authUser);

            var config = {
              method: 'post',
              url: 'https://teradoctorapp.herokuapp.com/doctor/getTodayAppointments',
              headers: {
                Authorization: `Bearer ${authUserData.token}`,
                'Content-Type': 'application/json',
              },
              data: JSON.stringify({
                slot: 'morning',
              }),
            };

            axios(config)
              .then(response => {
                this.setState({data: response.data});
                this.setState({isLoading: false});
                resolve(response.data);
                console.log(response.data.data);
                if (response.data.success) {
                  let allAppointments = [];
                  response.data.data.map((item, index) => {
                    allAppointments.push(item);
                  });
                  this.setState({allAppointments: allAppointments});
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
                //Alert.alert('message:', 'Bad credentails');
                throw error;
              });
          } else {
            this.setState({isLoading: false});
            Alert.alert('message', 'Please try again!');
          }
        });
      });
    });
  };
  AcceptRejectAllAppointment = (item, status) => {
    this.setState({isLoading: true});
    const {allAppointments} = this.state;
    let values = [];
    {
      allAppointments.map((itemValue, index) => {
        if (item.id == itemValue.id) {
          values.push(item.pemail);
        } else {
          values.push(null);
        }
      });
    }
    var data = JSON.stringify({
      ids: [item.id],
      emails: values,
      op: status,
    });
    console.log(data, data);
    new Promise((resolve, reject) => {
      AsyncStorage.getItem(constant.REMEMBER_ME).then(authUser => {
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            const authUserData = JSON.parse(authUser);
            var config = {
              method: 'post',
              url: 'https://teradoctorapp.herokuapp.com/admin/operation',
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
                  this.fetchGetAllAppointments();
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
                //Alert.alert('message:', 'Bad credentails');
                throw error;
              });
          } else {
            this.setState({isLoading: false});
            Alert.alert('message', 'Please try again!');
          }
        });
      });
    });
  };
  renderMultiSelectOption = (items, index) => {
    const {isAllSelected, selectedResources} = this.state;

    if (isAllSelected) {
      this.setState({isAllSelected: false});
    }
    if (!selectedResources.includes(items.id)) {
      selectedResources.push(items.id);
      this.setState({selectedResources: selectedResources});
    } else {
      let selectedResource = selectedResources.filter(
        item => item !== items.id,
      );
      this.setState({selectedResources: selectedResource});
    }
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
      ToastAndroid.show(validateError);
    } else {
      var data = JSON.stringify({
        data: {
          pname: pname.trim(),
          phone: phone.trim(),
          date: date.toISOString().split('T')[0],
          slot: selected_slot.trim(),
          AppointmentType: AppointmentType.trim(),
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
                    navigate('Appointment');
                  } else {
                    // console.log(response);
                    Alert.alert('message', response.data);
                  }
                  console.log(this.state.data.access_token);
                })
                .catch(error => {
                  reject(error);
                  this.setState({isLoading: false});
                  console.log(error.Error);
                  //Alert.alert('message:', 'Bad credentails');
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
  addDescription = () => {
    const {updateItem} = this.state;
    console.log('we', this.state.addAppointmentStatus, this.state.itemId);
    let apppointmentList = [
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
    ];
    let appointmentListData = [];
    apppointmentList.map((item, index) => {
      if (item.value !== this.state.AppointmentType) {
        appointmentListData.push(item);
      }
    });
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#F4F4F4',
            marginHorizontal: 20,
            height: 450,
          }}>
          <ScrollView>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  addAppointmentStatus: false,
                })
              }>
              <Image
                source={icons.CLOSE_ICON}
                style={{
                  height: 40,
                  width: 40,
                  alignSelf: 'flex-end',
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: 'black',
                fontSize: 24,
                paddingHorizontal: 40,
                marginTop: 10,
                marginBottom: 5,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              UPDATE APPOINTMENT
            </Text>
            {/* <Text
              style={{
                color: 'black',
                fontSize: 18,
                paddingHorizontal: 40,
                marginTop: 10,
                marginBottom: 5,
              }}>
              ID
            </Text>
            <View style={styles.textInputContianer}>
              <TextInput
                value={this.state.itemId}
                selectTextOnFocus={false}
                placeholderTextColor={colors.GRAY}
                style={styles.inputStyle}
                editable={false}
              />
            </View> */}
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
              }}>
              Select a appointment type
            </Text>
            <View style={{marginHorizontal: 30}}>
              <View
                style={{
                  height: this.state.typeDropDownSelected === 1 ? 100 : 40,
                }}>
                {this.state.AppointmentType !== undefined && (
                  <DropDownPicker
                    items={appointmentListData}
                    placeholder={this.state.AppointmentType}
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
                      this.state.typeDropDownSelected === 1 ? 100 : 38
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
            <View style={{paddingLeft: 10, paddingVertical: 5}}>
              <Button
                buttonText="UPDATE DETIALS"
                handleSubmit={() => this.hitAppointmentApi()}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };
  addActivityBtnPopup = () => {
    const {navigation, selectedResources, activity} = this.props;
    console.log('selected', this.state.selectedResources);
    return (
      <TouchableOpacity
        onPress={() => this.setState({addAppointmentStatus: true})}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            marginTop: 5,
            marginBottom: 5,
          }}>
          <Text
            style={[
              styles.cancelBtnTextStyle,
              {textAlign: 'center', alignSelf: 'center'},
            ]}>
            AppointmentStatus
          </Text>
          <Image
            style={{
              width: 45,
              height: 45,
              marginLeft: 7.5,
              resizeMode: 'contain',
            }}
            source={icons.ADD_BUTTON}
          />
        </View>
      </TouchableOpacity>
    );
  };
  editToken = () => {
    const {updateItem} = this.state;
    console.log('token', this.state.itemId);
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#F4F4F4',
            marginHorizontal: 20,
            height: 280,
          }}>
          <ScrollView>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  editTokenStatus: false,
                })
              }>
              <Image
                source={icons.CLOSE_ICON}
                style={{
                  height: 40,
                  width: 40,
                  alignSelf: 'flex-end',
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: 'black',
                fontSize: 24,
                paddingHorizontal: 40,
                marginTop: 10,
                marginBottom: 5,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              UPDATE TOKEN
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                paddingHorizontal: 40,
                marginTop: 10,
                marginBottom: 5,
              }}>
              TOKEN
            </Text>
            <View style={styles.textInputContianer}>
              <TextInput
                value={this.state.token}
                onChangeText={username => this.setState({token: username})}
                placeholder="TOKEN"
                placeholderTextColor={colors.GRAY}
                style={styles.inputStyle}
              />
            </View>
            <View style={{paddingLeft: 10, paddingVertical: 5}}>
              <Button
                buttonText="UPDATE TOKEN"
                handleSubmit={() => this.hitEditTokenApi()}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };
  hitEditTokenApi = () => {
    const {
      pname,
      phone,
      date,
      selected_slot,
      AppointmentType,
      location,
      itemId,
      email,
      slot,
      appointmentDate,
      token,
      itemDetials,
    } = this.state;
    const {
      navigation: {navigate},
    } = this.props;
    var data = JSON.stringify({
      id: itemDetials.id,
      pemail: itemDetials.pemail,
      token: token,
      slot: itemDetials.slot,
      appDate: itemDetials.appointmentDate,
    });

    this.setState({isLoading: true});
    new Promise((resolve, reject) => {
      AsyncStorage.getItem(constant.REMEMBER_ME).then(authUser => {
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            const authUserData = JSON.parse(authUser);
            var config = {
              method: 'PATCH',
              url: 'https://teradoctorapp.herokuapp.com/doctor/editToken',
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
                  this.fetchGetAllAppointments();
                  this.setState({editTokenStatus: false});
                } else {
                  // console.log(response);
                  Alert.alert('message', response.data);
                }
                console.log(this.state.data.access_token);
              })
              .catch(error => {
                reject(error);
                this.setState({isLoading: false});
                console.log(error.Error);
                //Alert.alert('message:', 'Bad credentails');
                throw error;
              });
          } else {
            this.setState({isLoading: false});
            Alert.alert('message', 'Please try again!');
          }
        });
      });
    });
  };
  render() {
    const {
      navigation: {navigate},
    } = this.props;
    const {allAppointments} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          alwaysBounceVertical={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.nameContainer}>
            <Text style={styles.navTextStyle}>MORNING APPOINTMENT LIST</Text>
          </View>
          {allAppointments.length > 0 &&
            allAppointments.map((item, index) => {
              return (
                <View
                  style={[
                    styles.cardContainer1,
                    {
                      height: this.state.userRole === 'admin' ? 230 : 290,
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        itemId: item.id,
                        token: item.token,
                        addAppointmentStatus:
                          this.state.userRole === 'user' ? true : false,
                        editTokenStatus:
                          this.state.userRole === 'admin' ||
                          this.state.userRole === 'doctor'
                            ? true
                            : false,
                        pname: item.pname,
                        phone: item.phone,
                        email: item.pemail,
                        slot: item.slot,
                        appointmentDate: item.appointmentDate,
                        AppointmentType: item.appointmentType,
                        itemDetials: item,
                      })
                    }>
                    <Image
                      source={icons.EDIT_ICON}
                      style={{
                        height: 40,
                        width: 40,
                        alignSelf: 'flex-end',
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingLeft: '10%',
                      paddingRight: '10%',
                    }}>
                    <View>
                      <Text style={styles.appointmentTextStyle}>TOKEN_NO</Text>
                      <Text style={styles.appointmentTextStyle}>NAME</Text>
                      <Text style={styles.appointmentTextStyle}>TYPE</Text>
                      {this.state.userRole !== 'admin' && (
                        <View>
                          <Text style={styles.appointmentTextStyle}>
                            CONTACT_NO
                          </Text>
                          <Text style={styles.appointmentTextStyle}>SLOT</Text>
                          <Text style={styles.appointmentTextStyle}>
                            APPOINTMENT_DATE
                          </Text>
                          <Text style={styles.appointmentTextStyle}>
                            LOCATION
                          </Text>
                        </View>
                      )}
                      <Text style={styles.appointmentTextStyle}>STATUS</Text>
                      {this.state.userRole === 'admin' && (
                        <Button
                          buttonText="REJECT"
                          customStyle={{
                            width: '70%',
                            backgroundColor: 'red',
                          }}
                          handleSubmit={() =>
                            this.AcceptRejectAllAppointment(item, 'reject')
                          }
                        />
                      )}
                    </View>
                    <View>
                      <Text style={styles.appointmentTextStyle}>
                        {item.token}
                      </Text>
                      <Text style={styles.appointmentTextStyle}>
                        {item.pname}
                      </Text>
                      <Text style={styles.appointmentTextStyle}>
                        {item.appointmentType}
                      </Text>
                      {this.state.userRole !== 'admin' ? (
                        <View>
                          <Text style={styles.appointmentTextStyle}>
                            {item.phone}
                          </Text>

                          <Text style={styles.appointmentTextStyle}>
                            {item.slot}
                          </Text>

                          <Text style={styles.appointmentTextStyle}>
                            {item.appointmentDate}
                          </Text>
                          <Text style={styles.appointmentTextStyle}>
                            {item.location}
                          </Text>
                        </View>
                      ) : (
                        <View />
                      )}
                      <Text
                        style={[
                          styles.appointmentTextStyle,
                          {
                            color:
                              item.status == '0' || item.status == '-1'
                                ? 'red'
                                : '#006400',
                          },
                        ]}>
                        {item.status == '0'
                          ? 'PENDING'
                          : item.status == '-1'
                          ? 'REJECTED'
                          : 'ACCEPTED'}
                      </Text>
                      {this.state.userRole === 'admin' && (
                        <Button
                          buttonText="ACCEPT"
                          customStyle={{width: '70%'}}
                          handleSubmit={() =>
                            this.AcceptRejectAllAppointment(item, 'approve')
                          }
                        />
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
        </KeyboardAwareScrollView>

        {/* {this.state.selectedResources.length > 0 &&
        !this.state.addAppointmentStatus && (
          <View style={{backgroundColor: '#fff', justifyContent: 'flex-end'}}>
            {this.addActivityBtnPopup()}
          </View>
        )} */}
        <Modal visible={this.state.addAppointmentStatus}>
          <View>{this.addDescription()}</View>
        </Modal>
        <Modal visible={this.state.editTokenStatus}>
          <View>{this.editToken()}</View>
        </Modal>
        <Spinner value={this.state.isLoading} />
      </SafeAreaView>
    );
  }
}
