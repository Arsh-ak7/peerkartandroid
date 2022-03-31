import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Modal } from 'react-native';
import React from 'react';
import { useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import constants from '../redux/constants';

export default function AddOrderCategory({
  navigation,
  addCategoryModal,
  setAddOrderCategory,
  setAddNameModalVisible,
}) {
  const { width } = Dimensions.get('screen');
  const [category, setCategory] = useState('Grocery');
  const dispatch = useDispatch();
  return (
    <KeyboardAvoidingView>
      <Modal animationType="fade" visible={addCategoryModal} transparent={true}>
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
                  Choose a category
                </Text>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontFamily: 'Poppins-Regular',
                    fontSize: 18,
                  }}>
                  Please choose a category for your order
                </Text>
              </View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  paddingTop: 24,
                  paddingLeft: 25,
                  paddingBottom: 10,
                  fontFamily: 'Montserrat-Bold',
                }}>
                Order Category
              </Text>
              <View
                style={{
                  marginLeft: 25,
                  marginRight: 25,
                  borderRadius: 5,
                  borderColor: '#eb5757',
                  borderWidth: 1,
                }}>
                <Picker
                  selectedValue={category}
                  style={{
                    color: 'black',
                    width: 350,
                  }}
                  dropdownIconColor="black"
                  onValueChange={itemValue => setCategory(itemValue)}>
                  <Picker.Item label="Grocery" value={'Grocery'} />
                  <Picker.Item label="Fish and Meat" value={'Fish and Meat'} />
                  <Picker.Item label="Stationary" value={'Stationary'} />
                  <Picker.Item label="Medicines" value={'Medicines'} />
                </Picker>
              </View>
              <View
                style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity
                  onPress={() => {
                    dispatch({
                      type: constants.ADD_CATEGORY,
                      payload: category,
                    });
                    setAddOrderCategory(false);
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
                <TouchableOpacity
                  onPress={() => {
                    setAddOrderCategory(false);
                    setAddNameModalVisible(true);
                  }}>
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
