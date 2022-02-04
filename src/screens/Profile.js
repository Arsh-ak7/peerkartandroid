import { View, Text, StatusBar, ImageBackground } from 'react-native';
import React, { useRef } from 'react';
import HomeInfo from '../components/Profile/HomeInfo';
import PaymentInfo from '../components/Profile/PaymentInfo';
import AddressInfo from '../components/Profile/AddressInfo';
import { Dimensions } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const DATA = [
  { title: '1', thumbnail: require('../assets/images/upi.png') },
  { title: '2', thumbnail: require('../assets/images/upi.png') },
  { title: '3', thumbnail: require('../assets/images/upi.png') },
];

export default function Profile() {
  const { height, width } = Dimensions.get('screen');
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
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
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                paddingRight: 20,
              }}>
              <Feather name="plus" size={26} color="white" />
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
                UPI
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
                arsh@oksbi
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
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
          top: '10%',
          width: width,
          flex: 1,
        }}>
        <HomeInfo />

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
          {/* <Text
            style={{
              color: 'white',
              fontSize: 22,
              fontFamily: 'Montserrat-Bold',
            }}>
            Add New Payment
          </Text> */}
        </View>
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
          data={DATA}
          renderItem={renderItem}
        />
        <View
          style={{
            position: 'absolute',
            top: height * 0.5425,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
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
            }}>
            ADDRESS
          </Text>
          <TouchableOpacity
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
              ADD / EDIT{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <AddressInfo />
      </View>
    </View>
  );
}
