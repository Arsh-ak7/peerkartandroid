import React from 'react';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Landing from '../screens/Landing';
import OnboardingStart from '../screens/OnboardingStart';
import OnboardingEnd from '../screens/OnboardingEnd';
import { StatusBar } from 'react-native';

export default function (Stack) {
  return (
    <>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen
        name="OnboardingStart"
        component={OnboardingStart}
        initialParams={{
          onBoardingScreen: 'start',
        }}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="OnboardingEnd" component={OnboardingEnd} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </>
  );
}
