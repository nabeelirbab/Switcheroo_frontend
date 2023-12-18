import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Platform } from 'react-native';
import ResponsiveText from './ResponsiveText';
import Images from './Images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from './Responsiveui';
import Colors from '../theme/colors';
import { Fonts } from '../theme/Fonts';

const Header = props => {
  return (
    <>
      {props?.left == true ?
        <View style={styles.myPioneer}>
          <TouchableOpacity style={styles.notificationicon} hitSlop={{ left: 20, right: 20, bottom: 20, top: 20 }} onPress={props.onPress}>
            <Image source={Images.HeaderBackarow} style={styles.leftarrow2} />
          </TouchableOpacity>
          <ResponsiveText style={[styles.title, props.style]}>
            {props.title ? props.title : null}
          </ResponsiveText>
          <View style={styles.notificationicon} />

        </View>
        :
        <View style={styles.myPioneer}>
          {props.onLefticonPress ? <TouchableOpacity style={styles.leftarrow} onPress={props.onLefticonPress}>
            <Image source={Images.verticaldot} style={styles.dotimg} resizeMode="contain" />
          </TouchableOpacity> :
            <View style={styles.notificationicon} />
          }
          <ResponsiveText style={[styles.title, props.style]}>
            {props.title ? props.title : null}
          </ResponsiveText>
          <TouchableOpacity style={styles.leftarrow} onPress={props.onPress}>
            <Image source={Images.close} style={styles.leftarrow} />
          </TouchableOpacity>
        </View>

      }

    </>
  );
};



export const HeaderleftImage = props => {
  return (
    <>


      <View style={styles.myPioneer}>
        <TouchableOpacity onPress={props.onUnmatchPress} style={styles.btnleft}>
          <ResponsiveText style={{ color: '#fff', fontSize: 12 }}>
            {'Unmatch'}
          </ResponsiveText>
        </TouchableOpacity>

        <ResponsiveText style={{ ...styles.title, ...props.style }}>
          {props.title ? props.title : null}
        </ResponsiveText>
        <TouchableOpacity onPress={props.onPress}>
          <Image source={Images.close} style={styles.leftarrow} />
        </TouchableOpacity>
      </View>



    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  myPioneer: {
    flexDirection: 'row',
    // marginTop: 10,
    alignItems: 'center',

    justifyContent: 'space-between',
    borderWidth: 0,
    paddingHorizontal: wp(3),
    // backgroundColor: 'yellow',
    marginTop: Platform.OS == 'ios' ? wp(2) : wp(6)
  },
  dotimg: {
    width: wp(1.5),
    height: wp(4)
  },
  btnleft: {
    backgroundColor: Colors.btncolor,
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 18,
    color: Colors.darkBlack,
    fontFamily: Fonts.FontsExtraBold,
    textAlign: 'center'
  },
  notificationicon: {
    // bottom: 2,
    padding: wp(3),
    // backgroundColor: "yellow",
    // backgroundColor: 'blue',

  },
  leftarrow: {
    // tintColor:Colors.black,
    width: wp(8),
    height: wp(8),
    alignSelf: 'center',
    // backgroundColor:'red'
  },
  leftarrow2: {
    // tintColor:Colors.black,
    width: wp(6),
    height: wp(6),
  },
  notification: {
    borderWidth: 1,
    borderColor: '#EFEFEF',
    padding: 7,
    borderRadius: 5,
    bottom: 3,
  },
});
