import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../../components/Container'
import styles from './styles'
import Images from '../../../components/Images'
import ResponsiveText from '../../../components/ResponsiveText'
import Colors from '../../../theme/colors'
import { heightPercentageToDP as hp } from '../../../components/Responsiveui'
import { useIsFocused } from '@react-navigation/native'
import { getChatlist, markMesegecountzero } from '../../../Apis/Apis'
import moment from 'moment/moment';
import { useDispatch } from 'react-redux'
import { addmessageCount } from '../../../redux/actions/userDataAction'

const Message = (props) => {

  const [message, setmessages] = useState('')
  const [messageData, setmessageData] = useState()

  const dispatch = useDispatch()


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
  const renderItem = ({ item, index }) => {
    console.log('itemitemitem', item);
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('CHattscreen', {
        item: item
      })} style={styles.mesageview}>
        <View style={styles.imageView}>
          <TouchableOpacity hitSlop={styles.hitslop} onPress={() => props.navigation.navigate('ProductDetail', {
            item: item
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

        {item?.createdAt && <ResponsiveText style={styles.lastmessage}>
          {moment(item?.createdAt).format('hh:mm A')}
        </ResponsiveText>}
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

    </Container>
  )
}

export default Message
