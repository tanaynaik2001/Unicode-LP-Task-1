import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.textInput}>
          <Text style={styles.text}>Welcome to Youtube Clone</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Email"
            mode="outlined"
            numberOfLines={1}
            style={styles.input}
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <TextInput
            style={styles.input}
            label="Password"
            mode="outlined"
            numberOfLines={1}
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry
          />
        </View>
        <View style={styles.btn}>
          <Button
            mode="contained"
            color="red"
            onPress={() => {
              if (email === '' || password === '') {
                Alert.alert('Error', 'Please fill both the fields', [
                  {text: 'Okay'},
                ]);
              } else {
                auth()
                  .signInWithEmailAndPassword(email, password)
                  .then((response) => {
                    const uid = response.user.uid;
                    const usersRef = firestore().collection('users');
                    usersRef
                      .doc(uid)
                      .get()
                      .then((firestoreDocument) => {
                        if (!firestoreDocument.exists) {
                          Alert.alert('Error', 'User does not exist anymore', [
                            {text: 'Okay'},
                          ]);
                          return;
                        }
                        const user = firestoreDocument.data();
                        navigation.navigate('home', {user});
                        setEmail('');
                        setPassword('');
                      })
                      .catch((error) => {
                        alert(error);
                      })
                      .catch((error) => {
                        alert(error);
                      });
                  });
              }
            }}>
            Login
          </Button>
        </View>
        <View style={styles.textInput}>
          <Text style={styles.text}>Don't have an account ? Create now</Text>
        </View>
        <View style={styles.btn}>
          <Button
            mode="contained"
            color="red"
            onPress={() => navigation.navigate('signup')}>
            Sign-up
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    margin: 30,
    marginTop: '4%',
  },
  textInput: {
    margin: 40,
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
  input: {
    marginVertical: 10,
    borderColor: 'black',
  },
  btn: {
    marginHorizontal: 30,
    elevation: 5,
  },
});
