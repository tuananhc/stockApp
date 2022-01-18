import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import goBackButton from '../components/goBackButton'
import CustomText from '../components/text';
 
export default function TestScreen() {
  const navigation = useNavigation()
  const data = Array.from(Array(20).keys())

  return (
      <View style={{flex: 1}}>
        {goBackButton()}
        <CustomText>dmmm</CustomText>
        <View style={{flexDirection: 'row', flex: 0.4}}>
          <View style={{flex: 0.9, backgroundColor: 'green'}}>
            <ScrollView>
              <View style={{width: 500, backgroundColor: 'blue', height: '80%', opacity: 0}}/>
            </ScrollView>
          </View>
          <View style={{backgroundColor: 'red', flex: 0.1}}>
            <CustomText>dmm</CustomText>
          </View>
        </View>
      </View>

  )
}