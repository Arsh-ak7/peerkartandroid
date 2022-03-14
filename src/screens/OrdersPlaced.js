/* eslint-disable react-native/no-inline-styles */
import { View, Text, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import Accordian from 'react-native-collapsible/Accordion';
import axiosInstance from '../utils/axios';
import { useSelector } from 'react-redux';

export default function OrdersPlaced({ navigation, route }) {
  const { height, width } = Dimensions.get('screen');
  const [current, setCurrent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatedOrders, setGeneratedOrders] = useState();
  const token = useSelector(state => state.auth.userData.token);

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

  const renderSectionTitle = section => {
    return (
      <View>
        <Text style={{ color: 'black' }}>Title</Text>
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
        }}>
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
        backgroundColor="transparent"
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
          ORDERS PLACED
        </Text>
        <View style={{ width: '96%' }}>
          {loading ? (
            <Text style={{ color: 'black' }}>Loading</Text>
          ) : (
            generatedOrders && (
              <Accordian
                sections={generatedOrders}
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
