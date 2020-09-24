import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Card = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('videoPlayer', {
          videoId: props.videoId,
          title: props.title,
        });
      }}>
      <View style={styles.cardContainer}>
        <Image
          source={{
            uri: `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`,
          }}
          style={{width: '45%', height: 100}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.titleText} ellipsizeMode="tail">
            {props.title}
          </Text>
          <Text style={styles.channelText}>{props.channel}</Text>
        </View>
        {/* <Text>Hello World here is youtube clone</Text>
        <Text>This is youtube clone</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    margin: 10,
    marginBottom: 0,
  },
  textContainer: {
    paddingLeft: 7,
  },
  titleText: {
    fontSize: 17,
    width: Dimensions.get('screen').width / 2,
  },
  channelText: {
    fontSize: 13,
  },
});
