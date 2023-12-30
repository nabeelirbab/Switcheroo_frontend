import Toast from 'react-native-toast-message';
import { newEvents } from '../CustomEvents/CustomEvents';


export const ErrorToast = (props) => {

  newEvents.emit('Toastmessage', props?.text)

  // Toast.show({
  //   type: 'error',
  //   text1: props?.text,
  //   // text2:props?.text
  // });
}
