import React from 'react';
import { View, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Text, Drawer, Switch } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { change } from '../../actions/themeActions';
import CustomText from '../../components/text';

export default function DrawerContent(props) {
  const dark = useSelector(state => state.theme)
  const dispatch = useDispatch()

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View>
          <View style={styles.userInfo}>
            <Avatar.Image
              source={require('../../assets/UserDrawer/Group6516.png')}
              size={50}
            />
            <View style={{ paddingLeft: 20 }}>
              <CustomText style={{ color: 'black', fontSize: 20 }}>abc</CustomText>
              <CustomText style={{ opacity: 0.5, color: 'black' }}>abc@gmail.com</CustomText>
            </View>
          </View>
        </View>

        <Drawer.Section>
          <DrawerItem
            label="Trang chủ"/>
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
});
