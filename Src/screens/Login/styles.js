
import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../components/Responsiveui';
import { Fonts } from '../../theme/Fonts';


export const styles = StyleSheet.create({



    // modalll
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(1,1,1,0.6)'
    },
    modalText: {
        fontSize: 16,
        color: Colors.black,
        textAlign: 'center'
    }, verifaybtn: {
        marginTop: hp(3),
        width: wp(80)
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        paddingVertical: 30,
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


    // 
    headerview: {
        paddingTop: hp(Platform.OS == 'ios' ? 6 : 1.5),
        marginHorizontal: wp(3)
    },
    mainView: {
        marginHorizontal: wp(4),
    },
    imageview: {

        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(4)
    },
    logostyle: {
        width: wp(60),
        height: wp(15),
    },
    inputview: {
        marginTop: hp(4)
    },
    brnview: {
        marginTop: hp(1.5)
    },
    frogettext: {
        color: Colors.btncolor,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: hp(3),
        alignSelf: 'flex-end'
    },
    remembertext: {
        color: Colors.btncolor,
        fontSize: 16,
        fontFamily: Fonts.Fontsregular,
        marginTop: hp(0.3)
    },
    remembermemain: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-start',
        marginTop: hp(1.5)
    },
    checkbox: {
        width: wp(5),
        height: wp(5),
        marginRight: wp(0.2)
    },
    ortext: {
        alignSelf: 'center',
        marginTop: hp(4)
    },
    socialbtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: wp(4),
        borderRadius: 30,
        height: hp(6),
        width: wp(90),
        alignSelf: 'center',
        backgroundColor: '#3B5998',
        marginTop: hp(2.5)
    },
    rowView: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    btntext: {
        color: Colors.white,
        marginLeft: wp(5)
    },
    btnimg: {
        width: wp(4),
        height: wp(4),
        borderRadius: 2
    }
})

export default styles;
