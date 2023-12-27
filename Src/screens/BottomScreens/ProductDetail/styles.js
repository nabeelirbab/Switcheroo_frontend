
import { Platform, StyleSheet, Text, View } from 'react-native'
import Colors from '../../../theme/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../../components/Responsiveui';
import { Fonts } from '../../../theme/Fonts';


export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerView: {
        paddingTop: hp(Platform.OS == 'ios' ? 5.5 : -1),

        paddingBottom: hp(1),
        paddingHorizontal: wp(2)
    },
    totalview: {
        alignItems: 'flex-end',
        marginBottom: hp(2),
        marginHorizontal: wp(3)

    },
    totalCount: {
        backgroundColor: `${Colors.graytext}60`,
        padding: wp(1.5),
        paddingHorizontal: wp(3.5),
        fontSize: 16,
        fontFamily: Fonts.FontssemiBold,
        color: Colors.btncolor,
        borderRadius: 4,
    },
    headerText: {
        fontSize: 16,
        color: Colors.darkBlack,
        fontFamily: Fonts.FontsExtraBold

    },
    textOffer: {
        alignItems: "center",
        justifyContent: "center"
    },

    dolorsigntxt: {
        fontSize: 25,
        fontFamily: Fonts.FontsBold,
        color: Colors.white,
        textAlign: "center",
        textAlignVertical: "center",
        alignSelf: "center",
        // backgroundColor:'#FF6961',
        marginTop: Platform.OS == 'android' ? 2 : 0

    },
    dolorsigntxtblure: {
        fontSize: 25,
        fontFamily: Fonts.FontsBold,
        color: `${Colors.white}80`,
        textAlign: "center",
        textAlignVertical: "center",
        alignSelf: "center",
        // backgroundColor:'#FF6961',
        marginTop: Platform.OS == 'android' ? 2 : 0

    },
    dolorSign: {

        width: wp(13),
        height: wp(13),
        backgroundColor: Colors.btncolor,
        alignSelf: 'flex-end',
        right: wp(3),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp(2),
        borderRadius: wp(11)
    },
    hitslop: { top: 50, bottom: 50, right: 50, left: 50 },
    offerbtn: {
        width: wp(73),
        marginTop: hp(4)
    },

    dolorSigndisable: {

        width: wp(13),
        height: wp(13),
        backgroundColor: `${Colors.btncolor}90`,
        alignSelf: 'flex-end',
        right: wp(3),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp(2),
        borderRadius: wp(11)
    },
    cashtext: {
        fontSize: 18,
        fontFamily: Fonts.FontssemiBold,
        color: Colors.black
    },
    closeBUtton: {
        width: wp(8),
        height: wp(8),
        position: 'absolute',
        right: -wp(10),
        alignSelf: 'flex-end',
        bottom: -5,
        left: wp(35)
    },
    dotimg: {
        width: wp(1.5),
        height: wp(4)
    },
    backgroundImg: {
        width: wp(96),
        height: hp(50),
        borderRadius: 20,
        alignSelf: 'center',
        overflow: 'hidden',
        // marginTop: hp(2),
        justifyContent: 'flex-end',
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(3),
        // backgroundColor: "red",
        alignSelf: "center",
        marginBottom: hp(Platform.OS == 'ios' ? 3 : 1)
    },
    rowViewbutton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tickIcon: {
        width: wp(13),
        height: wp(13),
    },
    crossIcon: {
        width: wp(16),
        height: wp(16),
    },
    text: {
        color: Colors.white,
        fontSize: 20,
    },
    secondview: {
        marginTop: hp(2),
        paddingHorizontal: wp(4),

    },
    textt: {
        fontSize: 16,
        color: '#4f4f4f'

    },
    headingView: {
        marginTop: hp(2),
        backgroundColor: `${Colors.graytext}60`,
        width: wp(100),
        paddingHorizontal: wp(4),
        paddingVertical: wp(2)

    },
    swiperview: {
        width: wp(96),
        height: hp(50),

    },
    input: {
        width: wp(80),
        height: 40,
        borderColor: Colors.btncolor,
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        verticalAlign: 'top',
        color: Colors.black
    },
    contactUs: {
        marginTop: hp(2),
        width: wp(45),
        height: hp(5)
    },

    contactUs2: {
        marginTop: hp(2),
        width: wp(65),
        height: hp(5)
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        backgroundColor: 'white',
        width: wp(100),
        padding: 20,
        alignItems: 'flex-start',

    },
    modlbtn: {
        width: wp(100),
        paddingVertical: 10
    },
    buttonText: {
        fontSize: 16,
        color: '#FF6961',

    },
    buttonTextcancel: {
        fontSize: 16,
        color: Colors.black,
    },



})

export default styles;
