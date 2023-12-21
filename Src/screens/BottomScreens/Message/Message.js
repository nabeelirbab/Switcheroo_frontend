import { Alert, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../../components/Container'
import styles from './styles'
import Images from '../../../components/Images'
import ResponsiveText from '../../../components/ResponsiveText'
import Colors from '../../../theme/colors'
import { heightPercentageToDP as hp } from '../../../components/Responsiveui'
import { useIsFocused } from '@react-navigation/native'
import { ComplaintAgainstuser, getChatlist, markMesegecountzero, unMatchOffer } from '../../../Apis/Apis'
import moment from 'moment/moment';
import { useDispatch } from 'react-redux'
import { addmessageCount } from '../../../redux/actions/userDataAction'
import CustomModal from '../../../components/CustomModal'
import Button from '../../../components/Button'
import { SuccessToast } from '../../../components/SuccessToast'

const Message = (props) => {

  const [message, setmessages] = useState('')
  const [messageData, setmessageData] = useState()
  const [SelectedItemData, setSelectedItemData] = useState('')
  const [reportUser, setreportUser] = useState(false)
  const [userRepotDetailModal, setuserRepotDetailModal] = useState(false);
  const [Detail, setDetail] = useState('');
  const [title, settitle] = useState('');
  const dispatch = useDispatch()
  const [unmatchModal, setunmatchModal] = useState(false);

  const getAllmesagelist = () => {

    getChatlist().then(res => {
      console.log('getChatlistgetChatlist', res.data.chat);
      setmessageData(res.data.chat)

    }).catch(error => {
      console.log('errejrlkj', error);
    })
  }
  useEffect(() => {
    getAllmesagelist()
    markMesegecountzero().then(Res => {
      console.log('respmmmmmmesssageee', Res);
      dispatch(addmessageCount(0))


    })

  }, [useIsFocused()])

  const handleReportauser = async () => {

    try {

      if (!title) {
        Alert.alert('Field Required', 'Please write title of your report');
      }
      else if (!Detail) {

        Alert.alert('Field Required', 'Please write detail discreption of your report with reason');

      }
      else {


        console.log(SelectedItemData?.targetUser[0]?.id, 'SelectedItemDataSelectedItemData')

        let responsereport = await ComplaintAgainstuser(SelectedItemData?.targetUser[0]?.id, title, Detail)
        if (responsereport) {
          setreportUser(false), setuserRepotDetailModal(false)
          SuccessToast({
            title: 'Congratulation',
            text: `Your complaint has been registered. We're on it and will get back to you soon. Thank you for letting us know!`,
          });
        }
        setDetail('')
        settitle('')
        console.log('responsereportresponsereportresponsereport', responsereport);

      }





    } catch (error) {

    }
  }


  const unMatchCall = async () => {
    try {

      console.log('sender?.offerIdsender?.offerIdsender?.offerId', SelectedItemData);
      let response = await unMatchOffer(SelectedItemData?.offerId)


      setunmatchModal(false)

      getAllmesagelist()
      console.log('responseresponseresponse', response);
    } catch (error) {
      console.log('errorrrrr====>>>>', error);
    }
  }

  const renderItem = ({ item, index }) => {
    console.log('itemitemitem', item);
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('CHattscreen', {
        item: item
      })} style={styles.mesageview}>
        <View style={styles.imageView}>
          <TouchableOpacity hitSlop={styles.hitslop} onPress={() => props.navigation.navigate('ProductDetail', {
            item: item,
            from: 'recive'
          })}>

            <Image
              source={{ uri: item?.targetItem[0]?.mainImageUrl ?? 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png' }}
              style={styles.targetitem}
            />

          </TouchableOpacity>


          <View style={styles.messagetext}>
            <ResponsiveText style={styles.nametxt}>
              {item?.targetItem[0]?.title + `(${item?.targetUser[0].firstName})`}
            </ResponsiveText>


            <ResponsiveText numberOfLines={1} style={styles.lastmessage}>
              {item?.messageText}
            </ResponsiveText>
          </View>
        </View>

        {/* {item?.createdAt && <ResponsiveText style={styles.lastmessage}>
          {moment(item?.createdAt).format('hh:mm A')}
        </ResponsiveText>} */}
        <TouchableOpacity onPress={() => { setSelectedItemData(item), setreportUser(true) }} hitSlop={styles.hitslop}>
          <Image
            source={Images.verticaldot}
            style={styles.dotimg}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {/* {!item?.messageReadAt && <View style={styles.badge} />} */}

      </TouchableOpacity>
    )
  }
  return (
    <Container style={styles.container}>
      <View style={styles.headerView}>

        <View style={styles.dotimg} />
        <ResponsiveText style={styles.headerText}>
          {'Matching'}
        </ResponsiveText>
        <TouchableOpacity>

          <View
            style={styles.dotimg}
          />

        </TouchableOpacity>


      </View>

      <View style={styles.inputview}>
        <TextInput
          value={message}
          onChangeText={(text) => { setmessages(text) }}
          style={styles.input}
          placeholder='Search conversations'
          placeholderTextColor={Colors.graytext}
        />
      </View>

      <View style={styles.seprator} />


      <FlatList
        data={messageData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: hp(20) }}

      />




      <Modal
        animationType="slide"
        transparent={true}
        visible={reportUser}
        onRequestClose={() => {
          setreportUser(false);
        }}>
        <TouchableWithoutFeedback onPress={() => setreportUser(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>

              <TouchableOpacity
                style={styles.modlbtn}
                onPress={() => { setunmatchModal(true), setreportUser(false) }}>
                <ResponsiveText style={styles.buttonText}>
                  Unmatch
                </ResponsiveText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modlbtn}
                onPress={() => { setreportUser(false), setuserRepotDetailModal(true) }}>
                <ResponsiveText style={styles.buttonText}>
                  Report User
                </ResponsiveText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modlbtn}
                onPress={() => setreportUser(false)}>
                <ResponsiveText style={styles.buttonTextcancel}>
                  Cancel
                </ResponsiveText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <CustomModal modalVisible={userRepotDetailModal} setModalVisible={setuserRepotDetailModal}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            placeholder="Title of report"
            value={title}
            onChangeText={text => settitle(text)}
            style={styles.input2}
            placeholderTextColor={Colors.graytext}

          />

          <TextInput
            placeholder="write detail discreption of your report with reason"
            value={Detail}
            onChangeText={text => setDetail(text)}
            style={[styles.input2, { height: 200 }]} // Make the message input taller
            multiline={true}
            placeholderTextColor={Colors.graytext}

          />
          <Button title="Report this item"
            btnContainer={styles.contactUs}
            onPress={() => handleReportauser()} />
        </View>
      </CustomModal>





      <CustomModal
        modalVisible={unmatchModal} setModalVisible={setunmatchModal}>

        <View style={styles.deletemodal}>
          <ResponsiveText style={styles.deletetxt}>
            Are you sure you want to unmatch this item?
          </ResponsiveText>
          <View style={styles.btnrow}>
            <Button
              title={'Yes'}
              btnContainer={styles.btn}
              onPress={() => unMatchCall()}
            />

            <Button
              title={'No'}
              btnContainer={styles.btnno}
              onPress={() => setunmatchModal(false)}
            />
          </View>

        </View>
      </CustomModal>
    </Container>
  )
}

export default Message
