import React from 'react';
import { View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MarketScreen() {
  return (
    <View style={{flex: 1, marginTop: 20}}>
      <View style={{alignItems: 'center'}}>
        <View style={{width: '90%', height: 50, borderRadius: 5, borderWidth: 2, borderColor: '#808080', justifyContent: 'center', paddingLeft: 10}}>
          <TextInput placeholder="search for companies"/>
        </View>
      </View>
    </View>
  )
}