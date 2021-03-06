import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Landing from '../screens/Landing';
import OnboardingStart from '../screens/OnboardingStart';
import OnboardingEnd from '../screens/OnboardingEnd';
import Login from '../screens/Login';
import CreateOrder from '../components/Home/CreateOrder';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Dashboard from '../screens/Dashboard';
import OrdersAccepted from '../screens/OrdersAccepted';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OrdersPlaced from '../screens/OrdersPlaced';
import { Text, View, Image } from 'react-native';
import GetStarted from '../screens/GetStarted';
import Cart from '../screens/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Routes() {
  const userData = useSelector(state => state.auth.userData);
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  function DashboardScreens() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Dashboard">
        <Stack.Screen component={Dashboard} name="Dashboard" />
        <Stack.Screen component={OrdersAccepted} name="OrdersAccepted" />
        <Stack.Screen component={OrdersPlaced} name="OrdersPlaced" />
        <Stack.Screen component={CreateOrder} name="CreateOrder" />
      </Stack.Navigator>
    );
  }

  function HomeScreens() {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home">
        <Stack.Screen component={Home} name="Home" />
        <Stack.Screen component={CreateOrder} name="CreateOrder" />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {Object.keys(userData).length === 0 ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Landing">
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
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              borderTopWidth: 0,
              borderTopColor: 'white',
              elevation: 0,
              height: 60,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              position: 'absolute',
              backgroundColor: 'transparent',
            },
          }}>
          <Tab.Screen
            name="HomeScreens"
            component={HomeScreens}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign
                    name="home"
                    color="#4F3A57"
                    size={25}
                    style={{
                      marginBottom: 3,
                      alignSelf: 'center',
                    }}
                  />
                </View>
              ),
              tabBarActiveTintColor: 'blue',
            }}
          />
          <Tab.Screen
            name="DashboardScreens"
            component={DashboardScreens}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Feather name="bar-chart-2" size={25} color="#4F3A57" />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome name="opencart" size={25} color="#4F3A57" />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Tracker"
            component={Dashboard}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons name="location-outline" size={25} color="#4F3A57" />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign
                    name="user"
                    color="#4F3A57"
                    size={25}
                    style={{
                      marginBottom: 3,
                      alignSelf: 'center',
                    }}
                  />
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

const Icon = props => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <AntDesign
      name={props.icon}
      color="black"
      size={25}
      style={{
        marginBottom: 3,
        alignSelf: 'center',
      }}
    />
  </View>
);
