import axios from 'axios';
import React, { Fragment, useEffect, useState, useMemo } from 'react';
import { Dimensions, FlatList, Image, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Svg, {Line, Rect, Text as T, Path} from 'react-native-svg'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import CustomText from '../components/text';
import { getHistoricalData } from '../actions/marketActions';

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

export default function HistoricalDataScreen() {
  const marketData = useSelector(state => state.marketData)
  const quote = marketData.quote
  const data = useSelector(state => state.marketData.historicalData).slice(-120)
  const dark = useSelector(state => state.theme)
  const [chartType, setChartType] = useState("Candles")
  const navigator = useNavigation()
  const dispatch = useDispatch()

  const CandleChart = useMemo(() => drawChart(data, "Candles"), [data])
  const LineChart = useMemo(() => drawChart(data, "Line"), [data])

  function Candle(props) {
    const color = (props.close > props.open ? '#06FF00' : '#FF1700')
    var higher = (props.open > props.close ? props.open : props.close)
    var lower = (props.open > props.close ? props.close : props.open)
    return (
      <Fragment>
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
      <Fragment>
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
      <Fragment>
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
    return (
      <Fragment>
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
              {props.time}
            </T>
          </>
        ) : (
          <></>
        )}
      </Fragment>
    )
  }

  function drawChart(data, type) {
    if (data) {
      var closes = data.map(item => item.close)
      var timestamps = Array.from(Array(closes.length).keys())
      var highest = Math.max(...data.map(item => item.high))
      var lowest = Math.min(...data.map(item => item.low))
      if (data.volume !== undefined) {
        var maxVolume = Math.max(...data.map(item => item.volume))
      }
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
                    <Fragment key={num}>
                      <DateLine num={num} maxNum={closes.length} time={data[num].date}/>
                      {(data.volume !== undefined) ? (
                        <Volume open={data[num].open} close={data[num].close} num={num} volume={data[num].volume} maxVolume={maxVolume}/>
                      ) : (
                        <></>
                      )}
                      {(type === "Candles") ? (
                        <Candle 
                          num={num} 
                          open={data[num].open} 
                          close={data[num].close} 
                          high={data[num].high} 
                          low={data[num].low} 
                          highest={highest} 
                          lowest={lowest}
                        />
                      ) : (
                        <ChartLine closes={closes} num={num} highest={highest} lowest={lowest}/>
                      )}
                    </Fragment>
                  ))}
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
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          navigator.goBack()
        }}
        style={{marginLeft: 20}}
      >
        <View>
          <Ionicons name="arrow-back" size={22} color={dark ? 'white' : 'black'}/>
        </View>
      </TouchableOpacity>
      <View style={{margin: 20, marginLeft: 30}}>
        <CustomText style={{fontSize: 27, fontWeight: 'bold', marginBottom: 10}}>{quote.name}</CustomText>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <CustomText style={{fontSize: 25, fontWeight: 'bold'}}>{quote.price.toLocaleString()}</CustomText>
          <CustomText style={{fontSize: 12, marginBottom: 4}}>  USD</CustomText>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <Ionicons name={(quote.change > 0) ? "caret-up" : "caret-down"} color={quote.change > 0 ? '#00CB00' : '#FF1700'} size={15}/>
          <CustomText style={{color: quote.change > 0 ? '#00CB00' : '#FF1700'}}> {quote.change.toFixed(2)} </CustomText>
          <CustomText style={{color: quote.change > 0 ? '#00CB00' : '#FF1700'}}>
            ({quote.change > 0 ? '+' : '-'}{Math.abs(quote.changesPercentage).toFixed(2)}%)
          </CustomText>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <TouchableHighlight
            onPress={() => {
              if (chartType === "Candles") {
                setChartType("Line")
              } else {
                setChartType("Candles")
              }
            }}
            underlayColor= '#7F969C'
          >
            <View style={{justifyContent: 'center', alignItems: 'center', width: 30, height: 30}}>
              {(chartType === "Candles") ? (
                <Image source={require("../assets/candlestick1.png")} style={{tintColor: (dark) ? "white" : "black", height: 25, width: 25}}/>
              ) : (
                <MaterialCommunityIcons name="chart-timeline-variant" size={20} color={(dark) ? "white" : "black"}/>
              )}
            </View>
          </TouchableHighlight>
        </View>
        <View>
          <FlatList
            data={["1", "5", "15", "30", "60", "D"]}
            horizontal={true}
            bounces={false}
            renderItem={({item}) => <TouchableHighlight
            onPress={() => {
              if (item !== marketData.resolution) {
                dispatch(getHistoricalData(marketData.symbol, item))
              }
            }}
            underlayColor= '#7F969C'
          >
            <View style={{justifyContent: 'center', alignItems: 'center', width: 30, height: 30 }}>
              <CustomText style={{
                fontWeight: item === marketData.resolution ? 'bold' : 'normal',
                color: item === marketData.resolution ? '#3DB2FF' : (dark ? 'white' : 'black')
              }}>{item}</CustomText>
            </View>
          </TouchableHighlight>}
          keyExtractor={item => item}
          listKey='1'
        />
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
    </SafeAreaView>
  )
}