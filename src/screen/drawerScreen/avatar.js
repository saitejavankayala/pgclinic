import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import {AsyncStorage} from 'react-native';
import constant from '../../utility/constant';
import axios from 'react-native-axios';

const openGallery = () => {
  ImagePicker.openPicker({
    cropping: true,
  }).then(image => {
    RNFS.readFile(image.path, 'base64')
      .then(response => {
        const path = image.path.split('/');
        const fileName = path[path.length - 1];
        const regex = /[.,-\s]/g;
        const fileName_regex = fileName.replace(regex, '');

        console.log('res', image);

        AsyncStorage.getItem(constant.AUTH_USER, (_err, result) => {
          const results = JSON.parse(result);
          const config = {
            headers: {
              Authorization: `Bearer ${results.token}`,
            },
          };
          console.log('userid', results);

          console.log(
            'response',
            `https://legacyapi.wearegameplan.com/application/user/preSignUpload/${results.userId}?filename=${fileName_regex}&type=${image.mime}`,
          );
          axios
            .get(
              `https://legacyapi.wearegameplan.com/application/user/preSignUpload/${results.userId}?filename=${fileName_regex}&type=${image.mime}`,
              config,
            )
            .then(res => {
              console.log('res', res);
            });
        });
      })
      .finally(this.close);
  });
};

const openCamera = () => {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
  })
    .then(image => {
      console.log(image);
    })
    .finally(this.close);
};

export {openCamera, openGallery};
