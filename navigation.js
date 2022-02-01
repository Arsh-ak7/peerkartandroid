import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Landing from './src/screens/Landing';
import Home from './src/screens/Home';
import OnboardingStart from './src/screens/OnboardingStart';
import OnboardingEnd from './src/screens/OnboardingEnd';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

export default function RootNavigation() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnboardingStart"
        screenOptions={{
          headerShown: false,
        }}>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
