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

import axios from 'react-native-axios';
import constant from '../utility/constant';
import NetInfo from '@react-native-community/netinfo';
import icons from '../utility/icons';
import Button from '../component/button';
import string from '../utility/string';
import color from '../utility/color';
import style from './style';
import Spinner from '../component/spinner';

export default class AllAppointmentScreen extends React.Component {
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
            if (
              authUserData.role === 'admin' ||
              authUserData.role === 'doctor'
            ) {
              var config = {
                method: 'get',
                url: 'https://teradoctorapp.herokuapp.com/admin/getAppointments',
                headers: {
                  Authorization: `Bearer ${authUserData.token}`,
                },
              };
            } else {
              var config = {
                method: 'get',
                url: 'https://teradoctorapp.herokuapp.com/user/getAllMyAppointments',
                headers: {
                  Authorization: `Bearer ${authUserData.token}`,
                },
              };
            }
            axios(config)
              .then(response => {
                this.setState({data: response.data});
                this.setState({isLoading: false});
                resolve(response.data);
                if (response.data.success) {
                  let allAppointments = _.orderBy(response.data.data, 'id', [
                    'desc',
                  ]);
                  this.setState({
                    allAppointments: allAppointments,
                  });
                } else {
                  // console.log(response);
                  // Alert.alert('message', response.data.msg);
                }
              })
              .catch(error => {
                reject(error);
                this.setState({isLoading: false});
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
                  //Alert.alert('message', response.data.msg);
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
  addDescription = () => {
    console.log('we', this.state.addAppointmentStatus);
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'red',
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: color.BLACK,
              fontWeight: 'bold',
              marginHorizontal: 5,
              marginLeft: 20,
            }}>
            {string.add_description}
          </Text>
          <TouchableOpacity
            onPress={() => this.setState({addMyDescription: false})}>
            <Image
              source={icons.CANCELICON}
              style={[styles.cancelIconStyle, {marginLeft: 10}]}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.viewline} />

        <View style={{marginHorizontal: -20}}>
          <View style={{marginHorizontal: 20}}>
            <TextInput
              numberOfLines={10}
              multiline
              placeholder={string.description}
              style={style.descriptionTextInput}
              onChangeText={text => {
                this.setState(
                  {
                    description: text,
                  },
                  this.validateTitle,
                );
              }}
              maxLength={100}
            />
          </View>

          <Button
            buttonText={string.SAVE}
            handleSubmit={() => this.handleDescription()}
            customStyle={{marginTop: 0}}
          />
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
  render() {
    const {
      navigation: {navigate},
    } = this.props;
    const {allAppointments} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView>
          <View style={styles.nameContainer}>
            <Text style={styles.navTextStyle}>APPOINTMENT LIST</Text>
          </View>
          {allAppointments.length > 0 &&
            allAppointments.map((item, index) => {
              return (
                <View style={{flex: 1, flexDirection: 'row'}}>
                  {/* <TouchableOpacity
                    style={{marginVertical: 20, marginHorizontal: 5}}
                    onPress={() => this.renderMultiSelectOption(item, index)}>
                    <Image
                      style={styles.selectItemIconStyle}
                      source={
                        this.state.selectedResources.includes(item.id)
                          ? icons.CHECKBOX_MARKED
                          : icons.CHECKBOX_UNMARKED
                      }
                    />
                  </TouchableOpacity> */}
                  <View
                    style={[
                      styles.cardContainer1,
                      {
                        height: this.state.userRole === 'admin' ? 330 : 250,
                        marginVertical: 20,
                        marginHorizontal: 10,
                      },
                    ]}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text style={styles.appointmentTextStyle}>ID</Text>
                        <Text style={styles.appointmentTextStyle}>NAME</Text>
                        <Text style={styles.appointmentTextStyle}>
                          CONTACT_NO
                        </Text>
                        <Text style={styles.appointmentTextStyle}>TYPE</Text>
                        <Text style={styles.appointmentTextStyle}>SLOT</Text>
                        <Text style={styles.appointmentTextStyle}>
                          TOKEN_NO
                        </Text>
                        <Text style={styles.appointmentTextStyle}>
                          APPOINTMENT_DATE
                        </Text>
                        <Text style={styles.appointmentTextStyle}>
                          LOCATION
                        </Text>
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
                          {item.id}
                        </Text>
                        <Text style={styles.appointmentTextStyle}>
                          {item.pname}
                        </Text>
                        <Text style={styles.appointmentTextStyle}>
                          {item.phone}
                        </Text>
                        <Text style={styles.appointmentTextStyle}>
                          {item.appointmentType}
                        </Text>
                        <Text style={styles.appointmentTextStyle}>
                          {item.slot}
                        </Text>
                        <Text style={styles.appointmentTextStyle}>
                          {item.token}
                        </Text>
                        <Text style={styles.appointmentTextStyle}>
                          {item.appointmentDate}
                        </Text>
                        <Text style={styles.appointmentTextStyle}>
                          {item.location}
                        </Text>
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
                </View>
              );
            })}
          <View style={{height: 65}} />
        </ScrollView>

        {this.state.selectedResources.length > 0 &&
          !this.state.addAppointmentStatus && (
            <View style={{backgroundColor: '#fff', justifyContent: 'flex-end'}}>
              {this.addActivityBtnPopup()}
            </View>
          )}
        <Spinner value={this.state.isLoading} />
      </SafeAreaView>
    );
  }
}
