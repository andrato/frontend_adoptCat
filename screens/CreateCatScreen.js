import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
// import CatsService from '../services/CatsService';

export default function CreateCatScreen() {
  // const [cat, setCat] = React.useState('');

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Add a name for the post"/>
      <TextInput style={styles.input} type="Number" placeholder="Add the cat age (with aproximation)"/>
      <TextInput style={[styles.input, styles.description]} multiline={true} numberOfLines={4} placeholder="Add a description"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#EAEDED',
    height: '100%',
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 20,
    backgroundColor: '#F7F7F7',
    paddingLeft: 10,
    fontSize: 16,
  },
  description: {
    height: 100,
  }
});