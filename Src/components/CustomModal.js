import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../theme/colors';
import { widthPercentageToDP as wp} from './Responsiveui';

const CustomModal = ({modalVisible,setModalVisible,children}) => {
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {children}
          </View>
        </View>
      </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        backgroundColor: Colors.backgroundColor,
        borderRadius: 20,
        padding: 30,
        width:wp(90),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
})