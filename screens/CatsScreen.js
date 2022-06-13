import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import CatComponent from '../components/CatComponent';
import CatsService from '../services/CatsService';

export default function CatsScreen(props) {
    const [cats, setCats] = React.useState([]);

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
        <View style={styles.container}>
        <View style={styles.groupone}>
            {/* <TextInput style={styles.iAdd} placeholder="Insert a cat" value={cat} onChangeText={(cat) => { setInfo(cat) } }/> */}
            <Button title="MODIFY" style={styles.bAdd} onPress={handleUser}/>
            <Button title="ADD" style={styles.bAdd} onPress={handleAddCat}/>
        </View>

        <View style={styles.containerElements}>
            { cats.map((elem) => {
            return <CatComponent cat={elem} navigation={props.navigation} id={elem._id} key={elem._id}/>
            }) }
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#EAEDED',
        height: '100%',
    },
    groupone: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
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
});