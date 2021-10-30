import React, {useState} from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles'
import CustomText from '../../components/text';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../actions/loggedActions';
import CustomTextInput from '../../components/textInput';

export default function LoginScreen() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [passwordVisible, setPasswordVisible] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <CustomText style={{fontSize: 32, marginBottom: 30, fontWeight: 'bold'}}>Da stock app</CustomText>
      <View style={styles.TextInput}>
        <CustomTextInput 
          placeholder='Username' 
          onChangeText={(e) => setUsername(e)}
        />
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
              <Image style={{height: 20, width: 20, tintColor: 'darkgray'}} source={require('../../assets/notvisible.png')} />
            ) : (
              <Image style={{height: 20, width: 20, tintColor: 'darkgray'}} source={require('../../assets/visible.png')}/>
            )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => dispatch(signIn({username, password}))}
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
          <Text style={{color: 'white'}}>Log in</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
      >
        <View style={{
          width: 100,
          height: 30,
          backgroundColor: '#3DB2FF',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          marginTop: 30
        }}>
          <Text style={{color: 'white'}}>Sign up now</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}