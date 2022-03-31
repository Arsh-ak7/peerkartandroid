/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddOrderName from '../components/AddOrderName';
import AddOrderCategory from '../components/AddOrderCategory';
import { removeFromCart } from '../redux/actions/cartActions';

export default function Cart({ navigation }) {
  const { height, width } = Dimensions.get('screen');
  const cart = useSelector(state => state.cart);
  const [addNameModal, setAddNameModalVisible] = useState(false);
  const [addOrderCategoryModal, setAddOrderCategoryModal] = useState(false);
  const dispatch = useDispatch();

  return (
    <View>
      {cart.items.length === 0 ? (
        <View style={{ height: '100%', width: '100%' }}>
          <Image
            source={require('../assets/images/emptycart.png')}
            style={{ width: '100%', height: '40%', marginTop: height * 0.1 }}
          />
          <Text
            style={{
              color: 'black',
              fontFamily: 'Poppins-Regular',
              fontSize: 26,
              textAlign: 'center',
              paddingTop: height * 0.05,
            }}>
            AHH! Your cart is empty!
          </Text>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Poppins-Regular',
              fontSize: 20,
              textAlign: 'center',
              paddingTop: 5,
            }}>
            You're making the reaper unhappy.
          </Text>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Poppins-Regular',
              fontSize: 20,
              textAlign: 'center',
              paddingTop: 5,
            }}>
            Add something maybe?
          </Text>
          <View style={{ alignItems: 'center', paddingTop: height * 0.07 }}>
            <TouchableOpacity onPress={() => setAddNameModalVisible(true)}>
              <View
                style={{
                  backgroundColor: '#eb5757',
                  width: width * 0.4,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    fontFamily: 'Poppins-Bold',
                  }}>
                  CREATE ORDER
                </Text>
              </View>
            </TouchableOpacity>
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
      ) : (
        <View style={{ paddingLeft: width * 0.06, paddingRight: width * 0.06 }}>
          <TouchableOpacity>
            <View style={{ marginTop: height * 0.06, height: height * 0.035 }}>
              <Ionicons name="arrow-back" color={'black'} size={26} />
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: height * 0.015,
              height: height * 0.075,
            }}>
            <Text
              style={{
                color: '#4F3A57',
                fontSize: 36,
                fontFamily: 'OpenSans-Regular',
              }}>
              Items in{' '}
            </Text>
            <Text
              style={{
                color: '#4F3A57',
                fontSize: 36,
                fontFamily: 'OpenSans-Bold',
              }}>
              Cart
            </Text>
          </View>
          <View style={{ paddingTop: height * 0.03, height: height * 0.1 }}>
            <Text
              style={{
                color: '#4F3A57',
                fontSize: 28,
                fontFamily: 'OpenSans-Regular',
                textTransform: 'uppercase',
              }}>
              {cart.category}
            </Text>
          </View>
          <ScrollView style={{ height: height * 0.5 }}>
            {cart.items.map((item, key) => (
              <View
                key={key}
                style={{
                  shadowColor: '#eb5757',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 13.97,
                  elevation: 21,
                  padding: 10,
                  marginTop: 20,
                  backgroundColor: 'white',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
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
                      {item.name}
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
                      {item.quantity}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('EditOrder', item)}
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ padding: 5, paddingBottom: 10 }}>
                      <Image
                        source={require('../assets/icons/edit.png')}
                        style={{ height: 18, width: 18, padding: 10 }}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => removeFromCart(dispatch, item)}
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ padding: 5, paddingBottom: 10 }}>
                      <Image
                        source={require('../assets/icons/delete.png')}
                        style={{ height: 18, width: 18, padding: 10 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={{ alignItems: 'center', paddingTop: height * 0.01 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
              <View
                style={{
                  backgroundColor: '#eb5757',
                  width: width * 0.6,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    fontFamily: 'Poppins-Bold',
                  }}>
                  CHECKOUT
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
