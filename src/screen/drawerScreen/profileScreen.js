import * as React from 'react';
import {Text, View, Image, Modal, TouchableOpacity} from 'react-native';
import styles from './style';
import Header from '../../component/header';
import icons from '../../utility/icons';
import ICON from '../../utility/icons';
import TextInput1 from '../../component/textInput';
import color from '../../utility/color';
import Button from '../../component/button';
import {getProfile} from '../../apis/profile';
import {connect} from 'react-redux';
import constant from '../../utility/constant';
import * as avatar from './avatar';
class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      editChange: true,
      editModal: false,
      isLoading: true,
      visible: false,
      loading: false,
    };
  }
  componentDidMount() {
    const {getProfiles} = this.props;
    getProfiles();
  }
  close = () => this.setState({visible: false});
  open = () => this.setState({visible: true});
  render() {
    const {navigation, profileData} = this.props;
    //console.log('profile_data', profileData);

    return (
      <View style={styles.tabView}>
        <Header
          shouldShowBackBtn={true}
          headerText={constant.PROFILE}
          navigation={navigation}
        />
        {this.state.editChange === false && (
          <View style={styles.userInfoSection}>
            <TouchableOpacity style={{alignContent: 'flex-end'}}>
              <Image source={ICON.EDIT} style={styles.editStyle} />
            </TouchableOpacity>
            <View style={styles.center}>
              <TouchableOpacity onPress={() => this.setState({loading: true})}>
                <Image
                  source={{uri: `${constant.PROFILE_URL}${profileData.image}`}}
                  style={styles.backArrowStyle}
                />
                <Image source={ICON.EDIT} style={styles.editStyles} />
              </TouchableOpacity>
            </View>
            {this.state.loading && (
              <View style={styles.center}>
                <Modal
                  transparent={true}
                  isVisible={this.state.visible}
                  onBackButtonPress={this.close}
                  onBackdropPress={this.close}>
                  <View style={styles.modalContainer}>
                    <View style={styles.Container}>
                      <Text style={styles.titles}>Select Image</Text>
                      <TouchableOpacity
                        style={{paddingLeft: 140}}
                        onPress={() => this.setState({loading: false})}>
                        <Image
                          source={icons.x_marker}
                          style={styles.editStyle}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.lines} />
                    <View style={styles.center}>
                      <TouchableOpacity onPress={avatar.openGallery}>
                        <Text style={styles.titles}>Gallery</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.blackLine} />
                    <View style={styles.center}>
                      <TouchableOpacity onPress={avatar.openCamera}>
                        <Text style={styles.titles}>Camera</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            )}

            <View style={styles.inputStyle}>
              <Text style={styles.titles}>First Name</Text>

              <TextInput1
                placeholder="Gameplan"
                value={profileData.firstName}
                placeholderTextColor={color.BLACK}
              />
              <Text style={styles.titles}>Last Name</Text>

              <TextInput1
                placeholder="Advisor"
                value={profileData.lastName}
                placeholderTextColor={color.BLACK}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                buttonText="Cancel"
                handleSubmit={() => this.setState({editChange: true})}
                customStyle={{width: '40%', paddingRight: 10}}
              />
              <Button
                buttonText="Save"
                customStyle={{width: '40%', marginLeft: 20}}
              />
            </View>
          </View>
        )}
        {this.state.editChange === true && (
          <View style={styles.userInfoSection}>
            <TouchableOpacity
              style={{alignContent: 'flex-end'}}
              onPress={() => this.setState({editChange: false})}>
              <Image source={ICON.EDIT} style={styles.editStyle} />
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <Image
                source={{uri: `${constant.PROFILE_URL}${profileData.image}`}}
                style={styles.backArrowStyle}
              />
              <Text style={styles.titles}>
                {profileData.firstName} {profileData.lastName}
              </Text>
              <Text>{profileData.school}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    profileData: state.profileData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfiles: () => getProfile(dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
