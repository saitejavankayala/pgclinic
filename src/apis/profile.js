import {AsyncStorage, Alert} from 'react-native';
import {saveProfile} from '../Redux/action/index';
import constant from '../utility/constant';
import axios from 'react-native-axios';

const getProfile = dispatch =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(constant.AUTH_USER, (_err, result) => {
      const results = JSON.parse(result);

      //console.log('token', results.token);
      if (results != null) {
        const config = {
          headers: {
            Authorization: `Bearer ${results.token}`,
          },
        };
        //console.log('results',results);

        axios
          .get(
            `https://api.wearegameplan.com/application/student/getStudentProfile/${results.userId}`,
            config,
          )
          .then(response => {
            // console.log(response.data,'dhjdsdjk')
            if (!response.data.error) {
              resolve(response.data);

              saveProfile(dispatch, response.data.data);
            } else {
              reject(response.data.errorMessage);
              Alert.alert('message:', 'Wrong Credentails');
            }
          })
          .catch(error => {
            //console.log(error)
            reject(error);
            const k = error.response.status;
            if (k === 401) {
              Alert.alert('message:', constant.UNAUTHORIZED_ACCESS_CODE);
            } else if (k === 500) {
              Alert.alert('message:', constant.SERVER_NOT_FOUND);
            } else if (k === 502) {
              Alert.alert('message:', constant.HTTP_ERROR_CODE);
            } else {
              Alert.alert('message:', 'Please try again!');
            }
          });
      }
    });
  });

export {getProfile};
