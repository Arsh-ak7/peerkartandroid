import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { Modal } from 'react-native';
import React from 'react';
import { addOrderName } from '../redux/actions/cartActions';
import { useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import constants from '../redux/constants';

export default function AddOrderName({
  navigation,
  addNameModal,
  setAddNameModalVisible,
}) {
  const { height, width } = Dimensions.get('screen');
  const [orderName, setOrderName] = useState('');
  const inputRef = useRef();
  const dispatch = useDispatch();
  return (
    <KeyboardAvoidingView>
      <Modal animationType="fade" visible={addNameModal} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <StatusBar
            translucent
            backgroundColor="rgba(0,0,0,0.3)"
            barStyle="light-content"
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                //  height: '55%',
                paddingTop: 20,
                paddingBottom: 20,
                backgroundColor: 'white',
                width: '96%',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{ width: '70%' }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Bold',
                    fontSize: 26,
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  It's time to create an order!
                </Text>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 18,
                  }}>
                  Let's start by giving a name for your order
                </Text>
              </View>
              <View style={{ width: '100%' }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    paddingTop: 24,
                    paddingLeft: 25,
                    paddingBottom: 10,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  Name Of Order
                </Text>
                <TextInput
                  ref={inputRef}
                  style={{
                    height: 40,
                    marginLeft: 25,
                    marginRight: 25,
                    borderWidth: 1,
                    borderColor: '#eb575788',
                    color: 'black',
                    paddingLeft: 10,
                  }}
                  //value={orderName}
                  placeholder="Name of Order"
                  onChangeText={text => setOrderName(text)}
                  placeholderTextColor={'black'}
                />
              </View>
              <View
                style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch({
                      type: constants.ADD_ORDER_NAME,
                      payload: orderName,
                    });
                    setAddNameModalVisible(false);
                    navigation.navigate('CreateOrder');
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
                      CONTINUE
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity onPress={() => setAddNameModalVisible(false)}>
                  <View
                    style={{
                      backgroundColor: 'black',
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
                      GO BACK
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
