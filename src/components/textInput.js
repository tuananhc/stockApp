import React from 'react';
import { TextInput } from 'react-native';
import { useSelector } from "react-redux";

export default function CustomTextInput(props) {
    const dark = useSelector(state => state.theme)

    return (
        <TextInput 
            placeholder={props.placeholder} 
            style={props.style}
            secureTextEntry={props.secureTextEntry}
            color={dark ? '#FFFFFF' : '#000000'}
            onChangeText={props.onChangeText}
            placeholderTextColor={dark ? '#FFFFFF' : '#808080'}
            autoFocus={props.autoFocus}
        />
    )
}