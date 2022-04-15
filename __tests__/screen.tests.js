import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Landing from '../src/screens/Landing';
import OnboardingStart from '../src/screens/OnboardingStart';
import OnboardingEnd from '../src/screens/OnboardingEnd';
import Login from '../src/screens/Login';
import Register from '../src/screens/Register';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '../src/redux/reducers/authReducer';
import { cartReducer } from '../src/redux/reducers/cartReducers';
import Cart from '../src/screens/Cart';
import Home from '../src/screens/Home';

const reducers = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

it('Landing renders correctly', () => {
  renderer.create(<Landing />);
});

it('Onboarding Start renders correctly', () => {
  renderer.create(<OnboardingStart />);
});

it('Onboarding End renders correctly', () => {
  renderer.create(<OnboardingEnd />);
});

it('Login renders correctly', () => {
  const store = configureStore({ reducer: reducers });
  renderer.create(
    <Provider store={store}>
      <Login />
    </Provider>,
  );
});

it('Register renders correctly', () => {
  const store = configureStore({ reducer: reducers });
  renderer.create(
    <Provider store={store}>
      <Register />
    </Provider>,
  );
});

it('Home renders correctly', () => {
  const store = configureStore({ reducer: reducers });
  renderer.create(
    <Provider store={store}>
      <Home />
    </Provider>,
  );
});

it('Cart renders correctly', () => {
  const store = configureStore({ reducer: reducers });
  renderer.create(
    <Provider store={store}>
      <Cart />
    </Provider>,
  );
});
