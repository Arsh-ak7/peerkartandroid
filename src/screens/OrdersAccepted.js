/* eslint-disable react-native/no-inline-styles */
import { View, Text, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Accordian from 'react-native-collapsible/Accordion';
import { Image } from 'react-native-elements';
import axiosInstance from '../utils/axios';
import { useSelector } from 'react-redux';

export default function OrdersAccepted({ navigation, route }) {
  const { height } = Dimensions.get('screen');
  // const DATA = route.params.data;
  const [current, setCurrent] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState();
  const [loading, setLoading] = useState(false);
  const token = useSelector(state => state.auth.userData.token);

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
          console.error(err);
          setLoading(false);
        });
    };
    fetchOrders();
  }, [token]);

  const renderSectionTitle = section => {
    return (
      <View>
        <Text style={{ color: 'black' }}></Text>
      </View>
    );
  };

  const renderHeader = section => {
    return (
      <View
        style={{
          height: height * 0.06,
          backgroundColor: 'white',
          borderRadius: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 8.22,
          elevation: 2,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/icons/grocery.png')}
          style={{ height: 40, width: 40 }}
        />
        <Text
          style={{
            paddingLeft: 25,
            fontSize: 24,
            textTransform: 'uppercase',
            fontFamily: 'OpenSans-Bold',
            color: '#4F3A57',
          }}>
          {section.orderName}
        </Text>
      </View>
    );
  };

  const renderContent = section => {
    return (
      <View>
        {section.orderItems.map(order => (
          <View
            key={order.productName}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingLeft: 25,
              paddingRight: 25,
              paddingTop: 15,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                textTransform: 'uppercase',
              }}>
              {order.productName}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                textTransform: 'uppercase',
              }}>
              {order.productQty}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const updateSection = activeSections => {
    setCurrent(activeSections.includes(undefined) ? [] : activeSections);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'white'}
      />
      <View
        style={{
          marginTop: height * 0.07,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#4F3A57',
            fontFamily: 'Montserrat-ExtraBold',
            fontSize: 32,
            textAlign: 'center',
            paddingBottom: 5,
          }}>
          ORDERS ACCEPTED
        </Text>
        <View style={{ width: '96%' }}>
          {loading ? (
            <Text style={{ color: 'black' }}>Loading</Text>
          ) : (
            acceptedOrders && (
              <Accordian
                sections={acceptedOrders}
                underlayColor="white"
                activeSections={current}
                renderSectionTitle={renderSectionTitle}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={updateSection}
              />
            )
          )}
        </View>
      </View>
    </View>
  );
}
