import React, { useState, useMemo, useEffect } from 'react';
import { View, ScrollView, TouchableHighlight } from 'react-native';
import {useSelector} from 'react-redux';
import PieChart from 'react-native-pie-chart';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'

import CustomText from '../components/text';

export default function ProfileScreen() {
  const username = useSelector(state => state.loggedReducer.username);
  const profile = useSelector(state => state.profile);
  const [donut, setDonut] = useState(false)
  const dark = useSelector(state => state.theme)
  const [totalValue, setTotalValue] = useState(0)
  const [stockPrices, setStockPrices] = useState([])
  var Rainbow = require("rainbowvis.js")
  var myRainbow = new Rainbow()
  const widthAndHeight = 200;
  const sliceColor = useMemo(() => getRandomColors(profile.portfolio.length), [username])

  useEffect(() => {
    async function calculatePortfolioValue(portfolio) {
      if (portfolio === undefined || portfolio.length === 0) return
      for (var i = 0; i < portfolio.length; i ++) {
        var response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${portfolio[i].symbol}&token=c5nup6iad3icte5l57r0`)
          .then(function (response) {
            console.log(response.data)
            setTotalValue(totalValue => totalValue + response.data.c)
            setStockPrices(stockPrices => [...stockPrices, response.data.c])
          })
          .catch(function (error) {
            console.log(error)
          })
      }
      return 
    }
    console.log(sliceColor)
    calculatePortfolioValue(profile.portfolio)
  }, [sliceColor])

  function getRandomColors(num) {
    return Array.from(Array(num).keys()).map(num => '#' + (myRainbow.colorAt(Math.floor(Math.random() * 100))))
  }
     //#00CB00' : '#FF1700

  return (
    <ScrollView style={{ flex: 1, marginTop: 20, marginHorizontal: 20 }}>
      <View style={{ marginTop: 40, marginBottom: 20, paddingBottom: 20, borderBottomWidth: 2 }}>
        <CustomText style={{fontSize: 30}}>{username}</CustomText>
        <View style={{flexDirection: 'row'}}>
          <CustomText style={{fontSize: 20}}>Available funds: </CustomText>
          <CustomText style={{fontSize: 20, color: '#00CB00'}}>${profile.availableFunds}</CustomText>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CustomText style={{fontSize: 20}}>Portfolio balance: </CustomText>
          <CustomText style={{fontSize: 20, color: '#00CB00'}}>${totalValue.toFixed(2)}  </CustomText>
          <Ionicons name={totalValue - profile.initialValue > 0 ? "caret-up" : "caret-down"} size={12} color='#00CB00'/>
          <CustomText style={{fontSize: 12, color: totalValue - profile.initialValue > 0 ? '#00CB00' : '#FF1700'}}>
            {Math.abs(totalValue - profile.initialValue).toFixed(2)} / {Math.abs(totalValue / profile.initialValue * 100).toFixed(2)}%
          </CustomText>
        </View>
      </View>

      <View style={{ paddingBottom: 30, borderBottomWidth: 2, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <CustomText style={{fontWeight: 'bold', fontSize: 20}}>Portfolio</CustomText>
          <View style={{ width: 40, height: 40, marginLeft: 5 }}>
            <TouchableHighlight
              onPress={() => {
                setDonut(!donut)
                console.log(stockPrices)
                console.log(sliceColor)
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
