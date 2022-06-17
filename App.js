import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CatsScreen from './screens/CatsScreen';
import CatScreen from './screens/CatScreen';
import UpdateCatScreen from './screens/UpdateCatScreen';
import CreateCatScreen from './screens/CreateCatScreen';
import UserScreen from './screens/UserScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
// import * as firebase from "firebase"; 

// const firebaseConfig = {
//   apiKey: "AIzaSyABM1-k-aogDWDtGOjImfcr_ZGbZyNaGF0",
//   authDomain: "catadoption-f68aa.firebaseapp.com",
//   projectId: "catadoption-f68aa",
//   storageBucket: "catadoption-f68aa.appspot.com",
//   messagingSenderId: "920978149364",
//   appId: "1:920978149364:web:9a9cc712b35970b284f3a1"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cats" component={CatsScreen} />
        <Stack.Screen name="Cat" component={CatScreen} options={({ route }) => ({ title: route.params.cat.name })} />
        <Stack.Screen name="UpdateCat" component={UpdateCatScreen} options={{title: "Update post info"}}/>
        <Stack.Screen name="CreateCat" component={CreateCatScreen} options={{title: "Add a new post"}}/>
        <Stack.Screen name="User" component={UserScreen} />
      </Stack.Navigator> 
    </NavigationContainer>
  );
};