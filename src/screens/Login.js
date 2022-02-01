import {
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function Login({ navigation }) {
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
            }}
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
            }}
            textContentType="password"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingTop: 20,
          }}>
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
              LOGIN
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
