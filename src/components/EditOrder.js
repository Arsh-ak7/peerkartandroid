/* eslint-disable react-native/no-inline-styles */
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';

export default function EditOrder({ navigation, route }) {
  const currItem = route.params;
  const { height, width } = Dimensions.get('screen');
  const [name, setItemName] = useState(currItem.name);
  const [qty, setQty] = useState(currItem.qty);
  const [unit, setUnit] = useState(currItem.unit);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    addToCart(
      dispatch,
      (item = {
        name,
        qty,
        unit,
      }),
    );
    navigation.navigate('Cart');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', marginTop: height * 0.06 }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: 32,
            color: 'black',
          }}>
          Edit Item!
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            paddingTop: 24,
            paddingLeft: 25,
            paddingBottom: 10,
            fontFamily: 'Montserrat-Bold',
          }}>
          Item Name
        </Text>
        <TextInput
          style={{
            height: 55,
            marginLeft: 25,
            marginRight: 25,
            borderWidth: 1,
            borderColor: '#eb575788',
            color: 'black',
            paddingLeft: 10,
          }}
          value={name}
          placeholder="Item Name"
          onChangeText={text => setItemName(text)}
          placeholderTextColor={'black'}
        />

        <Text
          style={{
            color: 'black',
            fontSize: 16,
            paddingTop: 24,
            paddingLeft: 25,
            paddingBottom: 10,
            fontFamily: 'Montserrat-Bold',
          }}>
          Item Quantity
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
            selectedValue={qty}
            style={{
              color: 'black',
            }}
            dropdownIconColor="black"
            onValueChange={itemValue => setQty(itemValue)}>
            <Picker.Item label="1" value={'1'} />
            <Picker.Item label="2" value={'2'} />
            <Picker.Item label="3" value={'3'} />
            <Picker.Item label="4" value={'4'} />
            <Picker.Item label="5" value={'5'} />
            <Picker.Item label="6" value={'6'} />
            <Picker.Item label="7" value={'7'} />
            <Picker.Item label="8" value={'8'} />
            <Picker.Item label="9" value={'9'} />
            <Picker.Item label="10" value={'10'} />
          </Picker>
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
          Units
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
            selectedValue={unit}
            style={{
              color: 'black',
            }}
            dropdownIconColor="black"
            onValueChange={itemValue => setUnit(itemValue)}>
            <Picker.Item label="Pieces" value={'Pieces'} />
            <Picker.Item label="Kg" value={'Kg'} />
            <Picker.Item label="Ltr" value={'Ltr'} />
          </Picker>
        </View>
        <View style={{ alignItems: 'center', marginTop: height * 0.05 }}>
          <TouchableOpacity onPress={() => handleAddToCart()}>
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
                Add to cart
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: height * 0.04, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
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
                View Cart
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
