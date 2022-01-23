import React, { useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import CustomText from '../components/text';

export default function MainScreen() {

  function renderItem({item}) {
    return (
      <View
        style={{
          height: 150,
          width: 150,
          borderRadius: 10,
          marginRight: 20
        }}>
        <LinearGradient
          colors={['#f3f3f3', '#cccccc']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            height: 150,
            width: 150,
            borderRadius: 10,
          }}/>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{marginTop: 20}}>
        <FlatList
          data={[1,2,3,4,5]}
          renderItem={renderItem}
          key={({item}) => item}
          horizontal={true}
        />
      </View>
      
    </SafeAreaView>
  );
}
