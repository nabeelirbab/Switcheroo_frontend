import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

import styles from './styles';
import Images from '../../components/Images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../components/Responsiveui';
import { useGetMyNameQuery } from '../../Graphql/Graphql';
import { StackActions } from '@react-navigation/native';
import { getNotificationCount, getmessageCount } from '../../Apis/Apis';
import { useDispatch } from 'react-redux';
import { addNotificationcount, addmessageCount } from '../../redux/actions/userDataAction';
// import { useGetMyNameQuery } from '../../Graphql/types';

const Splash = ({ navigation }) => {
  const {
    data,
    loading: isLoadingUserTest,
    error,
  } = useGetMyNameQuery({
    fetchPolicy: 'network-only',
  });
  const dispatch = useDispatch()

  const onAuthenticated = () => {
    navigation.dispatch(StackActions.replace('MainStack'))
    // navigation.replace('TabBarNav');
  };

  /**
   * This useEffect for the navigate Onboarding or homescreen depend on the user is login or not!
   */
  useEffect(() => {

    getNotificationCount().then(res => {
      console.log('response on splaseehhhhhh', res?.data?.notificationCount);
      dispatch(addNotificationcount(res?.data?.notificationCount))

    }).catch(errer => {
      console.log('errerererer', errer);
    })
    getmessageCount().then(res => {
      console.log('response on splaseehhhhhh message', res?.data?.messagesCount);
      dispatch(addmessageCount(res?.data?.messagesCount))
    }).catch(errer => {
      console.log('errerererer', errer);
    })
    // navigation.navigate('Onboarding');
    console.log('isLoadingUserTest', isLoadingUserTest);
    if (!isLoadingUserTest) {
      if (data && !error) {
        onAuthenticated();
        // navigation.navigate('Onboarding');


      } else {
        navigation.replace('Onboarding');
        // navigation.replace('Welcome');
      }
    }
  }, [isLoadingUserTest]);

  return (
    <View style={styles.container}>
      <View style={styles.topView}></View>
      <View style={styles.bottomView}>
        <Image
          source={Images.logoColor}
          resizeMode="contain"
          style={{ width: wp(80), height: wp(20), resizeMode: 'contain' }}
        />
      </View>
    </View>
  );
};

export default Splash;
