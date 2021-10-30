import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native' 
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../../components/textInput';
import CustomText from '../../components/text';

import Button from '../../components/button' 
import { TextInput } from 'react-native';

function createInput(placeholder) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20}}>
      <View style={{flex: 1, height: 50, justifyContent: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#808080', paddingLeft: 15}}>
        <CustomTextInput placeholder={placeholder} style={{fontSize: 16}} autoCapitalize='none'/>
      </View>
    </View>
  )
}

function checkValidInput(input) {
  if (input.length > 0 && input.length < 8) {
    return false
  }
  return true
}

export default function SignUpScreen() {
  const navigation = useNavigation()
  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setIsLoading] = useState(false)
  const [long, setIsLong] = useState(true)

  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <CustomText style={{fontSize: 30, fontWeight: 'bold'}}>Create an account</CustomText>
      {createInput("Full name")}  
      {createInput("Email")}
      {createInput("Username")}
      {createInput("Password")}

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
        <View style={{flex: 1, height: 50, justifyContent: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#808080', paddingLeft: 15}}>
          <TextInput 
            placeholder="dit cu m" 
            style={{fontSize: 16}} 
            autoCapitalize='none' 
            onChangeText={(e) => setPassword(e)}
            onBlur={() => setIsLong(checkValidInput(password))}
          />
        </View>
      </View> 
      {long ? (
        <View style={{height: 20}}/>
      ) : ( 
        <View style={{height: 20}}>
          <Text style={{color: 'red', fontWeight: 'bold', fontStyle: 'italic', marginTop: 5, fontSize: 14}}>
            Password must be at least 8 characters long
          </Text>
        </View>
      )}
      
      <View style={{alignItems: 'center'}}>
        <Button
          style={{
            marginTop: 40,
            width: 150,
            backgroundColor: '#3DB2FF',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
          }}
          onPress={() => setIsLoading(!loading)} 
          loading={loading}
        >
          <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>
            Sign up
          </Text>
        </Button>
        <Text>{password}</Text>
      </View>
    </SafeAreaView>
  )
}