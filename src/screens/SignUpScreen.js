import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native' 
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient';

import CustomTextInput from '../components/textInput';
import CustomText from '../components/text';
import Button from '../components/button' 
import { signUpRequest } from '../actions/signUpActions';
import { useDispatch } from 'react-redux';

function createInput(placeholder) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20}}>
      <View style={{flex: 1, height: 50, justifyContent: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#808080', paddingLeft: 15}}>
        <CustomTextInput placeholder={placeholder} style={{fontSize: 16}} autoCapitalize='none'/>
      </View>
    </View>
  )
}

export default function SignUpScreen() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setIsLoading] = useState(false)
  const [long, setIsLong] = useState(true)
  const [signedUp, setSignedUp] = useState(false)

  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
      >
        <FontAwesome 
          name="chevron-left"
          size={22} 
          color={'#3DB2FF'}
        />
      </TouchableOpacity>
      
      <CustomText style={{fontSize: 30, fontWeight: 'bold', marginTop: 20}}>Create an account</CustomText>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
        <View style={{flex: 1, height: 50, justifyContent: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#808080', paddingLeft: 15}}>
          <TextInput 
            placeholder="Full name" 
            style={{fontSize: 16}} 
            autoCapitalize='words'
            onChangeText={(e) => setFullname(e)}
          />
        </View>
      </View> 
      {fullname.length > 0 || !signedUp ? (
        <View style={{height: 20}}/>
      ) : ( 
        <View style={{height: 20}}>
          <Text style={{color: 'red', fontWeight: 'bold', fontStyle: 'italic', marginTop: 5, fontSize: 14}}>
            Field cannot be empty
          </Text>
        </View>
      )}
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
        <View style={{flex: 1, height: 50, justifyContent: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#808080', paddingLeft: 15}}>
          <TextInput 
            placeholder="Email" 
            style={{fontSize: 16}} 
            autoCapitalize='none' 
            onChangeText={(e) => setEmail(e)}
          />
        </View>
      </View> 
      {email.length > 0 || !signedUp ? (
        <View style={{height: 20}}/>
      ) : ( 
        <View style={{height: 20}}>
          <Text style={{color: 'red', fontWeight: 'bold', fontStyle: 'italic', marginTop: 5, fontSize: 14}}>
            Field cannot be empty
          </Text>
        </View>
      )}
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
        <View style={{flex: 1, height: 50, justifyContent: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#808080', paddingLeft: 15}}>
          <TextInput 
            placeholder="Username" 
            style={{fontSize: 16}} 
            autoCapitalize='none' 
            onChangeText={(e) => setUsername(e)}
          />
        </View>
      </View> 
      {username.length > 0 || !signedUp ? (
        <View style={{height: 20}}/>
      ) : ( 
        <View style={{height: 20}}>
          <Text style={{color: 'red', fontWeight: 'bold', fontStyle: 'italic', marginTop: 5, fontSize: 14}}>
            Field cannot be empty
          </Text>
        </View>
      )}

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
        <View style={{flex: 1, height: 50, justifyContent: 'center', borderRadius: 5, borderWidth: 2, borderColor: '#808080', paddingLeft: 15}}>
          <TextInput 
            placeholder="Password" 
            style={{fontSize: 16}} 
            autoCapitalize='none' 
            onChangeText={(e) => setPassword(e)}
          />
        </View>
      </View> 
      {password.length >= 8 || !signedUp ? (
        <View style={{height: 20}}/>
      ) : ( 
        <View>
          {password.length > 0 && password.length < 8 ? (
            <View style={{height: 20}}>
              <Text style={{color: 'red', fontWeight: 'bold', fontStyle: 'italic', marginTop: 5, fontSize: 14}}>
                Password must be at least 8 characters long
              </Text>
            </View>
          ) : (
            <View style={{height: 20}}>
              <Text style={{color: 'red', fontWeight: 'bold', fontStyle: 'italic', marginTop: 5, fontSize: 14}}>
                Field cannot be empty
              </Text>
            </View>
          )}
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
          onPress={() => {
            setIsLoading(!loading)
            setSignedUp(true)
            dispatch(signUpRequest(username, password))
          }} 
          loading={loading}
        >
          <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>
            Sign up
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}