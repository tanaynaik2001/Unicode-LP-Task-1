import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';

const Search = () => {
  const [search, setSearch] = useState({});
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${value}&type=video&key=AIzaSyDHOdoCrK5d-A2g4Ooj7vU8uo70rZ05lIg`,
    );
    const data = await response.json();
    setSearch(data.items);
    // console.log(search);
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textContainer}
          placeholder="Search Youtube"
          value={value}
          onChangeText={(text) => setValue(text)}
        />
        <Ionicons
          style={styles.subIcon}
          name="ios-search"
          size={27}
          onPress={fetchData}
        />
      </View>
      {loading ? <ActivityIndicator size="large" color="red" /> : null}
      <FlatList
        keyExtractor={(item) => item.id.videoId}
        data={search}
        renderItem={(itemData) => {
          return (
            <Card
              videoId={itemData.item.id.videoId}
              title={itemData.item.snippet.title}
              channel={itemData.item.snippet.channelTitle}
            />
          );
        }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    borderBottomWidth: 0.5,
  },
  textContainer: {
    width: '90%',
    fontSize: 20,
  },
  subIcon: {
    marginTop: 10,
  },
});
