import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';

import CustomText from '../components/text';
import Button from '../components/button';
import CustomTextInput from '../components/textInput';

export default function OrderScreen() {
  const dark = useSelector(state => state.theme)
  const navigation = useNavigation()
  const stock = useSelector(state => state.stock)
  const [amount, setAmount] = useState(100)
  const [price, setPrice] = useState(stock.quote.c)
  const [orderType, setOrderType] = useState("Buy")

  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 20}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}
            style={{ marginTop: 10 }}
          >
            <View>
              <Ionicons name="arrow-back" size={22} color={dark ? 'white' : 'black'}/>
            </View>
          </TouchableOpacity>
          <View style={{marginTop: 10, marginBottom: 30, paddingBottom: 5, borderBottomWidth: 1, borderColor: (dark) ? 'white' : 'black'}}>
            <CustomText style={{fontWeight: 'bold', fontSize: 25}}>
              Order summary
            </CustomText>
          </View>
          <View style={{flex: 0.5, marginHorizontal: 40}}>
            <View style={styles.infoBox}>
              <CustomText>Stock name</CustomText>
              <CustomText style={{fontWeight: 'bold'}}>{stock.symbol}</CustomText>
            </View>
            <View style={styles.infoBox}>
              <CustomText>Order type</CustomText>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Button
                  onPress={() => {
                    setOrderType("Buy")
                  }}
                  style={[styles.orderTypeButton, {
                    backgroundColor: (orderType === 'Buy') ? '#00CB00' : 'gray',
                    borderTopLeftRadius: 10, 
                    borderBottomLeftRadius: 10
                  }]}
                >
                  <Text style={{color: 'white', fontWeight: 'bold', }}>BUY</Text>
                </Button>
                <Button
                  onPress={() => {
                    setOrderType("Sell")
                  }}
                  style={[styles.orderTypeButton, {
                    backgroundColor: (orderType === 'Sell') ? '#FF1700' : 'gray',
                    borderTopRightRadius: 10, 
                    borderBottomRightRadius: 10
                  }]}
                >
                  <Text style={{color: 'white', fontWeight: 'bold'}}>SELL</Text>
                </Button>
              </View>
            </View>
            <View style={styles.infoBox}>
              <CustomText>Amount</CustomText>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Button
                  onPress={() => {
                    if (amount > 100) {
                      setAmount(amount => amount - 100)
                    } else {
                      setAmount(1)
                    }
                  }}
                  style={[styles.amountButton, {marginRight: 10}]}
                >
                  <Text style={{color: 'white', fontWeight: 'bold'}}>-</Text>
                </Button>
                <CustomTextInput 
                  style={{minWidth: 45, textAlign: 'center'}}
                  value={amount.toString()}
                  onChangeText={(e) => {
                    if (e) {
                      setAmount(Number.parseFloat(e))}}
                    }
                  keyboardType="numeric"
                />
                <Button
                  onPress={() => setAmount(amount => amount + 100)}
                  style={[styles.amountButton, {marginLeft: 10}]}
                >
                  <Text style={{color: 'white', fontWeight: 'bold'}}>+</Text>
                </Button>
              </View>
            </View>
            <View style={styles.infoBox}>
              <CustomText>Price</CustomText>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Button
                  onPress={() => {
                    if (price > 100) {
                      setPrice(price => price - 0.1)
                    } else {
                      setPrice(1)
                    }
                  }}
                  style={[styles.amountButton, {marginRight: 10}]}
                >
                  <Text style={{color: 'white', fontWeight: 'bold'}}>-</Text>
                </Button>
                <CustomTextInput 
                  style={{minWidth: 45, textAlign: 'center'}}
                  value={price.toString()}
                  onChangeText={(e) => {
                    if (e) {
                      setPrice(Number.parseFloat(e))}}
                    }
                  keyboardType="numeric"
                />
                <Button
                  onPress={() => setPrice(price => price + 0.1)}
                  style={[styles.amountButton, {marginLeft: 10}]}
                >
                  <Text style={{color: 'white', fontWeight: 'bold'}}>+</Text>
                </Button>
              </View>
            </View>
            <View style={styles.infoBox}>
              <CustomText>Total</CustomText>
              <CustomText style={{fontWeight: 'bold'}}>${(amount * price).toLocaleString()}</CustomText>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Button
              onPress={Keyboard.dismiss}
              style={{
                marginTop: 30,
                marginBottom: 10,
                width: 150,
                backgroundColor: (orderType === 'Buy') ? '#00CB00' : '#FF1700',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
              }}
            >
              <Text style={{color: 'white', fontWeight: 'bold'}}>Place order</Text>
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  infoBox: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    height: 30
  },
  amountButton: {
    width: 30,
    height: 30,
    backgroundColor: '#888888',
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderTypeButton: {
    height: 30, 
    width: 70, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderColor: 'white',
    borderWidth: 0.5,
  }
})