import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text} from 'react-native';
import styles from './style';

export default class Button extends Component {
  render() {
    const {buttonText, handleSubmit, disabled, customStyle} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled}
        onPress={handleSubmit}
        style={[styles.buttonBox, customStyle]}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  customStyle: PropTypes.object,
};
