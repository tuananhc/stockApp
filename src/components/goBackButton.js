import React from 'react';
import { View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/core"
import { useSelector } from 'react-redux';

export default function goBackButton() {
  const navigation = useNavigation()
  const dark = useSelector(state => state.theme)
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{margin: 10, marginRight: 5}}
      >
        <View>
          <Ionicons name="arrow-back" size={22} color={dark ? 'white' : 'black'}/>
        </View>
      </TouchableOpacity>
    </View>
  )
}