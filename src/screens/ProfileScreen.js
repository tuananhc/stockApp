import React, { useState, useMemo, useEffect } from 'react';
import { Animated, View, ScrollView, TouchableHighlight, Text, Dimensions } from 'react-native';
import {useSelector} from 'react-redux';
import PieChart from 'react-native-pie-chart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import { DefaultTheme } from '@react-navigation/native';

import CustomText from '../components/text';
import { formatter } from '../utils/numberFormatter';

export default function ProfileScreen() {
  const username = useSelector(state => state.loggedReducer.username);
  const profile = useSelector(state => state.profile);
  const dark = useSelector(state => state.theme)
  const [donut, setDonut] = useState(false)
  const [focus, setFocus] = useState(0)
  const [totalValue, setTotalValue] = useState(0)
  const [stockPrices, setStockPrices] = useState([])
  var Rainbow = require("rainbowvis.js")
  var myRainbow = new Rainbow()
  const widthAndHeight = 200;
  const sliceColor = useMemo(() => getRandomColors(profile.portfolio.length), [username])
  const [tabTranslateX] = useState(new Animated.Value(-40))
  const [viewTranslateX] = useState(new Animated.Value(0))

  const tabs = [
    {
      title: 'Balance',
      index: 0
    },
    {
      title: 'Funds',
      index: 1
    }
  ]

  useEffect(() => {
    Animated.spring(tabTranslateX, {
      toValue: -40 + focus * 80,
      useNativeDriver: true
    }).start()
    Animated.spring(viewTranslateX, {
      toValue: -(Dimensions.get("window").width - 40) * focus,
      useNativeDriver: true
    }).start()
  }, [focus])

  useEffect(() => {
    async function calculatePortfolioValue(portfolio) {
      if (portfolio === undefined || portfolio.length === 0) return
      for (var i = 0; i < portfolio.length; i ++) {
        var response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${portfolio[i].symbol}&token=c5nup6iad3icte5l57r0`)
          .then(function (response) {
            setTotalValue(totalValue => totalValue + response.data.c * portfolio[i].amount)
            setStockPrices(stockPrices => [...stockPrices, response.data.c * portfolio[i].amount])
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      return 
    }
    calculatePortfolioValue(profile.portfolio)
  }, [sliceColor])

  function getRandomColors(num) {
    return Array.from(Array(num).keys()).map(num => '#' + (myRainbow.colorAt(Math.floor(Math.random() * 100))))
  }

  const [touchX, setTouchX] = useState(0)

  return (
    <ScrollView style={{ flex: 1, marginTop: 20, marginHorizontal: 20 }}>
      <View style={{ marginTop: 40, marginBottom: 20, paddingBottom: 40, borderBottomWidth: 2 }}>
        <View style={{ 
          flexDirection: 'row', 
          height: 40, 
          backgroundColor: (dark) ? 'darkgray' : '#6D787F', 
          borderRadius: 10, 
          marginBottom: 20, 
          justifyContent: 'center', 
          alignItems: 'center',
        }}>
          <Animated.View style={{
            width: 70, 
            height: 35, 
            borderRadius: 10,
            backgroundColor: '#3DB2FF',
            position: 'absolute',
            transform: [{translateX: tabTranslateX}]
          }}/>
          {tabs.map(item => <TouchableHighlight key={item.index} style={{
              width: 70, 
              height: 35, 
              borderRadius: 10,
              justifyContent: 'center', 
              alignItems: 'center', 
              marginRight: (item.index !== tabs.length - 1) ? 10 : 0
            }}
              onPress={() => {
                setFocus(item.index)
              }}
              underlayColor={(item.index === focus) ? '#007EC6' : 'darkgray'}
            >
              <Text style={{color: 'white', fontWeight: 'bold'}}>{item.title}</Text>
            </TouchableHighlight>
          )}
        </View>
        <Animated.View style={{width: '200%', flexDirection: 'row', transform: [{translateX: viewTranslateX}]}}>
          <View 
            style={{ 
              width: '50%', 
              justifyContent: 'center', 
              alignItems: 'center', 
              backgroundColor: (dark) ? '#171515' : '#FFFFFF',
              borderRadius: 15,
              paddingVertical: 20
            }}
            onTouchStart={e => setTouchX(e.nativeEvent.pageX)}
            onTouchEnd={e => {
              if (touchX - e.nativeEvent.pageX > 20)
                setFocus(focus => focus + 1)
            }}
          >
            <CustomText style={{fontWeight: 'bold', fontSize: 20, marginBottom: 20}}>Portfolio balance</CustomText>
            <CustomText style={{fontSize: 20, color: '#00CB00', marginBottom: 10}}>{formatter.format(totalValue)}</CustomText>
            <View style={{flexDirection: 'row'}}>
              <Ionicons 
                name={totalValue - profile.initialValue > 0 ? "caret-up" : "caret-down"}  
                size={12} 
                color={totalValue - profile.initialValue > 0 ? '#00CB00' : '#FF1700'}
                style={{marginRight: 3}}
              />
              <CustomText style={{fontSize: 12, color: totalValue - profile.initialValue > 0 ? '#00CB00' : '#FF1700'}}>
                {Math.abs(totalValue - profile.initialValue).toFixed(2)} / {Math.abs(totalValue / profile.initialValue * 100).toFixed(2)}%
              </CustomText>
            </View>
          </View>
          <View 
            style={{ 
              width: '50%', 
              justifyContent: 'center', 
              alignItems: 'center', 
              backgroundColor: (dark) ? '#171515' : '#FFFFFF',
              borderRadius: 15,
              paddingVertical: 20 
            }}
            onTouchStart={e => setTouchX(e.nativeEvent.pageX)}
            onTouchEnd={e => {
              if (e.nativeEvent.pageX - touchX > 20)
                setFocus(focus => focus - 1)
            }}
          >
            <CustomText style={{fontWeight: 'bold', fontSize: 20, marginBottom: 20}}>Available Funds</CustomText>
            <CustomText style={{fontSize: 20, color: '#00CB00', marginBottom: 10}}>${profile.availableFunds.toFixed(2)}</CustomText>
          </View>
        </Animated.View>
      </View>
      <View style={{ paddingBottom: 30, borderBottomWidth: 2, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <CustomText style={{fontWeight: 'bold', fontSize: 20}}>Portfolio</CustomText>
          <View style={{ width: 40, height: 40, marginLeft: 5 }}>
            <TouchableHighlight
              onPress={() => {
                setDonut(!donut)
              }}
              underlayColor= '#7F969C'
              style={{ borderRadius: 10 }}
            >
              <View style={{justifyContent: 'center', alignItems: 'center', width: 40, height: 40}}>
                {(donut) ? (
                  <MaterialCommunityIcons name="chart-donut" size={25} color={(dark) ? "white" : "black"}/>
                ) : (
                  <MaterialCommunityIcons name="chart-pie" size={25} color={(dark) ? "white" : "black"}/>
                )}
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20}}>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={stockPrices}
            sliceColor={sliceColor}
            doughnut={donut}
            coverFill={dark ? '#222831': "rgb(242, 242, 242)"}
            coverRadius={0.7}
          />
          <ScrollView style={{ marginLeft: 40, height: 200}}>
            <View>
              {profile.portfolio.map((item, index) => <View style={{ flexDirection: 'row', marginBottom: 10 }} key={index}>
                <View style={{ 
                  height: 20, 
                  width: 20, 
                  backgroundColor: sliceColor[index], 
                  borderWidth: 1, 
                  borderColor: (dark) ? "white" : "black", 
                  marginRight: 15
                }}/>
                <CustomText style={{fontWeight: 'bold'}}>{item.symbol}</CustomText>
              </View>)}
            </View>
          </ScrollView>
        </View>
      </View>

      <View>
        <CustomText style={{fontWeight: 'bold', fontSize: 20}}>Transactions</CustomText>
        <CustomText>No past transactions</CustomText>
      </View>

    </ScrollView>
  );
}
