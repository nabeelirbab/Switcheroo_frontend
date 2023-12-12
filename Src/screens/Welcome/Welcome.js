import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import styles from './styles'
import Images from '../../components/Images'
import ResponsiveText from '../../components/ResponsiveText'
import Button from '../../components/Button'
import Colors from '../../theme/colors'
import Header from '../../components/Header'
import { useDispatch } from 'react-redux'
import { Savematchingitem } from '../../redux/actions/userDataAction'


const Welcome = (props) => {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(Savematchingitem(null)) 

  },[])

let firstName=props?.route?.params?.firstName
  return (
   <Container style={styles.container}>
   <View style={styles.imageview}>
    <Image
    source={Images.welcome}
    style={styles.welcomestyle}
    resizeMode='contain'
    />
   </View>

   <View style={styles.textview}>

    <ResponsiveText style={styles.fontstyle}>
        {`Welcome to Switcheroo, ${firstName}.`}
    </ResponsiveText>

    <ResponsiveText style={styles.fontstyle2}>
        {'You are almost ready to start switching. Let’s get your profile finished before you view some our great listings.'}
    </ResponsiveText>
   </View>
   <View style={styles.buttonstyle}>
   <Button
            onPress={()=>{props.navigation.navigate('AddphoneNumber')}}
            title={'Complete sign-up'}
            titleStyle={styles.btntitle}
            // loading={loading}
            loadingColor={Colors.secondaryColor}
          />
   </View>
   </Container>

  
  )
}

export default Welcome