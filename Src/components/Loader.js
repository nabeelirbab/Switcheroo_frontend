import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  ActivityIndicator
} from 'react-native'; 
import Colors from '../theme/colors';
import { widthPercentageToDP as wp,heightPercentageToDP as hp} from './Responsiveui';

const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;


  return (
    <Modal
      transparent={true}
      animationType='fade'
      visible={loading}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator size="large" color={Colors.btncolor} />
            <Text style={styles.text}>{props.title}</Text>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor:'rgba(1, 1, 1, 0.5)',
  },
  activityIndicatorWrapper: {
    backgroundColor: Colors.backgroundColor,
    borderWidth:2,
    borderColor:Colors.btncolor,
    height: hp(20),
    width: wp(80),

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  
  lottieStyle:{
    width:70,
    height:70,


  
  },
  text:{
    borderWidth:0,
    fontSize:12,
    fontWeight:'500',
    color:Colors.primaryColor,
    width: wp(75),
    alignSelf:'center',
    textAlign:"center"
  }
});

export default Loader;