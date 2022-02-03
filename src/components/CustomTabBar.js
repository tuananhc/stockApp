import React, { useEffect, useState } from 'react';
import { Animated, View, TouchableHighlight, Dimensions, Text } from 'react-native';

export default function CustomTabBar({ state, descriptors, navigation, position }) {
  const width = Dimensions.get('window').width
  const [translateX] = useState(new Animated.Value(0))
  
  function translateTab(index) {
    Animated.spring(translateX, {
      toValue: -100 + index * 100, 
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    translateTab(state.index)
  }, [state.index])

  return (
    <View style={{ 
      flexDirection: 'row', 
      height: 35, 
      backgroundColor: '#BABCBF', 
      marginTop: 10, 
      paddingHorizontal: 3.5,
      borderRadius: 10, 
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'baseline',
      marginLeft: width / 2 - 307 / 2
    }}>
      <Animated.View 
        style={{ 
          width: 100, 
          backgroundColor: '#EFF2F5', 
          height: 28,
          top: 3.5, 
          position: 'absolute', 
          borderRadius: 8,
          transform: [{translateX}]
        }}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableHighlight
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ width: 80, marginHorizontal: 10, height: 28, borderRadius: 8, justifyContent: 'center', alignItems: 'center', }}
            key={index}
            underlayColor={!isFocused && "#85878A"}
          >
            <Text style={{ fontWeight: isFocused ? "bold" : "normal"}}>
              {label}
            </Text>
          </TouchableHighlight>
        );
      })}
    </View>
  );
}