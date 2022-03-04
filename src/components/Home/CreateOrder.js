import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';

export default function CreateOrder() {
  const dp = useSelector(state => state.cart);
  console.log(dp);
  const { height, width } = Dimensions.get('screen');
  const [itemname, setItemname] = useState('');
  const [orderName, setOrderName] = useState('');
  const [category, setCategory] = useState('');
  const [qty, setQty] = useState('');
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', marginTop: height * 0.06 }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: 32,
            color: 'black',
          }}>
          Create your order!
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
          Name of Order
        </Text>
        <TextInput
          style={{
            height: 40,
            marginLeft: 25,
            marginRight: 25,
            borderWidth: 1,
            borderColor: '#eb575788',
            color: 'black',
            paddingLeft: 10,
          }}
          value={orderName}
          placeholder="Order Name"
          onChangeText={text => setOrderName(text)}
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
          Item Name
        </Text>
        <TextInput
          style={{
            height: 40,
            marginLeft: 25,
            marginRight: 25,
            borderWidth: 1,
            borderColor: '#eb575788',
            color: 'black',
            paddingLeft: 10,
          }}
          value={itemname}
          placeholder="Item Name"
          onChangeText={text => setItemname(text)}
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
          Item Category
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
            }}
            dropdownIconColor="black"
            onValueChange={itemValue => setCategory(itemValue)}>
            <Picker.Item label="Grocery" value={'Grocery'} />
            <Picker.Item label="Fish and Meat" value={'Fish and Meat'} />
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
        <View style={{ alignItems: 'center', marginTop: height * 0.05 }}>
          <TouchableOpacity>
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
          <TouchableOpacity>
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
