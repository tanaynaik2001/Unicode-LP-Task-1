import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, Card} from 'react-native-paper';
import NameIcon from 'react-native-vector-icons/AntDesign';
import GmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import GenderIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DOBIcon from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

var data;
const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const gender = user['gender'];
  const getData = async () => {
    let uid = auth().currentUser.uid;
    const usersRef = firestore().collection('users');
    await usersRef
      .doc(uid)
      .get()
      .then((firestoreDocument) => {
        if (!firestoreDocument.exists) {
          Alert.alert('Error', 'User does not exist anymore', [{text: 'Okay'}]);
          return;
        }
        data = firestoreDocument.data();
        return data;
      })
      .then((data) => {
        setUser(data);
        return;
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    getData().then(setLoading(false));
  }, []);
  if (loading) {
    return (
      <ActivityIndicator style={{marginTop: '30%'}} size={40} color="red" />
    );
  }
  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer}>
        <Card.Title
          title={user['name']}
          left={() => {
            return <NameIcon name="user" size={23} color="black" />;
          }}
        />
        <Card.Title
          title={user['email']}
          left={() => {
            return <GmailIcon name="gmail" size={23} color="black" />;
          }}
        />
        <Card.Title
          title={user['gender']}
          left={() => {
            return (
              <GenderIcon
                name={gender === 'male' ? 'gender-male' : 'gender-female'}
                size={23}
                color="black"
              />
            );
          }}
        />
        <Card.Title
          title={user['dob']}
          left={() => {
            return <DOBIcon name="date" size={23} color="black" />;
          }}
        />
      </Card>
      <View style={styles.btn}>
        <Button
          mode="contained"
          color="red"
          onPress={() => {
            auth()
              .signOut()
              .then(() => navigation.navigate('login'));
          }}>
          Logout
        </Button>
      </View>
      <View style={styles.btn}>
        <Button
          mode="contained"
          color="red"
          onPress={async () => {
            try {
              AsyncStorage.clear();
              Alert.alert('Success', 'Account Successfully Deleted', [
                {text: 'Okay'},
              ]);
            } catch (error) {
              console.log(error);
            }
            navigation.navigate('login');
          }}>
          Delete Account
        </Button>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
  },
  cardContainer: {
    margin: 15,
    elevation: 5,
    marginTop: '13%',
  },
  btn: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
});
