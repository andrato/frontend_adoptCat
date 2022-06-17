import React from 'react';
import { StyleSheet, View, Button, StatusBar, SafeAreaView, ScrollView, Pressable } from 'react-native';
import CatComponent from '../components/CatComponent';
import CatsService from '../services/CatsService';
import Icon from 'react-native-ico';

export default function CatsScreen(props) {
    const [cats, setCats] = React.useState([]);
    const iconHeight = 30;
    const iconWidth = 30;

    React.useEffect(() => { 
        CatsService.getCats().then((response) => {
            setCats(response.data.cats);
        }).catch((err) => {
        console.log(JSON.stringify(err))
        })
    }, []);

    const handleAddCat = () => {
        props.navigation.navigate('CreateCat'); 
        // setCats(cats => [...cats, cat]);
        // console.log(JSON.stringify(cats));
    };

    const handleUser = () => {
        props.navigation.navigate('User'); 
        // setCats(cats => [...cats, cat]);
        // console.log(JSON.stringify(cats));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.groupone}>
                {/* <TextInput style={styles.iAdd} placeholder="Insert a cat" value={cat} onChangeText={(cat) => { setInfo(cat) } }/> */}
                {/* <Button title="MODIFY" style={styles.bAdd} onPress={handleUser}/>
                <Button title="ADD" style={styles.bAdd} onPress={handleAddCat}/> */}
            </View>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* <View style={styles.container}> */}
                    <View style={styles.containerElements}>
                        { cats.map((elem) => {
                        return <CatComponent cat={elem} navigation={props.navigation} id={elem._id} key={elem._id}/>
                        }) }
                    </View>
                {/* </View> */}
            </ScrollView>
            <View style={styles.navbar}>
                <Pressable onPress={() => {}} style={styles.btn} android_ripple={{borderless: false}}>
                    <Icon name="cat" group="miscellaneous" height={iconHeight} width={iconWidth} color="#377A8A" />
                </Pressable>
                <Pressable onPress={() => {}} style={styles.addBtn} android_ripple={{borderless: false}}>
                    <Icon name="add-button-inside-black-circle" group="material-design" height={iconHeight} width={iconWidth} color="white" />
                </Pressable>
                <Pressable onPress={() => {}} style={styles.btn} android_ripple={{borderless: false}}>
                    <Icon name="user" group="miscellaneous" height={iconHeight} width={iconWidth} color="#377A8A" />
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EAEDED',
        height: '100%',
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        backgroundColor: '#EAEDED',
        margin: 20,
        // marginHorizontal: 20,
    },
    // groupone: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     marginBottom: 20,
    // },
    iAdd: {
        marginBottom: 10,
        borderBottomWidth: 0.5,
        height: 40,
        width: 200,
        padding:5,
    },
    bAdd: {
        padding: 10,
        height: 70,
        width: 30,
    },
    containerElements: {
        flexDirection: 'column'
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
        // borderColor: "grey",
        // borderWidth: 1,
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