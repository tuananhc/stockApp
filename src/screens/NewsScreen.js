import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';

import CustomText from '../components/text';

export default function NewsScreen() {
    return (
        <View style={{marginTop: 20, alignItems: 'center'}}>
            <CustomText>Latest news of the market</CustomText>
        </View>
    )
}