import React from 'react';
import { View } from 'react-native';

import CustomText from '../../components/text';

export default function ProfileScreen() {
  return (
    <>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CustomText>profile screen</CustomText>
      </View>
    </>
  )
}