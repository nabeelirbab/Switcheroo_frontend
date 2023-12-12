import React, { useState } from 'react';
import { Alert, Image, Modal, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import Colors from '../../theme/colors';
import Header from '../../components/Header';
import Images from '../../components/Images';
import Button from '../../components/Button';
import { getErrorString } from '../../helper/global';
import Container from '../../components/Container';
// import {useSignInMutation} from '../../Graphql/types';
import TextInputcomp from '../../components/TextInputcomp';
import ResponsiveText from '../../components/ResponsiveText';
import { useSignInMutation } from '../../Graphql/Graphql';
import ErrorModal from '../../components/ErrorModal';
import { StackActions } from '@react-navigation/native';

const Login = props => {
  const [signInMutation, { loading }] = useSignInMutation();


  // const [signIn, {loading}] = useSignInMutation();

  const [emailaddress, setemailaddress] = useState('');
  const [password, setpassword] = useState('');
  const [errorModal, seterrorModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');


  const onPressLogin = async () => {

    // props.navigation.navigate('TabBarNav');
    seterrorModal(false)
    seterrorMessage('')
    if (emailaddress == '') {

      seterrorModal(true)
      seterrorMessage('Please enter the email address')
    } else if (password == '') {
      seterrorModal(true)
      seterrorMessage('Please enter the password')
    } else {
      try {
        const signInResponse = await signInMutation({
          variables: {
            email: emailaddress.trim(),
            password: password.trim(),
          },
        });
        console.log('signInResponse===>>>>>', signInResponse);
        //Once getting the error
        if (
          !signInResponse.data ||
          !signInResponse.data.signIn ||
          !signInResponse.data.signIn.id
        ) {
          throw new Error('Log in failed');
        } else {
          props.navigation.dispatch(StackActions.replace('MainStack'))
          //Success response
          // props.navigation.replace('TabBarNav',{
          //   screen:'Home'
          // });
        }
      } catch (err) {
        //Failure response
        console.log('Log in error', err.message);

        if (err.message.toString().includes('Account not Actived')) {
          setModalVisible(true)
        }
        else {
          seterrorModal(true)
          seterrorMessage(getErrorString(err))
        }

      }
    }
  };

  const verificationCode = () => {
    try {
      props.navigation.navigate('OtpForverifay', {
        emailaddress: emailaddress

      })
      setModalVisible(false)
    } catch (error) {
      console.log('error on verification code', error);
    }
  }


  const VerifayModal = () => {
    return <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ResponsiveText style={styles.modalText}>
            Your account is currently unverified. Please verify your email address and then log in!
          </ResponsiveText>
          <Button
            title={'Verifay your account'}
            btnContainer={styles.verifaybtn}
            onPress={() => verificationCode()}
          />
        </View>
      </View>
    </Modal>
  }

  return (
    <Container>
      <View style={styles.headerview}>
        <Header title={''} onPress={() => props.navigation.goBack()} />
      </View>
      <View style={styles.mainView}>
        <View style={styles.imageview}>
          <Image
            source={Images.logoSimple}
            style={styles.logostyle}
            resizeMode="contain"
          />
        </View>
        <View style={styles.inputview}>
          <TextInputcomp
            placeholder={'Email address'}
            value={emailaddress}
            onChangeText={setemailaddress}
          />

          <TextInputcomp
            placeholder={'Password'}
            value={password}
            onChangeText={setpassword}
            righticon={true}
            secureTextEntry={true}

          />
        </View>

        <View style={styles.brnview}>
          <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPassword')}>
            <ResponsiveText style={styles.frogettext}>
              {'Forgot Password?'}
            </ResponsiveText>
          </TouchableOpacity>
          <Button
            onPress={onPressLogin}
            title={'Log in'}
            titleStyle={styles.btntitle}
            loading={loading}
            loadingColor={Colors.secondaryColor}
          />
        </View>

        <ResponsiveText style={styles.ortext}>{'OR'}</ResponsiveText>
        <TouchableOpacity style={styles.socialbtn}>
          <View style={styles.rowView}>
            <Image source={Images.facebookIcon} style={styles.btnimg} />
            <ResponsiveText style={styles.btntext}>
              {'Login With Facebook'}
            </ResponsiveText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.socialbtn, backgroundColor: '#FFCDC8' }}>
          <View style={styles.rowView}>
            <Image source={Images.googleIcon} style={styles.btnimg} />
            <ResponsiveText style={styles.btntext}>
              {'Login With Google'}
            </ResponsiveText>
          </View>
        </TouchableOpacity>
      </View>
      {errorModal && <ErrorModal
        modalVisible={errorModal}
        setModalVisible={seterrorModal}
        errorMessage={errorMessage}
      />
      }

      <VerifayModal />
    </Container>
  );
};

export default Login;
