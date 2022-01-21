import React, { useState } from 'react';
import { RefreshControl, TouchableOpacity, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchList, removeFromWatchList } from '../actions/profileActions';

export default function changeThemeButton() {
  const dark = useSelector(state => state.theme)
  const stock = useSelector(state => state.stock)
  const watchList = useSelector(state => state.profile.watchList)
  const dispatch = useDispatch()
  const [starred, setStarred] = useState(watchList.map(item => item.symbol).includes(stock.symbol))

  return (
    <TouchableOpacity
      style={{marginTop: 10, marginRight: 5}}
      onPress={() => {
        if (watchList.length === 0 || !watchList.map(item => item.symbol).includes(stock.symbol)) {
          dispatch(addToWatchList([{symbol: stock.symbol, description: stock.description}]))
        } else {
          dispatch(removeFromWatchList(stock.symbol, stock.description))
        }
        setStarred(!starred)
      }}
    >
      {(starred) ? (
        <Image
          source={require("../assets/starFilled.png")}
          style={{width: 22, height: 22}}
        />
      ) : (
        <Image
          source={require("../assets/starOutline.png")}
          style={{width: 22, height: 22, tintColor: (dark) ? 'white' : 'black'}}
        />
      )}
    </TouchableOpacity>
  )
}