/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { useSelector } from 'react-redux';

export default function Cart() {
  const { height, width } = Dimensions.get('screen');
  const cart = useSelector(state => state.cart);
  return (
    <View>
      {cart.items.length === 0 ? (
        <View>
          <Text>Cart is empty</Text>
        </View>
      ) : (
        <View style={{ paddingLeft: width * 0.06, paddingRight: width * 0.06 }}>
          <TouchableOpacity>
            <View style={{ marginTop: height * 0.06, height: height * 0.035 }}>
              <Ionicons name="arrow-back" color={'black'} size={26} />
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: height * 0.015,
              height: height * 0.075,
            }}>
            <Text
              style={{
                color: '#4F3A57',
                fontSize: 36,
                fontFamily: 'OpenSans-Regular',
              }}>
              Items in{' '}
            </Text>
            <Text
              style={{
                color: '#4F3A57',
                fontSize: 36,
                fontFamily: 'OpenSans-Bold',
              }}>
              Cart
            </Text>
          </View>
          <View style={{ paddingTop: height * 0.03, height: height * 0.1 }}>
            <Text
              style={{
                color: '#4F3A57',
                fontSize: 28,
                fontFamily: 'OpenSans-Regular',
                textTransform: 'uppercase',
              }}>
              {cart.category}
            </Text>
          </View>
          <ScrollView style={{ height: height * 0.5 }}>
            {cart.items.map((item, key) => (
              <View
                key={key}
                style={{
                  shadowColor: '#eb5757',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.8,
                  shadowRadius: 4.41,
                  elevation: 2,
                  padding: 10,
                  marginTop: 20,
                  backgroundColor: 'white',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-evenly',
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../assets/icons/grocery.png')}
                      style={{ height: 40, width: 40 }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.5,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 18,
                        textTransform: 'uppercase',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      {item.itemName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.2,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 20,
                        textTransform: 'uppercase',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      {item.itemQty}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ padding: 5, paddingBottom: 10 }}>
                      <Image
                        source={require('../assets/icons/edit.png')}
                        style={{ height: 18, width: 18, padding: 10 }}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ padding: 5, paddingBottom: 10 }}>
                      <Image
                        source={require('../assets/icons/delete.png')}
                        style={{ height: 18, width: 18, padding: 10 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={{ alignItems: 'center', paddingTop: height * 0.01 }}>
            <TouchableOpacity>
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
                  CHECKOUT
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
