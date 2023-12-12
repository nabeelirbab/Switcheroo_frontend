import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Container from '../../components/Container'
import styles from './styles'
import Images from '../../components/Images'
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from '../../components/Responsiveui'
import ResponsiveText from '../../components/ResponsiveText'
import Button from '../../components/Button'
import Colors from '../../theme/colors'

const Onboarding = (props) => {

 const [loading ,setloading]=useState(false)
  return (
    <View style={styles.container}>
    <View style={styles.topView}>
    
    </View>
    <View style={styles.bottomView}>
    <Image
      source={Images.logoColor}
      resizeMode='contain'
      style={{width:wp(60),height:wp(20),resizeMode:'contain'}}
      />
<View style={styles.toptextview}>
      <ResponsiveText style={styles.foncolortop}>
        {'By creating an account or logging in, you agree to our Terms and Privacy Policy'}
      </ResponsiveText>
<Button
 btnContainer={styles.btnstyle}
 onPress={()=>props.navigation.navigate('Signup')}
 title={'Create an account'}
 titleStyle={styles.btntitle}
 loading={loading}
 loadingColor={Colors.secondaryColor}

/>



<TouchableOpacity  onPress={()=>props.navigation.navigate('Login')} style={styles.loginbtn}>
<ResponsiveText style={styles.logintext}>
        {'Already have an account? Log in'}
      </ResponsiveText>
</TouchableOpacity>
      </View>
    </View>
    </View>
  )
}

export default Onboarding