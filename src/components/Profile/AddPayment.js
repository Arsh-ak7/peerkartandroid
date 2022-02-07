import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import constants from '../../redux/constants';

export default function AddPayment({ setModalVisible }) {
  const { height, width } = Dimensions.get('screen');
  const [paymentType, setBankName] = useState('');
  const [paymentId, setUpiId] = useState('');
  const dispatch = useDispatch();

  const [updatePayments, { loading }] = useMutation(UPDATE_PAYMENTS, {
    variables: {
      userDetailsInput: {
        payments: {
          paymentType: paymentType,
          paymentId: paymentId,
        },
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

  const handleUpdatePayments = () => {
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
            Add New UPI ID
          </Text>
        </View>
        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Text
            style={{
              color: '#999999',
              fontSize: 14,
              fontFamily: 'OpenSans-Regular',
            }}>
            Name of Bank
          </Text>
          <TextInput
            value={paymentType}
            onChangeText={text => setBankName(text)}
            placeholder="ABC Bank"
            placeholderTextColor="#3e3e3e"
            style={{
              color: '#3E3E3E',
              fontSize: 20,
            }}
          />
          <Divider width={0.8} color="#EEE" />
        </View>
        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Text
            style={{
              color: '#999999',
              fontSize: 14,
              fontFamily: 'OpenSans-Regular',
            }}>
            UPI ID
          </Text>
          <TextInput
            value={paymentId}
            onChangeText={text => setUpiId(text)}
            placeholder="1234 4567 7890"
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
            onPress={() => handleUpdatePayments()}
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
                  {loading ? 'ADDING UPI' : 'ADD UPI'}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const UPDATE_PAYMENTS = gql`
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
