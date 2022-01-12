import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Svg, {Line, Rect, Text as T} from 'react-native-svg'

import Button from '../components/button';
import CustomText from '../components/text';

const CANDLE_WIDTH = 10
const CHART_HEIGHT = Dimensions.get('window').height * 0.4
const CANDLE_GAP = 20
const TOP_GAP = 30
const CANDLE_STROKE_WIDTH = 2

export default function stockInfo() {
  const chart = useRef(null)
  const data = useSelector(state => state.stock.stockData)

  useEffect(() => {
    focusOnEnd()
  }, [chart, data])

  function focusOnEnd() {
    if (chart.current !== null) {
      chart.current.scrollToEnd({animated: false})
    }
  }

  function drawCandle(open, close, high, low, num, highest, lowest) {
    const color = (close > open ? '#06FF00' : '#FF1700')
    var higher = (open > close ? open : close)
    var lower = (open > close ? close : open)
    return (
      <>
        <Line
          x1={num * CANDLE_GAP + CANDLE_GAP / 2}
          x2={num * CANDLE_GAP + CANDLE_GAP / 2}
          y1={TOP_GAP + CHART_HEIGHT - (high / highest * CHART_HEIGHT)}
          y2={TOP_GAP + CHART_HEIGHT - (low - lowest) / highest * CHART_HEIGHT}
          stroke={color}
          strokeWidth="2"
        />
        <Rect
          x={num * CANDLE_GAP + (CANDLE_GAP - CANDLE_WIDTH) / 2}
          y={TOP_GAP + CHART_HEIGHT - (higher / highest * CHART_HEIGHT)}
          width={CANDLE_WIDTH}
          height={(CHART_HEIGHT - (lower - lowest) / highest * CHART_HEIGHT) - (CHART_HEIGHT -  (higher / highest * CHART_HEIGHT))}
          fill={color}
          strokeWidth="2"
        />
      </>
    )
  }
  
  function drawChart(data) {
    if (data && data.s === 'ok') {
      var closes = data.c
      var opens = data.o
      var highs = data.h
      var lows = data.l
      var timestamps = Array.from(Array(closes.length).keys())
      var all = closes.concat(opens, highs, lows)
      var highest = Math.max(...all)
      var lowest = Math.min(...all)
      return (
        <ScrollView ref={chart} alwaysBounceVertical={false} centerContent={true}>
          <View style={{flexDirection: 'row'}}>
            <Svg 
              height={CHART_HEIGHT + TOP_GAP * 2}
              width={Math.max(closes.length * CANDLE_GAP, Dimensions.get('window').width)}
            >
              <Line
                x1='0'
                x2={Math.max(closes.length * CANDLE_GAP, Dimensions.get('window').width)}
                y1='0'
                y2='0'
                strokeWidth={CANDLE_STROKE_WIDTH}
                stroke='white'
              />
              <Line
                x1='0'
                x2={Math.max(closes.length * CANDLE_GAP, Dimensions.get('window').width)}
                y1={CHART_HEIGHT + TOP_GAP * 2}
                y2={CHART_HEIGHT + TOP_GAP * 2}
                strokeWidth={CANDLE_STROKE_WIDTH}
                stroke='white'
              />
              {timestamps.map((num) => (
                drawCandle(opens[num], closes[num], highs[num], lows[num], num, highest, lowest)
              ))}
            </Svg>
          </View>          
        </ScrollView>
      )
    }
  }

  return (
    <ScrollView style={{marginTop: 20}}>
      <View style={{alignItems: 'center'}}>
        {drawChart(data)}
      </View>
    </ScrollView>
  )
}

