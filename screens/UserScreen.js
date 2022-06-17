import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Icon from 'react-native-ico';

export default function UserScreen(props) {
    const iconHeight = 30;
    const iconWidth = 30;

    React.useEffect(() => { 

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

    return (
      <View style={styles.container}>
          <View style={styles.scrollView}>
              
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
    }
});