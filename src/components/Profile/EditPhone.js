/* eslint-disable react-native/no-inline-styles */
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../utils/axios';
import { saveUserData } from '../../redux/actions/authActions';

export default function EditPhone({ setModalVisible, data }) {
  const { height } = Dimensions.get('screen');
  const [phone, setPhone] = useState();
  const token = useSelector(state => state.auth.userData.token);
  const userData = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();

  const updatePhone = async () => {
    await axiosInstance
      .put(
        '/users/update',
        { contact: phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        const newData = res.data.data.contact;
        const updatedData = {
          ...userData,
          contact: newData,
        };
        saveUserData(dispatch, updatedData);
        setModalVisible(false);
      });
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
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.53,
            shadowRadius: 13.97,
            elevation: 21,
          }}>
          <TouchableOpacity
            onPress={() => updatePhone()}
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
                  ADD PHONE
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
