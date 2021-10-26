import React from 'react';
import { TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';

import CustomTextInput from '../../components/textInput';

export default function MarketScreen() {
  const dark = useSelector(state => state.theme)
  return (
    <View style={{flex: 1, marginTop: 20}}>
      <View style={{alignItems: 'center'}}>
        <View style={{width: '90%', height: 50, borderRadius: 5, borderWidth: 2, borderColor: '#808080', alignItems: 'center', paddingLeft: 10, flexDirection: 'row'}}>
          <Ionicons name="search-outline" size={20} color={dark ? 'white' : 'black'} style={{marginRight: 5}}/>
          <CustomTextInput placeholder="search for companies" autoFocus={true}/>
        </View>
      </View>
    </View>
  )
}