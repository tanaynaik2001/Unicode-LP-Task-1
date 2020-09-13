import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, Card} from 'react-native-paper';
import NameIcon from 'react-native-vector-icons/AntDesign';
import GmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import GenderIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DOBIcon from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const profile = async () => {
    setGender(await AsyncStorage.getItem('gender_key'));
    setDob(await AsyncStorage.getItem('dob_key'));
    setName(await AsyncStorage.getItem('name_key'));
    setEmail(await AsyncStorage.getItem('email_key'));
  };
  profile();

  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer}>
        <Card.Title
          title={name}
          left={() => {
            return <NameIcon name="user" size={23} color="black" />;
          }}
        />
        <Card.Title
          title={email}
          left={() => {
            return <GmailIcon name="gmail" size={23} color="black" />;
          }}
        />
        <Card.Title
          title={gender}
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
          title={dob}
          left={() => {
            return <DOBIcon name="date" size={23} color="black" />;
          }}
        />
      </Card>
      <View style={styles.btn}>
        <Button
          mode="contained"
          color="red"
          onPress={() => navigation.navigate('login')}>
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
