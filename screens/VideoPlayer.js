import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import FavIcon from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const VideoPlayer = ({route}) => {
  const [isFavourite, setIsfavourite] = useState(false);
  const setfavHandler = async () => {
    const uid = auth().currentUser.uid;
    const usersRef = firestore().collection('users');
    await usersRef
      .doc(uid)
      .get()
      .then((firestoreDocument) => {
        if (!firestoreDocument.exists) {
          alert('User does not exist anymore');
          return;
        }
        let favVideosList = firestoreDocument.data()['favVideos'];
        return favVideosList;
      })
      .then((favVideosList) => {
        // console.log(favVideosList);
        if (favVideosList.includes(videoId)) {
          return true;
        } else {
          return false;
        }
      })
      .then((x) => {
        // console.log(x);
        if (x) {
          setIsfavourite(true);
        } else {
          setIsfavourite(false);
        }
      });
  };

  const addtoFav = async () => {
    const uid = auth().currentUser.uid;
    const usersRef = firestore().collection('users');
    setIsfavourite(true);
    await usersRef.doc(uid).update({
      favTitle: firestore.FieldValue.arrayUnion(title),
      favVideos: firestore.FieldValue.arrayUnion(videoId),
      favChannel: firestore.FieldValue.arrayUnion(channel),
      favImage: firestore.FieldValue.arrayUnion(imageUri),
    });
  };

  const removeFromfav = async () => {
    const uid = auth().currentUser.uid;
    const usersRef = firestore().collection('users');
    setIsfavourite(false);
    await usersRef.doc(uid).update({
      favTitle: firestore.FieldValue.arrayRemove(title),
      favVideos: firestore.FieldValue.arrayRemove(videoId),
      favChannel: firestore.FieldValue.arrayRemove(channel),
      favImage: firestore.FieldValue.arrayRemove(imageUri),
    });
  };

  useEffect(() => {
    setfavHandler();
  }, []);

  const {videoId} = route.params;
  const {title} = route.params;
  const {channel} = route.params;
  const {imageUri} = route.params;
  return (
    <View>
      <View style={styles.videoContainer}>
        <WebView
          source={{uri: `https://www.youtube.com/embed/${videoId}`}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Text style={styles.text}>{title}</Text>
        {isFavourite ? (
          <FavIcon
            name="star"
            size={23}
            color="red"
            style={{top: 30}}
            onPress={() => removeFromfav()}
          />
        ) : (
          <FavIcon
            name="staro"
            size={23}
            color="black"
            style={{top: 30}}
            onPress={() => addtoFav()}
          />
        )}
      </View>
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    height: 200,
  },
  text: {
    fontSize: 20,
    width: Dimensions.get('screen').width - 50,
    margin: 9,
  },
});
