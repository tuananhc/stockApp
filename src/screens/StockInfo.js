import React, { useEffect, useState, useRef, Fragment, useMemo } from 'react';
import { View, ScrollView, Dimensions, TouchableHighlight, FlatList, Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import Svg, {Line, Rect, Text as T} from 'react-native-svg'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ActivityIndicator } from 'react-native-paper'

import CustomText from '../components/text';
import Button from '../components/button';
import { getStockDataRequest } from '../actions/searchActions';

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
  const stock = useSelector(state => state.stock)
  const dark = useSelector(state => state.theme)
  const refreshing = stock.isGettingData
  const dispatch = useDispatch()
  const [resolution, setResolution] = useState("D")
  const [resolutionListVisible, setResolutionListVisible] = useState(false)
  const [chartType, setChartType] = useState("Candles")
  const [chartListVisible, setChartListVisible] = useState(false)

  const CandleChart = useMemo(() => drawChart(stock.stockData, "Candles"), [stock.stockData])
  const LineChart = useMemo(() => drawChart(stock.stockData, "Line"), [stock.stockData])

  function Candle(props) {
    const color = (props.close > props.open ? '#06FF00' : '#FF1700')
    var higher = (props.open > props.close ? props.open : props.close)
    var lower = (props.open > props.close ? props.close : props.open)
    return (
      <Fragment key={`candle${props.num}`}>
        <Line
          x1={props.num * (CANDLE_WIDTH + CANDLE_GAP) + CANDLE_GAP / 2 + CANDLE_GAP}
          x2={props.num * (CANDLE_WIDTH + CANDLE_GAP) + CANDLE_GAP / 2 + CANDLE_GAP}
          y1={TOP_GAP + ((props.highest - props.high) / (props.highest - props.lowest) * CHART_HEIGHT)}
          y2={TOP_GAP + ((props.highest - props.low) / (props.highest - props.lowest) * CHART_HEIGHT)}
          stroke={color}
          strokeWidth={CANDLE_STROKE_WIDTH}
        />
        <Rect
          x={props.num * (CANDLE_WIDTH + CANDLE_GAP) + (CANDLE_GAP - CANDLE_WIDTH) / 2 + CANDLE_GAP}
          y={TOP_GAP + ((props.highest - higher) / (props.highest - props.lowest) * CHART_HEIGHT)}
          width={CANDLE_WIDTH}
          height={(TOP_GAP + ((props.highest - lower) / (props.highest - props.lowest) * CHART_HEIGHT)) - (TOP_GAP + ((props.highest - higher) / (props.highest - props.lowest) * CHART_HEIGHT))}
          fill={color}
        />
      </Fragment>
    )
  }

  function HorizontalDashedLine(props) {
    return (
      <Line
        x1={0}
        x2={props.x}
        y1={props.y}
        y2={props.y}
        strokeDasharray="2, 5"
        strokeWidth={1}
        stroke="darkgray"
      />
    )
  }

  function ChartLine(props) {
    return (
      <Fragment key={`line${props.num}`}>
        {(props.num > 0) ? (
          <Line
            x1={(props.num - 1) * (CANDLE_WIDTH + CANDLE_GAP) + CANDLE_GAP / 2 + CANDLE_GAP}
            x2={(props.num) * (CANDLE_WIDTH + CANDLE_GAP) + CANDLE_GAP / 2 + CANDLE_GAP}
            y1={TOP_GAP + ((props.highest - props.closes[props.num - 1]) / (props.highest - props.lowest) * CHART_HEIGHT)}
            y2={TOP_GAP + ((props.highest - props.closes[props.num]) / (props.highest - props.lowest) * CHART_HEIGHT)}
            stroke="darkgray"
            strokeWidth={CANDLE_STROKE_WIDTH}
          />
        ) : (
          <></>
        )}
      </Fragment>
    )
  }

  function Volume(props) {
    const color = (props.close > props.open ? '#06FF00' : '#FF1700')
    return (
      <Fragment key={`volume${props.num}`}>
        <Rect
          x={props.num * (CANDLE_WIDTH + CANDLE_GAP) + (CANDLE_GAP - CANDLE_WIDTH) / 2 + CANDLE_GAP}
          y={TOP_GAP + CHART_HEIGHT + BOTTOM_GAP + GRAPH_GAP + ((1 - props.volume / props.maxVolume) * VOLUME_HEIGHT)}
          width={CANDLE_WIDTH}
          height={props.volume / props.maxVolume * VOLUME_HEIGHT}
          fill={color}
          style={{opacity: 0.3}}
        />
      </Fragment>
    )
  }

  function DateLine(props) {
    var date = new Date(props.time * 1000)
    return (
      <Fragment key={`date${props.num}`}>
        {props.num % 10 === 0 ? (
          <>
            <Line
              x1={props.num * (CANDLE_WIDTH + CANDLE_GAP) + CANDLE_GAP / 2 + CANDLE_GAP}
              x2={props.num * (CANDLE_WIDTH + CANDLE_GAP) + CANDLE_GAP / 2 + CANDLE_GAP}
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
              x={props.num * (CANDLE_WIDTH + CANDLE_GAP)}
              y={TOTAL_HEIGHT - DATE_HEIGHT / 2}
              textAnchor={(props.num === 0) ? "start" : ((props.num === props.maxNum) ? "end" : "middle")}
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
          <View style={{ flex: 0.86 }}>
            <FlatList 
              inverted
              horizontal={true}
              ListHeaderComponent={
                <Svg 
                  height={TOTAL_HEIGHT}
                  width={Math.max(closes.length * (CANDLE_WIDTH + CANDLE_GAP), Dimensions.get('window').width * 0.88)}
                >
                  {timestamps.map((num) => (
                    <>
                      <DateLine num={num} maxNum={closes.length} time={times[num]}/>
                      <Volume open={opens[num]} close={closes[num]} num={num} volume={volumes[num]} maxVolume={maxVolume}/>
                    </>
                  ))}
                  {(type === "Candles") ? (
                    <>
                      {timestamps.map((num) => (
                        <Candle 
                          num={num} 
                          open={opens[num]} 
                          close={closes[num]} 
                          high={highs[num]} 
                          low={lows[num]} 
                          highest={highest} 
                          lowest={lowest}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {timestamps.map(num => 
                        <ChartLine closes={closes} num={num} highest={highest} lowest={lowest}/>
                      )}
                    </>
                  )}
                  <HorizontalDashedLine x={len} y={TOP_GAP}/>
                  <HorizontalDashedLine x={len} y={TOP_GAP + CHART_HEIGHT * 1/4}/>
                  <HorizontalDashedLine x={len} y={TOP_GAP + CHART_HEIGHT * 2/4}/>
                  <HorizontalDashedLine x={len} y={TOP_GAP + CHART_HEIGHT * 3/4}/>
                  <HorizontalDashedLine x={len} y={TOP_GAP + CHART_HEIGHT}/>
                </Svg>
              }
            />
          </View>
          <View style={{ 
            flex: 0.14, 
            flexWrap: 'nowrap', 
            borderColor: 'darkgray', 
            borderLeftWidth: 2, 
            paddingLeft: 2,
            alignItems: 'center'
          }}>
            <View style={{ flex: TOP_GAP/(TOTAL_HEIGHT)}}/> 
            <View style={{ flex: CHART_HEIGHT/(TOTAL_HEIGHT) * 1.25 }}>
              <View style={{ flex: 0.2, marginTop: -6 }}>
                <CustomText style={{fontSize: 12}}>{highest.toFixed(2)}</CustomText>
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
                <CustomText style={{fontSize: 12}}>{lowest.toFixed(2)}</CustomText>
              </View>
            </View>
          </View>
        </View>
      )
    }
  }

  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={() => {
        const to = Math.round(Date.now() / 1000)
        const from = to - TIME.MONTH * 3
        dispatch(getStockDataRequest(stock.symbol, stock.description, resolution, from ,to))
      }}
      ListHeaderComponent={
        <View>
          {(stock.isGettingData) ? (
            <View style={{height: Dimensions.get('window').height * 0.8, justifyContent: 'center', alignItems: 'center'}}>
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
                    onBlur={() => setChartListVisible(false)}
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
                      listKey='1'
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
                      listKey='2'
                    />
                  </View>
                </View>
              </View>
              {(chartType === "Candles") ? (
                <>
                  {CandleChart}
                </>
              ) : (
                <>
                  {LineChart}
                </>
              )}
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Button
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    width: 150,
                    backgroundColor: '#FF1700',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10
                  }}
                  onPress={() => {}}
                >
                    <Text style={{fontWeight: 'bold', color: 'white', fontSize: 14}}>SELL</Text>
                </Button>
                <Button
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    width: 150,
                    backgroundColor: '#00CB00',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10
                  }}
                  onPress={() => {}}
                >
                  <Text style={{fontWeight: 'bold', color: 'white', fontSize: 14}}>BUY</Text>
                </Button>
              </View>
            </View>
          )}
        </View>
      }
    />
  )
}

