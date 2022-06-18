import React from 'react';
// import { registerRootComponent } from 'expo';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CatsScreen from './screens/CatsScreen';
import CatScreen from './screens/CatScreen';
import UpdateCatScreen from './screens/UpdateCatScreen';
import CreateCatScreen from './screens/CreateCatScreen';
import UserScreen from './screens/UserScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

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

// registerRootComponent(App);
