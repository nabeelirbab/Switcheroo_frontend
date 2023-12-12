import { Image, StyleSheet, Modal, TextInput, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import Container from '../../components/Container'
import styles from './styles'
import Images from '../../components/Images'
import ResponsiveText from '../../components/ResponsiveText'
import Colors from '../../theme/colors'
import ImagePicker from 'react-native-image-crop-picker';
import { UpdateUserProfileMutation } from '../../Graphql/Graphql'
import uploadToS3 from '../../components/Uploads3File'
import Loader from '../../components/Loader'
import { StackActions } from '@react-navigation/native'

const Addprofile = (props) => {
  const [updateUserProfile, { loading }] = UpdateUserProfileMutation();
  const [profileImage,setprofileImage]=useState('')
  const [ImagePickermodal,setImagePickermodal]=useState(false)
  const [Loading,SetLoading]=useState(false)
const selecFromgalery=async()=>{
  try {

    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: false
    }).then(image => {
     
      console.log(image);
      setprofileImage(image?.path)

      // let blurb=''
      handleUpdateProfile(image)
      setImagePickermodal(false)
   
    }).catch(error=>{
      console.log(error,'error');
    setImagePickermodal(false)

    });
  } catch (error) {
    setImagePickermodal(false)

    console.log('errorerror',error);
  }
 
}


const selectFromcamera=()=>{

  try {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: false,
    }).then(image => {
      console.log(image);
      setprofileImage(image?.path)
      handleUpdateProfile(image)
    setImagePickermodal(false)


    });
  } catch (error) {
    console.log('errorerror',error);
    setImagePickermodal(false)

  }
 
}





const handleUpdateProfile = async (image) => {
  try {
    SetLoading(true)
    const result=await uploadToS3(image)
    console.log('resultresultresult',result);
    if(result){
    const response = await updateUserProfile({
      variables: {
        blurb:'',
        avatarUrl:result,
      },
    });

    console.log('Updated profile:', response);
  if(response?.data?.updateUserProfile){
    SetLoading(false)
    // props.navigation.dispatch(StackActions.replace('MainStack'))
  }
  
  }
    

    else{
      Alert('some thing wrong please try again later')
    SetLoading(false)

    }
  } catch (error) {
    SetLoading(false)

    console.error('Error updating profile:', error);
  }
};
  return (
   <Container style={styles.container}>
    <View style={styles.headerView}>

<ResponsiveText style={styles.headerText}>
          {'Add profile photo'}
        </ResponsiveText>

        <ResponsiveText style={styles.detailtxt}>
          {'Add a profile photo so fellow Switchers know who they are speaking to.'}
        </ResponsiveText>
    <View style={styles.seprator}/>
    </View>



<View style={styles.imageview}>
    <TouchableOpacity onPress={()=>setImagePickermodal(true)}  activeOpacity={0.5}>
{profileImage==''?<Image
source={Images.addProfilePic}
resizeMode='contain'
style={styles.profileimg}
/>
:
<Image
source={{uri:profileImage}}
resizeMode='contain'
style={styles.profileimgselecte}
/>
}
</TouchableOpacity>
{profileImage==''?
<TouchableOpacity onPress={()=> props.navigation.dispatch(StackActions.replace('MainStack'))}>
<ResponsiveText style={styles.adphototxt}>
    {'skip'}
</ResponsiveText>
</TouchableOpacity>
:
<TouchableOpacity onPress={()=> props.navigation.dispatch(StackActions.replace('MainStack'))}>
<ResponsiveText style={styles.adphototxt}>
    {'Continue'}
</ResponsiveText>
</TouchableOpacity>}
</View>
<Modal
      animationType="slide"
      transparent={true}
      visible={ImagePickermodal}
      onRequestClose={() => {
        setImagePickermodal(false);
      }}
    >

<TouchableWithoutFeedback onPress={()=>setImagePickermodal(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>


          <TouchableOpacity style={styles.modlbtn} hitSlop={styles.hitslop} onPress={() => {selectFromcamera()}}>
            <ResponsiveText style={styles.buttonTextcancel}>Take photo</ResponsiveText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modlbtn} onPress={() => selecFromgalery()}>
            <ResponsiveText style={styles.buttonTextcancel}>Select from gallery</ResponsiveText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modlbtn} onPress={() => setImagePickermodal(false)}>
            <ResponsiveText style={styles.buttonTextcancel}>Cancel</ResponsiveText>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
    <Loader
    loading={Loading}
    title={'Image is uploading please wait...'}
    />
   </Container>
  )
}

export default Addprofile
 