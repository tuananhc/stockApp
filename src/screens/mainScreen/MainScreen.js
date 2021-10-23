import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import CustomText from '../../components/text';

export default function MainScreen() {
  const navigation = useNavigation();
  const axios = require('axios').default
  const [text, setText] = useState("")
  
  function getPrice() {
    axios.get('https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=1633038335&to=1633124735&token=c5nup6iad3icte5l57r0')
    .then(function(response) {
      console.log('success')
      setText(response.data.c)
    })
    .catch(function (error) {
      setText(error[0])
    })
  }

  return (
    <>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text onPress={() => {navigation.navigate('Login')}}>The main screen</Text>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
      >
        <View style={{
          width: 75,
          height: 30,
          backgroundColor: '#3DB2FF',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          marginTop: 30
        }}>
          <Text style={{color: 'white'}}>Get price</Text>
        </View>
      </TouchableOpacity>
      <CustomText>this is my text</CustomText>
      <Text>{text}</Text>
      </View>  
    </>
  )
}