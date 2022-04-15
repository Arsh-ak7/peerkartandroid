/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StatusBar,
  Modal,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import axiosInstance from '../utils/axios';

export default function Register({ navigation }) {
  const { height, width } = Dimensions.get('screen');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    axiosInstance
      .post('/auth/signup', {
        username,
        email,
        password,
        confirmPassword: password,
      })
      .then(res => {
        setLoading(false), navigation.navigate('Login');
      })
      .catch(error => {
        setLoading(false);
        setError({ error: error.response.data.error.msg });
        setModalVisible(true);
      });
  };

  const RegisterError = () => (
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
              height: '30%',
              backgroundColor: 'white',
              width: '96%',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 25,
              paddingBottom: 25,
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
                      textAlign: 'center',
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
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}>
                  BACK TO REGISTER
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
      <View style={{ alignItems: 'center', marginTop: height * 0.08 }}>
        <Text
          style={{ color: 'black', fontSize: 36, fontFamily: 'Poppins-Bold' }}>
          Hi There!
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 24,
            fontFamily: 'Poppins-Regular',
            textAlign: 'center',
            width: '80%',
          }}>
          Glad to see you coming on board with us!
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
            paddingTop: 12,
            paddingLeft: 25,
            paddingBottom: 10,
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
            borderColor: '#eb575788',
            color: 'black',
            paddingLeft: 10,
          }}
          value={email}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          placeholderTextColor={'black'}
        />
      </View>
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            paddingTop: 12,
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
      <View style={{ alignItems: 'center', paddingTop: height * 0.02 }}>
        <TouchableOpacity onPress={() => handleRegister()}>
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
              {loading ? 'SIGNING UP' : 'SIGN UP'}
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
          Already a member?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <View>
            <Text
              style={{
                color: '#eb5757',
                fontSize: 16,
                fontFamily: 'Poppins-Bold',
              }}>
              Login here!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Image
          source={require('../assets/images/bluebox.png')}
          style={{ height: 120, width: 120, resizeMode: 'contain' }}
        />
      </View>
      <RegisterError />
    </View>
  );
}
