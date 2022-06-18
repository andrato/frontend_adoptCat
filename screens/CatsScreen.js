//@refresh reset
import React from 'react';
import { StyleSheet, View, Button, StatusBar, SafeAreaView, ScrollView, Pressable, Text, Image, Animated, TouchableOpacity } from 'react-native';
import CatComponent from '../components/CatComponent';
import CatsService from '../services/CatsService';
import Icon from 'react-native-ico';
import { FlatList } from 'react-native-gesture-handler';
// import Animated from 'react-native-reanimated';


export default function CatsScreen(props) {
    const [cats, setCats] = React.useState([]);
    const iconHeight = 30;
    const iconWidth = 30;
    const ITEM_SIZE = 150;
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    React.useEffect(() => { 
        CatsService.getCats().then((response) => {
            const catsResp = response.data.cats;
            catsResp.sort((a, b) => {
                return a.date < b.date;
            });
            setCats(catsResp);
            console.log(response.data.cats);
        }).catch((err) => {
        console.log(JSON.stringify(err))
        })
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

    const onNavigateCat = (cat) => {
        props.navigation.navigate({name: 'Cat', params: {cat: cat}, merge: true});
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <Animated.View style={[stylez]} >
                <Animated.ScrollView style={[styles.scrollView, styles.scroll]} showsVerticalScrollIndicator={false} 
                >
                    <View style={styles.containerElements}>
                        { cats.map((elem) => {
                        return <CatComponent cat={elem} navigation={props.navigation} id={elem._id} key={elem._id}/>
                        }) }
                    </View>
                </Animated.ScrollView>
            </Animated.View> */}
            <Animated.FlatList style={styles.scrollView} 
                showsVerticalScrollIndicator={false}
                onScroll = {Animated.event(
                    [{ nativeEvent: {contentOffset: {y: scrollY}} }],
                    { useNativeDriver: true } 
                )}
                data={cats}
                keyExtractor = {item => item._id}
                renderItem={({item, index}) => {
                    let inputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 2)
                    ];
                    let outputRange = [1,1,1,0];


                    let scale;
                    try {
                        scale = scrollY.interpolate({
                            inputRange,
                            outputRange
                        });
                    } catch (err) {
                        console.log(err);
                    }

                    // return (<CatComponent cat={item} scale={scale} navigation={props.navigation} id={item._id} key={item._id}/>)
                    return (
                        <AnimatedTouchable onPress={() => {onNavigateCat(item)}} underlayColor="white" key={id} style={{
                            transform: [{scale}]
                        }}>
                            <View style={styles.element}>
                                <View>
                                    <Image 
                                    style={styles.eImage}
                                    source={{
                                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                                    }}/>
                                    </View>
                                    <View style={styles.eInfo}>
                                    <Text style={styles.eTitle}>{item.name}</Text>
                                    <Text >Age: {item.age}</Text>
                                    <Text >Contact: {item.contact?.phone ? item.contact?.phone : item.contact?.emailAddress}</Text>
                                </View>
                            </View>
                        </AnimatedTouchable>
                    )
                }}
            />
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EAEDED',
        height: '100%',
        flex: 1,
    },
    scrollView: {
        backgroundColor: '#EAEDED',
        margin: 20,
        flex: 1
    },
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
    },
    addBtn: {
        height: "100%",
        width: "30%",
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#377A8A",
        borderRadius: 20,
    },

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
        elevation: 2,
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