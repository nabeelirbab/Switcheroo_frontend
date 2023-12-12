
import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../theme/colors';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from '../../../components/Responsiveui';
import { Fonts } from '../../../theme/Fonts';


export const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    lotianimation:{
        width:wp(120),
        height:hp(100),
        position:'absolute'
    },
    view:{
        flex:1,
        alignItems:"center"
    },
    textmatch:{
        fontSize:20,
        textAlign:'center',
        fontFamily:Fonts.FontsExtraBold,
        marginTop:hp(15)

    },
    btnContainer2:{
        marginBottom:hp(1),
    },
    btnContainer:{
        marginTop:hp(2),
        marginBottom:hp(4),

        backgroundColor:Colors.secondaryColor,
        borderColor:Colors.secondaryColor
    
    },
    succesLoti:{
        alignSelf:"center",
        justifyContent:'center',
        width:wp(80),
        height:wp(80),
        alignItems:'center'
    },
    succesLotiview:{
        flex:1,
        alignSelf:"center",
        position:'absolute',
        bottom:0,
        marginBottom:hp(35)
    }
   
})

export default styles;
