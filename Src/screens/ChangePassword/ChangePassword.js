import React, { useState } from 'react';
import { Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import Colors from '../../theme/colors';
import Header from '../../components/Header';
import Images from '../../components/Images';
import Button from '../../components/Button';
import { getErrorString } from '../../helper/global';
import Container from '../../components/Container';
import TextInputcomp from '../../components/TextInputcomp';
import ResponsiveText from '../../components/ResponsiveText';
import { useResetPasswordMutation } from '../../Graphql/Graphql';
import { SuccessToast } from '../../components/SuccessToast';

const ChangePassword = props => {

  const [resetPassword, { loading }] = useResetPasswordMutation();

  // const [signIn, {loading}] = useSignInMutation();

  const [confirmPassword, setconfirmPassword] = useState('');
  const [password, setpassword] = useState('');
  let prevData = props.route.params;
  let email = prevData?.email
  let token = prevData?.token


  /**
   * when click on the login button at that time call this function
   */
  const onPressLogin = async () => {

    // props.navigation.navigate('TabBarNav');

    if (password == '') {
      Alert.alert('Field Required', 'Please enter the password');
    }
    else if (confirmPassword == '') {
      Alert.alert('Field Required', 'Please enter the confirm password');
    }

    else if (confirmPassword != password) {
      Alert.alert('Validation Failed', `Password dosen't march`);
    }
    else {
      try {
        if (password !== confirmPassword) throw new Error('Passwords do not match');

        const response = await resetPassword({
          variables: {
            email,
            resetPasswordToken: token,
            newPassword: password,
          },
        });
        console.log('responseresponse', response);
        if (!response.data || !response.data.resetPassword) throw new Error('Reset password failed');
        SuccessToast({
          title: 'Congratulation',
          text: 'Password change Successfully '
        })
        props.navigation.navigate('Login');
      } catch (err) {
        //Failure response
        console.log('Log in error', err);
        Alert.alert(getErrorString(err), '');
      }
    }
  };

  return (
    <Container>
      <View style={styles.headerview}>
        <Header title={'Create a password'} left={true} onPress={() => props.navigation.goBack()} />
      </View>
      <View style={styles.mainView}>

        <View style={styles.inputview}>
          <TextInputcomp
            placeholder={'Password'}
            value={password}
            onChangeText={setpassword}
            righticon={true}
            secureTextEntry={true}
          />

          <TextInputcomp
            placeholder={'Confirm Password'}
            value={confirmPassword}
            onChangeText={setconfirmPassword}
            righticon={true}
            secureTextEntry={true}

          />
        </View>

        <View style={styles.brnview}>
          <ResponsiveText style={styles.frogettext}>
            {'Enter a combination of at least six numbers and letters.'}
          </ResponsiveText>
          <Button
            onPress={onPressLogin}
            title={'Continue'}
            titleStyle={styles.btntitle}
            loading={loading}
            loadingColor={Colors.secondaryColor}
          />
        </View>
      </View>


    </Container>
  );
};

export default ChangePassword;
