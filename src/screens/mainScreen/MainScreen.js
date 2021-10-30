import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import CustomText from '../../components/text';

export default function MainScreen() {
  const navigation = useNavigation();
  const axios = require('axios').default
  const [text, setText] = useState([])
  
  function getPrice() {
    axios.get('http://localhost:3000/users?username=tuananhc&password=1')
    .then(function(response) {
      setText(JSON.stringify(response.data))
      console.log(response.data)
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
        <CustomText onPress={() => {navigation.navigate('Login')}}>The main screen</CustomText>
      <TouchableOpacity
        onPress={() => getPrice()}
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
      <CustomText>this is my fking text</CustomText>
      <CustomText>{text}</CustomText>
      </View>  
    </>
  )
}