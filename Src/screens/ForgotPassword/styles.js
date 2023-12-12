
import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../theme/colors';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from '../../components/Responsiveui';


export const styles = StyleSheet.create({
    headerview:{
        paddingTop:hp(Platform.OS=='ios'?6:1.5),
        marginHorizontal:wp(3)
    },
    mainView:{
        marginHorizontal:wp(4),
    },
    imageview:{

        alignItems:'center',
        justifyContent:'center',
        marginTop:hp(8)
    },
    logostyle:{
        width:wp(60),
        height:wp(15),
    },
    inputview:{
        marginTop:hp(4)
    },
    brnview:{
        marginTop:hp(1.5)
    },
    frogettext:{
        color:Colors.btncolor,
        fontSize:16,
        fontWeight:'600',
        marginBottom:hp(3),
        alignSelf:'flex-end'
    },
    ortext:{
        alignSelf:'center',
        marginTop:hp(2),
        marginHorizontal:wp(6)
    },
    socialbtn:{
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:wp(4),
        borderRadius:30,
        height:hp(6),
        width:wp(90),
        alignSelf:'center',
        backgroundColor:'#3B5998',
        marginTop:hp(2.5)
    },
    rowView:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"center"
    },
    btntext:{
        color:Colors.white,
        marginLeft:wp(5)
    },
    btnimg:{
        width:wp(4),
        height:wp(4),
        borderRadius:2
    }
})

export default styles;
