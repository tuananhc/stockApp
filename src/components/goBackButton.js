import React from 'react';
import { View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/core"
import { useDispatch, useSelector } from 'react-redux';
import { stockDataNotFound } from '../actions/searchActions';

export default function goBackButton() {
  const navigation = useNavigation()
  const dark = useSelector(state => state.theme)
  const dispatch = useDispatch()
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Market")
          dispatch(stockDataNotFound())
        }}
        style={{margin: 10, marginRight: 5}}
      >
        <View>
          <Ionicons name="arrow-back" size={22} color={dark ? 'white' : 'black'}/>
        </View>
      </TouchableOpacity>
    </View>
  )
}