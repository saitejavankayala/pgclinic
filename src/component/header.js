import React from 'react';
import {View, Text, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import styles from './style';
import {DrawerActions} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {getProfile} from '../apis/profile';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import color from '../utility/color';

class Header extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    const {getProfiles} = this.props;
    getProfiles();
  }
  render() {
    const {
      navigation,
      shouldShowBackBtn,
      headerText,
      profileData,
      shouldShowProfile,
    } = this.props;
    AsyncStorage.setItem(
      'profile',
      JSON.stringify({
        profile_image: profileData.image,
      }),
    );
    return (
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          {shouldShowBackBtn && (
            <TouchableOpacity
              onPress={() =>
                shouldShowProfile
                  ? navigation.navigate('DashBoard')
                  : navigation.goBack()
              }>
              <Icon
                name={'arrowleft'}
                style={{marginLeft: 20}}
                size={35}
                color={color.TEXT_PRIMARY}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.textHeader}>{headerText}</Text>
        <View style={styles.rightContainer} />
      </View>
    );
  }
}

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
  shouldShowBackBtn: PropTypes.bool,
  headerText: PropTypes.string,
  shouldShowProfile: PropTypes.bool,
};
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
export default connect(mapStateToProps, mapDispatchToProps)(Header);
