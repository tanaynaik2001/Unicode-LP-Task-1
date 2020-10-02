import React, {useState, useEffect} from 'react';
import AppNavigator from './navigation/AppNavigator';
import auth from '@react-native-firebase/auth';
const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return <AppNavigator />;
};

export default App;
