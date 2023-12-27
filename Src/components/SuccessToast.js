import Toast from 'react-native-toast-message';
import { StyleSheet, Modal, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'


export const SuccessToast = (props) => {
  Toast.show({
    type: 'success',
    text1: props?.text,           // Assuming title is passed in props
    // text2: props?.text,             // Secondary text (optional)
    position: 'top',
    visibilityTime: 500,           // Duration the toast is visible, in milliseconds (0.5 second)
    autoHide: true,                // Auto hide after visibilityTime
    topOffset: 30,                 // Offset from top
    bottomOffset: 40,              // Offset from bottom
    textStyle: {
      fontSize: 30,                // Adjust font size for longer text
      textAlign: 'center',         // Ensure text is centered
      fontWeight: 'bold',          // Make the text bold
    },
    fontSize: 22,
    titleStyle: {
      fontWeight: 'bold',          // Bold title
      fontSize: 18,                // Slightly larger font for the title
    },
    style: {
      width: '90%',                // Adjust width to fit longer text
      padding: 10,
      borderRadius: 25,            // Increased border radius for rounded corners
      alignItems: 'center',        // Center align items
    },
    propsForBackground: {
      numberOfLines: 5            // Allow multiple lines
    },
  });
}


// export const SuccessTeast = ({ }) => {


//   const [modal setlogoutModal]

//   return(
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={logoutModal}
//       onRequestClose={() => {
//         setlogoutModal(false);
//       }}>
//       <TouchableWithoutFeedback onPress={() => setlogoutModal(false)}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <TouchableOpacity
//               style={styles.modlbtn}
//               hitSlop={styles.hitslop}
//               onPress={() => logoutPress()}>
//               <ResponsiveText style={styles.buttonText}>
//                 Sign Out
//               </ResponsiveText>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.modlbtn}
//               onPress={() => setlogoutModal(false)}>
//               <ResponsiveText style={styles.buttonTextcancel}>
//                 Cancel
//               </ResponsiveText>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   )

// }




const styles = StyleSheet.create({})