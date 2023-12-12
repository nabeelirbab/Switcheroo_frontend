
import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../theme/colors';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from '../../components/Responsiveui';
import { Fonts } from '../../theme/Fonts';


export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.backgroundColor
    },

    headerView:{
        marginTop:hp(Platform.OS=='ios'?7:2),
        marginHorizontal:wp(4),
    },
    verifayemail:{
        width:wp(25),
        height:wp(25),
    },
    imageview:{
        alignItems:"center",
        justifyContent:"center",
        marginTop:hp(6)
    },
    text:{
        marginTop:hp(5),
        fontSize:15,
        fontFamily:Fonts.Fontsmedeum,
        color:Colors.darkGray
    },
    email:{
        fontFamily:Fonts.FontssemiBold,
        marginTop:hp(1),
        color:Colors.black
    },
    textinputs:{
        marginHorizontal:wp(4),
        alignItems:"center"
    },
    borderStyleBase: {
        width: 30,
        height: 45
      },
    
      borderStyleHighLighted: {
        borderColor: "#03DAC6",
      },
    
      underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color:Colors.black
      },
    
      underlineStyleHighLighted: {
        borderColor: "#03DAC6",
      },
      resendbutton:{
        alignItems:"center",
        justifyContent:'center',
        padding:10,
        marginTop:hp(6)
      },
      resendbtn:{
        width:wp(35),
        height:hp(3),
        alignItems:"center",
        justifyContent:'center',
      },
      timerVIew:{
        backgroundColor:Colors.btncolor,
        height:wp(12),
        width:wp(12),
        borderRadius:wp(6),
        alignItems:'center',
        justifyContent:"center"
      },
      timertext:{
        fontSize:18,
        fontFamily:Fonts.FontsExtraBold,
        color:Colors.black
      },
      btntxt:{
        fontSize:16,
        fontFamily:Fonts.Fontsmedeum,
        color:Colors.btncolor,
        textDecorationLine: 'underline',

      }

})

export default styles;
