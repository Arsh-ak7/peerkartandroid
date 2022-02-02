import Home from './src/screens/Home';
import React from 'react';

export default function (Stack) {
  return (
    <>
      <Stack.Screen name="Home" component={Home} />
    </>
  );
}
