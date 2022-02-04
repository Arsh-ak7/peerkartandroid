import { View, Text, Image, StatusBar } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function OnboardingStart({ navigation, route }) {
  // const ICON =
  //   route.name === 'OnboardingStart'
  //     ? require('../assets/images/onboardingstart.png')
  //     : require('../assets/images/onboardingend.png');

  // const REDIRECT = route.name === 'OnboardingStart' ? 'OnboardingEnd' : 'Login';

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View
        style={{ flex: 0.55, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={require('../assets/images/onboardingstart.png')}
          style={{
            height: 300,
            width: 200,
          }}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 0.15,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 32,
            fontFamily: 'Mulish-Bold',
            width: '80%',
            textAlign: 'center',
          }}>
          Track your work and get the results
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontFamily: 'Mulish-Regular',
            width: '80%',
            textAlign: 'center',
            paddingTop: 10,
          }}>
          Remember to keep track of your professional accomplishments
        </Text>
      </View>
      <View
        style={{
          flex: 0.3,
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
          <View
            style={{
              backgroundColor: '#fff',
              height: 50,
              width: 120,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: '500',
                fontFamily: 'Mulish-Bold',
              }}>
              SKIP
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('OnboardingEnd')}>
          <View
            style={{
              backgroundColor: '#000',
              height: 50,
              width: 100,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '500',
                fontFamily: 'Mulish-Bold',
              }}>
              NEXT
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
