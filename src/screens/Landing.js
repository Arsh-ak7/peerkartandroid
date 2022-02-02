import {
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { gql, useQuery } from '@apollo/client';

export default function Landing({ navigation }) {
  const { loading, error, data } = useQuery(USERS_QUERY);
  const [users, setUsers] = useState(null);
  useEffect(() => {
    users && setUsers(data);
  }, [users]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/images/onboarding.png')}
          style={{
            flex: 0.6,
            height: '100%',
            width: '100%',
          }}>
          <LinearGradient
            colors={['#22203352', '#202933']}
            style={{ height: '100%', width: '100%', zIndex: 88 }}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </ImageBackground>
        <View
          style={{
            flex: 0.4,
            backgroundColor: '#202933',
          }}
        />
      </View>
      <View
        style={{ position: 'absolute', top: 300, width: '100%', zIndex: 9999 }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{ height: 50, width: 50 }}
          />
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            paddingTop: 20,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 32,
              fontFamily: 'Mulish-Bold',
            }}>
            Millions of songs.
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 32,
              fontFamily: 'Mulish-Bold',
            }}>
            Free on Tunify
          </Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingTop: 40,
          }}>
          <LinearGradient
            colors={['#BB6BD9', '#151A6A']}
            style={{
              height: 50,
              width: 380,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '500',
                fontFamily: 'Mulish-Bold',
              }}>
              SIGN UP FREE
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingTop: 40,
          }}>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '500',
                fontFamily: 'Mulish-Bold',
              }}>
              SIGN IN WITH GOOGLE
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingTop: 40,
          }}>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '500',
                fontFamily: 'Mulish-Bold',
              }}>
              SIGN IN WITH APPLE
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingTop: 40,
          }}
          onPress={() => navigation.navigate('Login')}>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '500',
                fontFamily: 'Mulish-Bold',
              }}>
              LOGIN
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const USERS_QUERY = gql`
  {
    getUsers {
      id
      username
      email
      createdAt
    }
  }
`;
