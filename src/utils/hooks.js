import React from 'react';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDecodedData = token => {
  const decodedData = jwtDecode(token);
  if (decodedData.exp * 1000 < Date.now()) {
    return {};
  }
  return decodedData;
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('jwtToken');
  } catch (err) {
    return err;
  }
};
