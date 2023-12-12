import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import Images from '../../components/Images'
import ResponsiveText from '../../components/ResponsiveText'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Colors from '../../theme/colors'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../components/Responsiveui'
import { Fonts } from '../../theme/Fonts'
import { OtpverifayAccount, SendCOdverifayAccount } from '../../Apis/Apis'
import { SuccessToast } from '../../components/SuccessToast'
import { ErrorToast } from '../../components/ErrorToast'
export default function OtpForverifay(props) {

    const [otpcode, setotpcode] = useState('')

    const [timer, setTimer] = useState(120);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const [resend, setresend] = useState(false);
    let prevData = props?.route?.params

    useEffect(() => {

        let interval;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else {
            setIsResendEnabled(true);
            clearInterval(interval);
        }

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [timer]);

    useEffect(() => {
        handleResend()
    }, [])

    const handleOtp = async (otp) => {
        try {
            let response = await OtpverifayAccount(prevData?.emailaddress, otp)
            if (response?.data) {
                SuccessToast({
                    title: 'Congratulation',
                    text: 'Your account is now verified 👍',
                });
                props.navigation.navigate('Login')
            }
            console.log('responseresponse', response);

        } catch (error) {
            console.log('errorerrorerror', error);
            ErrorToast({
                title: 'Congratulation',
                text: error.graphQLErrors[0].message,
            });
        }
    }

    const handleResend = async () => {
        setTimer(120);
        setIsResendEnabled(false);
        try {


            let response = await SendCOdverifayAccount(prevData?.emailaddress)

            console.log(response, 'responseresponseresponse');
            setresend(true)
            SuccessToast({
                title: 'Congratulation',
                text: 'An OTP has been sent to your email 👍',
            });



        } catch (error) {
            console.log('error email sendd', error);
            ErrorToast({
                title: 'Congratulation',
                text: error.graphQLErrors[0].message,
            });
        }






    };



    return (
        <Container style={styles.container}>
            <View style={styles.headerView}>
                <Header
                    title={'Verification required'}
                    onPress={() => props.navigation.goBack()}
                    left={true}
                />
            </View>
            <View style={styles.imageview}>
                <Image
                    source={Images.verifayEmail}
                    style={styles.verifayemail}
                />
                <ResponsiveText style={styles.text}>
                    {'Please enter the code that was sent to'}
                </ResponsiveText>
                <ResponsiveText style={styles.email}>
                    {prevData?.email}
                </ResponsiveText>
            </View>


            <View style={styles.textinputs}>

                <OTPInputView
                    style={{ width: '80%', height: 100 }}
                    pinCount={6}
                    code={otpcode}
                    onCodeChanged={code => { setotpcode(code) }}
                    autoFocusOnLoad={false}
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    onCodeFilled={(code => { handleOtp(code) })}
                />

            </View>


            <View style={styles.resendbutton}>
                {!isResendEnabled ?
                    <View style={styles.timerVIew}>
                        <ResponsiveText tyle={styles.timertext}>
                            {timer}
                        </ResponsiveText>
                    </View>

                    :
                    <TouchableOpacity onPress={() => handleResend()} style={styles.resendbtn}>
                        <ResponsiveText style={styles.btntxt}>
                            {'Resend OTP'}
                        </ResponsiveText>
                    </TouchableOpacity>}
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },

    headerView: {
        marginTop: hp(Platform.OS == 'ios' ? 7 : 2),
        marginHorizontal: wp(4),
    },
    verifayemail: {
        width: wp(25),
        height: wp(25),
    },
    imageview: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp(6)
    },
    text: {
        marginTop: hp(5),
        fontSize: 15,
        fontFamily: Fonts.Fontsmedeum,
        color: Colors.darkGray
    },
    email: {
        fontFamily: Fonts.FontssemiBold,
        marginTop: hp(1),
        color: Colors.black
    },
    textinputs: {
        marginHorizontal: wp(4),
        alignItems: "center"
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: Colors.black
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    resendbutton: {
        alignItems: "center",
        justifyContent: 'center',
        padding: 10,
        marginTop: hp(6)
    },
    resendbtn: {
        width: wp(35),
        height: hp(3),
        alignItems: "center",
        justifyContent: 'center',
    },
    timerVIew: {
        backgroundColor: Colors.btncolor,
        height: wp(12),
        width: wp(12),
        borderRadius: wp(6),
        alignItems: 'center',
        justifyContent: "center"
    },
    timertext: {
        fontSize: 18,
        fontFamily: Fonts.FontsExtraBold,
        color: Colors.black
    },
    btntxt: {
        fontSize: 16,
        fontFamily: Fonts.Fontsmedeum,
        color: Colors.btncolor,
        textDecorationLine: 'underline',

    }
})