import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

export default function UserScreen() {

  return (
    <View style={styles.container}>
        <Text>On User Info</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#EAEDED',
    height: '100%',
  },
});