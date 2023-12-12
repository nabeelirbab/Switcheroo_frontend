
import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../theme/colors';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from '../../components/Responsiveui';
import { Fonts } from '../../theme/Fonts';


export const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        backgroundColor:Colors.backgroundColor,
 
    },
    welcomestyle:{
        width:wp(28),
        height:wp(26.1),
    },
    imageview:{
        alignItems:'center',
        marginTop:hp(25)
    },
    textview:{

        alignItems:"center",
        marginTop:hp(3),
        marginHorizontal:wp(6)
    },
    fontstyle:{
        fontSize:18,
        fontFamily:Fonts.FontssemiBold,
        color:Colors.black
    },
    fontstyle2:{
        fontSize:14,
        fontFamily:Fonts.Fontsregular,
        color:Colors.black,
    textAlign:"center"
    },
    buttonstyle:{
        marginTop:hp(3)
    }

   

})

export default styles;
