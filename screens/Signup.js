import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {TextInput, RadioButton, Text, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';

const Signup = () => {
  const navigation = useNavigation();
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [images, setImages] = useState('');

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              label="Name"
              mode="outlined"
              value={name}
              onChangeText={(value) => setName(value)}
              style={styles.input}
              maxLength={20}
            />

            <TextInput
              label="Email"
              mode="outlined"
              value={email}
              onChangeText={(value) => setEmail(value)}
              style={styles.input}
            />
            <TextInput
              label="Set Password"
              mode="outlined"
              value={password}
              onChangeText={(value) => setPassword(value)}
              style={styles.input}
              secureTextEntry
            />
            <DatePicker
              mode="date"
              date={dob}
              maxDate={new Date()}
              placeholder="Select your DOB"
              style={{width: '100%', ...styles.input}}
              onDateChange={(value) => setDob(value)}
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              androidMode="spinner"
              customStyles={{
                dateInput: {
                  borderRadius: 5,
                  backgroundColor: '#e6e6e6',
                  borderColor: '#4d4d4d',
                },
                placeholderText: {
                  color: '#666',
                  textAlign: 'left',
                },
              }}
            />

            <RadioButton.Group
              value={gender}
              onValueChange={(value) => setGender(value)}>
              <View style={styles.radBtn}>
                <Text>Male</Text>
                <RadioButton value="Male" color="red" />
              </View>
              <View style={{...styles.radBtn, marginHorizontal: 7}}>
                <Text>Female</Text>
                <RadioButton value="Female" color="red" />
              </View>
            </RadioButton.Group>

            <Button
              color="red"
              mode="outlined"
              style={{borderColor: 'red', borderRadius: 15}}
              onPress={() => {
                ImagePicker.openPicker({
                  width: 100,
                  height: 100,
                  cropping: true,
                }).then((image) => {
                  setImages(image.path);
                  console.log(images);
                });
              }}>
              Select Image
            </Button>
            <Image
              source={{uri: `${images}`}}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100 / 2,
                marginTop: 20,
                marginHorizontal: '35%',
              }}
            />
          </View>
          <View style={styles.btn}>
            <Button
              mode="contained"
              color="red"
              onPress={() => {
                if (
                  name === '' ||
                  password === '' ||
                  email === '' ||
                  dob === '' ||
                  gender === '' ||
                  images === ''
                ) {
                  Alert.alert('Sorry', 'Please fill all the fields', [
                    {text: 'Okay'},
                  ]);
                } else {
                  auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((response) => {
                      const uid = response.user.uid;

                      let account = {};
                      account.id = response.user.uid;
                      account.name = name;
                      account.gender = gender;
                      account.dob = dob;
                      account.email = email;
                      account.password = password;
                      account.image = images;

                      const usersRef = firestore().collection('users');
                      usersRef
                        .doc(uid)
                        .set(account)
                        .then(navigation.navigate('login', {uid: uid}))
                        .catch((error) => {
                          alert(error);
                        })
                        .catch((error) => {
                          alert(error);
                        });
                    });
                }
              }}>
              Sign-up
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  radBtn: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputContainer: {
    margin: 30,
    marginTop: '17%',
  },
  input: {
    marginVertical: 10,
  },
  btn: {
    marginHorizontal: 30,
  },
});
