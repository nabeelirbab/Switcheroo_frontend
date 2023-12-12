import { FlatList, Image, ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Container from '../../../components/Container'
import styles from './styles'
import Images from '../../../components/Images'
import ResponsiveText from '../../../components/ResponsiveText'
import Colors from '../../../theme/colors'
import Button from '../../../components/Button'
import { heightPercentageToDP as hp } from '../../../components/Responsiveui'
import LottieView from 'lottie-react-native'
import Sound from 'react-native-sound';

const MatchingSuccess = (props) => {
  const [successanimation, setsuccessanimation] = useState(false)

  const susseRef = useRef(null)
  useEffect(() => {
    // Create a new sound object
    const sound = new Sound('fireworks', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Error loading sound', error);
        return;
      }

      // Play the sound
      sound?.play(() => {
        // Release the audio resources
        sound?.release();
      });
    });

    // Set a timeout to play the animation once the sound has finished playing
    setTimeout(() => {
      animationRef?.play();
    }, 2500); // Adjust the timeout value as needed
    // setTimeout(() => {   
    //     setsuccessanimation(true)
    //   }, 3000);
  }, []);
  let animationRef;

  return (
    <Container style={styles.container}>
      <View style={styles.view}>
        <ResponsiveText style={styles.textmatch}>
          {'Its a Match !!! '}
        </ResponsiveText>
      </View>
      <View style={styles.succesLotiview}>
        <LottieView
          ref={susseRef}
          style={styles.succesLoti}
          source={require('../../../Lotianimations/success.json')}
          autoPlay={true}
          loop={false}
        />
      </View>

      <LottieView
        ref={(animation) => {
          animationRef = animation;
        }}
        // onAnimationFinish={()=>setsuccessanimation(true)}

        style={styles.lotianimation}
        source={require('../../../Lotianimations/succesMatch.json')} // Replace with your Lottie animation file
        autoPlay={false}
        loop={false}
      />

      <Button
        title={'Send Message'}
        btnContainer={styles.btnContainer2}
        onPress={() => props.navigation.navigate('TabBarNav', {
          screen: 'Message'
        })}
      />

      <Button
        title={'Keep on Playing'}
        btnContainer={styles.btnContainer}
        onPress={() => props.navigation.navigate('TabBarNav', {
          screen: 'Home'
        })}
      />
    </Container>
  )
}

export default MatchingSuccess
