import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export default function OnboardingStart({ navigation }) {
  const { height, width } = Dimensions.get('screen');
  const [timer, setTimer] = useState();

  useEffect(() => {
    let timer = setTimeout(() => {
      navigation.navigate('OnboardingEnd');
    }, 3000);
    setTimer(timer);
    return () => clearTimeout(timer);
  }, []);

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
        <View
          style={{
            height: height * 0.04,
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingRight: width * 0.05,
          }}>
          <TouchableOpacity
            onPress={() => {
              clearTimeout(timer);
              navigation.navigate('GetStarted');
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 20,
                  color: 'white',
                }}>
                skip {'>'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: height * 0.0675 }}>
          <Image
            source={require('../assets/images/onboardingstart.png')}
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
            }}>
            Order whatever you need!
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
          <Image
            source={require('../assets/images/slider1.png')}
            style={{ marginTop: 20 }}
          />
        </View>
      </View>
    </View>
  );
}
