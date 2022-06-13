import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
// import CatsService from '../services/CatsService';

export default function CreateCatScreen() {
  // const [cat, setCat] = React.useState('');

  return (
    <View style={styles.container}>
      <Text>On Cat Update</Text>
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