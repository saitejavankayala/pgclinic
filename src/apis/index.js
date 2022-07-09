import {AsyncStorage, Alert} from 'react-native';
import {saveAssignment} from '../Redux/action/index';
import constant from '../utility/constant';
import axios from 'react-native-axios';

const getAssignment = dispatch =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(constant.AUTH_USER, (_err, result) => {
      const results = JSON.parse(result);

      const config = {
        headers: {
          Authorization: `Bearer ${results.token}`,
        },
      };
      axios
        .get(
          `https://api.wearegameplan.com/application/advisor/getAssignments/${results.userId}/?assignmentStatus=Enabled&size=20&sort=id,DESC`,
          config,
        )
        .then(response => {
          if (!response.data.error) {
            resolve(response.data.content);

            saveAssignment(dispatch, response.data.data.content);
          } else {
            reject(response.data.errorMessage);
            Alert.alert('message:', 'Wrong Credentails');
          }
        })
        .catch(error => {
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
    });
  });

export {getAssignment};
