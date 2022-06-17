import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import CatsService from '../services/CatsService';

export default function CatComponent({cat, navigation, id}) {
  const onNavigateCat = () => {
    navigation.navigate({name: 'Cat', params: {cat: cat}, merge: true});
  }

  return (
    <TouchableHighlight onPress={onNavigateCat} underlayColor="white" key={id}>
        <View style={styles.element}>
            <View>
            <Image 
            style={styles.eImage}
            source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}/>
            </View>
            <View style={styles.eInfo}>
            <Text style={styles.eTitle}>{cat.name}</Text>
            <Text >Age: {cat.age}</Text>
            <Text >Contact: {cat.contact?.phone ? cat.contact?.phone : cat.contact?.emailAddress}</Text>
            </View>
        </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
    element: {
        padding: 10,
        width: '100%',
        height: 130,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        flexDirection: 'row',

        shadowColor: "black",
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 3,
    },
    eImage: {
        width: 120,
        height: '100%',
    },
    eInfo: {
        width: 170,
        height: 100,
        paddingLeft: 20,
        flexDirection:"column"
    },
    eTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 10,
    }
});