import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-ico';
import { auth } from '../firebase.js';

export default function UserScreen(props) {
    const [user, setUser] = React.useState('');
    const iconHeight = 30;
    const iconWidth = 30;

    React.useEffect(() => { 
      if(!auth.currentUser) {
        props.navigation.navigate('Login');
      }
      setUser(auth.currentUser);
    }, []);

    const handleCats = () => {
        props.navigation.navigate('Cats'); 
    };

    const handleAddCat = () => {
        props.navigation.navigate('CreateCat'); 
    };

    const handleUser = () => {
        props.navigation.navigate('User'); 
    };

    const handleLogout = () => {
        auth
        .signOut()
        .then(() => {
          props.navigation.navigate('Login');
        })
        .catch(error => {
          Alert.alert(error.message);
        })
    };

    return (
      <View style={styles.container}>
          <View style={styles.scrollView}>
              <View style={styles.firstPart}>
                  <Image 
                    style={styles.img}
                    source={require('../assets/download.png')}/>
                  <View>
                    <Text style={styles.heading}>Welcome,</Text>
                    <Text style={styles.username}>{user.email}</Text>
                  </View>
              </View>
              <View style={styles.secondPart}>
                <View style={styles.info}>
                  <Text style={styles.field}>Email:</Text>
                  <Text style={styles.result}>{user.email}</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.field}>Phone number:</Text>
                  <Text style={styles.result}>{user.phoneNumber ? user.phoneNumber : "-"}</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.field}>Created at:</Text>
                  <Text style={styles.result}>-</Text>
                </View>
              </View>
          </View>
          <View style={styles.btnLg}>
              <TouchableOpacity style={styles.bLogout} onPress={handleLogout}>
                  <Text style={styles.tlogout}>Log out</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.navbar}>
              <Pressable onPress={handleCats} style={styles.btn} android_ripple={{borderless: false}}>
                  <Icon name="cat" group="miscellaneous" height={iconHeight} width={iconWidth} color="#377A8A" />
              </Pressable>
              <Pressable onPress={handleAddCat} style={styles.addBtn} android_ripple={{borderless: false}}>
                  <Icon name="add-button-inside-black-circle" group="material-design" height={iconHeight} width={iconWidth} color="white" />
              </Pressable>
              <Pressable onPress={handleUser} style={styles.btn} android_ripple={{borderless: false}}>
                  <Icon name="user" group="miscellaneous" height={iconHeight} width={iconWidth} color="#377A8A" />
              </Pressable>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EAEDED',
        height: '100%',
    },
    scrollView: {
        flex: 1
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 0,
        height: 50,
        backgroundColor: "white",
    },
    btn: {
        height: "100%",
        width: "35%",
        alignItems: "center",
        justifyContent: 'center',
    },
    addBtn: {
        height: "100%",
        width: "30%",
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#377A8A",
        borderRadius: 20,
    },
    firstPart: {
        padding: 20,
        paddingTop: 50,
        height: 230,
        backgroundColor: "#377A8A",
        flexDirection: "row",
        alignItems: 'flex-start',
        // justifyContent: 'center',
    },
    img: {
        width: 130,
        height: 130,
        borderRadius: 100,
        marginRight: 20,
    },
    heading: {
        marginTop: 30,
        color: "white",
        fontSize: 24,
        width:"100%",
    },
    username: { 
        marginTop: 10,
        color: "white",
        fontSize: 16,
        marginRight: 20,
    },
    secondPart: {
        padding: 20,
    },
    info: {
        flexDirection: "row",
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    field: {
        width: "40%",
        fontSize: 16,
        fontWeight: "bold",
    },
    result: {
        fontSize: 16,
    },
    btnLg: {
      padding: 20,
    },
    bLogout: {
        marginTop: 20,
        height: 40,
        width: "100%",
        backgroundColor: "#15414C",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    tlogout:{ 
      color: "white",
      fontSize: 16,
    }
});