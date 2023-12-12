import Toast from 'react-native-toast-message';


 export const ErrorToast = (props) => {
    Toast.show({
      type: 'error',
      text1: props?.text,
      // text2:props?.text
    });
  }
