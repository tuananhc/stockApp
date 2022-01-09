import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button, Alert } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux';

import CustomTextInput from '../components/textInput';
import { useNavigation } from '@react-navigation/native';
import { searchStock } from '../actions/searchActions';

export default function MarketScreen() {
  const dark = useSelector(state => state.theme)
  const [search, setSearch] = useState("")
  const [result, setResult] = useState("")
  const navigator = useNavigation()
  const dispatch = useDispatch();
  const currentStock = useSelector(state => state.stock.search)

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
    setResult(JSON.stringify(response.data.result[0]))
  }

  useEffect(() => {

  }, [result])

  return (
    <View style={{flex: 1, marginTop: 20}}>
      <View style={{alignItems: 'center'}}>
        <View style={{width: '90%', height: 50, borderRadius: 5, borderWidth: 2, borderColor: '#808080', alignItems: 'center', paddingLeft: 10, flexDirection: 'row'}}>
          <Ionicons name="search-outline" size={20} color={dark ? 'white' : 'black'} style={{marginRight: 5}}
            onPress={() => {
              var time = new Date().getTime()
              console.log(time)
              }}
          />
          <CustomTextInput 
            placeholder="search company names or symbols" 
            autoFocus={true}
            onChangeText={(e) => setSearch(e)}
          />
        </View>
        <Text>
          {result}
        </Text>
        <Text>
          {currentStock}
        </Text>
        <Button
          title='Search'
          onPress={() => navigator.navigate("Info")}
        />
        <Button
          title='blo'
          onPress={() => findName(search)}
        />
        <Button
          title='clo'
          onPress={() => dispatch(searchStock(search))}
        />
      </View>
    </View>
  )
}