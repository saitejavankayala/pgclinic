import React from 'react';
import PropTypes from 'prop-types';
import {TextInput, View} from 'react-native';
import styles from './style';
class TextInput1 extends React.Component {
  render() {
    const {
      value,
      onChangeText,
      placeholder,
      placeholderTextColor,
      keyboardType,
      onBlur,
    } = this.props;
    return (
      <View style={styles.passwordContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          style={styles.inputStyle}
          keyboardType={keyboardType}
          onBlur={onBlur}
        />
      </View>
    );
  }
}

TextInput1.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  placeholderTextColor: PropTypes.string,
  keyboardType: PropTypes.string,
  onBlur: PropTypes.func,
};
export default TextInput1;
