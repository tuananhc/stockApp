import React, { useEffect, useState } from 'react';
import { Animated, View, TouchableOpacity, Dimensions } from 'react-native';

export default function CustomTabBar({ state, descriptors, navigation, position }) {
  const width = Dimensions.get('window').width
  const [translateX] = useState(new Animated.Value(0))
  
  function translateTab(index) {
    Animated.spring(translateX, {
      toValue: -width / 3 + index * width / 3, 
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    translateTab(state.index)
  }, [state.index])

  return (
    <View style={{ 
      flexDirection: 'row', 
      height: 30, 
      backgroundColor: 'gray', 
      marginTop: 20, 
      marginHorizontal: 10, 
      borderRadius: 10, 
      justifyContent: 'center'
    }}>
      <Animated.View 
        style={{ 
          width: '30%', 
          backgroundColor: '#3DB2FF', 
          height: 30, 
          position: 'absolute', 
          borderRadius: 10,
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
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
            key={index}
          >
            <Animated.Text style={{ fontWeight: isFocused ? "bold" : "normal", color: 'white'}}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}