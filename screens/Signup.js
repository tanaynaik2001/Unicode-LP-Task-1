import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {TextInput, RadioButton, Text, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';

const Signup = () => {
  const name_key = 'name_key';
  const email_key = 'email_key';
  const dob_key = 'dob_key';
  const gender_key = 'gender_key';
  const password_key = 'password_key';

  const navigation = useNavigation();
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          </View>
          <View style={styles.btn}>
            <Button
              mode="contained"
              color="red"
              onPress={async () => {
                if (
                  name === '' ||
                  password === '' ||
                  email === '' ||
                  dob === '' ||
                  gender === ''
                ) {
                  Alert.alert('Sorry', 'Please fill all the fields', [
                    {text: 'Okay'},
                  ]);
                } else {
                  try {
                    await AsyncStorage.setItem(name_key, name);
                    await AsyncStorage.setItem(email_key, email);
                    await AsyncStorage.setItem(password_key, password);
                    await AsyncStorage.setItem(dob_key, dob);
                    await AsyncStorage.setItem(gender_key, gender);
                  } catch (error) {
                    console.log(error);
                  }
                  Alert.alert('Saved', 'Your data has been saved successfuly', [
                    {text: 'Okay'},
                  ]);

                  navigation.goBack();
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
