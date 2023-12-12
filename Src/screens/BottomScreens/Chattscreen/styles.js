
import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../components/Responsiveui';
import { Fonts } from '../../../theme/Fonts';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: hp(2),
  },
  headerView: {
    marginTop: hp(Platform.OS == 'ios' ? 5 : 1),

  },
  deletemodal: {
    alignItems: "center",
    justifyContent: 'center'
  },
  btnrow: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    marginTop: hp(4),
    width: wp(80)
  },
  deletetxt: {
    fontSize: 18,
    color: Colors.black,
    fontFamily: Fonts.FontsBold,
    textAlign: "center"
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
})

export default styles;
