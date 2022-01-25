import React, { useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { getHistoricalData } from '../actions/marketActions';
import CustomText from './text';

export default function NeumorphicButton(props) {
  const [isPressed, setPressed] = useState(false)
  const gradientColor = isPressed ? ['#cccccc', '#f3f3f3'] : ['#f3f3f3', '#cccccc']
  const dispatch = useDispatch()

  return (
    <TouchableWithoutFeedback
        onPressIn={() => setPressed(true)}
        onPressOut={() => {
          setPressed(false)
          dispatch(getHistoricalData(props.symbol))
        }}
      >
        <View
          style={{
            height: 150,
            width: 150,
            borderRadius: 10,
            marginRight: 20,
            marginBottom: 20
          }}>
          <LinearGradient
            colors={gradientColor}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              height: 150,
              width: 150,
              borderRadius: 10,
            }}
          >
            <View style={{flex: 1, padding: 10, justifyContent: 'space-between'}}>
              <View style={{flex: 0.5}}>
                <CustomText style={{fontWeight: 'bold', fontSize: 18}}>{props.name}</CustomText>
              </View>
              <View style={{flex: 0.5, justifyContent: 'flex-end'}}>
                <CustomText>{props.price.toLocaleString()}</CustomText>
                <CustomText style={{color: props.change > 0 ? '#06FF00' : '#FF1700'}}>
                  {props.change.toFixed(2)} ({(props.change/props.previousClose*100).toFixed(2)})
                </CustomText>
              </View>
            </View>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
  )
}
