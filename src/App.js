/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';

import RootNavigation from '../navigation';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUserData } from '../redux/actions/authActions';
import { Provider } from 'react-redux';
import store from './redux/store';

const httpLink = createHttpLink({
  uri: 'https://peerkart.herokuapp.com/',
});

const authLink = setContext(async () => {
  const token = await AsyncStorage.getItem('jwtToken');

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});
// Initialize Apollo Client
const client = new ApolloClient({
  uri: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

useEffect(() => {
  (async () => {
    const userData = await AsyncStorage.getItem('jwtToken');
    console.log(userData);
    if (!!userData) {
      saveUserData(userData);
    }
  })();
}, []);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </ApolloProvider>
  );
};

export default App;
