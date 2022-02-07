import { View, Text, StatusBar, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

export default function Home() {
  const [token, setToken] = useState();
  const data = useSelector(state => state);
  useEffect(() => {
    async function getCred() {
      const token = await AsyncStorage.getItem('jwtToken').then(res => {
        return res;
      });
      setToken(token);
    }
    getCred();
  }, [token]);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
