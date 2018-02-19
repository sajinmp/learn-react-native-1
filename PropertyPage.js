'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

export default class PropertyPage extends Component<{}> {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.property.title
  })

  render() {
    const pty = this.props.navigation.state.params.property;
    return(
      <View style={{alignItems: 'center'}}>
        <Image source={{uri: pty.img_url}} style={styles.image}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 217,
    height: 138,
  }
});
