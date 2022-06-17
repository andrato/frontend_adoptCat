import React from 'react';
import { StyleSheet, Text, TextInput, Button, Image, Alert, SafeAreaView, ScrollView  } from 'react-native';
import {requestMediaLibraryPermissionsAsync, launchImageLibraryAsync, MediaTypeOptions}  from 'expo-image-picker';
import CatsService from '../services/CatsService';
import { auth } from '../firebase.js';


export default function CreateCatScreen(props) {
  const [galleryPermssion, setGalleryPermssion] = React.useState(false);
  const [image, setImage] = React.useState('https://reactnative.dev/img/tiny_logo.png');
  // for the object
  const [postName, setPostName] = React.useState(null);
  const [age, setAge] = React.useState(null);
  const [description, setDescription] = React.useState(null);

  React.useEffect(() => {
    if(!auth.currentUser) {
      props.navigation.navigate('Login');
    }

    (async () => {
      const galleryStatus = await requestMediaLibraryPermissionsAsync();
      setGalleryPermssion(galleryStatus.status === 'granted');
    })()
  })

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,4],
      quantity: 1
    })

    console.log(result);

    if(!result.cancelled) {
      setImage(result.uri);
    }
  }

  const addPost = async () => {
    if(!postName) {
      Alert.alert("Please insert a name for the post");
      return;
    }
    if(!age || isNaN(age)) {
      Alert.alert("Please insert a valid age for the cat");
      return;
    }

    const obj = {
      name: postName,
      age: Number(age),
      user_id: auth.currentUser.email,
    }

    if(description) {
      obj.description = description;
    }

    let id = '';
    try {
      const res = await CatsService.addCat(obj);
      if(!res.data.error) {
        id = res.data.response._id;
      }

      console.log()
    } catch (err) {
      Alert.alert("An error occured! Please try again later!");
      console.log(err);
    }

    try {
      await CameraRoll.save(image,{type:"photo",album:"../images_posts"});
      console.log("saved image");
    } catch (err) {
      Alert.alert("Error occured when saving picture! Please update it later!");
      console.log(err);
    }

    try {
      await CatsService.addCat(obj);
      Alert.alert("Successfuly added!");
      props.navigation.navigate('Cats'); 

    } catch (err) {
      Alert.alert("Error saving post! Please try again later!");
      console.log(err);
    }
    
  }

  if(galleryPermssion === false) {
    return <Text> No access to Internal Storage </Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <TextInput style={styles.input} placeholder="Add a name for the post" value={postName} onChangeText={(postName) => { setPostName(postName) } }/>
        <TextInput style={styles.input} type="Number" placeholder="Add the cat age (with aproximation)" value={age} onChangeText={(age) => { setAge(age) } }/>
        <TextInput style={[styles.input, styles.description]} multiline={true} numberOfLines={4} placeholder="Add a description" value={description} onChangeText={(description) => { setDescription(description) } }/>
        <Button title='Pick image' onPress={pickImage} />
        <Image source={{uri:image}} style={styles.image}/> 
        <Button style={styles.btn} title='Add post' onPress={addPost} />
      </ScrollView>
    </SafeAreaView>
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
  },
  image: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    height: 300,  
  },
  btn: {
    marginBottom: 20,
  }
});