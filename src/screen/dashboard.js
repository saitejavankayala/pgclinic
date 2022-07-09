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
import Spinner from '../component/spinner';
import PieChart from 'react-native-pie-chart';

export default class DashBoardScreen extends React.Component {
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
      allDoctors: [],
      userEmail: '',
      morningSlot: 0,
      eveningSlot: 0,
      show: false,
      userRole: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem(constant.REMEMBER_ME).then(authUser => {
      const authUserData = JSON.parse(authUser);
      this.setState({
        userEmail: authUserData.userEmail,
        userRole: authUserData.role,
      });

      if (authUserData.role === 'admin' || authUserData.role === 'doctor') {
        this.fetchMorningSlots();
        this.fetchEveningSlots();
      } else {
        this.fetchGetAllDoctors();
      }
    });
  }
  fetchMorningSlots = () => {
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
                console.log('morningSlot', response.data.data.length);
                if (response.data.success) {
                  this.setState({morningSlot: response.data.data.length});
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
  };
  fetchEveningSlots = () => {
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
                slot: 'evening',
              }),
            };

            axios(config)
              .then(response => {
                this.setState({data: response.data});
                this.setState({isLoading: false});
                resolve(response.data);
                console.log(response.data.data);
                if (response.data.success) {
                  this.setState({eveningSlot: response.data.data.length});
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
  };
  fetchGetAllDoctors = () => {
    this.setState({isLoading: true});
    new Promise((resolve, reject) => {
      AsyncStorage.getItem(constant.REMEMBER_ME).then(authUser => {
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            const authUserData = JSON.parse(authUser);

            var config = {
              method: 'get',
              url: 'https://teradoctorapp.herokuapp.com/user/getDoctors',
              headers: {
                Authorization: `Bearer ${authUserData.token}`,
              },
            };
            axios(config)
              .then(response => {
                this.setState({data: response.data});
                this.setState({isLoading: false});
                resolve(response.data);
                console.log(response.data.data);
                if (response.data.success) {
                  this.setState({allDoctors: response.data.data});
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
  };
  render() {
    const {
      navigation: {navigate},
    } = this.props;
    const {allDoctors, morningSlot, eveningSlot, userRole} = this.state;
    let totalSlot = morningSlot + eveningSlot;
    return (
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <ScrollView>
          <View style={styles.nameContainer}>
            <Text style={styles.navTextStyle}>
              Welcome, {this.state.userEmail}
            </Text>
          </View>
          {(userRole === 'admin' || userRole === 'doctor') && (
            <View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    styles.navTextStyle,
                    {marginBottom: 10, marginTop: 10},
                  ]}>
                  Morning Slot
                </Text>
                {totalSlot > 0 ? (
                  <TouchableOpacity
                    onPress={() => navigate('MorningAppointmentBooking')}>
                    <PieChart
                      widthAndHeight={180}
                      series={[morningSlot, totalSlot]}
                      sliceColor={['#f00', '#ddd']}
                      doughnut={true}
                      coverRadius={0.7}
                      coverFill={'#FFF'}
                    />

                    <View
                      style={{
                        position: 'absolute',
                        width: 180,
                        height: 180,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          backgroundColor: 'transparent',
                          color: '#000',
                          fontSize: 24,
                        }}>
                        {morningSlot}/{totalSlot}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View>
                    <Text
                      style={[
                        styles.navTextStyle,
                        {marginBottom: 10, marginTop: 10},
                      ]}>
                      There is no Morning Slot
                    </Text>
                  </View>
                )}
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    styles.navTextStyle,
                    {marginBottom: 10, marginTop: 10},
                  ]}>
                  Evening Slot
                </Text>

                {totalSlot > 0 ? (
                  <TouchableOpacity
                    onPress={() => navigate('EveningAppointmentBooking')}>
                    <PieChart
                      widthAndHeight={180}
                      series={[eveningSlot, totalSlot]}
                      sliceColor={['#f00', '#ddd']}
                      doughnut={true}
                      coverRadius={0.7}
                      coverFill={'#FFF'}
                    />

                    <View
                      style={{
                        position: 'absolute',
                        width: 180,
                        height: 180,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          backgroundColor: 'transparent',
                          color: '#000',
                          fontSize: 24,
                        }}>
                        {eveningSlot}/{totalSlot}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View>
                    <Text
                      style={[
                        styles.navTextStyle,
                        {marginBottom: 10, marginTop: 10},
                      ]}>
                      There is no Evening Slot
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
          {allDoctors.length > 0 &&
            allDoctors.map((item, index) => {
              return (
                <View
                  style={[
                    styles.cardContainer1,
                    {alignContent: 'center', alignItems: 'center'},
                  ]}>
                  <Image
                    source={
                      item.name === 'Dr. Praveen' ? icons.MEN : icons.WOMEN
                    }
                    style={{
                      marginTop: 15,
                      height: 180,
                      width: '40%',
                      resizeMode: 'contain',
                      alignItems: 'center',
                    }}
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 24,
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 20,
                      paddingRight: 10,
                    }}>
                    {item.description}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 20,
                      paddingRight: 10,
                    }}>
                    {item.speciality}
                  </Text>
                  <Button
                    buttonText="BOOK AN APPOINTMENT"
                    customStyle={{width: '70%'}}
                    handleSubmit={() =>
                      navigate('AppointmentBooking', {
                        doctorId: item.did,
                        doctorName: item.name,
                      })
                    }
                  />
                </View>
              );
            })}
        </ScrollView>
        <Spinner value={this.state.isLoading} />
      </SafeAreaView>
    );
  }
}
