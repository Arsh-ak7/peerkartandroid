import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';

export default function GetStarted({ navigation }) {
  const { height, width } = Dimensions.get('screen');

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/images/onboardingbg.png')}
        style={{ flex: 1 }}
      />
      <View
        style={{
          position: 'absolute',
          top: height * 0.075,
        }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/images/logop.png')}
            height={48}
            width={48}
            style={{
              height: 80,
              width: 180,
            }}
          />
        </View>
        <View
          style={{
            paddingTop: height * 0.0375,
            width: width,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: width * 0.2,
          }}>
          <Image
            source={require('../assets/images/getstarted.png')}
            style={{
              width: width,
              height: height * 0.4,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            height: height * 0.5,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 32,
              textAlign: 'center',
              color: '#333333',
              paddingTop: 30,
              paddingLeft: width * 0.1,
              paddingRight: width * 0.1,
            }}>
            Let's order all that you need!
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 16,
              textAlign: 'center',
              color: '#333333',
              paddingTop: 10,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            a elementum sit eu quam vulputate ultricies a.
          </Text>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate('Login')}>
            <View
              style={{
                borderColor: '#eb5757',
                borderRadius: 30,
                borderWidth: 1,
                paddingTop: 7.5,
                paddingBottom: 7.5,
                paddingLeft: 15,
                paddingRight: 15,
              }}>
              <Text
                style={{
                  color: '#eb5757',
                  fontFamily: 'Poppins-Bold',
                  fontSize: 20,
                }}>
                Let's get started {'>'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
