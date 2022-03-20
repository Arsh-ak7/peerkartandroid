/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';

export const SLIDER_WIDTH = Dimensions.get('window').width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const DATA = [
  {
    id: 1,
    address:
      ' C/O Akhouri Baijnath Prasad, Ashok Nagar, Road Number 2, Kankerbagh, Patna - 20',
  },
];

export default function AddressInfo({ setCurrAddress, setEditAddress }) {
  const { height, width } = Dimensions.get('screen');
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  const addressData = useSelector(state => state.auth.userData.address);
  const __renderItem = ({ item }) => {
    return (
      <View
        key={item.id}
        style={{
          paddingTop: height * 0.015,
          width: '80%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            flexWrap: 'wrap',
            fontSize: 18,
            fontFamily: 'LibreBaskerville-Bold',
          }}>
          No registered addresses. Please add one!
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View
        key={item.id}
        style={{
          paddingTop: height * 0.015,
          width: '80%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => setEditAddress(true)}
          style={{ alignSelf: 'flex-end' }}>
          <View style={{ width: '100%', alignItems: 'flex-end' }}>
            <Feather color={'black'} size={26} name="edit-3" />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            flexWrap: 'wrap',
            fontSize: 18,
            paddingTop: 10,
            fontFamily: 'LibreBaskerville-Bold',
          }}>
          {item.address}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        top: height * 0.35,
      }}>
      {addressData.length > 0 ? (
        <View
          style={{
            flex: 1,
            width: '90%',
            height: height * 0.18,
            backgroundColor: 'white',
            position: 'absolute',
            borderRadius: 10,
            shadowColor: '#eb5757',
            alignItems: 'center',
            justifyContent: 'center',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.53,
            shadowRadius: 13.97,
            elevation: 21,
          }}>
          <Carousel
            ref={isCarousel}
            data={addressData}
            renderItem={renderItem}
            sliderWidth={width * 0.8}
            itemWidth={width}
            onSnapToItem={idx => setCurrAddress(addressData[idx])}
          />
          <Pagination
            dotsLength={addressData.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: '#F4BB41',
            }}
            tappableDots={true}
            inactiveDotStyle={{
              backgroundColor: 'black',
              // Define styles for inactive dots here
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            width: '90%',
            height: height * 0.18,
            backgroundColor: 'white',
            position: 'absolute',
            borderRadius: 30,
            shadowColor: '#005FB7',
            alignItems: 'center',
            justifyContent: 'center',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.53,
            shadowRadius: 13.97,
            elevation: 21,
          }}>
          <Carousel
            ref={isCarousel}
            data={DATA}
            renderItem={__renderItem}
            sliderWidth={width * 0.8}
            itemWidth={width}
            onSnapToItem={index => setIndex(index)}
          />
          <Pagination
            dotsLength={DATA.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: '#F4BB41',
            }}
            tappableDots={true}
            inactiveDotStyle={{
              backgroundColor: 'black',
              // Define styles for inactive dots here
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
      )}
    </View>
  );
}
