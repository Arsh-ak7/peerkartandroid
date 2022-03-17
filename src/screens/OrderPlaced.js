/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';

export default function OrderPlaced({ navigation }) {
  const { height, width } = Dimensions.get('screen');
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ marginTop: height * 0.1, alignItems: 'center' }}>
        <Image
          source={require('../assets/images/orderplaced.png')}
          style={{
            width: width * 0.8,
            height: height * 0.4,
          }}
        />
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 24,
            color: '#eb5757',
            width: width * 0.7,
            textAlign: 'center',
          }}>
          Wohoo !
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            color: '#00000088',
            width: width * 0.7,
            textAlign: 'center',
          }}>
          Your order has been placed
        </Text>
        <View style={{ alignItems: 'center', paddingTop: height * 0.1 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View
              style={{
                backgroundColor: '#eb5757',
                width: width * 0.6,
                borderRadius: 10,
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
                CONTINUE BROWSING
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
