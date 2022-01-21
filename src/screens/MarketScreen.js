import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button, Alert, ScrollView, TouchableHighlight } from 'react-native';
import axios from 'axios';
import { ActivityIndicator } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux';

import CustomTextInput from '../components/textInput';
import { useNavigation } from '@react-navigation/native';
import { searchRequest, getStockDataRequest, searchNotFound } from '../actions/searchActions';
import { FlatList } from 'react-native-gesture-handler';
import CustomText from '../components/text';
import { capitalizeString } from '../utils/capitalizeString';

const MONTH = 2629743

export default function MarketScreen() {
  const dark = useSelector(state => state.theme)
  const navigator = useNavigation()
  const dispatch = useDispatch();
  const stock = useSelector(state => state.stock)

  useEffect(() => {
    if (stock.getDataSuccess) {
      navigator.navigate("Info")
    }
  }, [stock.getDataSuccess])

  function renderItem({item}) {
    return (
      <TouchableHighlight
        onPress={() => {
          var today = Math.floor(Date.now() / 1000)
          var resolution = "D"
          dispatch(getStockDataRequest(item.symbol, item.description, resolution, today - MONTH * 3, today))
        }}
        style={{margin: 3, paddingLeft: 20, paddingRight: 20, padding: 5}}
        underlayColor= {(dark) ? '#7F969C' : '#e6e6e6'}
      >
        <View>
          <CustomText style={{fontSize: 16, fontWeight: 'bold'}}>{item.symbol}</CustomText>
          <CustomText>{capitalizeString(item.description)}</CustomText>
        </View>
      </TouchableHighlight>
    )
  }

  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <View style={{
          width: '90%', 
          height: 50, 
          borderRadius: 5, 
          borderWidth: 2, 
          borderColor: '#808080', 
          alignItems: 'center', 
          paddingLeft: 10, 
          flexDirection: 'row'
        }}>
          <Ionicons name="search-outline" size={20} color={dark ? 'white' : 'black'} style={{marginRight: 5}}
            onPress={() => {
              var time = new Date().getTime()
              console.log(time)
              }}
          />
          <CustomTextInput 
            placeholder="search company names or symbols" 
            autoFocus={true}
            value={stock.search}
            onChangeText={(e) => {
              if (e === "") {
                dispatch(searchNotFound())
              } else {
                dispatch(searchRequest(e)) 
              }
            }}
          />
        </View>
        <View style={{width: '100%'}}>
          {(stock.stocksFound && stock.stocksFound.result) ? (
            (stock.isFindingStocks) ? (
              <View style={{height: '50%', alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size='small' color={(dark) ? 'white' : '##999999'} />
              </View>
            ) : (
              <FlatList
                data={stock.stocksFound.result}
                renderItem={renderItem}
              />
            )
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  )
}