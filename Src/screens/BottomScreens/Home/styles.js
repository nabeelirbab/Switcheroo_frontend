
import { Platform, StyleSheet, Text, View } from 'react-native'
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
    backgroundColor: '#FFFFFF',
    paddingBottom: 5,
    paddingHorizontal: wp(6)
  },
  dolorsigntxt: {
    fontSize: 25,
    fontFamily: Fonts.FontsBold,
    color: Colors.white,
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
    // backgroundColor:'red',
    marginTop: Platform.OS == 'android' ? 2 : 0

  },
  dolorsigntxtblure: {
    fontSize: 25,
    fontFamily: Fonts.FontsBold,
    color: `${Colors.white}80`,
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
    // backgroundColor:'red',
    marginTop: Platform.OS == 'android' ? 2 : 0

  },
  dolorSign: {

    width: wp(13),
    height: wp(13),
    backgroundColor: Colors.primaryColor,
    alignSelf: 'flex-end',
    right: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2),
    borderRadius: wp(11),
    borderWidth: 3,
    borderColor: Colors.btncolor,
  },


  dolorSigndisable: {
    borderWidth: 3,
    borderColor: Colors.btncolor,

    width: wp(13),
    height: wp(13),
    backgroundColor: `${Colors.primaryColor}90`,
    alignSelf: 'flex-end',
    right: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2),
    borderRadius: wp(11)
  },
  logoimg: {
    width: wp(40),
    height: hp(6)
  },
  dotimg: {
    width: wp(1.5),
    height: wp(4)
  },
  choosebtnview: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(3),
    borderColor: `${Colors.black}20`,
    backgroundColor: `${Colors.white}80`

  },
  choosebtntxt: {
    color: Colors.btncolor,
    fontSize: 16,
    fontWeight: '500'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: wp(5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modltxt: {
    color: `${Colors.black}`,
    fontWeight: '600',
    fontSize: 15
  },
  imageview: {
    width: wp(30),
    height: hp(25),
    backgroundColor: Colors.graytext,
    marginTop: hp(2),
    marginRight: wp(4),
    borderWidth: 2,
    borderColor: Colors.graytext,
    borderRadius: 5
  },
  imagedesign: {
    width: wp(29),
    height: hp(24.5),
    backgroundColor: Colors.graytext,
    borderColor: Colors.graytext,
    borderRadius: 5
  },
  backgroundImg: {
    width: wp(96),
    height: hp(74),
    borderRadius: 20,
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: hp(1),
    // marginBottom: hp(2),
    justifyContent: 'flex-end',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    marginBottom: hp(Platform.OS == 'ios' ? 3 : 3),

  },
  tickIcon: {
    width: wp(13),
    height: wp(13),
  },
  crossIcon: {
    width: wp(16),
    height: wp(16),

  },

  text: {
    color: Colors.white,
    fontSize: 20,
  },
  textOffer: {
    alignItems: "center",
    justifyContent: "center"
  },
  cashtext: {
    fontSize: 18,
    fontFamily: Fonts.FontssemiBold,
    color: Colors.black
  },
  closeBUtton: {
    width: wp(8),
    height: wp(8),
    position: 'absolute',
    right: -wp(10),
    alignSelf: 'flex-end',
    bottom: -5,
    left: wp(35)
  },
  TextInput: {
    width: wp(70),
    borderWidth: 1,
    borderColor: Colors.graytext,
    paddingHorizontal: 10,
    marginTop: hp(2)

  },
  offerbtn: {
    width: wp(73),
    marginTop: hp(4)
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainerfirst: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: wp(100),
    padding: 20,
    alignItems: 'flex-start',
  },

  modalContentfirst: {
    backgroundColor: Colors.backgroundColor,
    padding: 20,
    alignItems: 'flex-start',
    height: hp(100),
    width: wp(100)
  },
  houseruleImage: {

    width: wp(40),
    height: wp(8),
    alignSelf: "center",
    marginVertical: hp(2)

  },
  welcomtxt: {
    fontSize: 18,
    color: Colors.black,
    fontFamily: Fonts.FontsExtraBold,

  },
  topview: {
    flex: 0.98
  },
  ruletext: {
    fontSize: 14,
    color: Colors.darkGray,
    fontFamily: Fonts.Fontsmedeum,
    marginTop: hp(1)
  },
  headingText: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: Fonts.FontsBold,
    marginTop: hp(1)
  },
  ruletext2: {
    fontSize: 14,
    color: Colors.darkGray,
    fontFamily: Fonts.Fontsmedeum,
    marginTop: hp(1)
  },
  agretxt: {
    fontSize: 16,
    color: Colors.btncolor,
    fontFamily: Fonts.Fontsmedeum,
  },
  buttonText: {
    fontSize: 16,
    color: 'red',

  },
  buttonTextcancel: {
    fontSize: 16,
    color: Colors.black,
  },
  hitslop: { top: 50, bottom: 50, right: 50, left: 50 },
  modlbtn: {
    width: wp(100),
    paddingVertical: 10
  },
  emptyView: {
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginTop: hp(6),

  },
  title: {
    fontSize: 16,
  },
  emtyimg: {
    width: wp(80),
    height: hp(40),
    marginTop: hp(6)
  },
  agreebtn: {
    borderWidth: 1,
    borderColor: Colors.btncolor,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginTop: hp(2),
    width: wp(90),

  }
})

export default styles;
