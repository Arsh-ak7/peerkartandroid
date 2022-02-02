import React from 'react';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Landing from '../screens/Landing';
import OnboardingStart from '../screens/OnboardingStart';
import OnboardingEnd from '../screens/OnboardingEnd';

export default function (Stack) {
  return (
    <>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="OnboardingStart"
        component={OnboardingStart}
        initialParams={{
          onBoardingScreen: 'start',
        }}
      />
      <Stack.Screen
        name="OnboardingEnd"
        component={OnboardingEnd}
        initialParams={{
          onBoardingScreen: 'end',
        }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </>
  );
}
