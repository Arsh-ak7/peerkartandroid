import {
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import constants from '../redux/constants';
import { gql, useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';

export default function Login({ navigation }) {
  const { width, height } = Dimensions.get('screen');
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      setError(error.graphQLErrors[0].extensions.errors);
      setModalVisible(true);
      dispatch({
        type: constants.LOGIN_FAIL,
        payload: error.graphQLErrors[0].extensions.errors,
      });
    },
  });

  const [modalVisible, setModalVisible] = useState(false);

  const loginUser = () => {
    userLogin();
  };

  const LoginError = () => (
    <Modal
      animationType="fade"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => setModalVisible(false)}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
        <StatusBar
          translucent
          backgroundColor="rgba(0,0,0,0.3)"
          barStyle="light-content"
        />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: '20%',
              backgroundColor: 'white',
              width: '96%',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {Object.keys(error).length > 0 && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {Object.values(error).map(value => (
                  <Text
                    key={value}
                    style={{
                      color: 'black',
                      fontSize: 20,
                      fontFamily: 'Mulish-Bold',
                      textTransform: 'uppercase',
                      padding: 5,
                    }}>
                    {value}
                  </Text>
                ))}
              </View>
            )}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ width: '60%', padding: 10 }}>
              <View
                style={{
                  backgroundColor: '#eb5757',
                  height: 40,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'OpenSans-Bold',
                    textTransform: 'uppercase',
                  }}>
                  BACK TO LOGIN
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', marginTop: height * 0.1 }}>
        <Text
          style={{ color: 'black', fontSize: 36, fontFamily: 'Poppins-Bold' }}>
          Hello Again!
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 24,
            fontFamily: 'Poppins-Regular',
            textAlign: 'center',
            width: '80%',
          }}>
          Welcome back, you have been missed!
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
            borderColor: '#eb575788',
            color: 'black',
            paddingLeft: 10,
          }}
          value={username}
          placeholder="Username"
          onChangeText={text => setUsername(text)}
          placeholderTextColor={'black'}
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
            borderColor: '#eb575788',
            color: 'black',
            paddingLeft: 10,
          }}
          textContentType="password"
          placeholderTextColor={'black'}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
          placeholder="Password"
        />
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity>
          <View
            style={{ paddingTop: height * 0.02, paddingRight: width * 0.08 }}>
            <Text style={{ color: 'black', fontFamily: 'Poppins-Bold' }}>
              Forgot password?
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', paddingTop: height * 0.01 }}>
        <TouchableOpacity onPress={() => loginUser()}>
          <View
            style={{
              backgroundColor: '#eb5757',
              width: width * 0.4,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 15,
                paddingRight: 15,
                fontFamily: 'Poppins-Bold',
              }}>
              {loading ? 'LOGGING IN' : 'LOGIN'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{ flex: 0.2, height: 1, backgroundColor: 'black' }} />
        <View>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 20,
              paddingBottom: 20,
              fontFamily: 'Poppins-Bold',
            }}>
            Or continue with
          </Text>
        </View>
        <View style={{ flex: 0.2, height: 1, backgroundColor: 'black' }} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            width: '80%',
          }}>
          <View
            style={{
              borderRadius: 5,
              borderColor: '#eb575766',
              borderWidth: 1,
            }}>
            <TouchableOpacity>
              <View style={{ padding: 10 }}>
                <Image source={require('../assets/images/google.png')} />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderRadius: 5,
              borderColor: '#eb575766',
              borderWidth: 1,
            }}>
            <TouchableOpacity>
              <View style={{ padding: 10 }}>
                <Image source={require('../assets/images/meta.png')} />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderRadius: 5,
              borderColor: '#eb575766',
              borderWidth: 1,
            }}>
            <TouchableOpacity>
              <View style={{ padding: 10 }}>
                <Image source={require('../assets/images/apple.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: height * 0.06,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{ color: 'black', fontSize: 16, fontFamily: 'Poppins-Bold' }}>
          Not a member?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <View>
            <Text
              style={{
                color: '#eb5757',
                fontSize: 16,
                fontFamily: 'Poppins-Bold',
              }}>
              Register here!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Image
          source={require('../assets/images/orangebox.png')}
          style={{ height: 120, width: 120, resizeMode: 'contain' }}
        />
      </View>
      <LoginError />
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
