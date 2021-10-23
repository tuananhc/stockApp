import React, {useState} from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles'
import CustomText from '../../components/text';

export default function LoginScreen() {
  const navigation = useNavigation()
  const [passwordVisible, setPasswordVisible] = useState(true)
  
  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <CustomText style={{fontSize: 32, marginBottom: 30, fontWeight: 'bold'}}>Da stock app</CustomText>
      <View style={styles.TextInput}>
        <TextInput placeholder='Username'/>
      </View>
      <View style={[styles.TextInput, {marginTop: 10, flexDirection: 'row', alignItems: 'center'}]}>
        <View style={{flex: 0.9}}>
          <TextInput placeholder='Password' secureTextEntry={passwordVisible}/>
        </View>
        <TouchableOpacity
          style={{flex: 0.1, alignItems: 'flex-end', marginRight: 10}}
          onPress={() => setPasswordVisible(!passwordVisible)}>
            {(passwordVisible) ? (
              <Image style={{height: 20, width: 20}} source={require('../../assets/notvisible.png')} />
            ) : (
              <Image style={{height: 20, width: 20}} source={require('../../assets/visible.png')}/>
            )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {navigation.navigate("Main")}}
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
          <CustomText style={{color: 'white'}}>Log in</CustomText>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}