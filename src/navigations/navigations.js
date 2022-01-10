import React from 'react'
import { View, TouchableOpacity, Button, Text } from 'react-native';
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
import { change } from '../actions/themeActions';
import searchButton from '../components/searchButton';
import signUpReducer from '../reducers/signUpReducer';
import StockInfo from '../screens/StockInfo'
import goBackButton from '../components/goBackButton';
import Transaction from '../screens/TransactionScreen';
import CustomText from '../components/text';

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
  const stockName = useSelector(state => state.stock.search)
  const dispatch = useDispatch()
  
  function main() {
    return (
      <BottomTab.Navigator screenOptions={({ route }) => ({
        headerRight: () => themeButton(), 
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
            return <>
              <View style={{
                height: 45, 
                width: 45, 
                borderRadius: 45, 
                backgroundColor: '#3DB2FF', 
                justifyContent: 'center', 
                alignItems: 'center',
                position: 'absolute',
                top: -10,
              }}>
                <Ionicons name='swap-horizontal' size={size + 3} color='white' rotation='45'/>
              </View>
            </> 
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
        <BottomTab.Screen name="Transaction" options={{ title: "Transaction", headerShown: false, showLabel: false }} component={Transaction}/>
        <BottomTab.Screen name="News" component={NewsScreen} options={{headerShown: true, }}/>
        <BottomTab.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen}/>
      </BottomTab.Navigator>
    )
  }

  function themeButton() {
    return (
      <TouchableOpacity
        onPress={() => {dispatch(change())}}
        style={{margin: 10, marginRight: 15}}
      >
        <View>
          {(dark) ? (
            <Ionicons
              name="sunny-outline"
              size={22} 
              color={'white'}
            />
          ) : (
            <Ionicons
              name="moon-outline"
              size={22} 
            />
          )}
        </View>
      </TouchableOpacity>
    )
  }

  function transactionButton() {
    return (
      <View style={{
        height: 45, 
        width: 45, 
        borderRadius: 45, 
        backgroundColor: '#3DB2FF', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        top: -10,
      }}>
        <Ionicons name='swap-horizontal' size={25} color='white'/>
      </View>
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
                {themeButton()}
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
              headerTitle: stockName,
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