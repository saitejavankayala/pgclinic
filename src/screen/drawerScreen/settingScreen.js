import * as React from 'react';
import { Text, View } from 'react-native';
import styles from './style'


export default class SettingScreen extends React.Component {
  render(){   
    
    return (
      <View style={styles.tabView}>
        
        <Text style={styles.textContainer}>Settings!</Text>
      </View>
    );
  }
}  