
import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../components/Responsiveui';
import { Fonts } from '../../../theme/Fonts';


export const styles = StyleSheet.create({
  container: {
    flex: 1
  },



  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(Platform.OS == 'ios' ? 7 : 1.5),
    paddingBottom: 5,
    paddingHorizontal: wp(6),
    backgroundColor: Colors.white
  },
  ganderradio: {
    marginHorizontal: wp(5),
    marginTop: hp(4),

  },
  radiobtnrow: {
    flexDirection: "row",
    alignItems: 'center',
    marginTop: hp(1),

    width: wp(20),


  },
  gender: {
    fontSize: 16,
    fontFamily: Fonts.FontsBold,
    color: Colors.black,
  },
  gendertxt: {
    color: Colors.black,
    fontFamily: Fonts.Fontsmedeum,
    fontSize: 16,
    marginLeft: 5

  },
  headerText: {
    fontSize: 16,
    color: Colors.darkBlack,
    fontFamily: Fonts.FontsExtraBold


  },
  fulnameview: {
    marginHorizontal: wp(5),
    marginTop: hp(4)
  },
  phonenumberinput: {
    marginHorizontal: wp(5),
    marginTop: hp(6),
  },
  phoneinput: {
    width: wp(90)
  },
  phonetext: {

  },
  headingtxt: {
    fontSize: 16,
    fontFamily: Fonts.FontsBold,
    color: Colors.black
  },
  borderrow: {
    borderWidth: 1,
    borderColor: Colors.secondaryColor,
    padding: 18,
    marginTop: hp(2),
    justifyContent: 'space-between',
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: 'rgba(48, 182, 156, 0.05)'
  },
  borderrow2: {
    padding: 18,
    marginTop: hp(2),
    justifyContent: 'space-between',
    alignItems: "center",
    flexDirection: "row",
  },
  titlectext: {
    fontFamily: Fonts.Fontsmedeum,
    fontSize: 16,
    color: Colors.secondaryColor,
    width: wp(65)

  },
  titlectext2: {
    fontFamily: Fonts.Fontsregular,
    fontSize: 14,
    color: Colors.black,
    width: wp(65)

  },
  emailtext: {
    fontFamily: Fonts.Fontsmedeum,
    fontSize: 14,
    color: Colors.secondaryColor

  },
  disc: {
    fontFamily: Fonts.Fontsregular,
    fontSize: 16,
    color: Colors.darkGray,
    marginTop: hp(2),
    textAlign: 'center'

  },
  tickcheckicon: {
    width: wp(4),
    height: wp(4),
  }
  ,
  location: {
    width: wp(3.5),
    height: wp(5.1),
    marginRight: wp(3)
  },
  tick: {
    width: wp(5),
    height: wp(3.2),
  },
  locatinrow: {
    flexDirection: "row",
    alignItems: "center"
  },
  textinputview: {
    backgroundColor: `${Colors.graytext}20`,
    paddingHorizontal: 10,
    borderRadius: 5
  }
  ,
  input: {
    color: Colors.black,
    height: hp(6)
  },
  slider: {
    marginTop: hp(2),
  },
  // radio button 
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#FF6961'
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  selected: {
    backgroundColor: '#007AFF', // Customize the selected color as needed
    borderRadius: 8,
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 8,
  },
  uncheckradio: {
    width: wp(6),
    height: wp(6),
    borderWidth: 2,
    borderColor: Colors.btncolor,
    borderRadius: wp(6),
    alignSelf: "flex-end"
  },

  checkdesign: {
    width: wp(6),
    height: wp(6),
    borderWidth: 2,
    borderColor: Colors.btncolor,
    borderRadius: wp(8),
    alignItems: 'center',
    justifyContent: 'center',


  },
  checkfill: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(6),

    backgroundColor: Colors.btncolor,
  },
  dateofb: {
    borderWidth: 2,
    marginHorizontal: wp(4),
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: 'rgba(48, 182, 156, 0.05)',
    borderColor: Colors.secondaryColor,
    padding: 18,

  },
  dob: {
    color: Colors.secondaryColor,
    fontSize: 16,
    fontFamily: Fonts.FontssemiBold,
  },
  calandericon: {
    width: wp(6),
    height: wp(6.5)
  },
  centeredView: {
    flex: 1,
    alignItems: 'center'
  },
  centeredView: {
    flex: 1,
    alignItems: 'center'
  },
  modalView: {
    width: wp(100),
    height: hp(100),
    backgroundColor: 'white',
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

})


export default styles;
