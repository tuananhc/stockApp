import React from 'react';
import { Text } from 'react-native'
import { useSelector } from 'react-redux';

export default function CustomText(props) {
    const dark = useSelector(state => state.theme)
    return (
        <Text style={[props.style, {
            color: (dark) ? 'white' : 'black'
        }]}>
            {props.children}
        </Text>
    )
}