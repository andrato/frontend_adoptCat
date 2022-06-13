import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import CatsService from '../services/CatsService';

export default function CatsScreen() {
  const [cat, setCat] = React.useState('');
  const [cats, setCats] = React.useState([]);

  React.useEffect(() => { 
    CatsService.getCats().then((response) => {
        setCats(response.data.cats);
    }).catch((err) => {
      console.log(JSON.stringify(err))
    })
}, []);

  const setInfo = (cat) => {
    setCat(cat);
  };

  const handleAddCat = () => {
    setCats(cats => [...cats, cat]);
    console.log(JSON.stringify(cats));
  };

//   const navigateToCat = () => {
//     navigation.navigate('Cat');
//   }

  return (
    <View style={styles.container}>
      <View style={styles.groupone}>
        <TextInput style={styles.iAdd} placeholder="Insert a cat" value={cat} onChangeText={(cat) => { setInfo(cat) } }/>
        <Button title="ADD" style={styles.bAdd} onPress={handleAddCat}/>
      </View>

      <View style={styles.containerElements}>
        { cats.map((elem) => {
          return (
          <View style={styles.element} key={elem._id}>
            <View>
              <Image 
              style={styles.eImage}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}/>
            </View>
            <View style={styles.eInfo}>
              <Text style={styles.eTitle}>{elem.name}</Text>
              <Text >Age: {elem.age}</Text>
              <Text >Contact: {elem.contact?.phone ? elem.contact?.phone : elem.contact?.emailAddress}</Text>
            </View>
          </View>)
        }) }

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
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
      height: 100,
    },
    shadowOpacity: 50,
    shadowRadius: 100,
    elevation: 20,
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