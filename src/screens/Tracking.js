/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StatusBar,
  Text,
  Dimensions,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { TouchableOpacity } from 'react-native';
import axiosInstance from '../utils/axios';
import { useSelector } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';

export default function Tracking() {
  const { height, width } = Dimensions.get('screen');
  const mapRef = useRef(null);
  const [latestOrder, setLatestOrder] = useState();
  const token = useSelector(state => state.auth.userData.token);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  useEffect(() => {
    axiosInstance
      .get('users/orders/latestaccepted', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setLatestOrder(res.data.data[0]);
      })
      .catch(err => console.log('err', err));
  }, [latestOrder, latitude, longitude]);

  const handleAccept = id => {
    axiosInstance
      .put(
        `/orders/${id}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => console.log(res))
      .catch(err => console.log('err', err.response.data));
  };

  const handleReject = id => {
    axiosInstance
      .put(
        `/orders/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => console.log(res))
      .catch(err => console.log('err', err));
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      {latestOrder ? (
        <>
          <View style={{ flex: 0.55 }}>
            <MapView
              ref={mapRef =>
                mapRef === null ? null : mapRef.fitToElements(true)
              }
              provider={PROVIDER_GOOGLE}
              style={{
                flex: 1,
              }}
              showsUserLocation={true}
              followsUserLocation={true}>
              {latestOrder && (
                <MapViewDirections
                  origin={{ latitude, longitude }}
                  destination={{
                    latitude: latestOrder.address.location.coordinates[1],
                    longitude: latestOrder.address.location.coordinates[0],
                  }}
                  apikey={GOOGLE_MAPS_API_KEY}
                  strokeColor="black"
                  strokeWidth={3}
                />
              )}
              {longitude && <Marker coordinate={{ latitude, longitude }} />}
              {latestOrder && (
                <Marker
                  coordinate={{
                    latitude: latestOrder.address.location.coordinates[1],
                    longitude: latestOrder.address.location.coordinates[0],
                  }}
                />
              )}
            </MapView>
          </View>
          <View style={{ flex: 0.45 }}>
            <View
              style={{
                width: width,
                alignItems: 'center',
                height: '40%',
                top: 25,
              }}>
              <View
                style={{
                  shadowColor: '#eb5757',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  borderRadius: 5,
                  shadowOpacity: 0.8,
                  shadowRadius: 4.41,
                  elevation: 6,
                  padding: 10,
                  paddingLeft: 20,
                  paddingRight: 20,
                  backgroundColor: 'white',
                }}>
                <Text style={{ fontFamily: 'Poppins-Regular', color: 'black' }}>
                  Your order has been accepted!
                </Text>
              </View>
              <View style={{ padding: 25 }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 20,
                    color: 'black',
                  }}>
                  Order: {latestOrder.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: width * 0.8,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingBottom: 30,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../assets/images/profile.png')}
                    height={48}
                    width={48}
                  />
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 20,
                      color: 'black',
                      paddingLeft: 20,
                    }}>
                    {latestOrder.generatedBy.username}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      `tel:${latestOrder.generatedBy.contact[0]}`,
                    );
                  }}>
                  <Image
                    source={require('../assets/images/phone.png')}
                    height={48}
                    width={48}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handleAccept(latestOrder._id)}>
                <View
                  style={{
                    backgroundColor: '#eb5757',
                    width: width * 0.6,
                    borderRadius: 30,
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
                    MARK AS DELIVERED
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../assets/images/fogg-87.png')}
            style={{
              height: 400,
              width: 200,
            }}
          />
          <Text
            style={{
              color: 'black',
              paddingTop: 50,
              fontSize: 26,
              fontFamily: 'Montserrat-Bold',
              textAlign: 'center',
            }}>
            You haven't accepted any orders
          </Text>
        </View>
      )}
    </View>
  );
}
