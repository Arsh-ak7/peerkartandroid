/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { Dimensions } from 'react-native';
import axiosInstance from '../../utils/axios';
import { useSelector } from 'react-redux';

export default function OrderView({ setModalVisible, orderDetails }) {
  const { height, width } = Dimensions.get('screen');
  const token = useSelector(state => state.auth.userData.token);
  const handleOrderAccept = async () => {
    await axiosInstance
      .put(
        '/orders/' + orderDetails._id + '/accept',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        setModalVisible(false);
      })
      .catch(err => console.log(err.response.data));
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0.3)"
        barStyle="light-content"
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: 'white',
            height: '70%',
            width: '96%',
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <View style={{ paddingLeft: 10 }}>
                <Ionicons name="arrow-back" size={36} color="black" />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: 'black',
                fontSize: 28,
                textAlign: 'center',
                width: '100%',
                paddingRight: 40,
              }}>
              {orderDetails.name}
            </Text>
          </View>
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'OpenSans-Medium',
                  fontSize: 20,

                  paddingBottom: 10,
                }}>
                Order Generated By: {orderDetails.generatedBy.username}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'OpenSans-Medium',
                  fontSize: 20,
                  paddingBottom: 10,
                }}>
                Order Category: {orderDetails.category}
              </Text>
            </View>
            <View style={{ paddingBottom: 10 }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'OpenSans-Medium',
                  fontSize: 26,
                }}>
                Items In Order
              </Text>
            </View>
            <ScrollView
              style={{
                height: height * 0.225,
              }}>
              {orderDetails.items.map((orderItem, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 5,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Rubik-Medium',
                      textTransform: 'uppercase',
                      fontSize: 18,
                    }}>
                    {orderItem.name}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Rubik-Medium',
                      fontSize: 18,
                    }}>
                    x {orderItem.quantity} kg
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 35,
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Rubik-Medium',
                textTransform: 'uppercase',
                fontSize: 18,
              }}>
              Delivery Address: {orderDetails.address.address}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleOrderAccept()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 20,
              marginRight: 20,
            }}>
            <View
              style={{
                width: '100%',
                backgroundColor: '#eb5757',
                alignItems: 'center',
                justifyContent: 'center',
                height: height * 0.05,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'OpenSans-Bold',
                  fontSize: 20,
                }}>
                ACCEPT ORDER
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
