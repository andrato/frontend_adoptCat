import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import CatsService from '../services/CatsService';

export default function CatScreen() {
  const [cat, setCat] = React.useState('');

  return (
    <View style={styles.container}>
        <Text>On Cat Info</Text>
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