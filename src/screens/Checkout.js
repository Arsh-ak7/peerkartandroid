/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Feather from 'react-native-vector-icons/Feather';
import axiosInstance from '../utils/axios';
import { resetCart } from '../redux/actions/cartActions';

export default function Checkout({ navigation }) {
  const { height, width } = Dimensions.get('screen');

  const userData = useSelector(state => state.auth.userData);
  const address = useSelector(state => state.auth.userData.address[0].address);
  const cart = useSelector(state => state.cart);
  const [currAddress, setCurrAddress] = useState(userData.address[0]);
  const [paymentOption, setPaymentOption] = useState(userData.paymentMethod[0]);
  const dispatch = useDispatch();

  const noPaymenstData = [
    { text: 'No Existing payment methods. Please add one.' },
  ];

  const carouselRef_checkout = useRef(null);

  const goForward = () => {
    carouselRef_checkout.current.snapToNext();
  };

  const handleOrderPlaced = () => {
    axiosInstance
      .post(
        '/orders',
        {
          name: cart.name,
          category: cart.category,
          items: cart.items,
          paymentMethod: paymentOption,
          address: currAddress,
          contact: userData.contact[0],
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        },
      )
      .then(res => console.log('rs', res))
      .catch(error => console.log('err', error.response.data));
  };

  const __renderItem = ({ item }) => {
    return (
      <View
        style={{
          width: '100%',
          height: height * 0.2,
          //   flex: 1,
          borderRadius: 20,
          shadowColor: '#005FB7',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.53,
          shadowRadius: 13.97,
          elevation: 21,
        }}>
        <ImageBackground
          source={require('../assets/images/upi.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
            borderRadius: 20,
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: '100%',
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              //   onPress={() => setAddPaymentModal(true)}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                paddingRight: 20,
              }}>
              <Feather name="edit-3" size={26} color="white" />
              <Text
                style={{
                  paddingLeft: 5,
                  fontSize: 20,
                  color: 'white',
                  fontFamily: 'Montserrat-Bold',
                }}>
                ADD / EDIT{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: -height * 0.012 }}>
            <View>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                {item.text}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          width: '100%',
          height: height * 0.2,
          //   flex: 1,
          borderRadius: 20,
          shadowColor: '#005FB7',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.53,
          shadowRadius: 13.97,
          elevation: 21,
        }}>
        <ImageBackground
          source={require('../assets/images/upi.png')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'contain',
            borderRadius: 20,
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: '100%',
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              //   onPress={() => setAddPaymentModal(true)}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                paddingRight: 20,
              }}>
              <Feather name="edit-3" size={26} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ paddingLeft: 20, marginTop: -height * 0.012 }}>
            <View>
              <Text
                style={{
                  paddingLeft: 5,
                  fontSize: 16,
                  color: 'white',
                  fontFamily: 'Montserrat-Bold',
                }}>
                PAYMENT METHOD
              </Text>
              <Text
                style={{
                  paddingLeft: 5,
                  fontSize: 12,
                  color: 'white',
                  fontFamily: 'Montserrat-Bold',
                }}>
                {item.paymentType}
              </Text>
            </View>
          </View>
          <View style={{ paddingLeft: 20, paddingTop: 10 }}>
            <View>
              <Text
                style={{
                  paddingLeft: 5,
                  fontSize: 16,
                  color: 'white',
                  fontFamily: 'Montserrat-Bold',
                }}>
                DETAILS
              </Text>
              <Text
                style={{
                  paddingLeft: 5,
                  fontSize: 12,
                  color: 'white',
                  fontFamily: 'LibreBaskerville-Regular',
                }}>
                {item.paymentId}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ marginRight: width * 0.05 }}>
      <View style={{ marginLeft: width * 0.05, marginTop: height * 0.075 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <View>
            <Ionicons name="arrow-back" color={'black'} size={36} />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Montserrat-Bold',
            fontSize: 36,
            marginLeft: width * 0.05,
          }}>
          Checkout
        </Text>
      </View>
      <View style={{ marginRight: width * 0.075 }}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Poppins-Bold',
            fontSize: 24,
            marginLeft: width * 0.1,
            marginTop: height * 0.02,
          }}>
          Delivery Address
        </Text>
        <View
          style={{
            marginLeft: width * 0.1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              width: '60%',
              fontSize: 16,
              fontFamily: 'Poppins-SemiBold',
            }}>
            {address}
          </Text>
          <TouchableOpacity>
            <Ionicons name="radio-button-on" color={'black'} size={26} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: height * 0.01 }}>
          <TouchableOpacity style={{ marginLeft: width * 0.1 }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Poppins-Bold',
                fontSize: 16,
              }}>
              CHANGE
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: width }}>
          <Text
            style={{
              marginLeft: width * 0.1,
              marginTop: height * 0.01,
              color: 'black',
              fontFamily: 'Poppins-Bold',
              fontSize: 24,
            }}>
            Payment Option
          </Text>
          {userData.paymentMethod.length > 0 ? (
            <Carousel
              containerCustomStyle={{
                width: width * 0.9,
                height: height * 0.34,
                top: height * 0.04,
              }}
              layout={'default'}
              ref={carouselRef_checkout}
              sliderHeight={height}
              sliderWidth={width}
              itemWidth={width - 60}
              data={userData.paymentMethod}
              renderItem={renderItem}
              onSnapToItem={idx =>
                setPaymentOption(userData.paymentMethod[idx])
              }
            />
          ) : (
            <Carousel
              containerCustomStyle={{
                width: width,
                height: height * 0.34,
                top: height * 0.04,
              }}
              layout={'default'}
              ref={carouselRef_checkout}
              sliderHeight={height}
              sliderWidth={width}
              itemWidth={width - 60}
              data={noPaymenstData}
              renderItem={__renderItem}
            />
          )}
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          paddingTop: height * 0.01,
          width: width,
        }}>
        <TouchableOpacity
          onPress={() => {
            handleOrderPlaced();
            resetCart(dispatch);
            navigation.navigate('OrderPlaced');
          }}>
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
              PLACE ORDER
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
