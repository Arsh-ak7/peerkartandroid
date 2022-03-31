/* eslint-disable react-native/no-inline-styles */
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../utils/axios';
import { saveUserData } from '../../redux/actions/authActions';

export default function EditAddress({ setModalVisible, data }) {
  const { height, width } = Dimensions.get('screen');
  const [addressLineOne, setAddressLineOne] = useState('');
  const [addressLineTwo, setAddressLineTwo] = useState('');
  const [addressLineThree, setAddressLineThree] = useState('');
  const [city, setCity] = useState(data.address.split(' '));
  const [postalCode, setPostalCode] = useState(data.address.split(' '));
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.userData.token);
  const userData = useSelector(state => state.auth.userData);

  useEffect(() => {
    const newData = data.address.split(' ');
    const len = data.address.split(' ').length;
    setPostalCode(newData[len - 1]);
    setCity(newData[len - 2]);
    const subOne = newData.slice(0, 2);
    const lineOne = subOne.join(' ');
    setAddressLineOne(lineOne);
    const subTwo = newData.slice(2, 5);
    const lineTwo = subTwo.join(' ');
    setAddressLineTwo(lineTwo);
    const subThree = newData.slice(5, 8);
    const lineThree = subThree.join(' ');
    setAddressLineThree(lineThree);
  }, []);

  const completeAddress = [
    addressLineOne,
    addressLineTwo,
    addressLineThree,
    city,
    postalCode,
  ].join(', ');

  const updateAddress = async () => {
    const newAddress = {
      address: completeAddress,
    };
    await axiosInstance
      .put(
        '/users/update',
        { address: newAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        const newData = res.data.data.address;
        const updatedData = {
          ...userData,
          address: newData,
        };
        saveUserData(dispatch, updatedData);
        setModalVisible(false);
      })
      .catch(err => console.log(err));
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
            EDIT ADDRESS
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
            onPress={() => updateAddress()}
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
                  SAVE CHANGES
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
