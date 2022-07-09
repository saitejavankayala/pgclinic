import * as React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './style';
import axios from 'react-native-axios';
import colors from '../../utility/color';
import strings from '../../utility/string';

export default class ResourceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    this.getData();
  }
  async getData() {
    await axios
      .get('https://api.github.com/users')
      .then(respone => {
        this.setState({data: respone.data});
        Alert.alert('message:', 'success');
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error:', error.message);
      })
      .finally(() => this.setState({isLoading: false}));
  }
  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.axiosContainer}>
        <Image source={{uri: item.avatar_url}} style={styles.avatarContainer} />

        <View style={styles.itemContainer}>
          <Text>ID:{item.id}</Text>
          <Text>Name:{item.login}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.tabView}>
        {this.state.isLoading ? (
          <ActivityIndicator
            style={styles.IndicatorStyle}
            color={colors.RED}
            size={strings.LARGE}
          />
        ) : (
          <FlatList data={this.state.data} renderItem={this.renderItem} />
        )}
      </View>
    );
  }
}
