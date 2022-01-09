import React, {useState} from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomText from '../components/text';
import { useDispatch, useSelector } from 'react-redux';
import { logInRequest } from '../actions/logActions';
import CustomTextInput from '../components/textInput';
import Button from '../components/button';
import { Alert } from 'react-native';
import loggedReducer from '../reducers/LoggedReducer';

const styles = {
  TextInput: {
      height: 40,
      width: '70%',
      borderWidth: 1, 
      borderColor: '#808080',
      borderRadius: 5,
      justifyContent: 'center',
      paddingLeft: 10
  }
}

export default function LoginScreen() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [passwordVisible, setPasswordVisible] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [submit, setSubmit] = useState(false)
  const loading = useSelector(state => state.loggedReducer.isLoading)
  
  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <View style={{flex: 0.1}}/>
      <View style={{flex: 0.8, justifyContent: 'center', alignItems: 'center'}}>
        <CustomText style={{fontSize: 32, marginBottom: 30, fontWeight: 'bold'}}>Da stock app</CustomText>
        <View style={[styles.TextInput, {marginTop: 10, flexDirection: 'row', alignItems: 'center'}]}>
          <View style={{flex: 1}}>
          <CustomTextInput 
            placeholder='Username' 
            onChangeText={(e) => setUsername(e)}
            autoCapitalize='none'
          />
          </View>
        </View>
        <View style={[styles.TextInput, {marginTop: 10, flexDirection: 'row', alignItems: 'center'}]}>
          <View style={{flex: 0.9}}>
            <CustomTextInput 
              placeholder='Password' 
              secureTextEntry={passwordVisible}
              onChangeText={(e) => setPassword(e)}
            />
          </View>
          <TouchableOpacity
            style={{flex: 0.1, alignItems: 'flex-end', marginRight: 10}}
            onPress={() => setPasswordVisible(!passwordVisible)}>
              {(passwordVisible) ? (
                <Image style={{height: 20, width: 20, tintColor: 'darkgray'}} source={require('../assets/notvisible.png')} />
              ) : (
                <Image style={{height: 20, width: 20, tintColor: 'darkgray'}} source={require('../assets/visible.png')}/>
              )}
          </TouchableOpacity>
        </View>
        {submit && (username === '' | password === '') ? (
          <Text style={{color: 'red', marginTop: 10, textAlign: 'left'}}>Invalid username or password</Text>
        ) : (
          <Text></Text>
        )}
        <Button
          style={{
            marginTop: 10,
            marginBottom: 10,
            width: 150,
            backgroundColor: '#3DB2FF',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
          }}
          onPress={() => {
            if (username === '' || password === '') {
              setSubmit(true)
            } else {
              dispatch(logInRequest(username, password))}}
            }
          loading={loading}
        >
          <Text style={{fontSize: 14, color: '#fff', fontWeight: 'bold'}}>Log in</Text>
        </Button>
        <TouchableOpacity
          onPress={() => Alert.alert('dumb bitch')}
        >
          <CustomText style={{color: '#3DB2FF'}}>Forgot your password?</CustomText>
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.1}}>
        <View style={{flexDirection: 'row'}}>
          <CustomText>Don't have an account? </CustomText>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
          >
            <CustomText style={{fontWeight: 'bold', color: '#3DB2FF'}}>Sign up now!</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}