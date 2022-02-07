import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import constants from '../../redux/constants';

export default function AddPhone({ setModalVisible }) {
  const { height, width } = Dimensions.get('screen');
  const [phone, setPhone] = useState();
  const dispatch = useDispatch();

  const [updatePayments, { loading }] = useMutation(UPDATE_PHONE, {
    variables: {
      userDetailsInput: {
        phone,
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

  const handleUpdatePhone = () => {
    updatePayments();
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
        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
          <FontAwesome
            name="close"
            color="#424347"
            size={32}
            onPress={() => setModalVisible(false)}
          />
        </View>
        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Text
            style={{
              color: '#424347',
              fontSize: 26,
              fontFamily: 'OpenSans-Bold',
            }}>
            Add New phone
          </Text>
        </View>
        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Text
            style={{
              color: '#999999',
              fontSize: 14,
              fontFamily: 'OpenSans-Regular',
            }}>
            Phone Number
          </Text>
          <TextInput
            value={phone}
            onChangeText={text => setPhone(text)}
            placeholder="9876543210"
            placeholderTextColor="#3e3e3e"
            style={{
              color: '#3E3E3E',
              fontSize: 20,
            }}
          />
          <Divider width={0.8} color="#EEE" />
        </View>
        <View
          style={{
            height: height * 0.05,
            marginBottom: height * 0.03,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',

            shadowColor: '#622493',
            alignItems: 'center',
            justifyContent: 'center',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.53,
            shadowRadius: 13.97,
            elevation: 21,
          }}>
          <TouchableOpacity
            onPress={() => handleUpdatePhone()}
            style={{
              width: '95%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
            }}>
            <LinearGradient
              colors={['#BB6BD9', '#BB6BD9', '#151A6A']}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
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
                  {loading ? 'ADDING PHONE' : 'ADD PHONE'}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const UPDATE_PHONE = gql`
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
