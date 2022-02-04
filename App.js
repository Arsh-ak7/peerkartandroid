/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';

import RootNavigation from './navigation';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  concat,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUserData } from './src/redux/actions/authActions';
import { Provider } from 'react-redux';
import Routes from './src/navigation/Routes';
import store from './src/redux/store';

const httpLink = createHttpLink({
  uri: 'https://peerkart.herokuapp.com/graphql/',
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
  // uri: 'https://peerkart.herokuapp.com/graphql/',
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

// useEffect(() => {
//   (async () => {
//     const userData = await AsyncStorage.getItem('jwtToken');
//     console.log(userData);
//     if (!!userData) {
//       saveUserData(userData);
//     }
//   })();
// }, []);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        {/* <RootNavigation /> */}
        <Routes />
      </Provider>
    </ApolloProvider>
  );
};

export default App;
