import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../theme/colors';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from '../../components/Responsiveui';


export const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        backgroundColor:Colors.primaryColor
    },

    topView:{flex:0.5,backgroundColor:Colors.secondaryColor,width:wp(110),
        transform:[{
        rotate:'-19deg'
    },{
        scale:1.6
    }]
},
  
    bottomView:{

        position:'absolute',
       alignItems:'center',
       justifyContent:'center',

        height:hp(100),
        width:wp(100)
    }
  

})

export default styles;
