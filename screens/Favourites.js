import React, {useEffect} from 'react';
import {useState} from 'react';
import {Appbar} from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Card from '../components/Card';

var data;
const Favourites = () => {
  const [videos, setVideos] = useState({});
  const [loading, setLoading] = useState(false);
  const getfavs = async () => {
    const uid = auth().currentUser.uid;
    const usersRef = firestore().collection('users');
    await usersRef
      .doc(uid)
      .get()
      .then((firestoreDocument) => {
        data = firestoreDocument.data();
        setVideos(data);
        return data;
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    getfavs();
  }, []);
  console.log(videos);

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Favourites" />
      </Appbar.Header>
      {loading == false ? (
        <Card
          videoId={videos.favVideos}
          channel={videos.favChannel}
          title={videos.favTitle}
        />
      ) : (
        <ActivityIndicator color="red" size="large" style={{marginTop: 100}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
export default Favourites;
