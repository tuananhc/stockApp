import React from 'react'
import { View, Image, TouchableOpacity, TouchableHighlight, Text } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useSelector, useDispatch } from 'react-redux'

import LoginScreen from '../screens/loginScreen/LoginScreen';
import MainScreen from '../screens/mainScreen/MainScreen';
import ProfileScreen from '../screens/profileScreen/ProfileScreen';
import DrawerContent from '../screens/drawer/Drawer';
import { change } from '../actions/themeActions';
import MarketScreen from '../screens/marketScreen/MarketScreen';
import NewsScreen from '../screens/newsScreen/NewsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function Navigations() {
  var isLoggedIn = useSelector(state => state.isLoggedIn)
  const dark = useSelector(state => state.theme)
  const dispatch = useDispatch()
  
  function main() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={home} options={{headerShown: false}}/>
        <Tab.Screen name="Market" component={MarketScreen} options={{headerShown: true}}/>
        <Tab.Screen name="News" component={NewsScreen} options={{headerShown: true, }}/>
        <Tab.Screen name="Profile" options={{ title: "Profile", headerTitle: "Account profile" }} component={ProfileScreen}/>
      </Tab.Navigator>
    )
  }

  function themeButton() {
    return (
      <TouchableHighlight
        onPress={() => {dispatch(change())}}
        underlayColor={(dark) ? '#808080' : "#DDDDDD"}
        style={{marginRight: 10, width: 40, height: 40, borderRadius: 40, justifyContent: 'center', alignItems: 'center'}}
      >
        <View style={{width: 20, height: 20, borderRadius: 20}}>
          {(dark) ? (
            <Image 
              source={require("../assets/sun.png")}
              style={{width: 20, height: 20, tintColor: 'white'}}  
            />
          ) : (
            <Image 
              source={require("../assets/moon.png")}
              style={{width: 20, height: 20}}  
            />
          )}
        </View>
      </TouchableHighlight>
    )
  }
  
  function home() {
    return (
      <Drawer.Navigator 
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen 
            name="Main" 
            component={ MainScreen }
            options={{
              headerRight: () => themeButton(), 
              drawerType: 'front',
            }}
        />
      </Drawer.Navigator>
    )
  }

  return (
    <NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>
      {isLoggedIn ? (
        <Stack.Navigator
          initialRouteName="Main" 
          screenOptions={{
            headerShown: false,
            headerLeft: () => null
          }}
        >
          <Stack.Screen name="Main" component={main} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator 
          initialRouteName="Login" 
          screenOptions={{
            headerShown: false,
            gestureEnabled: false
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{animationTypeForReplace: isLoggedIn ? 'push' : 'pop'}}
          />
        </Stack.Navigator>
        
      )}
    </NavigationContainer>
  )
}