import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/client';
import constants from '../../redux/constants';

export default function AddAddress({ setModalVisible }) {
  const { height, width } = Dimensions.get('screen');
  const [addressLineOne, setAddressLineOne] = useState('');
  const [addressLineTwo, setAddressLineTwo] = useState('');
  const [addressLineThree, setAddressLineThree] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const dispatch = useDispatch();

  const completeAddress = [
    addressLineOne,
    addressLineTwo,
    addressLineThree,
    city,
    postalCode,
  ].join(' ');

  const [updateAddress, { loading }] = useMutation(UPDATE_ADDRESS, {
    variables: {
      userDetailsInput: {
        address: completeAddress,
      },
    },
    onCompleted: data => {
      dispatch({
        type: constants.LOGIN_SUCCESS,
        payload: data.updateUserDetails,
      });
      setModalVisible(false);
    },
    onError: err => console.log(err),
  });

  const handleAddressUpdate = () => {
    updateAddress();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.7)',
      }}>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0.7)"
        barStyle="light-content"
      />
      <View
        style={{
          backgroundColor: 'white',
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
        }}>
        <View style={{ paddingTop: 5, paddingBottom: 5 }}>
          <FontAwesome
            name="close"
            color="#424347"
            size={32}
            onPress={() => setModalVisible(false)}
          />
        </View>
        <View style={{ paddingTop: 5, paddingBottom: 5 }}>
          <Text
            style={{
              color: '#424347',
              fontSize: 24,
              fontFamily: 'OpenSans-Bold',
            }}>
            ADD NEW ADDRESS
          </Text>
        </View>
        <View style={{ paddingTop: 5, paddingBottom: 5 }}>
          <Text
            style={{
              color: '#999999',
              fontSize: 14,
              fontFamily: 'OpenSans-Regular',
            }}>
            Address line 1
          </Text>
          <TextInput
            value={addressLineOne}
            onChangeText={text => setAddressLineOne(text)}
            placeholder="House 7, Mellow Street"
            placeholderTextColor="#3e3e3e"
            style={{
              color: '#3E3E3E',
              fontSize: 18,
            }}
          />
          <Divider width={0.8} color="#eb5757" />
        </View>
        <View style={{ paddingTop: 5, paddingBottom: 5 }}>
          <Text
            style={{
              color: '#999999',
              fontSize: 14,
              fontFamily: 'OpenSans-Regular',
            }}>
            Address line 2
          </Text>
          <TextInput
            value={addressLineTwo}
            onChangeText={text => setAddressLineTwo(text)}
            placeholder="Near Street View Cafe"
            placeholderTextColor="#3e3e3e"
            style={{
              color: '#3E3E3E',
              fontSize: 18,
            }}
          />
          <Divider width={0.8} color="#eb5757" />
        </View>
        <View style={{ paddingTop: 5, paddingBottom: 5 }}>
          <Text
            style={{
              color: '#999999',
              fontSize: 14,
              fontFamily: 'OpenSans-Regular',
            }}>
            Address line 3
          </Text>
          <TextInput
            value={addressLineThree}
            onChangeText={text => setAddressLineThree(text)}
            placeholder="Major Park, London - 78"
            placeholderTextColor="#3e3e3e"
            style={{
              color: '#3E3E3E',
              fontSize: 18,
            }}
          />
          <Divider width={0.8} color="#eb5757" />
        </View>
        <View style={{ paddingTop: 5, paddingBottom: 5 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: '50%' }}>
              <Text
                style={{
                  color: '#999999',
                  fontSize: 14,
                  fontFamily: 'OpenSans-Regular',
                }}>
                City
              </Text>
              <TextInput
                value={city}
                onChangeText={text => setCity(text)}
                placeholder="London"
                placeholderTextColor="#3e3e3e"
                style={{
                  color: '#3E3E3E',
                  fontSize: 20,
                }}
              />
            </View>
            <View style={{ paddingRight: width * 0.04, width: '50%' }}>
              <Text
                style={{
                  color: '#999999',
                  fontSize: 14,
                  fontFamily: 'OpenSans-Regular',
                }}>
                Postal code
              </Text>
              <TextInput
                value={postalCode}
                onChangeText={text => setPostalCode(text)}
                placeholder="800020"
                placeholderTextColor="#3e3e3e"
                style={{
                  color: '#3E3E3E',
                  fontSize: 20,
                }}
              />
            </View>
          </View>
          <Divider width={0.8} color="#eb5757" />
        </View>
        <View
          style={{
            height: height * 0.05,
            marginBottom: height * 0.03,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#622493',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.53,
            shadowRadius: 13.97,
            elevation: 21,
          }}>
          <TouchableOpacity
            onPress={() => handleAddressUpdate()}
            style={{
              width: '95%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
            }}>
            <View
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#eb5757',
              }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontFamily: 'OpenSans-Bold',
                  }}>
                  {loading ? 'ADDING ADDRESS' : 'ADD ADDRESS'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const UPDATE_ADDRESS = gql`
  mutation Mutation($userDetailsInput: UserDetailsInput) {
    updateUserDetails(userDetailsInput: $userDetailsInput) {
      payments {
        paymentType
        paymentId
      }
      id
      username
      email
      token
      createdAt
      address
      points
      phone
    }
  }
`;
