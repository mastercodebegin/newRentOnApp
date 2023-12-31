import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Image, View, StatusBar, Keyboard } from "react-native"
//import Login from '../screen/login/Login';
//import SignUp from '../screen/signup/SignUp';
import DashboardScreen from "../screen/dashboard/Dasboard"
// import InboxScreen from "../screen/inbox/inbox"
// import RecentScreen from "../screen/recent/recent"
// import AccountScreen from "../screen/profile/profile"
import createDrawerNavigator from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from "../utilits/GlobalColors"
import { scaledSize } from '../helper/util/Utilities';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Add, AddUnfocused, Cart, CartUnfocused, Home, HomeUnfocused, Inbox, InboxUnfocused, Info, InfoUnfocused, Recent, RecentUnfocused } from '../utilits/GlobalImages';
// import SettingAccount from '../screen/settingaccount/settingaccount'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const AddScreen = () => {
  return (
    <View style={styles.bottomWrapper}>
      <StatusBar backgroundColor={COLORS.grey} />
      <Text style={styles.addScreenStyle}>Add</Text>
    </View>
  )
}

const screensData = [
  { name: 'Home', focus: Home, unfocus: HomeUnfocused, component: DashboardScreen },
  { name: 'Recent', focus: Recent, unfocus: RecentUnfocused, component: DashboardScreen },
  { name: 'Add', focus: CartUnfocused, unfocus: Cart, component: DashboardScreen },
  { name: 'Inbox', focus: Inbox, unfocus: InboxUnfocused, component: AddScreen },
  { name: 'Info', focus: Info, unfocus: InfoUnfocused, component: DashboardScreen }
]
export default BottomTabsNavigator = () => {
  const [cartData, setCartData] = useState(0)
  const isFocused = useIsFocused();
  
  useEffect(()=>{
      if (isFocused) {
        setInterval(() => {
          values()
        }, 1000);
        //  console.log(cartData)
        }
  },[isFocused])

  function removeDuplicates(originalArray, prop) {
      var newArray = [];
      var lookupObject  = {};
 
      for(var i in originalArray) {
         lookupObject[originalArray[i][prop]] = originalArray[i];
      }
 
      for(i in lookupObject) {
          newArray.push(lookupObject[i]);
      }
       return newArray;
  }
 
  const values = async () =>{
      let value = await AsyncStorage.getItem('cart')
      let key = JSON.parse(value)
   var latestData = removeDuplicates(key,'id')
   //console.log(latestData,"dix")
  setCartData(latestData.length)
  }
  const BottomTabs = createBottomTabNavigator()
  return (
    <BottomTabs.Navigator screenOptions={{ headerShown: false, tabBarStyle: styles.bottomTabStyle }}>
      {screensData.map((item, key) =>
        <BottomTabs.Screen key={key} name={item.name} component={item.component}
          options={{
            tabBarIcon: ({ focused }) => (
              item.name == 'Add' ?
                <TouchableOpacity>
                  <Image resizeMode='center' source={focused ? item.focus : item.unfocus} style={[styles.tabbarIcon3, { width: focused ? scaledSize(38) : scaledSize(28), top: focused ? scaledSize(-0) : scaledSize(5) }]} />
               <Text style={{fontSize:focused ?  14 : 9, color: focused ? COLORS.blue : COLORS.black, fontWeight: focused ? 'bold' : '100',textAlign:'center',position:'absolute',alignSelf:'center',top: focused ? scaledSize(28) : scaledSize(38),right: focused ? scaledSize(10) : scaledSize(8.5)}}>{`${!focused && cartData == 0 ? '' : cartData }`}</Text>
                </TouchableOpacity>
                : !focused ?
                  <Image resizeMode='center' source={item.unfocus} style={[styles.tabbarIcon, { marginTop: scaledSize(5) }]} />
                  :
                    item.name == 'Inbox' ? 
                  <View style={[styles.bottomTab,{flexDirection:'column'}]}>
                    <Image resizeMode='center' source={item.focus} style={[styles.tabbarIcon1, { marginTop: scaledSize(10) }]} />
                    <Text style={{ fontSize: 12, color: focused ? COLORS.blue : '', fontWeight: 'bold',textAlign:'center',left:scaledSize(2) }}>{``}</Text>
                    </View>
                    :

                    <View style={item.name == 'Info' ? styles.bottomTab1 : styles.bottomTab}>
                    <Image resizeMode='center' source={item.focus} style={[styles.tabbarIcon1, { marginTop: scaledSize(0) }]} />
                    <Text style={{ fontSize: 12, color: focused ? COLORS.white : '', fontWeight: 'bold', marginLeft: scaledSize(3) }}>{''}</Text>
                  </View>

            ),

            tabBarLabel: ({ focused }) => (
              <Text style={{ fontSize: 10, color: focused ? COLORS.black : '', fontWeight: 'bold' }}>{focused ? null : null}</Text>
            ),
          }}
        />)}
    </BottomTabs.Navigator>
  );

}

const styles = StyleSheet.create({
  bottomWrapper:{ flex: 1, backgroundColor: COLORS.grey },
  bottomTabStyle: { backgroundColor: COLORS.white, height: scaledSize(60) },
  tabbarIcon: {
    height: scaledSize(25),
    width: scaledSize(27)
  },
  addScreenStyle:{ color: 'black', fontSize: scaledSize(27), textAlign: 'center', marginTop: scaledSize(250) },
  tabbarIcon3: {
    height: scaledSize(80),
    width: scaledSize(62),
  },
  tabbarIcon1: {
    height: scaledSize(25),
    width: scaledSize(27)
  },
  bottomTab: {
    flexDirection: 'row',
    //backgroundColor:COLORS.themeBlue,
    marginTop: scaledSize(5),
    marginLeft: scaledSize(5),

  },
  bottomTab5: {
    flexDirection: 'row',
    //backgroundColor:COLORS.themeBlue,
    marginTop: scaledSize(10),
    //marginLeft:scaledSize(10),

  },
  bottomTab1:
  {
    flexDirection: 'row',
    //backgroundColor:COLORS.themeBlue,
    marginTop: scaledSize(5),
    marginLeft: scaledSize(5)
    //marginRight:scaledSize(10),


  }
})



