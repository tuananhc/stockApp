import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, FlatList, Image, Linking, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import axios from 'axios'
import capitalizeWord from '../utils/capitalizeWord'

import CustomText from '../components/text';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { requestNews } from '../actions/newsActions';
import { useIsFocused } from '@react-navigation/native';

export default function NewsScreen() {
  const [categoryListVisible, setCategoryListVisible] = useState(false)

  const news = useSelector(state => state.news.data)
  const category = useSelector(state => state.news.category)
  const loading = useSelector(state => state.news.isGettingNews)
  const isLoggedIn = useSelector(state => state.loggedReducer.isLoggedIn)

  var today = Date(Date.now()).toString().slice(4, 15)
  const dark = useSelector(state => state.theme)
  const dispatch = useDispatch()

  function renderItem({item}) {
    var date = new Date(item.datetime * 1000)
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL(item.url)}
      >
        <View style={{flexDirection: 'row', marginTop: 10, }}>
          <View style={{justifyContent: 'flex-start', alignItems: 'center', flex: 0.2, margin: 10,}}>
            {item.image !== "" ? (
              <Image style={{width: 75, height: 75}} source={{uri: item.image}} resizeMode='center'/>
            ) : (
              <></>
            )}
          </View>
          <View style={{flex: 0.8}}>
            <CustomText style={{fontWeight: 'bold', fontSize: 14}}>{item.headline}</CustomText>
            <CustomText>{item.summary}</CustomText>
            <CustomText style={{ fontStyle: 'italic', fontSize: 12 }}>{date.toString().slice(4, 15)}</CustomText>
          </View>
        </View>
      </TouchableOpacity>      
    )
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10, }}>
        <CustomText>Today is {today}</CustomText>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <CustomText>News type: </CustomText>
          <TouchableOpacity
            onPress={() => setCategoryListVisible(!categoryListVisible)}
          >
            <View style={{paddingLeft: 10, paddingRight: 10, padding: 5, backgroundColor: '#B9C3C8'}}>
              <Text style={{fontWeight: 'bold'}}>{capitalizeWord(category)}</Text>
              <View style={{
                position: 'absolute', 
                opacity: (categoryListVisible) ? 1 : 0, 
                top: 30, 
                right: 0,
                width: 100,
              }}>
                <FlatList
                  data={["general", "forex", "crypto", "merger"]}
                  renderItem={({item}) => <TouchableHighlight
                    underlayColor='#7F969C'
                    onPress={() => {
                      setCategoryListVisible(!categoryListVisible)
                      dispatch(requestNews(item))
                    }}
                  >
                    <View style={{
                      width: 100, 
                      height: 40, 
                      paddingLeft: 10, 
                      justifyContent: 'center', 
                      backgroundColor: (item === category) ? '#3DB2FF' : ((dark) ? '#404352' : '#B9C3C8')
                    }}
                    >
                      <CustomText>{capitalizeWord(item)}</CustomText>
                    </View>
                  </TouchableHighlight>
                  }
                  keyExtractor={item => item}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {(loading) ? (
        <View style={{height: Dimensions.get('window').height * 0.7, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color="darkgray" size="large"/>
        </View>
      ) : (
        <View style={{ zIndex: -1 }}>
          <FlatList
            data={news}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      )}
      
    </View>
  )
}