import { View, Text, ImageBackground, Image } from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';

export default function PaymentInfo() {
  const { height, width } = Dimensions.get('screen');
  return (
    <View style={{ width: '100%', height: height * 0.34, top: height * 0.23 }}>
      <ImageBackground
        style={{ flex: 1, height: '100%', width: '100%' }}
        source={require('../../assets/images/banking.png')}
      />
    </View>
  );
}
