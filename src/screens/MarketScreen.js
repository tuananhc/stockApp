import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button, Alert, ActivityIndicator, ScrollView, TouchableHighlight } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux';

import CustomTextInput from '../components/textInput';
import { useNavigation } from '@react-navigation/native';
import { searchRequest, getStockDataRequest, searchNotFound } from '../actions/searchActions';
import { FlatList } from 'react-native-gesture-handler';
import CustomText from '../components/text';

export default function MarketScreen() {
  const dark = useSelector(state => state.theme)
  const navigator = useNavigation()
  const isFindingStocks = useSelector(state => state.stock.isFindingStocks)
  const dispatch = useDispatch();
  const stocksFound = useSelector(state => state.stock.stocksFound)
  const stock = useSelector(state => state.stock)

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  function renderItem({item}) {
    return (
      <TouchableHighlight
        onPress={() => {
          dispatch(getStockDataRequest(item.symbol, item.description))
        }}
        style={{margin: 3, paddingLeft: 20, paddingRight: 20, padding: 5}}
        underlayColor= {(dark) ? '#7F969C' : '#e6e6e6'}
      >
        <View>
          <CustomText style={{fontSize: 16, fontWeight: 'bold'}}>{item.symbol}</CustomText>
          <CustomText>{item.description.toLowerCase().split(" ").map(capitalize).join(" ")}</CustomText>
        </View>
      </TouchableHighlight>
    )
  }

  return (
    <View style={{flex: 1}}>
      {((stock.isGettingData) ? (
        <View style={{width: '100%', height: '100%', position: 'absolute'}}>
          <ActivityIndicator size='large' color={(dark) ? 'white' : '##999999'} />
        </View>
      ) : (
        <></>
      ))}
      
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