/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import { useSelector } from 'react-redux';
import Accordian from 'react-native-collapsible/Accordion';

export default function TransactionHistory() {
  const { height, width } = Dimensions.get('screen');
  const [transactionHistory, setTransactionHistory] = useState();
  const [current, setCurrent] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector(state => state.auth.userData.token);

  const dd = useSelector(state => state.auth.userData);

  useEffect(() => {
    const fetchOrders = () => {
      setLoading(true);
      axiosInstance
        .get('/users/activity?page=1', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setTransactionHistory(res.data.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    };
    fetchOrders();
  }, [token]);

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
                color: order.generatedBy === dd.id ? 'red' : 'green',
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
      </View>
    );
  };

  const updateSection = activeSections => {
    setCurrent(activeSections.includes(undefined) ? [] : activeSections);
  };

  const renderSectionTitle = section => {
    return (
      <View>
        <Text style={{ color: 'black' }}></Text>
      </View>
    );
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
            fontSize: 26,
            textAlign: 'center',
            paddingBottom: 5,
          }}>
          TRANSACTION HISTORY
        </Text>
        <View style={{ width: '92%' }}>
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
            transactionHistory && (
              <Accordian
                sections={transactionHistory}
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
