import {
  Image,
  StyleSheet,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Container from '../../components/Container';
import styles from './styles';
import { SuccessToast } from '../../components/SuccessToast';
import PhoneInput from 'react-native-phone-number-input';
import { UpdateMobilenumber } from '../../Graphql/Graphql';
import { heightPercentageToDP as hp } from '../../components/Responsiveui';
import ResponsiveText from '../../components/ResponsiveText';

const AddphoneNumber = props => {
  const [phonenumber, setphonenumber] = useState('');
  const [CountryCOde, setCountryCOde] = useState('');
  const phoneInput = useRef(null);
  const [updateUsermobilenumber] = UpdateMobilenumber();

  const HandlePhonenumber = async () => {
    try {
      console.log(
        'phonenumberphonenumberphonenumber',
        CountryCOde + phonenumber,
      );

      if (phonenumber) {
        const Updateresponse = await updateUsermobilenumber({
          variables: {
            mobile: CountryCOde + phonenumber,
          },
        });

        console.log('UpdateresponseUpdateresponse', Updateresponse);
        if (Updateresponse) {
          SuccessToast({
            title: 'Congratulation',
            text: 'Mobile number Add Successfully ',
          });
          props?.navigation?.replace('Addprofile');
        }
      } else {
        props?.navigation?.replace('Addprofile');
      }
    } catch (error) {
      console.log('errorerrorerror', error);
    }
  };

  return (
    <Container style={styles.container}>
      <View style={styles.phonenumberinput}>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phonenumber}
          defaultCode={'US'}
          layout="first"
          placeholder='Enter mobile number'
          onChangeText={text => {
            setphonenumber(text);
          }}
          style={styles.phoneinput}
          onChangeFormattedText={text => {
            // setCountryCOde(text);
          }}
          onChangeCountry={code => {
            console.log(code?.cca2, 'code');
            setCountryCOde(code?.cca2);
          }}
          containerStyle={styles.phoneinput}
          textContainerStyle={styles.phonetext}
          withShadow
          autoFocus
        />
      </View>
      {phonenumber.length <= 0 ? (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp(3),
          }}
          onPress={() => HandlePhonenumber()}>
          <ResponsiveText style={styles.adphototxt}>{'skip'}</ResponsiveText>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp(3),
          }}
          onPress={() => HandlePhonenumber()}>
          <ResponsiveText style={styles.adphototxt}>
            {'Continue'}
          </ResponsiveText>
        </TouchableOpacity>
      )}
    </Container>
  );
};

export default AddphoneNumber;
