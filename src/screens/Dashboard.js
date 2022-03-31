/* eslint-disable react-native/no-inline-styles */
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axios';

export default function Dashboard({ navigation }) {
  const { height, width } = Dimensions.get('screen');

  const token = useSelector(state => state.auth.userData.token);
  const [acceptedOrders, setAcceptedOrders] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchOrders = () => {
      setLoading(true);
      axiosInstance
        .get('/users/orders/accepted?page=1', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setAcceptedOrders(res.data.data);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
        });
    };
    fetchOrders();
  }, [token]);

  const [generatedOrders, setGeneratedOrders] = useState();

  useEffect(() => {
    const fetchOrders = () => {
      setLoading(true);
      axiosInstance
        .get('/users/orders/created?page=1', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setGeneratedOrders(res.data.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    };
    fetchOrders();
  }, [token]);

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      {/* <ScrollView
        contentContainerStyle={{
          // height: '100%',
          flexGrow: 1,
        }}> */}
      <View
        style={{
          marginTop: height * 0.06,
          //top: height * 0.06,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#4F3A57', fontSize: 24 }}>Key metrics </Text>
          <Text
            style={{
              color: '#4F3A57',
              fontSize: 24,
              fontFamily: 'Montserrat-Bold',
            }}>
            for you!
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: height * 0.03,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '40%',
            height: height * 0.14,
            // top: height * 0.09,
            // marginTop: height * 0.03,
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#eb5757',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 8.22,

            elevation: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#BDBDBD', fontSize: 12 }}>ORDERS PLACED</Text>
          <Image
            source={require('../assets/images/logo.png')}
            style={{ marginTop: 5, marginRight: 2.5 }}
          />
          <Text
            style={{
              color: 'black',
              fontFamily: 'OpenSans-Bold',
              fontSize: 22,
            }}>
            {generatedOrders && generatedOrders.length}
          </Text>
        </View>
        <View
          style={{
            width: '40%',
            height: height * 0.14,
            // top: height * 0.09,
            // marginTop: height * 0.03,
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#eb5757',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 8.22,
            elevation: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: '#BDBDBD', fontSize: 12 }}>
            ORDERS COMPLETED
          </Text>
          <Image
            source={require('../assets/images/like.png')}
            style={{ marginTop: 5, marginRight: 2.5 }}
          />
          <Text
            style={{
              color: 'black',
              fontFamily: 'OpenSans-Bold',
              fontSize: 22,
            }}>
            {acceptedOrders && acceptedOrders.length}
          </Text>
        </View>
      </View>
      <Divider
        color="#eb575748"
        width={height * 0.002}
        style={{ marginTop: height * 0.03 }}
      />
      {/* <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 10,
        }}>
        <View
          style={{
            //  height: 'auto',
            // marginTop: height * 0.02,
            paddingLeft: 20,
            paddingRight: 20,
          }}>
          <View style={{ marginTop: height * 0.02 }}>
            <Text
              style={{
                color: '#4F3A57',
                fontFamily: 'Montserrat-ExtraBold',
                fontSize: 24,
                textAlign: 'center',
                paddingBottom: 5,
              }}>
              ORDERS PLACED
            </Text>
            <View
              style={{
                width: '100%',
                height: height * 0.14,
                backgroundColor: 'white',
                // position: 'absolute',
                // top: height * 0.044,
                borderRadius: 30,
                shadowColor: '#005FB7',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.53,
                shadowRadius: 13.97,
                elevation: 21,
              }}></View>
          </View>
          <View style={{ marginTop: height * 0.02 }}>
            <Text
              style={{
                color: '#4F3A57',
                fontFamily: 'Montserrat-ExtraBold',
                fontSize: 24,
                textAlign: 'center',
                paddingBottom: 5,
              }}>
              ORDERS COMPLETED
            </Text>
            <View
              style={{
                width: '100%',
                height: height * 0.14,
                backgroundColor: 'white',
                // position: 'absolute',
                //  top: height * 0.044,
                borderRadius: 30,
                shadowColor: '#005FB7',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.53,
                shadowRadius: 13.97,
                elevation: 21,
              }}></View>
          </View>
          <View style={{ marginTop: height * 0.02 }}>
            <Text
              style={{
                color: '#4F3A57',
                fontFamily: 'Montserrat-ExtraBold',
                fontSize: 24,
                textAlign: 'center',
                paddingBottom: 5,
              }}>
              TRANSACTION HISTORY
            </Text>
            <View
              style={{
                width: '100%',
                height: height * 0.14,
                backgroundColor: 'white',
                // position: 'absolute',
                //   top: height * 0.044,
                borderRadius: 30,
                shadowColor: '#005FB7',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.53,
                shadowRadius: 13.97,
                elevation: 21,
              }}></View>
          </View>
        </View>
      </ScrollView> */}
      {/* <View style={{ backgroundColor: 'transparent', bottom: 0, height: 60 }} /> */}

      {/* SECOND IDEA NO SCROLL VIEW */}

      <View style={{ flexGrow: 1, alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            width: '96%',
            shadowColor: '#eb5757',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.53,
            shadowRadius: 13.97,
            elevation: 5,
            height: height * 0.08,
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={() => navigation.navigate('OrdersPlaced')}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#4F3A57',
                fontFamily: 'Montserrat-ExtraBold',
                fontSize: 24,
                textAlign: 'center',
                paddingBottom: 5,
              }}>
              ORDERS PLACED
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '96%',
            marginTop: 10,
            shadowColor: '#eb5757',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.53,
            shadowRadius: 13.97,
            elevation: 5,
            height: height * 0.08,
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('OrdersAccepted')}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#4F3A57',
                fontFamily: 'Montserrat-ExtraBold',
                fontSize: 24,
                textAlign: 'center',
                paddingBottom: 5,
              }}>
              ORDERS ACCEPTED
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TransactionHistory')}
          style={{
            width: '96%',
            marginTop: 10,
            shadowColor: '#eb5757',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.53,
            shadowRadius: 13.97,
            elevation: 5,
            height: height * 0.08,
            backgroundColor: 'white',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#4F3A57',
                fontFamily: 'Montserrat-ExtraBold',
                fontSize: 24,
                textAlign: 'center',
                paddingBottom: 5,
              }}>
              TRANSACTION HISTORY
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* </ScrollView> */}
    </View>
  );
}
