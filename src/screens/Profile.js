/* eslint-disable react-native/no-inline-styles */
import { View, Text, StatusBar, ImageBackground } from 'react-native';
import React, { useRef, useState } from 'react';
import HomeInfo from '../components/Profile/HomeInfo';
import AddressInfo from '../components/Profile/AddressInfo';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomModal from '../components/CustomModal';
import AddPayment from '../components/Profile/AddPayment';
import { useSelector } from 'react-redux';
import AddAddress from '../components/Profile/AddAddress';
import AddPhone from '../components/Profile/AddPhone';
import { useDispatch } from 'react-redux';
import constants from '../redux/constants';
import EditPhone from '../components/Profile/EditPhone';
import EditAddress from '../components/Profile/EditAddress';
import EditPayment from '../components/Profile/EditPayment';

export default function Profile() {
  const { height, width } = Dimensions.get('screen');
  const [addPaymentModal, setAddPaymentModal] = useState(false);
  const [addAddressModal, setAddAddresstModal] = useState(false);
  const [addPhoneModal, setAddPhoneModal] = useState(false);

  const [editPhone, setEditPhone] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editPayment, setEditPayment] = useState(false);

  const userData = useSelector(state => state.auth.userData);

  const [currPayment, setCurrPayment] = useState(userData.paymentMethod[0]);
  const [currAddress, setCurrAddress] = useState(userData.address[0]);

  const noPaymenstData = [
    { text: 'No Existing payment methods. Please add one.' },
  ];

  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  const dispatch = useDispatch();

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
              onPress={() => setAddPaymentModal(true)}
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
              onPress={() => setEditPayment(true)}
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
    <>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />
        <ImageBackground
          source={require('../assets/images/home.png')}
          style={{
            height: height * 0.5,
            width: '100%',
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: height * 0.06,
            right: width * 0.06,
          }}>
          <TouchableOpacity
            onPress={() =>
              dispatch({
                type: constants.LOGOUT,
              })
            }>
            <View>
              <AntDesign name="logout" color={'white'} size={26} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            top: '10%',
            width: width,
            flex: 1,
          }}>
          <HomeInfo setAddPhoneModal={setAddPhoneModal} />

          {/*CODE FOR FLATLIST*/}

          {/* <FlatList
          data={DATA}
          renderItem={__renderItem}
          horizontal
          keyExtractor={(item, index) => index}
          style={{
            width: '100%',
            height: height * 0.34,
            top: height * 0.23,
            flex: 1,
          }}
        /> */}
          {/* <PaymentInfo /> */}

          {/* CODE FOR FLATLIST*/}
          <View
            style={{
              position: 'absolute',
              top: height * 0.2875,
              width: '100%',
              flexDirection: 'row',
              //  justifyContent: 'space-between',
              left: width * 0.1,
              right: width * 0.1,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 22,
                fontFamily: 'Montserrat-Bold',
              }}>
              PAYMENTS
            </Text>
            <TouchableOpacity
              onPress={() => setAddPaymentModal(true)}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // paddingRight: 20,
                marginLeft: width * 0.1,
              }}>
              <View style={{ marginLeft: width * 0.2, flexDirection: 'row' }}>
                <Feather name="plus" size={26} color="white" />
                <Text
                  style={{
                    paddingLeft: 5,
                    fontSize: 20,
                    color: 'white',
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  ADD{' '}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {userData.paymentMethod.length > 0 ? (
            <Carousel
              containerCustomStyle={{
                width: width,
                height: height * 0.34,
                top: height * 0.34,
                flex: 1,
              }}
              layout={'default'}
              ref={carouselRef}
              sliderHeight={height}
              sliderWidth={width}
              itemWidth={width - 60}
              data={userData.paymentMethod}
              renderItem={renderItem}
              onSnapToItem={idx => setCurrPayment(userData.paymentMethod[idx])}
            />
          ) : (
            <Carousel
              containerCustomStyle={{
                width: width,
                height: height * 0.34,
                top: height * 0.34,
                flex: 1,
              }}
              layout={'default'}
              ref={carouselRef}
              sliderHeight={height}
              sliderWidth={width}
              itemWidth={width - 60}
              data={noPaymenstData}
              renderItem={__renderItem}
            />
          )}
          <View
            style={{
              position: 'absolute',
              top: height * 0.5425,
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: height * 0.011,
              // left: width * 0.1,
              // right: width * 0.1,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 22,
                fontFamily: 'Montserrat-Bold',
                marginLeft: width * 0.1,
              }}>
              ADDRESS
            </Text>
            <TouchableOpacity
              onPress={() => setAddAddresstModal(true)}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // paddingRight: 20,
                marginLeft: width * 0.1,
              }}>
              <Feather name="plus" size={26} color="black" />
              <Text
                style={{
                  paddingLeft: 5,
                  fontSize: 20,
                  color: 'black',
                  fontFamily: 'Montserrat-Bold',
                }}>
                ADD
              </Text>
            </TouchableOpacity>
          </View>
          <AddressInfo
            setCurrAddress={setCurrAddress}
            setEditAddress={setEditAddress}
          />
        </View>
      </View>
      <CustomModal
        modalVisible={addPaymentModal}
        setModalVisible={setAddPaymentModal}
        modalContent={<AddPayment setModalVisible={setAddPaymentModal} />}
      />
      <CustomModal
        modalVisible={addAddressModal}
        setModalVisible={setAddAddresstModal}
        modalContent={<AddAddress setModalVisible={setAddAddresstModal} />}
      />
      <CustomModal
        modalVisible={addPhoneModal}
        setModalVisible={setAddPhoneModal}
        modalContent={<AddPhone setModalVisible={setAddPhoneModal} />}
      />
      <CustomModal
        modalVisible={editPhone}
        setModalVisible={setEditPhone}
        modalContent={<EditPhone setModalVisible={setEditPhone} />}
      />
      <CustomModal
        modalVisible={editAddress}
        setModalVisible={setEditAddress}
        modalContent={
          <EditAddress setModalVisible={setEditAddress} data={currAddress} />
        }
      />
      <CustomModal
        modalVisible={editPayment}
        setModalVisible={setEditPayment}
        modalContent={
          <EditPayment setModalVisible={setEditPayment} data={currPayment} />
        }
      />
    </>
  );
}
