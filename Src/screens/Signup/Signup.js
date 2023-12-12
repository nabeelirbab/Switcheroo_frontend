import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import Header from '../../components/Header';
import styles from './styles';
import Images from '../../components/Images';
import TextInputcomp from '../../components/TextInputcomp';
import Button from '../../components/Button';
import Colors from '../../theme/colors';
import ResponsiveText from '../../components/ResponsiveText';
import {heightPercentageToDP as hp} from '../../components/Responsiveui';
import { ForgotPasswordMutation, useSignupMutation } from '../../Graphql/Graphql';
import {getErrorString} from '../../helper/global';
import { ErrorToast } from '../../components/ErrorToast';
import CustomModal from '../../components/CustomModal';
import ErrorModal from '../../components/ErrorModal';

const Signup = props => {

  const [signupMutation, { loading, error, data }] = useSignupMutation();
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [emailaddress, setemailaddress] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [confirmpasvalidation, setconfirmpasvalidation] = useState(false);
  const [passvalidation, setpassvalidation] = useState(false);
  const [errorModal, seterrorModal] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');

 

  const onSignup = async () => {
    // props.navigation.navigate('TabBarNav');

    seterrorModal(false)
    seterrorMessage(``)
    if (emailaddress == '') {

      seterrorModal(true)
      seterrorMessage(`Please enter the email address`)
    } else if (password == '') {

      seterrorModal(true)
      seterrorMessage(`Please enter the passwor`)
    } else if (confirmpassword == '') {
      seterrorModal(true)
      seterrorMessage(`Please enter the confirm passwor`)
    } else if (confirmpassword != password) {
     
      seterrorModal(true)
      seterrorMessage(`Please donse't match`)
    } else if (FirstName == '') {
      seterrorModal(true)
      seterrorMessage('Please enter the first name')
    } else if (LastName == '') {
      seterrorModal(true)
      seterrorMessage('Please enter the last name')

    } else {
      try {
        const result = await signupMutation({
          variables: {
            user: {
              email:emailaddress.trim(),
            firstName:FirstName,
            lastName:LastName,
            },
            password: password.trim(),
          },
        });

        if(result?.data){
          props.navigation.navigate('OtpScreen', {
            email:emailaddress.trim(),
            password:password.trim(),
            mode: 'create',
            registerUser:result?.data?.registerUser
          });
        }
        // props.navigation.navigate('OtpScreen')
        console.log('Signup result:', result);
      } catch (error) {
        
    
        console.log('Signup error:', error?.message);
        if(error?.message.toString().includes('is already taken')){
      seterrorModal(true)

          seterrorMessage(`this email ${emailaddress} already register`)

        }
        else if( error?.message.toString().includes('Passwords must be at least 6 characters.'))
        {
      seterrorModal(true)

          seterrorMessage(`Passwords must have at least one digit ('0'-'9').;Passwords must have at least one uppercase ('A'-'Z')`)
      }
      else if(error?.message.toString().includes('invalid'))
{
 
  seterrorModal(true)

          seterrorMessage( `this email address ${emailaddress} is invalid.`)
}
   
        else{
     {
      seterrorModal(true)
         seterrorMessage(error?.message.toString()
         )
}

        }
      }
    }
  };

  function validatePassword(value,input) {
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    let res= passwordRegex.test(value);
if(input=='password'){
setpassvalidation(!res)
}else{
  if(password!=value)
  {
    setconfirmpasvalidation(true)
  }
  else{

    setconfirmpasvalidation(!res)
  }
}
    console.log('inputinput',input,res,password);
  }

  return (
    <Container>
      <View style={styles.headerview}>
        <Header title={''} onPress={() => props.navigation.goBack()} />
      </View>
      <ScrollView style={styles.mainView}>
        <View style={styles.imageview}>
          <Image
            source={Images.logoSimple}
            style={styles.logostyle}
            resizeMode="contain"
          />
        </View>
        <View style={styles.inputview}>
          <TextInputcomp
            placeholder={'First name'}
            value={FirstName}
            onChangeText={setFirstName}
          />

          <TextInputcomp
            placeholder={'Last name'}
            value={LastName}
            onChangeText={setLastName}
          />

          <TextInputcomp
            placeholder={'Email address'}
            value={emailaddress}
            onChangeText={setemailaddress}
          />

          <TextInputcomp
            placeholder={'Password'}
            value={password}
            onChangeText={(pas)=>{validatePassword(pas,'password'),setpassword(pas)}}

            righticon={true}
            error={passvalidation}
            secureTextEntry={true}
          />

          <TextInputcomp
            placeholder={'Confirm Password'}
            value={confirmpassword}
            onChangeText={(pas)=>{validatePassword(pas,'Confirmpassword'),setconfirmpassword(pas)}}
            righticon={true}
            error={confirmpasvalidation}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.brnview}>
          <ResponsiveText style={styles.frogettext}>
            {'Enter a combination of at least six numbers and letters.'}
          </ResponsiveText>
          <Button
            btnContainer={{}}
            onPress={() =>onSignup()}
            title={'Continue'}
            titleStyle={styles.btntitle}
            loading={loading}
            loadingColor={Colors.secondaryColor}
          />
        </View>
      </ScrollView>
    {errorModal&&  <ErrorModal
      modalVisible={errorModal}
      setModalVisible={seterrorModal}
      errorMessage={errorMessage}
      />
      }
    </Container>
  );
};

export default Signup;
