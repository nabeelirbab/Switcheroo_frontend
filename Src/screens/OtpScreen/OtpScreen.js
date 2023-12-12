import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import styles from './styles'
import Images from '../../components/Images'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../components/Responsiveui'
import ResponsiveText from '../../components/ResponsiveText'
import Button from '../../components/Button'
import Colors from '../../theme/colors'
import Header from '../../components/Header'
import { ForgotOtpverification, ForgotPasswordMutation, Resendotp, VerifayOtpMutation, useSignInMutation } from '../../Graphql/Graphql'
import { SuccessToast } from '../../components/SuccessToast'


const OtpScreen = (props) => {
  const [signInMutation, { loading }] = useSignInMutation();
  const [resetPasswordInitiate, { loading: resendloading2 }] = ForgotPasswordMutation();
  const [VerifayOtp,] = VerifayOtpMutation();
  const [retrieveResetPasswordToken,] = ForgotOtpverification();
  const [resendOtpregister, { loadin: resendloading }] = Resendotp();

  const [otpcode, setotpcode] = useState('')

  const [timer, setTimer] = useState(120);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [resend, setresend] = useState(false);
  const [mode, setmode] = useState(props.route.params?.mode);
  let prevData = props.route.params
  let email = prevData?.email

  // props.navigation.navigate('ChangePassword');


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
  const handleResend = async () => {
    setTimer(120);
    setIsResendEnabled(false);

    console.log('prevData?.registerUser', prevData?.registerUser);
    try {

      if (mode == 'recover') {
        const resetresendotp = await resetPasswordInitiate({
          variables: {
            email: email,
          },
        });
        console.log('resetresendotpresetresendotpresetresendotp', resetresendotp);
        SuccessToast({
          title: 'Congratulation',
          text: 'OTP sent Successfully 👍'
        })
      } else {
        const resetresponse = await resendOtpregister({
          variables: {
            email: email,
            userId: prevData?.registerUser
          },
        });
        console.log('signInResponse===>>>>>', resetresponse);
        SuccessToast({
          title: 'Congratulation',
          text: 'OTP sent Successfully 👍'
        })

      }



      setresend(true)

    } catch (err) {
      //Failure response
      console.log('resenderror in error', err);
      Alert.alert(getErrorString(err), '');
    }



  };


  const handleOtp = async (code) => {
    console.log('code', code, prevData?.email);
    if (mode == 'recover') {
      try {

        const verifyUserResponse = await retrieveResetPasswordToken({
          variables: {
            email,
            verificationCode: code,
          },
        });
        console.log('verifyUserResponse', verifyUserResponse);
        if (!verifyUserResponse.data || !verifyUserResponse.data.retrieveResetPasswordToken)
          throw new Error('Invalid or incorrect validation code.');

        // Kick the user over to set password
        props.navigation.navigate('ChangePassword', {
          email,
          token: verifyUserResponse.data.retrieveResetPasswordToken,
        });
      } catch (err) {
        console.log('====================================');
        console.log(err.message, err);
        console.log('====================================');
        // Alert.alert(err.message);
      }
    }
    else {

      try {


        const verifyUserResponse = await VerifayOtp({
          variables: {
            email,
            verificationCode: code,
          },
        });
        console.log('verifyUserResponse', verifyUserResponse);
        if (!verifyUserResponse.data || !verifyUserResponse.data.verifyUser)
          throw new Error('Invalid or incorrect validation code.');

        const signInResponse = await signInMutation({
          variables: {
            email: prevData?.email,
            password: prevData?.password
          },
        });

        if (!signInResponse.data) throw new Error('Sign in failed');

        // do the nav
        props.navigation.navigate('Welcome', {
          firstName: signInResponse.data.signIn.firstName,
        });
      } catch (err) {
        // Alert.alert(err.message);
        console.log('====================================');
        console.log(err.message, err);
        console.log('====================================');
      }
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

export default OtpScreen