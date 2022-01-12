import React from 'react'
import { View, TouchableHighlight, Button, Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector, useDispatch } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MainScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DrawerContent from '../screens/Drawer';
import MarketScreen from '../screens/MarketScreen';
import NewsScreen from '../screens/NewsScreen';
import WatchList from '../screens/WatchList';
import searchButton from '../components/searchButton';
import StockInfo from '../screens/StockInfo'
import goBackButton from '../components/goBackButton';
import Transaction from '../screens/TransactionScreen';
import CustomText from '../components/text';
import changeThemeButton from '../components/changeThemeButton';

const Stack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MyTheme = {
  dark: true,
  colors: {
    primary: 'black',
    background: '#222831',
    card: '#082032',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(199, 199, 204)',
  },
};

export default function Navigations() {
  var isLoggedIn = useSelector(state => state.loggedReducer.isLoggedIn)
  const dark = useSelector(state => state.theme)
  const stockInfo = useSelector(state => state.stock)
  const dispatch = useDispatch()

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
  
  function main() {
    return (
      <BottomTab.Navigator screenOptions={({ route }) => ({
        headerRight: () => changeThemeButton(), 
        drawerType: 'front',
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline'
          } else if (route.name === 'Market') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline'
          } else if (route.name === 'Transaction') {
            return <Ionicons name='swap-horizontal' size={size} color={'white'}/>
          }
          return <>
            <Ionicons name={iconName} size={size} color={color}/>
            <CustomText style={{fontSize: 10}}>{route.name}</CustomText>
          </>
        },
        tabBarActiveTintColor: '#3DB2FF',
        tabBarInactiveTintColor: 'gray',
      })}>
        <BottomTab.Screen name="Home" component={home} options={{
          headerShown: false 
        }}/>
        <BottomTab.Screen name="Market" component={Market} options={{headerShown: true}}/>
        <BottomTab.Screen name="Transaction" 
          options={{ title: "Transaction", headerShown: false, showLabel: false,
          tabBarButton: ({children, onPress}) => <>
            <TouchableHighlight
              onPress={onPress}
              style={{
                height: 50, 
                width: 50, 
                borderRadius: 50, 
                backgroundColor: '#3DB2FF', 
                justifyContent: 'center', 
                alignItems: 'center',
                marginTop: -10,
              }}
              underlayColor='#008DD7'
            >
              {children}
            </TouchableHighlight>
          </> 
          }} 
          component={Transaction}
        />
        <BottomTab.Screen name="News" component={NewsScreen} options={{headerShown: true, }}/>
        <BottomTab.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen}/>
      </BottomTab.Navigator>
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
              headerRight: () => <View style={{flexDirection: 'row'}}>
                {searchButton()}
                {changeThemeButton()}
              </View>, 
              drawerType: 'front',
            }}
        />
      </Drawer.Navigator>
    )
  }

  function Market() {
    return (
      <TopTab.Navigator
        initialRouteName="Search"
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontStyle: 'normal', textTransform: 'none' },
        }}
      >
        <TopTab.Screen name="Search" component={MarketScreen}/>
        <TopTab.Screen name="WatchList" component={WatchList} options={{title: 'Watch list', }}/>
      </TopTab.Navigator>
    )
  }

  return (
    <NavigationContainer theme={dark ? MyTheme : DefaultTheme}>
      {(isLoggedIn) ? (
        <Stack.Navigator
          initialRouteName="Main" 
          screenOptions={{
            headerShown: false,
            headerLeft: () => null,
            orientation: "portrait"
          }}
        >
          <Stack.Screen name="Main" component={main}/>
          <Stack.Screen name="Info" component={StockInfo} options={{
              headerShown: true,
              headerTitle: () => <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>{stockInfo.symbol}</Text>
                <Text>{stockInfo.description.toLowerCase().split(" ").map(capitalize).join(" ")}</Text>
              </View>,
              headerTitleStyle: {fontWeight: 'bold', fontSize: 20},
              headerLeft: () => goBackButton(),
              orientation: "all"
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator 
          initialRouteName="Login" 
          screenOptions={{
            headerShown: false,
            orientation: "portrait"
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{animationTypeForReplace: isLoggedIn ? 'push' : 'pop'}}
          />
          <Stack.Screen
            name="Signup" 
            component={SignUpScreen}
            options={{
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
              />
            ),
        }}
          />
        </Stack.Navigator>
        
      )}
    </NavigationContainer>
  )
}