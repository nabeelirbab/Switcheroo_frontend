import React, {useState} from 'react';
import {Alert, Image, ScrollView, TouchableOpacity, View} from 'react-native';

import styles from './styles';
import Colors from '../../theme/colors';
import Header from '../../components/Header';
import Images from '../../components/Images';
import Button from '../../components/Button';
import Container from '../../components/Container';
import TextInputcomp from '../../components/TextInputcomp';
import ResponsiveText from '../../components/ResponsiveText';
import { heightPercentageToDP } from '../../components/Responsiveui';
import { ForgotPasswordMutation } from '../../Graphql/Graphql';
import { getErrorString } from '../../helper/global';

const ForgotPassword = props => {
  const [resetPasswordInitiate, { loading }] = ForgotPasswordMutation();

  const [emailaddress, setemailaddress] = useState('');

 
  const onPressLogin = async () => {
    

    if (emailaddress == '') {
      Alert.alert('Please enter the email address', '');
    } 
    else {
      try {
        const resetresponse = await resetPasswordInitiate({
            variables: {
              email:emailaddress,
            },
          });
console.log('signInResponse===>>>>>',resetresponse);
if (!resetresponse.data) throw new Error('Password reset failed');

props.navigation.navigate('OtpScreen', {
  email:emailaddress,
  mode: 'recover',
});
      } catch (err) {
        //Failure response
        console.log('Log in error', err);
        Alert.alert(getErrorString(err), '');
      }
    }

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
        </View>
        <ResponsiveText style={styles.ortext}>{'Enter your Email address to begin the password recovery process'}</ResponsiveText>

        <View style={styles.brnview}>
    
          <Button
            onPress={onPressLogin}
            btnContainer={{marginTop:heightPercentageToDP(2),}}
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

export default ForgotPassword;
