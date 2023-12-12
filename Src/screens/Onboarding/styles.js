
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../components/Responsiveui';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.primaryColor
    },

    topView: {
        flex: 0.41, backgroundColor: Colors.secondaryColor, width: wp(100),
        transform: [{
            rotate: '-19deg'
        }, {
            scale: 1.6
        }]
    },

    bottomView: {

        position: 'absolute',
        alignItems: 'center',
        height: hp(100),
        width: wp(100),
        marginTop: hp(17)
    },
    foncolortop: {
        color: Colors.white,
        textAlign: 'center',
        lineHeight: 20,
        fontWeight: '500'
    },
    toptextview: {
        marginHorizontal: wp(8),
        marginTop: hp(3),
    },
    btnstyle: {
        marginTop: hp(3.5),
        backgroundColor: Colors.white,
        borderColor: Colors.white
    },
    btntitle: {
        color: Colors.grentext
    },
    logintext: {
        color: Colors.grentext,
        fontWeight: '500',
        textAlign: 'center',


    },
    loginbtn: {
        marginTop: hp(4),
        fontWeight: '600',

    }


})

export default styles;
