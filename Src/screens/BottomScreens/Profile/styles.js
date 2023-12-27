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

  input: {
    width: wp(80),
    height: 40,
    borderColor: Colors.btncolor,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    verticalAlign: 'top',
    color: Colors.black
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(Platform.OS == 'ios' ? 7 : 1.5),
    paddingBottom: 5,
    paddingHorizontal: wp(6),
  },
  headerText: {
    fontSize: 16,
    color: Colors.darkBlack,
    fontFamily: Fonts.FontsExtraBold

  },
  btn: {
    width: wp(38),
    backgroundColor: Colors.secondaryColor,
    borderColor: Colors.secondaryColor,
  },
  btnno: {
    width: wp(38),
    backgroundColor: Colors.graytext,
    borderColor: Colors.graytext,
  },
  deletemodal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(4),
    width: wp(80),
  },
  deletetxt: {
    fontSize: 18,
    color: Colors.black,
    fontFamily: Fonts.FontsBold,
    textAlign: 'center',
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
  reciveview: {},
  nametab: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(3),
  },
  guesttxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  since: {
    fontSize: 16,
    fontFamily: Fonts.FontsBold,
    color: Colors.black,
    marginTop: hp(1.5),
  },

  sincedate: {
    fontSize: 16,
    fontFamily: Fonts.FontsBold,
    color: Colors.graytext,
    marginTop: hp(1.5),
  },
  desc: {
    marginTop: hp(2),
  },
  imagprofile: {
    width: wp(22),
    height: wp(22),
    borderRadius: wp(20),
  },
  profilemain: {
    width: wp(23),
    height: wp(23),
    borderRadius: wp(21),
    borderWidth: 2,
    borderColor: Colors.btncolor,
    backgroundColor: `${Colors.darkGray}20`,
    marginBottom: wp(2),
  },
  editbtn: {
    backgroundColor: `${Colors.graytext}80`,
    borderWidth: 0,
    marginTop: hp(2),
  },
  locationbtn: {
    backgroundColor: Colors.btncolor,
    borderWidth: 0,
    marginTop: hp(3),
  },
  btntitle: {
    color: Colors.black,
  },
  seprator: {
    borderBottomWidth: 1,
    borderColor: `${Colors.black}20`,
    marginTop: hp(2),
  },
  headingtxt: {
    color: `${Colors.black}80`,
    fontWeight: '700',
  },
  itemview: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  imageview: {
    width: wp(29),
    height: hp(20.5),
    backgroundColor: Colors.graytext,
    marginTop: hp(1),
    borderWidth: 2,
    borderColor: Colors.graytext,
    borderRadius: 5,
  },
  imagedesign: {
    width: wp(28),
    height: hp(20),
    backgroundColor: Colors.graytext,
    borderColor: Colors.graytext,
    borderRadius: 5,
  },
  mainflatlist: {
    marginTop: hp(2),
  },
  headingview: {
    backgroundColor: `${Colors.graytext}70`,
    padding: wp(4),
  },
  headintxt: {
    fontSize: 16,
    fontWeight: '600',
    color: `${Colors.black}80`,
  },
  titletxt: {
    fontSize: 16,
    fontWeight: '500',
    color: `${Colors.black}80`,
    width: wp(30),
  },
  title2text: {
    fontSize: 16,
    fontWeight: '500',
    color: `${Colors.black}`,
    // backgroundColor:'#FF6961',
    width: wp(55),
    textAlign: 'left',
  },
  rowview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: `${Colors.black}20`,
    padding: hp(2),
  },
  rightarow: {
    width: wp(2.2),
    height: wp(3.5),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: wp(100),
    padding: 20,
    alignItems: 'flex-start',
  },

  buttonText: {
    fontSize: 16,
    color: '#FF6961',
  },
  deletebtn: {
    marginTop: hp(2),
    backgroundColor: '#FF6961',
    borderColor: '#b82c2c',
    width: wp(45),
    height: hp(5)
  },
  contactUs: {
    marginTop: hp(2),
    width: wp(45),
    height: hp(5)
  },
  buttonTextcancel: {
    fontSize: 16,
    color: Colors.black,
  },
  hitslop: { top: 10, bottom: 10, right: 10, left: 10 },
  modlbtn: {
    width: wp(100),
    paddingVertical: 15,
  },
});

export default styles;
