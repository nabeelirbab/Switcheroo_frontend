
import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../theme/colors';
import { widthPercentageToDP as wp,heightPercentageToDP as hp} from '../../components/Responsiveui';
import { Fonts } from '../../theme/Fonts';


export const styles = StyleSheet.create({
    container:{
        flex:1
    },


phonenumberinput:{
    marginHorizontal:wp(5),
    marginTop:hp(6),
},
phoneinput:{
  width:wp(90)
},
phonetext:{

},
adphototxt:{
    color:Colors.btncolor,
    fontSize:16,
    marginTop:hp(10),
    fontFamily:Fonts.Fontsmedeum
},

    })
   

export default styles;
