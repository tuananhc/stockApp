import React, {useState, useEffect} from 'react';
import { FlatList, TouchableOpacity, View, Image, Linking, Text } from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import axios from 'axios';

import CustomText from '../components/text';
import {ActivityIndicator} from 'react-native-paper';
import Button from '../components/button';

export default function CompanyProfileScreen() {
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState([]);
  const symbol = useSelector(state => state.stock.symbol);

  useEffect(() => {
    if (isFocused) {
      getNews(symbol);
    }
  }, [isFocused]);

  async function getNews(symbol) {
    const response = await axios
      .get(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=c5nup6iad3icte5l57r0`
      )
      .then(function (response) {
        setProfile(response.data);
      })
      .catch(function (error) {
        return;
      });
    return response;
  }

  return (
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
      {profile.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="darkgray" />
        </View>
      ) : (
        <View style={{flex: 0.9, marginTop: 20, alignItems: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.35}}>
              <Image source={{uri: profile.logo}} style={{height: 100, width: 100}}/>  
            </View>
            <View style={{flex: 0.65}}>
              <CustomText style={{marginBottom: 10}}>Company name: {profile.name}</CustomText>
              <CustomText style={{marginBottom: 10}}>Symbol: {profile.ticker}</CustomText>
              <CustomText style={{marginBottom: 10}}>Country: {profile.country}</CustomText>
              <CustomText style={{marginBottom: 10}}>Trading currency: {profile.currency}</CustomText>
              <CustomText style={{marginBottom: 10}}>Exchange: {profile.exchange}</CustomText>
              <CustomText style={{marginBottom: 10}}>Industry: {profile.finnhubIndustry}</CustomText>
              <CustomText style={{marginBottom: 10}}>Market capitalization: {profile.marketCapitalization}</CustomText>
              <CustomText style={{marginBottom: 10}}>Shares outstanding: {profile.shareOutstanding.toFixed(2)}</CustomText>
            </View>
            
          </View>
          <Button
            onPress={() => Linking.openURL(profile.weburl)}
            style={{
              marginTop: 30,
              marginBottom: 10,
              width: 150,
              backgroundColor: '#3DB2FF',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
            }}
          >
            <Text style={{color: 'white', fontWeight: 'bold'}}>Go to website</Text>
          </Button>
        </View>
      )}
    </View>
  );
}
