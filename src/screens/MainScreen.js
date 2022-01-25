import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import NeumorphicButton from '../components/NeumorphicButton';
import CustomText from '../components/text';

export default function MainScreen() {
  const data = useSelector(state => state.marketData);
  const navigator = useNavigation()

  useEffect(() => {
    if (data.getHistoricalDataSuccess) {
      navigator.navigate("HistoricalData")
    }
  }, [data.getHistoricalDataSuccess])

  function renderItem({item}) {
    return (
      <NeumorphicButton
        symbol={item.symbol}
        name={item.name}
        price={item.price}
        change={item.change}
        previousClose={item.previousClose}
      />
    );
  }

  return (
    <SafeAreaView style={{flex: 1, marginLeft: 20, marginTop: 20}}>
      <FlatList
        ListHeaderComponent={
          <View>
            <CustomText style={{fontWeight: 'bold', fontSize: 20}}>
              Major market indexes
            </CustomText>
            <View style={{marginTop: 20}}>
              <FlatList
                data={data.marketData}
                renderItem={renderItem}
                key={({item}) => item}
                horizontal={true}
              />
            </View>

            <CustomText style={{fontWeight: 'bold', fontSize: 20}}>
              Forex
            </CustomText>
            <View style={{marginTop: 20}}>
              <FlatList
                data={data.forexData}
                renderItem={renderItem}
                key={({item}) => item}
                horizontal={true}
              />
            </View>

            <CustomText style={{fontWeight: 'bold', fontSize: 20}}>
              Crypto
            </CustomText>
            <View style={{marginTop: 20}}>
              <FlatList
                data={data.cryptoData}
                renderItem={renderItem}
                key={({item}) => item}
                horizontal={true}
              />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
