import {
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import constants from '../redux/constants';
import { gql, useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async loginData => {
    await AsyncStorage.setItem('jwtToken', JSON.stringify(loginData.token));
    dispatch({
      type: constants.LOGIN_SUCCESS,
      payload: loginData,
    });
  };

  const [userLogin, { loading }] = useMutation(LOGIN_USER, {
    variables: {
      username,
      password,
    },
    onCompleted: data => {
      handleLogin(data.login);
      // dispatch({
      //   type: constants.LOGIN_SUCCESS,
      //   payload: data.login,
      // });
      // navigation.navigate('Home');
    },
    onError: error => {
      //  console.log(error);
      dispatch({
        type: constants.LOGIN_FAIL,
        payload: error.graphQLErrors[0].extensions.errors,
      });
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  });

  const loginUser = () => {
    userLogin();
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/images/login.png')}
        style={{
          flex: 0.55,
          height: '100%',
          width: '100%',
        }}
      />
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          width: '100%',
          zIndex: 888,
          height: 450,
          bottom: 0,
        }}>
        <View
          style={{
            paddingTop: 20,
          }}>
          <Text
            style={{
              fontSize: 32,
              fontFamily: 'Mulish-Bold',
              color: 'black',
              textAlign: 'center',
            }}>
            LOGIN
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              paddingTop: 24,
              paddingLeft: 25,
              paddingBottom: 10,
              fontFamily: 'Montserrat-Bold',
            }}>
            USERNAME
          </Text>
          <TextInput
            style={{
              height: 40,
              marginLeft: 25,
              marginRight: 25,
              borderWidth: 1,
              borderColor: '#E0E0E0',
              color: 'black',
            }}
            value={username}
            placeholder="Username"
            onChangeText={text => setUsername(text)}
          />
        </View>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              paddingTop: 24,
              paddingLeft: 25,
              paddingBottom: 10,
              fontFamily: 'Montserrat-Bold',
            }}>
            PASSWORD
          </Text>
          <TextInput
            style={{
              height: 40,
              marginLeft: 25,
              marginRight: 25,
              borderWidth: 1,
              borderColor: '#E0E0E0',
              color: 'black',
            }}
            textContentType="password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
            placeholder="Password"
          />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingTop: 20,
          }}
          onPress={() => loginUser()}>
          <LinearGradient
            colors={['#BB6BD9', '#151A6A']}
            style={{
              height: 50,
              width: 340,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '500',
                fontFamily: 'Mulish-Bold',
              }}>
              {loading ? 'LOGGING IN' : 'LOGIN'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{
            paddingTop: 15,
            marginLeft: 25,
            marginRight: 25,
          }}>
          <View style={{ width: '100%' }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Mulish-Bold',
                color: 'black',
                textAlign: 'right',
              }}>
              New Here? Sign up here.
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingTop: 15,
            marginLeft: 25,
            marginRight: 25,
          }}>
          <View style={{ width: '100%' }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Mulish-Bold',
                color: 'black',
                textAlign: 'right',
              }}>
              Forgot Password?
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
      address
      phone
      payments {
        paymentType
        paymentId
      }
      points
    }
  }
`;
