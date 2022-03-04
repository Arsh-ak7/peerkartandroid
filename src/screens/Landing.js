import {
  View,
  Text,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Dimensions } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Landing({ navigation, route }) {
  const { height, width } = Dimensions.get('screen');
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground
        source={require('../assets/images/onboardingbg.png')}
        style={{ flex: 1 }}
      />
      <View
        style={{
          position: 'absolute',
          top: height * 0.08,
          left: width * 0.05,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 48,
            fontFamily: 'Montserrat-Bold',
          }}>
          PEERKART IS HERE!
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('OnboardingStart')}>
          <View
            style={{
              backgroundColor: 'white',
              height: height * 0.04,
              width: width * 0.4,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              marginTop: height * 0.02,
            }}>
            <Text
              style={{
                color: '#eb5757',
                fontSize: height * 0.0175,
                fontFamily: 'Montserrat-Bold',
              }}>
              Tap to Proceed
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: height * 0.2 }}>
          <Image
            source={require('../assets/images/landinggirl.png')}
            style={{
              height: height * 0.4,
              width: width,
            }}
          />
        </View>
      </View>
    </View>
  );
}
