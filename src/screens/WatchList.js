import {useNavigation, useIsFocused} from '@react-navigation/native';
import React, {useRef, useEffect, useState} from 'react';
import {
  Animated,
  FlatList,
  View,
  TouchableHighlight,
  LogBox,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Svg, {Path} from 'react-native-svg';

import {getStockDataRequest} from '../actions/searchActions';
import CustomText from '../components/text';
import {capitalizeString} from '../utils/capitalizeString';

const MONTH = 2629743;

export default function WatchList() {
  const stock = useSelector(state => state.stock)
  const watchList = useSelector(state => state.profile.watchList);
  const dark = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const navigator = useNavigation();
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const [value] = useState(new Animated.Value(0))

  useEffect(() => {
    if (stock.getDataSuccess) {
      navigator.navigate("Info")
    }
  }, [stock.getDataSuccess])

  function renderItem({item}) {
    return (
      <TouchableHighlight
        onPress={() => {
          var today = Math.floor(Date.now() / 1000)
          var resolution = "D"
          dispatch(getStockDataRequest(item.symbol, item.description, resolution, today - MONTH * 3, today))
        }}
        style={{margin: 3, paddingLeft: 20, paddingRight: 20, padding: 5}}
        underlayColor={dark ? '#7F969C' : '#e6e6e6'}>
        <View>
          <CustomText style={{fontSize: 16, fontWeight: 'bold'}}>
            {item.symbol}
          </CustomText>
          <CustomText style={{fontSize: 14}}>
            {capitalizeString(item.description)}
          </CustomText>
        </View>
      </TouchableHighlight>
    );
  }

  Animated.loop(
    Animated.sequence([
      Animated.spring(value, {toValue: 100, duration: 2000, useNativeDriver: true}),
      Animated.spring(value, {toValue: 0, duration: 3000, useNativeDriver: true}),
    ]),
  ).start();

  const fillColor = value.interpolate({
    inputRange: [0, 100],
    outputRange: ['#FFFFFF', '#FFFB00'],
  });

  const pathColor = value.interpolate({
    inputRange: [0, 100],
    outputRange: ['#000000', '#FFFB00'],
  });

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      {watchList.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <CustomText>You're not watching any stocks at the moment</CustomText>
          <Svg width="50" height="50" viewBox="-120 -120 500 500">
            <AnimatedPath
              d="M55.688,242.322c2.882,0,6.069-0.719,9.439-2.24l59.032-32.156l59.032,32.156c3.369,1.521,6.557,2.24,9.437,2.24
              c8.933,0,14.963-6.917,14.543-18.36l-7.71-65.312l44.062-45.268c9.166-12.062,4.732-25.004-9.908-28.908l-65.53-10.529
              l-28.932-58.22c-4.242-6.49-9.959-9.754-15.732-9.754c-5.512,0-11.063,2.973-15.422,8.952L74.461,73.941l-59.893,10.06
              c-14.566,4.163-18.943,17.314-9.777,29.377l44.06,45.264l-7.71,65.311C40.721,235.405,46.753,242.322,55.688,242.322Z"
              strokeWidth="5"
              stroke={pathColor}
              fill={fillColor}
            />
          </Svg>
          <CustomText>
            Tap the star to add a stock to your watch list
          </CustomText>
        </View>
      ) : (
        <View style={{marginTop: 20, width: '100%'}}>
          <FlatList
            data={watchList}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );
}
