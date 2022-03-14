/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeInfo({ setAddPhoneModal }) {
  const { height, width } = Dimensions.get('screen');
  const userData = useSelector(state => state.auth.userData);
  return (
    <View
      style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '90%',
            height: height * 0.24,
            backgroundColor: 'white',
            position: 'absolute',
            top: height * 0.034,
            borderRadius: 10,

            shadowColor: '#eb5757',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.53,
            shadowRadius: 13.97,
            elevation: 21,
          }}>
          <View
            style={{
              alignItems: 'center',
              position: 'relative',
              top: -height * 0.075,
              width: '100%',
            }}>
            <Image
              source={require('../../assets/images/avatar.png')}
              height={50}
              width={50}
              style={{ zIndex: 77 }}
            />
            <Text
              style={{
                color: 'black',
                zIndex: 77,
                fontSize: 16,
                paddingTop: 2,
                fontFamily: 'Montserrat-Bold',
              }}>
              {userData.username}
            </Text>
            {userData.contact.length > 0 ? (
              <Text
                style={{
                  color: 'black',
                  zIndex: 77,
                  fontSize: 12,

                  fontFamily: 'Montserrat-Bold',
                }}>
                {userData.contact[0]}
              </Text>
            ) : (
              <TouchableOpacity onPress={() => setAddPhoneModal(true)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons
                    name="add-circle-outline"
                    color="black"
                    style={{ paddingRight: 5 }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: 12,
                      color: 'black',
                    }}>
                    ADD PHONE
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            <View
              style={{
                width: '100%',
                height: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 77,
                top: -height * 0.007,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '90%',
                  height: '80%',
                  backgroundColor: 'white',
                  borderRadius: 10,

                  alignItems: 'center',
                  //   justifyContent: 'center',
                  shadowColor: '#eb5757',
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.53,
                  shadowRadius: 13.97,
                  elevation: 21,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/logo.png')}
                    height={50}
                    width={50}
                  />
                  <View
                    style={{
                      paddingLeft: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'OpenSans-Bold',
                        fontSize: 14,
                        color: '#bdbdbd',
                      }}>
                      COINS
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'OpenSans-Bold',
                        fontSize: 20,
                        color: 'black',
                      }}>
                      855
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      paddingRight: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'OpenSans-Bold',
                        fontSize: 14,
                        color: '#bdbdbd',
                      }}>
                      TIME SAVED
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'OpenSans-Bold',
                        fontSize: 20,
                        color: 'black',
                      }}>
                      855
                    </Text>
                  </View>
                  <Image
                    source={require('../../assets/images/trending.png')}
                    height={50}
                    width={50}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
