import Home from '../screens/Home';
import React from 'react';
import { View } from 'react-native';

export default function (Stack) {
  return (
    <>
      <Stack.Screen name="Home" component={Home} />
    </>
  );
}
