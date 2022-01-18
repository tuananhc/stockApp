import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Drawer } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'

import CustomText from '../components/text';
import { useNavigation } from '@react-navigation/core';
import { logOut } from '../actions/logActions';

export default function DrawerContent(props) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const username = useSelector(state => state.loggedReducer.username)

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View>
          <View style={styles.userInfo}>
            <View style={{ paddingLeft: 20 }}>
              <CustomText style={{ color: 'black', fontSize: 20 }}>{username}</CustomText>
              <CustomText style={{ opacity: 0.5, color: 'black' }}>abc@gmail.com</CustomText>
            </View>
          </View>
        </View>

        <Drawer.Section>
          <DrawerItem
            label="Home page"
            onPress={() => navigation.reset({
              index: 0,
              routes: [{ name: 'Test' }],
            })}            
          />
        </Drawer.Section>

        <Drawer.Section>
          
          <DrawerItem
            icon={() => <Ionicons name='log-out-outline' size={22} color={'gray'} style={{transform: [{rotateY: '180deg'}], marginRight: -15}}/>}
            label="Log out"
            onPress={() => dispatch(logOut())}            
          />
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfo: {
    alignItems: 'center',
    paddingLeft: 20,
    flexDirection: 'row',
    height: 80,
  },
  View: {
    alignItems: 'center',
    paddingLeft: 20,
    flexDirection: 'row',
    height: 80,
  }
});
