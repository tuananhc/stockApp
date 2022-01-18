import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, View, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';

import CustomText from '../components/text';

export default function CompanyNewsScreen() {
  const isFocused = useIsFocused()
  const [news, setNews] = useState([])
  const symbol = useSelector(state => state.stock.symbol)

  useEffect(() => {
    if (isFocused) {
      getNews(symbol)
    }
  }, [isFocused])

  async function getNews(symbol) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    var to = yyyy + '-' + mm + '-' + dd
    var from = (yyyy - 1) + '-' + mm + '-' + dd
    const response = await axios.get(`https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${from}&to=${to}&token=c5nup6iad3icte5l57r0`)
      .then(function(response) {
        setNews(response.data)
      })
      .catch(function (error) {
        return
      })
    return response
  }

  function renderItem({item}) {
    var date = Date(item.datetime * 1000)
    return (
      <TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 10, }}>
          <View style={{justifyContent: 'flex-start', alignItems: 'center', flex: 0.2, margin: 10,}}>
            {item.image !== "" ? (
              <Image style={{width: 75, height: 75}} source={{uri: item.image}} resizeMode='center'/>
            ) : (
              <></>
            )}
          </View>
          <View style={{flex: 0.8}}>
            <CustomText style={{fontWeight: 'bold', fontSize: 14}}>{item.headline}</CustomText>
            <CustomText>{item.summary}</CustomText>
            <CustomText style={{ fontStyle: 'italic', fontSize: 12 }}>{date.toString().slice(4, 15)}</CustomText>
          </View>
        </View>
      </TouchableOpacity>  
    )
  }

  return (
    <View>
      <FlatList
        data={news}
        renderItem={renderItem}
      />
    </View>
  )
}
