import React from 'react';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainStack from './MainStack';
import AuthStack from './AuthStack';

export default function Routes() {
  const userData = false;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!!userData && userData?.access_token
          ? MainStack(Stack)
          : AuthStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
