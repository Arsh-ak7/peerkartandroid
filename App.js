/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';

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
import { getDecodedData, getToken } from './src/utils/hooks';
import { useState } from 'react';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  const [userData, setUserData] = useState();
  const [token, setToken] = useState();
  const httpLink = createHttpLink({
    uri: 'https://peerkart.herokuapp.com/graphql/',
    // uri: 'http://10.0.2.2:5000/graphql',
  });

  const authLink = setContext(async () => {
    // const token = getToken().then(res => {
    //   return JSON.parse(res);
    // });
    getToken().then(res => setToken(JSON.parse(res)));
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: concat(authLink, httpLink),
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    getToken().then(res => {
      setUserData(getDecodedData(JSON.parse(res)));
    });
  }, []);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
