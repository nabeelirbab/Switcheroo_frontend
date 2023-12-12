import * as React from 'react';
import { Image, StyleSheet, Platform, View } from 'react-native';
import { iconPath } from '../../Src/Constants/Icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/BottomScreens/Home/Home';
import Profile from '../screens/BottomScreens/Profile/Profile';
import Images from '../components/Images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../components/Responsiveui';
import Listing from '../screens/BottomScreens/Listing/Listing';
import Additem from '../screens/BottomScreens/Additem/Additem';
import Message from '../screens/BottomScreens/Message/Message';
import Colors from '../theme/colors';
import ResponsiveText from '../components/ResponsiveText';
import { Fonts } from '../theme/Fonts';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



function TabBarNav() {
  const state = useSelector(state => state.userdataReducer)

  console.log('statestatestate', state.messageCount, state.notificationCount);
  return (
    <Tab.Navigator
      initialRouteName="Home"

      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute', // Set the position to absolute
          bottom: 0, // Set the bottom position to 0
          height: Platform.OS == 'ios' ? 70 : 60,
          width: '100%', // Set the width to 100%
          backgroundColor: '#D9D9D9',
          alignItems: 'center',
          borderTopWidth: 0,
        },
      }}>

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <>
                <View style={styles.topline} />
                <Image
                  source={Images.homeactive}
                  style={{ ...styles.iconSizeactive, height: wp(5) }}
                  resizeMode={'contain'}
                />
              </>
            ) : (
              <Image
                source={Images.homeinactive}
                style={{ ...styles.iconSize, height: wp(5) }}
                resizeMode={'contain'}
              />
            ),
        }}
      />


      <Tab.Screen
        name="Listing"
        component={Listing}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <>
                <View style={styles.topline} />

                <Image
                  source={Images.listactive}
                  style={{ ...styles.iconSizeactive }}
                  resizeMode={'contain'}
                />

              </>
            ) : (
              <>
                <Image
                  source={Images.listinactive}
                  style={styles.iconSize}
                  resizeMode={'contain'}
                />
                {state.notificationCount > 0 ? <View style={styles.backgroundBadge}>
                  <ResponsiveText style={styles.notification}>
                    {state.notificationCount}
                  </ResponsiveText>
                </View> : null}
              </>

            ),
        }}
      />



      <Tab.Screen
        name="Additem"
        component={Additem}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <>
                <View style={styles.topline} />
                <Image
                  source={Images.additemactive}
                  style={{ ...styles.iconSizeactive }}
                  resizeMode={'contain'}
                />
              </>
            ) : (
              <Image
                source={Images.additeminactive}
                style={styles.iconSize}
                resizeMode={'contain'}
              />
            ),
        }}
      />



      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <>
                <View style={styles.topline} />
                <Image
                  source={Images.messageactive}
                  style={{ ...styles.iconSizeactive }}
                  resizeMode={'contain'}
                />

              </>
            ) : (
              <>
                <Image
                  source={Images.messageinactive}
                  style={styles.iconSize}
                  resizeMode={'contain'}
                />
                {state.messageCount > 0 ? <View style={styles.backgroundBadge}>
                  <ResponsiveText style={styles.notification}>
                    {state.messageCount}
                  </ResponsiveText>
                </View> : null}
              </>
            ),
        }}
      />


      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <>
                <View style={styles.topline} />
                <Image
                  source={Images.profileactive}
                  style={styles.iconSizeactive}
                  resizeMode={'contain'}
                />
              </>
            ) : (
              <Image
                source={Images.profileinactive}
                style={styles.iconSize}
                resizeMode={'contain'}
              />
            ),
        }}
      />

    </Tab.Navigator>
  );
}

export default TabBarNav;

const styles = StyleSheet.create({
  iconSize: {
    width: wp(6),
    height: wp(6),
    top: Platform.OS == 'ios' ? 5 : 0,
    zIndex: 0

  },
  iconSizeactive: {
    width: wp(6),
    height: wp(6),
    tintColor: '#CB9A24',
    top: Platform.OS == 'ios' ? 5 : 0,
    zIndex: 0

  },
  topline: {
    borderTopWidth: 3,
    borderColor: '#CB9A24',
    width: wp(20),
    position: 'absolute',
    top: 0,
    // zIndex: 1
  },
  notification: {
    fontSize: 12,
    fontFamily: Fonts.Fontsmedeum,
    color: Colors.white,
    top: 2
  },
  backgroundBadge: {
    backgroundColor: 'red',
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    padding: 2,
    width: wp(6.5),
    height: wp(6.5), borderRadius: wp(6),
    top: wp(1),
    right: wp(3)
  }


});
