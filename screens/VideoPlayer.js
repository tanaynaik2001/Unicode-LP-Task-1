import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

const VideoPlayer = ({route}) => {
  const {videoId} = route.params;
  const {title} = route.params;
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
      <Text style={styles.text}>{title}</Text>
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
