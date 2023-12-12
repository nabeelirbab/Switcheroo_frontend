
import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../theme/colors';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from '../../components/Responsiveui';


export const styles = StyleSheet.create({
    headerview:{
        marginHorizontal:wp(3),
        paddingTop:hp(Platform.OS=='ios'?7:1.5),

    },
    mainView:{
        marginHorizontal:wp(4),
    },
    imageview:{

        alignItems:'center',
        justifyContent:'center',
        marginTop:hp(4)
    },
    logostyle:{
        width:wp(70),
        height:wp(15),
    },
    inputview:{
        marginTop:hp(4)
    },
    brnview:{
        marginTop:hp(2)
    },
    frogettext:{
        color:Colors.black,
        fontSize:15,
        marginBottom:hp(2),
    },
    ortext:{
        alignSelf:'center',
        marginTop:hp(8)
    },
    socialbtn:{
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:wp(4),
        borderRadius:30,
        height:hp(6),
        width:wp(90),
        alignSelf:'center',
        backgroundColor:'#195CB1',
        marginTop:hp(2)
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
    },
    errorModal:{
        alignItems:"center",
        backgroundColor:"red",
        minHeight:hp(20),
        width:wp(80)
    }
})

export default styles;
