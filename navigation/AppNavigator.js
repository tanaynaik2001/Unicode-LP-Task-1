import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Favourites from '../screens/Favourites';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyStack = createStackNavigator();
const MyTab = createBottomTabNavigator();

const Home = () => {
  return (
    <MyTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;
          if (route.name === 'search') {
            return <Ionicons name="ios-search" size={32} color={color} />;
          } else if (route.name === 'favourites') {
            return <MaterialIcons name="favorite" size={32} color={color} />;
          } else {
            return (
              <MaterialCommunityIcons
                name="account-circle"
                size={32}
                color={color}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'grey',
      }}>
      <MyTab.Screen name="search" component={Search} />
      <MyTab.Screen name="favourites" component={Favourites} />
      <MyTab.Screen name="profile" component={Profile} />
    </MyTab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MyStack.Navigator headerMode="none">
        <MyStack.Screen name="login" component={Login} />
        <MyStack.Screen name="signup" component={Signup} />
        <MyStack.Screen name="home" component={Home} />
      </MyStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
