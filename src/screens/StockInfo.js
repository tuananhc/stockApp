import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Svg, {Line, Rect} from 'react-native-svg'

import Button from '../components/button';
import CustomText from '../components/text';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

function drawCandle(close, open, high, low) {
  return {

  }
}

export default function stockInfo() {
  const [data, setData] = useState({})
  const [symbol, setSymbol] = useState("")
  const [description, setDescription] = useState("")
  const chart = useRef(null)

  function focusOnEnd() {
    chart.current.scrollToEnd({animated: false})
  }

  async function findName(name) {
    const response = await axios.get(`https://finnhub.io/api/v1/search?q=${name}&token=c5nup6iad3icte5l57r0`)
      .then(function (response) {
        console.log(response.data.result);
        return response
      })
      .catch(function (error) {
        console.log(error);
        return error
      })
    setSymbol(response.data.result[0].displaySymbol)
    setDescription(response.data.result[0].description.toLowerCase().split(" ").map(capitalize).join(" "))
    var today = new Date().getTime()
    console.log(today)
    console.log("symbol: ", symbol)
    const prices = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=1590988249&to=1591852249&token=c5nup6iad3icte5l57r0`)
    .then(function (response) {
      console.log(response.data)
      setData(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  useEffect(() => {
    focusOnEnd()
  }, [chart])

  const stockName = useSelector(state => state.stock.search)

  return (
    <ScrollView style={{marginTop: 20}}>
      <View style={{alignItems: 'center'}}>
        <CustomText>Stonk info</CustomText>
        <CustomText>des: {description}</CustomText>
        <Button
          onPress={() => findName(stockName)}
        >
          <Text>Test</Text>
        </Button>
        <ScrollView ref={chart}>
          <Svg height={Dimensions.get('window').height * 0.5} width={Dimensions.get('window').width * 2}>
            <Rect
              x="0"
              y="0"
              width={Dimensions.get('window').width}
              height={Dimensions.get('window').height * 0.4}
            />
            <Line
              x1="50" y1="0" x2="50" y2="285"
              stroke="red" 
              strokeWidth="2"
            />
            <Rect
              x="40"
              y="40"
              width="20"
              height="70"
              stroke="black"
              strokeWidth="1"
              fill="red"
            />
          </Svg>
        </ScrollView>
        <Button
          onPress={() => focusOnEnd()}
        >
          <Text>ENd</Text>
        </Button>
      </View>
      
    </ScrollView>
  )
}