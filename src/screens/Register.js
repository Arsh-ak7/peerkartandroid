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
import LinearGradient from 'react-native-linear-gradient';
import { gql, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import constants from '../redux/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();

  const handleRegister = async registerData => {
    await AsyncStorage.setItem('jwtToken', JSON.stringify(registerData.token));
    dispatch({
      type: constants.LOGIN_SUCCESS,
      payload: registerData,
    });
  };

  const data = useSelector(state => state.auth);

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: data => {
      console.log(data);
      handleRegister(data.register);
    },
    onError: error => {
      dispatch({
        type: constants.REGISTER_FAIL,
        payload: error.graphQLErrors[0].extensions.errors,
      });
    },
    variables: {
      username,
      email,
      password,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
  });

  function addUser() {
    registerUser();
  }

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
            SIGN UP
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              paddingTop: 8,
              paddingLeft: 25,
              paddingBottom: 2,
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
              paddingTop: 8,
              paddingLeft: 25,
              paddingBottom: 2,
              fontFamily: 'Montserrat-Bold',
            }}>
            EMAIL
          </Text>
          <TextInput
            style={{
              height: 40,
              marginLeft: 25,
              marginRight: 25,
              borderWidth: 1,
              borderColor: '#E0E0E0',
            }}
            value={email}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              paddingTop: 8,
              paddingLeft: 25,
              paddingBottom: 2,
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
            }}
            textContentType="password"
            secureTextEntry={true}
            value={password}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
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
          onPress={() => addUser()}>
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
              {loading ? 'SIGNING UP' : 'SIGN UP'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
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
              Already a member? Sign in.
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

const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(
      registerInput: { username: $username, email: $email, password: $password }
    ) {
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
