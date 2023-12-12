import { Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../components/Responsiveui';
import { Fonts } from '../../../theme/Fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(Platform.OS == 'ios' ? 7 : 1.5),
    paddingBottom: 5,
    paddingHorizontal: wp(6),
  },
  titletext: {
    fontSize: 16,
    fontFamily: Fonts.FontssemiBold,
    color: Colors.black,
    width: wp(50),
  },
  rowview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowview2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reciveMain: {
    marginTop: hp(2),
    borderBottomWidth: 2,
    paddingBottom: hp(1),
    borderColor: `${Colors.graytext}30`,
  },
  textdiscreption: {
    marginLeft: 5,
  },
  descreption: {
    fontSize: 12,
    fontFamily: Fonts.Fontsmedeum,
    color: Colors.graytext,
    width: wp(50),
  },
  Madeuimain: {
    paddingVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: `${Colors.graytext}30`,
    justifyContent: 'space-between',
  },
  deleteBtn: {
    width: wp(20),
    borderRadius: 20,
    height: hp(3),
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectBtn: {
    width: wp(42),
    borderRadius: 20,
    height: hp(4),
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptBtn: {
    width: wp(42),
    borderRadius: 20,
    height: hp(4),
    backgroundColor: Colors.secondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtntxt: {
    fontSize: 14,
    color: Colors.white,
    alignContent: 'center',
    verticalAlign: 'middle',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 1,
  },
  rate: {
    fontSize: 14,
    fontFamily: Fonts.Fontsmedeum,
    color: Colors.black
  },
  uiImage: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(10),
  },
  headerText: {
    fontSize: 16,
    color: Colors.darkBlack,
    fontFamily: Fonts.FontsExtraBold
  },
  dotimg: {
    width: wp(1.5),
    height: wp(4),
  },
  choosebtntxt: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: hp(2),
  },
  tabrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttontext: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderColor: Colors.btncolor,
    width: wp(50),
  },
  textcolor: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.graytext,
  },
  reciveview: {
    marginHorizontal: wp(6),
  },
  container: {
    height: 80,
    width: '100%',
    marginBottom: 3,
  },
  item: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aa3e82',
  },
  txt: {
    color: '#fff',
    letterSpacing: 1,
  },
  btnContainer: {
    height: '100%',
    position: 'absolute',
    flexDirection: 'row',
  },
  btn: {
    height: '100%',
    width: wp(20),
    backgroundColor: 'red',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
