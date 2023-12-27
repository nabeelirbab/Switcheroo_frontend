
import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../components/Responsiveui';
import { Fonts } from '../../../theme/Fonts';


export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    closeimg: {
        width: wp(7),
        height: wp(7),
    },
    crossimage: {
        width: wp(6), height: wp(6),
        // backgroundColor:'#FF6961',
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        zIndex: 1,
        top: 5,
        alignSelf: 'flex-end',
        right: 5
    },
    hitslop: { top: 10, bottom: 12, right: 12, left: 12 },

    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: hp(Platform.OS == 'ios' ? 5.5 : 1.5),

        paddingBottom: 5,
        paddingHorizontal: wp(6)
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
    imagemainview: {

        paddingHorizontal: wp(4),
        paddingBottom: hp(2)

    },
    imageview: {
        height: wp(40),
        width: wp(25),
        backgroundColor: `${Colors.white}`,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: hp(2),
        justifyContent: "center"
    },
    image: {
        height: wp(40),
        width: wp(25),
        borderRadius: 5,
    },
    imageAddviewtouchable: {
        height: wp(40),
        width: wp(25),
        borderRadius: 5,
        alignItems: 'center',
        marginTop: hp(2),
        justifyContent: "center"
    },
    imageAddview: {
        height: wp(40),
        width: wp(25),
        backgroundColor: `${Colors.white}60`,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: hp(2),
    },
    sellingtxt: {
        marginTop: hp(2),
        fontSize: 14,
        fontWeight: "bold",
        color: '#4f4f4f'
    },
    titleinput: {
        paddingHorizontal: wp(4),
        paddingVertical: wp(2),
        backgroundColor: Colors.white,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        width: wp(85),
        height: hp(8),
        color: Colors.darkGray,
        textAlign: 'left',

    },
    Titlelenthstyl: {
        color: Colors.graytext,
        fontSize: 14,
        bottom: 0,

    },
    Textlength: {
        alignItems: 'flex-end',
        height: hp(8),
        justifyContent: 'flex-end'
    },

    sellingvalue: {
        fontWeight: '700',
        paddingLeft: hp(2),
        fontSize: 12,
        paddingVertical: hp(1.8),
        color: '#4f4f4f'
    },
    cashoffer: {
        fontWeight: '700',
        paddingLeft: hp(2),
        paddingVertical: hp(1.8),
        color: '#4f4f4f'
    },
    Valueinput: {
        paddingHorizontal: wp(4),
        paddingVertical: wp(2),
        backgroundColor: Colors.white,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    valueinput: {
        width: wp(85),
        height: hp(6),
        color: Colors.darkGray,
        textAlign: 'left',
    },
    description: {
        paddingHorizontal: wp(4),
        paddingVertical: wp(2),
        backgroundColor: Colors.white,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    texttogle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingRight: wp(3),


    },
    togolbtn: {
        width: wp(15),
        height: wp(8)
    }
    ,
    btnview: {
        marginTop: hp(3),
        alignItems: "center"
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
        color: '#FF6961',

    },
    buttonTextcancel: {
        fontSize: 16,
        color: Colors.black,
    },
    modlbtn: {
        width: wp(100),
        paddingVertical: 10
    },
    addphoto: {
        width: wp(10),
        height: wp(10)
    },
    adphototxt: {
        color: Colors.graytext,
        marginTop: hp(2),
        fontSize: 14,
        fontWeight: '500'

    },
    centeredView: {
        flex: 1,
        alignItems: 'center'
    },
    modalView: {
        width: wp(100),
        height: hp(100),
        backgroundColor: 'white',
        padding: 35,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },


})

export default styles;
