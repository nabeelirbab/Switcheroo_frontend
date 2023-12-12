
import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../components/Responsiveui';
import { Fonts } from '../../../theme/Fonts';


export const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: hp(Platform.OS == 'ios' ? 7 : 1.5),
        paddingBottom: 5,
        paddingHorizontal: wp(6),
    },
    headerText: {
        fontSize: 16,
        color: Colors.darkBlack,
        fontFamily: Fonts.FontsExtraBold

    },
    dotimg: {
        width: wp(1.5),
        height: wp(4)
    },
    inputview: {
        padding: 2,
        marginHorizontal: wp(6),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `${Colors.graytext}40`,
        marginTop: hp(1),
        borderRadius: 5
    },
    input: {
        height: hp(20),
        width: wp(80),
        color: Colors.black,
        textAlignVertical: 'top'
    },
    seprator: {
        backgroundColor: `${Colors.backgroundColor}`,
        marginTop: hp(2),
        padding: hp(0.5)
    },
    Textlength: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: hp(15)
    },

    textview: {
        // marginTop:hp(2),
        padding: hp(2)
    },
    imageview: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: Colors.white,
        paddingBottom: hp(2)
    },
    profileimg: {
        width: wp(40),
        height: wp(40)
    },
    profileView: {
        width: wp(40),
        height: wp(40),
        alignItems: "center",
        justifyContent: "center"
    },
    adphototxt: {
        color: Colors.btncolor,
        fontWeight: '700',
        fontSize: 16,
        marginTop: hp(2)
    },
    titleinput: {
        paddingHorizontal: wp(4),
        paddingVertical: wp(2),
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: wp(100),
        padding: 20,
        alignItems: 'flex-start',
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
    addphoto: {
        width: wp(10),
        height: wp(10)
    },

})

export default styles;
