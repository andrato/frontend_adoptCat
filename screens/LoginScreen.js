import React from 'react';
import { StyleSheet, TextInput, View, ScrollView, Button, Image, ImageBackground, Text, TouchableOpacity, Alert } from 'react-native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { auth } from '../firebase.js';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-facebook';
import { AppContext } from '../global/AppContextProvider';

// allow your auth to take place and return the results here
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const {
        userEmail,
        setUserEmail
    } = React.useContext(AppContext);


    // pentru google/facebook
    const [accessToken, setAccessToken] = React.useState('');
    const [userInfo, setUserInfo] = React.useState('');
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: '925572156682-i4pcuhggs2th28qblotveagcg548jsgm.apps.googleusercontent.com',
        androidClientId: '925572156682-kguc1dogcr3q1162ddp2s0u9e3o9s25e.apps.googleusercontent.com',
        expoClientId: '925572156682-aalkfp61l4h0u7a4tn82ip3sg4m362nm.apps.googleusercontent.com'
    });
 
    React.useEffect(() => {
        if(response?.type === "success") {
            setAccessToken(response.authentication.accessToken)
            props.navigation.navigate("Cats");
            setUserEmail("ceva@google.com");
        }

        if(userEmail !== "") {
            props.navigation.navigate("Cats");
        } 
    }, [response])


    async function getUserData() {
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: { Authorization: `Bearer ${accessToken}`}
        });

        userInfoResponse.json().then(data => {
            setUserInfo(data);
        });
    }


    // add a listner
    React.useEffect(() => {
        if(auth.currentUser) {
            setUserEmail(auth.email);
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
            console.log("Registered " + JSON.stringify(user));
            Alert.alert("Successfully registered!");
            setUserEmail(user.email);
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
            setUserEmail(user.email);
        })
        .catch(err => { 
            Alert.alert("Error on login: " + err.message);
            console.log("Login error " + err.message);
        })
    }

    const handleGoogleLogin = () => {
        // if(accessToken) {
        //     console.log("pe cazul fericit");
        //     getUserData();
        // } else { 
        //     console.log("pe cazul nefericit");
        //     promptAsync({useProxy: false, showInRecents: true}) 
        // }
        promptAsync();
    }

    const handleFacebookLogin = async () => {
        try {
            await Facebook.initializeAsync({
            appId: '551902369897499',
            });
            const { type, token, expirationDate, permissions, declinedPermissions } =
            await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            } else {
            // type === 'cancel'
            }
        } catch (err) {
            alert(`Facebook Login Error: ${err}`);
        }
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
                <View style={styles.socials}>
                    <TouchableOpacity style={styles.bSocialG} onPress={handleGoogleLogin}>
                        <Text style={styles.textSocials}>Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bSocialF} onPress={handleFacebookLogin}>
                        <Text style={styles.textSocials}>Facebook</Text>
                    </TouchableOpacity>
                </View>
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
        alignItems: 'center',
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
        color: "white",
    },
    bSocialG: {
        backgroundColor: "#A93458",
        width: "45%",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        borderRadius: 10,
    },
    bSocialF: {
        backgroundColor: "#2A376B",
        width: "45%",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        borderRadius: 10,
    },
    socials: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 70,
    },
    textSocials: {
        color: "white",
        fontSize: 16,
    }
});