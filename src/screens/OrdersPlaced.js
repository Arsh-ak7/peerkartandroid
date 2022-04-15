/* eslint-disable react-native/no-inline-styles */
import { ActivityIndicator, View, Text, StatusBar, Image } from 'react-native';
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
          console.log(res.data.data);
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
        <Text style={{ color: 'black' }}></Text>
      </View>
    );
  };

  const renderHeader = order => {
    return (
      <View
        style={{
          shadowColor: '#eb5757',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.8,
          shadowRadius: 4.41,
          elevation: 12,
          padding: 10,
          marginTop: 20,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/icons/grocery.png')}
              style={{ height: 40, width: 40 }}
            />
          </View>
          <View
            style={{
              flex: 0.5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                textTransform: 'uppercase',
                fontFamily: 'Poppins-SemiBold',
              }}>
              {order.name}
            </Text>
          </View>
          <View
            style={{
              flex: 0.2,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                textTransform: 'uppercase',
                fontFamily: 'Poppins-SemiBold',
              }}>
              {order.points}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderContent = section => {
    return (
      <View
        style={{
          backgroundColor: '#eb5757',
          marginTop: 10,
          paddingBottom: 15,
        }}>
        {section.items.map(item => (
          <View
            key={item.name}
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
                color: 'white',
                fontSize: 16,
                textTransform: 'uppercase',
                fontFamily: 'Poppins-SemiBold',
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                textTransform: 'uppercase',
                fontFamily: 'Poppins-SemiBold',
              }}>
              {item.quantity}
            </Text>
          </View>
        ))}
        <View style={{ alignItems: 'flex-end' }}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              textTransform: 'uppercase',
              fontFamily: 'Poppins-SemiBold',
              paddingTop: 15,
              paddingLeft: 25,
              paddingRight: 25,
            }}>
            ORDER ACCEPTED BY:{' '}
            {section.acceptedBy === null ? 'NONE' : section.acceptedBy.username}
          </Text>
        </View>
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
            <View
              style={{
                height: height * 0.8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size={'large'} color="#eb5757" />
            </View>
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
