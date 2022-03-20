/* eslint-disable react-native/no-inline-styles */
import { View, StatusBar, Text, Dimensions, Image } from 'react-native';
import React, { useRef } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Tracking() {
  const { height, width } = Dimensions.get('screen');
  const mapRef = useRef(null);
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={{ flex: 0.55 }}>
        <MapView
          ref={mapRef => (mapRef === null ? null : mapRef.fitToElements(true))}
          provider={PROVIDER_GOOGLE}
          style={{
            flex: 1,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
        />
      </View>
      <View style={{ flex: 0.45 }}>
        <View
          style={{
            width: width,
            alignItems: 'center',
            height: '40%',
            top: 25,
          }}>
          <View
            style={{
              shadowColor: '#eb5757',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              borderRadius: 5,
              shadowOpacity: 0.8,
              shadowRadius: 4.41,
              elevation: 6,
              padding: 10,
              paddingLeft: 20,
              paddingRight: 20,
              backgroundColor: 'white',
            }}>
            <Text style={{ fontFamily: 'Poppins-Regular', color: 'black' }}>
              Your order has been accepted!
            </Text>
          </View>
          <View style={{ padding: 25 }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 20,
                color: 'black',
              }}>
              Order #OrderName
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: width * 0.8,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../assets/images/phone.png')}
                height={48}
                width={48}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 20,
                  color: 'black',
                  paddingLeft: 20,
                }}>
                Arsh Kumar
              </Text>
            </View>
            <TouchableOpacity>
              <Image
                source={require('../assets/images/phone.png')}
                height={48}
                width={48}
                style={{ resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
