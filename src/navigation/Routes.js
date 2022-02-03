import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { useSelector } from 'react-redux';

export default function Routes() {
  const userData = useSelector(state => state.auth.userData);
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="OnboardingStart">
        {!!userData && userData?.token ? MainStack(Stack) : AuthStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
