import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, View} from 'react-native';
import styles from './style';
import color from '../utility/color';
import string from '../utility/string';
class Spinner extends Component {
  render() {
    const {value} = this.props;
    return (
      value && (
        <View style={styles.IndicatorStyle}>
          <ActivityIndicator
            color={color.blue}
            size={string.LARGE}
            animating={value}
          />
        </View>
      )
    );
  }
}

Spinner.propTypes = {
  value: PropTypes.bool.isRequired,
};
export default Spinner;
