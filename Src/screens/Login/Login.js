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
import { saveUserCradential } from '../../redux/actions/userDataAction';
import { useDispatch, useSelector } from 'react-redux';

const Login = props => {
  const [signInMutation, { loading }] = useSignInMutation();
  const state = useSelector(state => state.userdataReducer.remember)

  console.log('statestatestatestatestatestate', state);

  const dispatch = useDispatch();
  // const [signIn, {loading}] = useSignInMutation();

  const [emailaddress, setemailaddress] = useState(state?.email);
  const [password, setpassword] = useState(state?.password);
  const [errorModal, seterrorModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Remember, setRemember] = useState(state?.email ? true : false);
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

          if (Remember) {

            const objectdata = {
              email: emailaddress.trim(),
              password: password.trim(),
            }


            dispatch(saveUserCradential(objectdata));
          }

          else {

            const objectdata = {
              email: '',
              password: ''
            }


            dispatch(saveUserCradential(objectdata));
          }
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
        <TouchableOpacity style={styles.remembermemain} activeOpacity={0.8} onPress={() => setRemember(!Remember)}>
          <Image
            source={Remember ? Images.checkbox : Images.uncheckbox}
            style={styles.checkbox}
          />
          <ResponsiveText style={styles.remembertext}>
            {'Remember me!'}
          </ResponsiveText>
        </TouchableOpacity>

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
