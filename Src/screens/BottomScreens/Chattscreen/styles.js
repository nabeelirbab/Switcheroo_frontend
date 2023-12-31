
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
    marginHorizontal: wp(4)

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

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: 'white',
    width: wp(100),
    padding: 20,
    alignItems: 'flex-start',

  },
  modlbtn: {
    width: wp(100),
    paddingVertical: 10
  },
  buttonText: {
    fontSize: 16,
    color: '#FF6961',

  },
  buttonTextcancel: {
    fontSize: 16,
    color: Colors.black,
  },

  headerText: {
    fontSize: 16,
    color: Colors.darkBlack,
    fontFamily: Fonts.FontsExtraBold

  },
  contactUs: {
    marginTop: hp(2),
    width: wp(45),
    height: hp(5)
  },
  input2: {
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
  dotimg: {
    width: wp(1.5),
    height: wp(4)
  },

  inputview: {
    padding: 2,
    marginHorizontal: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${Colors.graytext}40`,
    marginTop: hp(1),
    borderRadius: 5
  },
  input: {
    height: hp(6),
    width: wp(80),
    color: Colors.black
  },
  seprator: {
    borderBottomWidth: 1,
    borderColor: `${Colors.black}20`,
    marginTop: hp(2)
  },
  mesageview: {
    paddingHorizontal: wp(6),
    paddingVertical: wp(3),

    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    borderColor: `${Colors.black}20`,
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  imageView: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center'
  },
  profileimg: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10)
  },
  targetitem: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10),
    marginTop: hp(1)


  },
  nametxt: {
    fontSize: 16,
    fontFamily: Fonts.Fontsmedeum,
    color: Colors.black
  },
  lastmessage: {
    fontSize: 14,
    fontFamily: Fonts.Fontsregular,
    color: Colors.graytext
  },
  messagetext: {
    marginLeft: wp(2),
    alignItems: 'flex-start',
    justifyContent: "center",
    width: wp(40)
  },
  badge: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: Colors.btncolor,
    left: 4,
    alignSelf: "center"

  },
})

export default styles;
