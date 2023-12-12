import Toast from 'react-native-toast-message';


 export const SuccessToast = (props) => {
    Toast.show({
      type: 'success',
      text1: props?.text,
      // text2:props?.text
    });
  }
