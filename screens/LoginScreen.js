import React from 'react';
import { StyleSheet, TextInput, View, ScrollView, Button, Image, ImageBackground, Text, TouchableOpacity, Alert } from 'react-native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { auth } from '../firebase.js';

export default function LoginScreen(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // add a listner
    React.useEffect(() => {
        if(auth.currentUser) {
            props.navigation.navigate("Cats");
        }

        // const unsubscribe = auth.onAuthStateChanged(user => {
        //     if(user) {
        //         props.navigation.navigate("Cats");
        //     }
        // })

        // return unsubscribe;
    }, [])

    const handleRegister = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Registered " + user);
            Alert.alert("Successfully registered!");
        })
        .catch(err => { 
            Alert.alert("Error on register: " + err.message);
            console.log("Login error " + err.message);
        })
    }

    const handleLogin = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Logged in with " + user.email);
            props.navigation.navigate("Cats");
        })
        .catch(err => { 
            Alert.alert("Error on login: " + err.message);
            console.log("Login error " + err.message);
        })
    }

    return (
        <KeyboardAvoidingView style={styles.container} behaviour="padding">
            <View style={styles.secondPart}>
                <Image source={require('../assets/cat.png')} style={styles.iCatLogin} />
                <Text style={styles.tCatLogin}> Login </Text>
                <TextInput style={styles.input} placeholder="Insert email" value={email} onChangeText={(email) => { setEmail(email) } }/> 
                <TextInput style={styles.input} placeholder="Insert password" value={password} onChangeText={(password) => { setPassword(password) } } secureTextEntry/>
                {/* <Button title="Log in" style={styles.bLogin} onPress={handleLogin}/> */}
                <TouchableOpacity style={styles.bLogin} onPress={handleLogin}>
                    <Text style={styles.tLogin}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bRegister} onPress={handleRegister}>
                    <Text style={styles.tSmall}>Register</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.thirdPart}>

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#5E9398'
    },
    img: {
        flex: 1,
        justifyContent: "center",
        height: '100%',
        width: '100%',
    },
    firstPart: {
        height: '40%',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    secondPart: {
        height: '70%',
        width: '100%',
        padding: 30,
        alignItems: 'center'
    },
    thirdPart:{
        height: '30%',
        padding: 20,
        marginTop: 20,
    },
    iCatLogin: {
        width: 180,
        height: 180,
        marginTop: 60,
    },
    tCatLogin: {
        fontSize: 26,
        color: 'white',
        marginBottom: 30,
    },
    input: {
        height: 40,
        width: '100%',
        marginBottom: 20,
        fontSize: 16,
        paddingLeft: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
    },
    bLogin: {
        marginTop: 20,
        height: 40,
        width: "100%",
        backgroundColor: "white",
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    tLogin: {
        fontSize: 18,
    },
    bRegister: {
        marginTop: 20,
        height: 40,
        width: "100%",
        backgroundColor: "#A93458",
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    tSmall: {
        fontSize: 18,
        color: "white"
    }
});