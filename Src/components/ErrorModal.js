import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../theme/colors';
import { heightPercentageToDP as hp ,widthPercentageToDP as wp} from './Responsiveui';

const ErrorModal = ({modalVisible, setModalVisible, errorMessage}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.okButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.backgroundColor,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minHeight: hp(18),
    width: wp(80),
    justifyContent: 'space-between', // Added this line
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    marginTop:hp(2),
    color:Colors.black
  },
  okButton: {
    // backgroundColor: Colors.secondaryColor, // Customize the color as needed
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-end', // Align to the right
  },
  okButtonText: {
    color: Colors.secondaryColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
