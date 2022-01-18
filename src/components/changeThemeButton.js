import React from 'react';
import {TouchableOpacity, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux';
import { change } from '../actions/themeActions';

export default function changeThemeButton() {
  const dark = useSelector(state => state.theme)
  const dispatch = useDispatch()

  return (
    <TouchableOpacity
      onPress={() => {dispatch(change())}}
      style={{margin: 10}}
    >
      <View>
        {(dark) ? (
          <Ionicons
            name="sunny-outline"
            size={22} 
            color={'white'}
          />
        ) : (
          <Ionicons
            name="moon-outline"
            size={22} 
          />
        )}
      </View>
    </TouchableOpacity>
  )
}