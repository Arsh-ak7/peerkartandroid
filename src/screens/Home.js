import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from '../components/CustomModal';
import OrderView from '../components/Home/OrderView';
import { Dimensions } from 'react-native';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

export default function Home() {
  const [token, setToken] = useState();
  const { height, width } = Dimensions.get('screen');
  const [createOrderModal, setCreateOrderModal] = useState(false);
  const [orderViewModal, setOrderViewModal] = useState(false);
  const { loading, error, data } = useQuery(GET_ORDERS);
  const [orderViewContent, setOrderViewContent] = useState(null);

  useEffect(() => {
    async function getCred() {
      const token = await AsyncStorage.getItem('jwtToken').then(res => {
        return res;
      });
      setToken(token);
    }
    getCred();
  }, [token]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
        hidden={false}
        animated
      />
      <View
        style={{
          marginTop: height * 0.05,
          paddingLeft: width * 0.05,
          paddingRight: width * 0.05,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: height * 0.045,
              color: '#4F3A57',
            }}>
            AVAILABLE ORDERS
          </Text>
          <View
            style={{
              flexDirection: 'row',
              height: '100%',
              flex: 1,

              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '40%',
                flex: 1,
                marginBottom: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#0ACF83',
                  height: '80%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  flex: 1,
                }}>
                <Text style={{ color: 'white', textTransform: 'uppercase' }}>
                  Create Order
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {loading ? (
            <Text style={{ color: 'black' }}>Loading</Text>
          ) : (
            data.getOrders.map((order, i) => (
              <TouchableOpacity
                onPress={() => {
                  setOrderViewModal(true), setOrderViewContent(order);
                }}
                key={i}
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                  padding: 5,
                  marginTop: 20,
                  backgroundColor: '#f5f5f5',
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
                        fontFamily: 'OpenSans-Regular',
                      }}>
                      {order.orderName}
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
                        fontFamily: 'OpenSans-Regular',
                      }}>
                      {order.points}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
        <CustomModal
          modalVisible={orderViewModal}
          setModalVisible={setOrderViewModal}
          modalContent={
            <OrderView
              setModalVisible={setOrderViewModal}
              orderDetails={orderViewContent}
            />
          }
        />
      </View>
    </View>
  );
}

const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
      orderName
      orderCategory
      orderGeneratedBy
      orderItems {
        productName
        productQty
      }
      points
      orderAcceptedBy
    }
  }
`;
