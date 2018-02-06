'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
  Keyboard
} from 'react-native';

function urlForQueryAndPage(key, value, pageNumber) {
  const data = {
    encoding: 'json',
    pretty: '1',
    action: 'search_listings',
    country: 'uk',
    listing_type: 'buy',
    page: pageNumber
  };
  data[key] = value;
  const queryString = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'https://api.nestoria.co.uk/api?' + queryString;
}

export default class SearchPage extends Component<{}> {
  static navigationOptions = {
    title: 'Property Finder'
  };

  constructor(props) {
    super(props);
    this.state = {
      searchString: 'london',
      isLoading: false,
      message: ''
    };
  }

  _handleResponse = (response) => {
    this.setState({ isLoading: false, message: '' });
    if (response.application_response_code.substr(0, 1)  === '1') {
      this.props.navigation.navigate(
        'Results', {listings: response.listings}
      );
    } else {
      this.setState({ message: 'Location not recognized' });
    }
  };

  _onSearchTextChange = (event) => {
    this.setState({ searchString: event.nativeEvent.text });
  };

  _executeQuery = (query) => {
    console.log(query);
    this.setState({ isLoading: true });
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json.response))
      .catch(error => 
              this.setState({
                isLoading: false,
                message: 'Something bad happened - ' + error
              })
            );
  };

  _onSearchPress = () => {
    Keyboard.dismiss();
    const query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  };

  render() {
    const spinner = this.state.isLoading ? 
      <ActivityIndicator size='large'/> : null;

    return (
      <View style={styles.container}>

        <Text style={styles.description}>
          Search for houses to buy!
        </Text>

        <Text style={styles.description}>
          Search by place, name or post-code
        </Text>

        <View style={styles.flowRight}>

          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            onChange={this._onSearchTextChange}
            placeholder='Search here'
          />

          <Button
            onPress={this._onSearchPress}
            color='#48bbec'
            title='Go'
          />

        </View>

        <Image 
          source={require('./Resources/house.png')}
          style={styles.image}
        />

        {spinner}

        <Text style={styles.description}>
          {this.state.message}
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#48bbec',
    color: '#48bbec'
  },
  image: {
    width: 217,
    height: 138
  }
});
