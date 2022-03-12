/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Routes from './src/navigation/Routes';
import { getDecodedData, getToken } from './src/utils/hooks';
import { useState } from 'react';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    getToken().then(res => {
      setUserData(getDecodedData(JSON.parse(res)));
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
