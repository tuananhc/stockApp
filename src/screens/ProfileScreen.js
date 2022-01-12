import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

import CustomText from '../components/text';

export default function ProfileScreen() {
  const username = useSelector(state => state.loggedReducer.username)
  return (
    <>
      <SafeAreaView style={{
        flex: 1,
      }}>
        <View style={{alignItems: 'center', margin: 20}}>
          <CustomText 
            style={{fontSize: 30}}
            onChangeText={() => console.log('dmm')}
          >
            {username}
          </CustomText>

        </View>
      </SafeAreaView>
    </>
  )
}