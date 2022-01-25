import axios from 'axios';
import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

export default function HistoricalDataScreen(symbol) {
  const [data, setData] = useState([])

  useEffect(() => {
    async function getHistoricalData() {
      const response = await axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=187da714693a7788f7a323b4930dbec0`)
        .then(function (response) {
          setData(response.data)
        })
    }
    getHistoricalData()
  }, [])
 
  return (
    <View></View>
  )
}