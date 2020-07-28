import React from 'react';
import {View, StyleSheet, Platform, Text} from 'react-native';

class HelloWorld extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <Text>Hello iOS</Text>
      </View>
    );
  }
}

const styles = {
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default HelloWorld;
