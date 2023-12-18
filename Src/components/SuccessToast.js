import Toast from 'react-native-toast-message';


export const SuccessToast = (props) => {
  Toast.show({
    type: 'success',
    text1: props?.text,
    position: 'top',
    visibilityTime: 5000,  // Duration the toast is visible, in milliseconds
    autoHide: true,        // Auto hide after visibilityTime
    topOffset: 30,         // Offset from top
    bottomOffset: 40,      // Offset from bottom
    textStyle: {
      fontSize: 16,     // Adjust font size for longer text
      textAlign: 'center' // Ensure text is centered
    },
    style: {
      width: '90%',     // Adjust width to fit longer text
      padding: 10,
      // Padding inside the toast
      // Add any additional styling as needed
    }
  });
}
