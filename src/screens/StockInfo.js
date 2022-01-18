import React, { useEffect, useState, useRef, Fragment, useMemo } from 'react';
import { View, ScrollView, Dimensions, TouchableHighlight, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Svg, {Line, Rect, Text as T} from 'react-native-svg'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ActivityIndicator } from 'react-native-paper'

import CustomText from '../components/text';

const CANDLE_WIDTH = 10
const CHART_HEIGHT = Dimensions.get('window').height * 0.4
const CANDLE_GAP = 4
const TOP_GAP = 30
const BOTTOM_GAP = TOP_GAP
const CANDLE_STROKE_WIDTH = 2
const GRAPH_GAP = -10
const VOLUME_HEIGHT = 2 * TOP_GAP
const DATE_HEIGHT = 20
const TOTAL_HEIGHT = CHART_HEIGHT + TOP_GAP + BOTTOM_GAP + GRAPH_GAP + VOLUME_HEIGHT + DATE_HEIGHT

const TIME = {
  HOUR: 3600,
  DAY: 86400,
  WEEK: 604800,
  MONTH: 2629743,
  YEAR: 31556926
}

export default function stockInfo() {
  const chart = useRef(null)
  const stock = useSelector(state => state.stock)
  const dark = useSelector(state => state.theme)
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch()
  const [resolution, setResolution] = useState("D")
  const [resolutionListVisible, setResolutionListVisible] = useState(false)
  const [chartType, setChartType] = useState("Candles")
  const [chartListVisible, setChartListVisible] = useState(false)
  const color = (dark) ? 'black' : 'white'

  const candleChart = useMemo(() => drawChart(stock.stockData, "Candles"), [stock.stockData])
  const lineChart = useMemo(() => drawChart(stock.stockData, "Line"), [stock.stockData])

  useEffect(() => {
    focusOnEnd()
  }, [candleChart])

  function focusOnEnd() {
    if (chart.current !== null) {
      chart.current.scrollToEnd({ animated: false })
    }
  }

  function drawCandle(open, close, high, low, num, highest, lowest) {
    const color = (close > open ? '#06FF00' : '#FF1700')
    var higher = (open > close ? open : close)
    var lower = (open > close ? close : open)
    return (
      <Fragment key={`candle${num}`}>
        <Line
          x1={num * (CANDLE_WIDTH + CANDLE_GAP) + CANDLE_GAP / 2 + CANDLE_GAP}
          x2={num * (CANDLE_WIDTH + CANDLE_GAP) + CANDLE_GAP / 2 + CANDLE_GAP}
          y1={TOP_GAP + ((highest - high) / (highest - lowest) * CHART_HEIGHT)}
          y2={TOP_GAP + ((highest - low) / (highest - lowest) * CHART_HEIGHT)}
          stroke={color}
          strokeWidth={CANDLE_STROKE_WIDTH}
        />
        <Rect
          x={num * (CANDLE_WIDTH + CANDLE_GAP) + (CANDLE_GAP - CANDLE_WIDTH) / 2 + CANDLE_GAP}
          y={TOP_GAP + ((highest - higher) / (highest - lowest) * CHART_HEIGHT)}
          width={CANDLE_WIDTH}
          height={(TOP_GAP + ((highest - lower) / (highest - lowest) * CHART_HEIGHT)) - (TOP_GAP + ((highest - higher) / (highest - lowest) * CHART_HEIGHT))}
          fill={color}
        />
      </Fragment>
    )
  }

  function createLine(x, y) {
    return (
      <Line
        x1={0}
        x2={x}
        y1={y}
        y2={y}
        strokeDasharray="2, 5"
        strokeWidth={1}
        stroke="darkgray"
      />
    )
  }

  function drawLine(closes, num, highest, lowest) {
    return (
      <Fragment key={`line${num}`}>
        {(num > 0) ? (
          <Line
            x1={(num - 1) * (CANDLE_WIDTH + CANDLE_GAP) + CANDLE_GAP / 2 + CANDLE_GAP}
            x2={(num) * (CANDLE_WIDTH + CANDLE_GAP) + CANDLE_GAP / 2 + CANDLE_GAP}
            y1={TOP_GAP + ((highest - closes[num - 1]) / (highest - lowest) * CHART_HEIGHT)}
            y2={TOP_GAP + ((highest - closes[num]) / (highest - lowest) * CHART_HEIGHT)}
            stroke="darkgray"
            strokeWidth={CANDLE_STROKE_WIDTH}
          />
        ) : (
          <></>
        )}
      </Fragment>
    )
  }

  function drawVolume(open, close, num, volume, maxVolume) {
    const color = (close > open ? '#06FF00' : '#FF1700')
    return (
      <Fragment key={`volume${num}`}>
        <Rect
          x={num * (CANDLE_WIDTH + CANDLE_GAP) + (CANDLE_GAP - CANDLE_WIDTH) / 2 + CANDLE_GAP}
          y={TOP_GAP + CHART_HEIGHT + BOTTOM_GAP + GRAPH_GAP + ((1 - volume / maxVolume) * VOLUME_HEIGHT)}
          width={CANDLE_WIDTH}
          height={volume / maxVolume * VOLUME_HEIGHT}
          fill={color}
          style={{opacity: 0.3}}
        />
      </Fragment>
    )
  }

  function drawDate(num, maxNum, time) {
    var date = new Date(time * 1000)
    return (
      <Fragment key={`date${num}`}>
        {num % 10 === 0 ? (
          <>
            <Line
              x1={num * (CANDLE_WIDTH + CANDLE_GAP) + CANDLE_GAP / 2 + CANDLE_GAP}
              x2={num * (CANDLE_WIDTH + CANDLE_GAP) + CANDLE_GAP / 2 + CANDLE_GAP}
              y1={0}
              y2={TOTAL_HEIGHT}
              strokeDasharray="2, 5"
              strokeWidth={1}
              stroke="darkgray"
              style={{}}
            />
            <T 
              fill="darkgray"
              stroke="darkgray"
              fontSize="10"
              x={num * (CANDLE_WIDTH + CANDLE_GAP)}
              y={TOTAL_HEIGHT - DATE_HEIGHT / 2}
              textAnchor={(num === 0) ? "start" : ((num === maxNum) ? "end" : "middle")}
            >
              {date.toString().slice(4, 15)}
            </T>
          </>
        ) : (
          <></>
        )}
      </Fragment>
    )
  }

  function drawChart(data, type) {
    if (data && data.s === 'ok') {
      var closes = data.c
      var opens = data.o
      var highs = data.h
      var lows = data.l
      var volumes = data.v
      var timestamps = Array.from(Array(closes.length).keys())
      var all = closes.concat(opens, highs, lows)
      var highest = Math.max(...all)
      var lowest = Math.min(...all)
      var maxVolume = Math.max(...volumes)
      var times = data.t
      var len = Math.max(closes.length * (CANDLE_WIDTH + CANDLE_GAP), Dimensions.get('window').width)
      return (
        <View style={{
          flexDirection: 'row', 
          borderColor: 'darkgray', 
          borderTopWidth: 2, 
          borderBottomWidth: 2,
          zIndex: -1
        }}>
          <View style={{flex: 0.88, alignItems: 'flex-start'}}>
            <ScrollView ref={chart} alwaysBounceVertical={false} centerContent={true} bounces={false}>
              {((stock.isGettingData) ? (
                <View style={{width: '100%', height: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>
                  <ActivityIndicator size='large' color={(dark) ? 'white' : '#999999'} />
                </View>
              ) : (
                <Svg 
                  height={TOTAL_HEIGHT}
                  width={Math.max(closes.length * (CANDLE_WIDTH + CANDLE_GAP), Dimensions.get('window').width * 0.88)}
                >
                  {timestamps.map((num) => (
                    <>
                      {drawDate(num, closes.length, times[num])}
                      {drawVolume(opens[num], closes[num], num, volumes[num], maxVolume)}
                    </>
                  ))}
                  {(type === "Candles") ? (
                    <>
                      {timestamps.map((num) => (
                        drawCandle(opens[num], closes[num], highs[num], lows[num], num, highest, lowest)
                      ))}
                    </>
                  ) : (
                    <>
                      {timestamps.map(num => 
                        drawLine(closes, num, highest, lowest)
                      )}
                    </>
                  )}
                  {createLine(len, TOP_GAP)}
                  {createLine(len, TOP_GAP + CHART_HEIGHT * 1/4)}
                  {createLine(len, TOP_GAP + CHART_HEIGHT * 2/4)}
                  {createLine(len, TOP_GAP + CHART_HEIGHT * 3/4)}
                  {createLine(len, TOP_GAP + CHART_HEIGHT)}
                </Svg>
              ))}
            </ScrollView>
          </View>
          <View style={{ 
            flex: 0.12, 
            flexWrap: 'nowrap', 
            borderColor: 'darkgray', 
            borderLeftWidth: 2, 
            paddingLeft: 2 
          }}>
            <View style={{ flex: TOP_GAP/(TOTAL_HEIGHT)}}/> 
            <View style={{ flex: CHART_HEIGHT/(TOTAL_HEIGHT) * 1.25 }}>
              <View style={{ flex: 0.2, marginTop: -6 }}>
                <CustomText style={{fontSize: 12}}>{highest}</CustomText>
              </View>
              <View style={{ flex: 0.2, marginTop: -6 }}>
                <CustomText style={{fontSize: 12}}>{(highest - (highest - lowest) * 1/4).toFixed(2)}</CustomText>
              </View>
              <View style={{ flex: 0.2, marginTop: -6 }}>
                <CustomText style={{fontSize: 12}}>{(highest - (highest - lowest) * 1/2).toFixed(2)}</CustomText>
              </View>
              <View style={{ flex: 0.2, marginTop: -6 }}>
                <CustomText style={{fontSize: 12}}>{(highest - (highest - lowest) * 3/4).toFixed(2)}</CustomText>   
              </View>
              <View style={{ flex: 0.2, marginTop: -6 }}>
                <CustomText style={{fontSize: 12}}>{lowest}</CustomText>
              </View>
            </View>
          </View>
        </View>
      )
    }
  }

  return (
    <View
      style={{flex: 1}}
    >
      {(stock.isGettingData) ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="darkgray"/>
        </View>
      ) : (
        <View>
          <View style={{margin: 20, marginLeft: 30}}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <CustomText style={{fontSize: 25, fontWeight: 'bold'}}>{stock.quote.c}</CustomText>
              <CustomText style={{fontSize: 12, marginBottom: 4}}>  USD</CustomText>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Ionicons name={(stock.quote.d > 0) ? "caret-up" : "caret-down"} color={stock.quote.d > 0 ? '#00CB00' : '#FF1700'} size={15}/>
              <CustomText style={{color: stock.quote.d > 0 ? '#00CB00' : '#FF1700'}}> {stock.quote.d} </CustomText>
              <CustomText style={{color: stock.quote.d > 0 ? '#00CB00' : '#FF1700'}}>
                ({stock.quote.d > 0 ? '+' : '-'}{Math.abs(stock.quote.d / stock.quote.pc * 100).toFixed(2)}%)
              </CustomText>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <TouchableHighlight
                onPress={() => {
                  setResolutionListVisible(!resolutionListVisible)
                  if (chartListVisible) {
                    setChartListVisible(false)
                  }
                }}
                underlayColor= '#7F969C'
              >
                <View style={{justifyContent: 'center', alignItems: 'center', width: 30, height: 30}}>
                  <CustomText>{resolution}</CustomText>
                </View>
              </TouchableHighlight>
              <View style={{
                position: 'absolute', 
                opacity: (resolutionListVisible) ? 1 : 0, 
                top: 30, 
                left: 0,
                width: 100,
              }}>
                <FlatList
                  data={["1", "5", "15", "30", "60", "D", "W", "M"]}
                  renderItem={({item}) => <TouchableHighlight
                    underlayColor='#7F969C'
                    onPress={() => {
                      setResolutionListVisible(!resolutionListVisible)
                      setResolution(item)
                    }}
                  >
                    <View style={{
                      width: 100, 
                      height: 40, 
                      paddingLeft: 10, 
                      justifyContent: 'center', 
                      backgroundColor: (item === resolution) ? '#3DB2FF' : ((dark) ? '#404352' : '#B9C3C8')
                    }}
                    >
                      <CustomText>{item}</CustomText>
                    </View>
                  </TouchableHighlight>
                  }
                  keyExtractor={item => item}
                />
              </View>
            </View>
            <View>
              <TouchableHighlight
                onPress={() => {
                  setChartListVisible(!chartListVisible)
                  if (resolutionListVisible) {
                    setResolutionListVisible(false)
                  }
                }}
                underlayColor= '#7F969C'
              >
                <View style={{justifyContent: 'center', alignItems: 'center', width: 30, height: 30}}>
                  {(chartType === "Candles") ? (
                    <Image 
                      source={require('../assets/candlestick1.png')} 
                      style={{width: 25, height: 25, tintColor: (dark) ? "white" : "black"}}/>
                  ) : (
                    <MaterialCommunityIcons name="chart-timeline-variant" size={20} color={(dark) ? "white" : "black"}/>
                  )}
                </View>
              </TouchableHighlight>
              <View style={{
                position: 'absolute', 
                opacity: (chartListVisible) ? 1 : 0, 
                top: 30, 
                left: 0,
                width: 100,
              }}>
                <FlatList
                  data={["Candles", "Lines"]}
                  renderItem={({item}) => <TouchableHighlight
                    underlayColor='#7F969C'
                    onPress={() => {
                      setChartListVisible(false)
                      setChartType(item)
                    }}
                  >
                    <View style={{
                      width: 100, 
                      height: 40, 
                      paddingLeft: 10, 
                      justifyContent: 'center', 
                      backgroundColor: (item === chartType) ? '#3DB2FF' : ((dark) ? '#404352' : '#B9C3C8')
                    }}>
                      <CustomText>{item}</CustomText>
                    </View>
                  </TouchableHighlight>
                  }
                  keyExtractor={item => item}
                />
              </View>
            </View>
          </View>
          {(chartType === "Candles") ? (
            <>
              {candleChart}
            </>
          ) : (
            <>
              {lineChart}
            </>
          )}
          <View style={{flexDirection: 'row'}}>
          </View>
        </View>
      )}
    </View>
  )
}

