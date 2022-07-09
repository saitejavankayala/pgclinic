import * as React from 'react';
import { Text, View } from 'react-native';
import styles from './style'


export default class MessageScreen extends React.Component {
  render(){   
    
    return (
      <View style={styles.tabView}>
        
        <Text style={styles.textContainer}>Message!</Text>
      </View>
    );
  }
}  