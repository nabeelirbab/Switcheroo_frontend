import Toast from 'react-native-toast-message';
import { StyleSheet, Modal, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import ResponsiveText from './ResponsiveText';
import { heightPercentageToDP, widthPercentageToDP } from './Responsiveui';
import Colors from '../theme/colors';
import { Fonts } from '../theme/Fonts';
import { newEvents } from '../CustomEvents/CustomEvents';


export const SuccessToast = (props) => {

  newEvents.emit('Toastmessage', props?.text)

}


export const SuccessTeastModal = ({ modal, setModal, title }) => {



  setTimeout(() => {
    setModal(false)
  }, 1000);


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modal}
      onRequestClose={() => {
        setModal(false);
      }}>
      <TouchableWithoutFeedback onPress={() => setModal(false)}>
        <View style={styles.modalContainerfirst}>
          <View style={styles.modalContent}>
            <ResponsiveText style={styles.textStyle}>
              {title}
            </ResponsiveText>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

  )

}




const styles = StyleSheet.create({

  modalContainerfirst: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  textStyle: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: Fonts.FontsExtraBold
  },
  modalContent: {
    backgroundColor: '#dde4f0',
    width: widthPercentageToDP(80),
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    marginTop: heightPercentageToDP(2),
    borderRadius: 10,
    // borderWidth: 2,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderLeftColor: Colors.primaryColor,
    borderRightColor: Colors.secondaryColor
    // borderTopColor: Colors.primaryColor,
    // borderRightColor: Colors.primaryColor,
    // borderBottomColor: Colors.primaryColor,

  },

})