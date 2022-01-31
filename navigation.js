import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Landing from './src/screens/Landing';
import Home from './src/screens/Home';
import Onboarding from './src/screens/Onboarding';
import Login from './src/screens/Login';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RootNavigation() {
  const Stack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };
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
          component={Onboarding}
          initialParams={{
            onBoardingScreen: 'start',
          }}
        />
        <Stack.Screen
          name="OnboardingEnd"
          component={Onboarding}
          initialParams={{
            onBoardingScreen: 'end',
          }}
        />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
