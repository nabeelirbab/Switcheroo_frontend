
import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../components/Responsiveui';
import { Fonts } from '../../../theme/Fonts';


export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    hitslop: { top: 50, bottom: 50, right: 50, left: 50 },

    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: hp(Platform.OS == 'ios' ? 7 : 1.5),
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
        height: hp(6),
        width: wp(80),
        color: Colors.black
    },
    seprator: {
        borderBottomWidth: 1,
        borderColor: `${Colors.black}20`,
        marginTop: hp(2)
    },
    mesageview: {
        paddingHorizontal: wp(6),
        paddingVertical: wp(3),

        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        borderColor: `${Colors.black}20`,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    imageView: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center'
    },
    profileimg: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(10)
    },
    targetitem: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(10),
        marginTop: hp(1)


    },
    nametxt: {
        fontSize: 16,
        fontFamily: Fonts.Fontsmedeum,
        color: Colors.black
    },
    lastmessage: {
        fontSize: 14,
        fontFamily: Fonts.Fontsregular,
        color: Colors.graytext
    },
    messagetext: {
        marginLeft: wp(2),
        alignItems: 'flex-start',
        justifyContent: "center",
        width: wp(40)
    },
    badge: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: Colors.btncolor,
        left: 4,
        alignSelf: "center"

    }

})

export default styles;
