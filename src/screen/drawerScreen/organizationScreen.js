import * as React from 'react';
import { Text, View } from 'react-native';
import styles from './style'


export default class OrganizationScreen extends React.Component {
  render(){   
    
    return (
      <View style={styles.tabView}>
        
        <Text style={styles.textContainer}>Organization!</Text>
      </View>
    );
  }
}  