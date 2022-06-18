import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, Image } from 'react-native';
import CatsService from '../services/CatsService';
import { auth } from '../firebase.js';

export default function CatScreen({route, navigation}) {
    const [cat, setCat] = React.useState(route.params.cat);

    const handleUpdate = () => {
        navigation.navigate({name: 'UpdateCat', params: {cat: cat}, merge: true}); 
    }

    const handleRemove = () => {
      
    }

    return (
        <ScrollView keyboardShouldPersistTaps="always" style={styles.containerAll}>
            <Image 
            style={styles.img}
            source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}/>
            <View style={styles.container}>
                <View style={styles.allText} >
                    <Text style={styles.text}> Age: {cat.age} </Text>
                    <Text style={styles.text}> Added by user: {cat.user_id ? cat.user_id : "-"} </Text>
                    <Text style={styles.text}> Phone number: {cat.contact?.phone ? cat.contact.phone : "-"} </Text>
                    <Text style={styles.text}> Email: {cat.user_id ? cat.user_id : "-"} </Text>
                    <Text style={[styles.text, styles.description]}> Description: {cat?.descriptions ? cat.descriptions : "-" } </Text>
                </View>
                <View style={styles.buttons}>
                    <Button title="Update info" style={styles.bAdd} onPress={handleUpdate}/>
                    <Button title="Remove item" style={styles.bAdd} onPress={handleRemove}/>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  containerAll: {
    backgroundColor: '#EAEDED',
    height: '100%',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10, 
  },
  img: {
      height: 300
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  allText: {
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  description: {
      height: 120,
  }
});