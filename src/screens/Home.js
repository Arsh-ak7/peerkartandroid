/* eslint-disable react-native/no-inline-styles */
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomModal from '../components/CustomModal';
import OrderView from '../components/Home/OrderView';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AddOrderName from '../components/AddOrderName';
import AddOrderCategory from '../components/AddOrderCategory';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axios';

export default function Home({ navigation }) {
  const [token, setToken] = useState();
  const { height, width } = Dimensions.get('screen');
  const [orderViewModal, setOrderViewModal] = useState(false);
  const [orderViewContent, setOrderViewContent] = useState(null);
  const [addNameModal, setAddNameModalVisible] = useState(false);
  const [addOrderCategoryModal, setAddOrderCategoryModal] = useState(false);
  const data = [];
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState();

  useEffect(() => {
    async function getOrders() {
      setLoading(true);
      await axiosInstance
        .get('/orders/?page=1')
        .then(res => {
          setLoading(false), setOrders(res.data.data);
        })
        .catch(err => console.log(err));
    }
    getOrders();
  }, []);

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
              onPress={() => setAddNameModalVisible(true)}
              style={{
                width: '100%',
                height: '40%',
                flex: 1,
                marginBottom: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#eb5757',
                  height: '80%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  flex: 1,
                }}>
                <Text
                  style={{
                    color: 'white',
                    textTransform: 'uppercase',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Create Order
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <ScrollView
            style={{
              height: height * 0.7,
            }}>
            {loading ? (
              <Text style={{ color: 'black' }}>Loading</Text>
            ) : (
              orders &&
              orders.map((order, i) => (
                <TouchableOpacity
                  onPress={() => {
                    setOrderViewModal(true), setOrderViewContent(order);
                  }}
                  key={i}
                  style={{
                    shadowColor: '#eb5757',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.8,
                    shadowRadius: 4.41,
                    elevation: 2,
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
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
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
      <AddOrderName
        addNameModal={addNameModal}
        setAddNameModalVisible={setAddNameModalVisible}
        setAddCategoryModal={setAddOrderCategoryModal}
      />
      <AddOrderCategory
        setAddNameModalVisible={setAddNameModalVisible}
        addCategoryModal={addOrderCategoryModal}
        setAddOrderCategory={setAddOrderCategoryModal}
        navigation={navigation}
      />
    </View>
  );
}
