import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Container from '../../../components/Container'
import styles from './styles'
import Images from '../../../components/Images'
import ResponsiveText from '../../../components/ResponsiveText'
import Colors from '../../../theme/colors'
import { UpdateUserProfileMutation } from '../../../Graphql/Graphql'
import ImagePicker from 'react-native-image-crop-picker';
import uploadToS3 from '../../../components/Uploads3File'
import Loader from '../../../components/Loader'
import { SuccessToast } from '../../../components/SuccessToast'

const EditProfile = (props) => {
  let myPersnolData = props.route.params.myPersnolData
  const [Discreption, setDiscreption] = useState(myPersnolData?.blurb)
  const [updateUserProfile, { loading }] = UpdateUserProfileMutation();
  const [profileImage, setprofileImage] = useState(myPersnolData?.avatarUrl ? myPersnolData?.avatarUrl : '')
  const [ImagePickermodal, setImagePickermodal] = useState(false)
  const [Loading, SetLoading] = useState(false)
  let discreptionemaxlength = 500

  console.log('myPersnolDatamyPersnolDatamyPersnolData', myPersnolData);

  const selecFromgalery = async () => {
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

      }).catch(error => {
        console.log(error, 'error');
        setImagePickermodal(false)

      });
    } catch (error) {
      setImagePickermodal(false)

      console.log('errorerror', error);
    }

  }


  const selectFromcamera = () => {

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
      console.log('errorerror', error);
      setImagePickermodal(false)

    }

  }

  const handleSupmit = async () => {
    try {
      console.log('DiscreptionDiscreptionDiscreption', Discreption, 'profileImageprofileImage', profileImage);
      const response = await updateUserProfile({
        variables: {
          blurb: Discreption,
          avatarUrl: profileImage,
        },
      });

      console.log('Updated profile:', response);
      if (response?.data?.updateUserProfile) {
        SetLoading(false)
        SuccessToast({
          title: 'Congratulation',
          text: 'Profile updated Successfully '
        })
        props.navigation.goBack()
      }

    } catch (error) {

    }
  }


  const handleUpdateProfile = async (image) => {
    try {
      SetLoading(true)
      const result = await uploadToS3(image)
      console.log('resultresultresult', result);
      if (result) {

        setprofileImage(result)
        SetLoading(false)
      }


      else {
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
        <TouchableOpacity onPress={() => props.navigation.goBack()}>

          <ResponsiveText style={styles.headerText}>
            {'Cancel'}
          </ResponsiveText>

        </TouchableOpacity>
        <ResponsiveText style={styles.headerText}>
          {'Edit Profile'}
        </ResponsiveText>
        <TouchableOpacity onPress={() => handleSupmit()}>

          <ResponsiveText style={{ ...styles.headerText, color: Colors.btncolor }}>
            {'Done'}
          </ResponsiveText>

        </TouchableOpacity>


      </View>

      <View style={styles.seprator} />


      <View style={styles.imageview}>
        {profileImage ?

          <TouchableOpacity style={{ ...styles.profileView, borderRadius: 100 }} onPress={() => setImagePickermodal(true)} activeOpacity={0.9}>
            <Image
              source={{ uri: profileImage }}
              resizeMode='contain'
              style={{ ...styles.profileimg, borderRadius: 100 }}
            />
            <ResponsiveText style={styles.adphototxt}>
              {profileImage ? 'Edit a photo' : 'Add a photo'}
            </ResponsiveText>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => setImagePickermodal(true)} activeOpacity={0.9}>
            <Image
              source={Images.addProfilePic}
              resizeMode='contain'
              style={styles.profileimg}
            />
            <ResponsiveText style={styles.adphototxt}>
              {profileImage ? 'Edit a photo' : 'Add a photo'}
            </ResponsiveText>
          </TouchableOpacity>
        }


      </View>
      <View style={styles.textview}>
        <ResponsiveText>
          {'Information'}
        </ResponsiveText>
      </View>

      <View style={styles.titleinput}>
        <TextInput
          value={Discreption}
          onChangeText={(text) => { setDiscreption(text) }}
          maxLength={500}
          style={styles.input}
          multiline={true}
          placeholder='Add a description.'
          placeholderTextColor={Colors.black}

        />
        <View style={styles.Textlength}>
          <ResponsiveText style={styles.Titlelenthstyl}>
            {Discreption ? discreptionemaxlength - Discreption?.length : discreptionemaxlength}

          </ResponsiveText>
        </View>
      </View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={ImagePickermodal}
        onRequestClose={() => {
          setImagePickermodal(false);
        }}
      >

        <TouchableWithoutFeedback onPress={() => setImagePickermodal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>


              <TouchableOpacity style={styles.modlbtn} hitSlop={styles.hitslop} onPress={() => { selectFromcamera() }}>
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

export default EditProfile
