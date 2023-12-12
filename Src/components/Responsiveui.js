import { Dimensions } from 'react-native';

// Calculate width percentage based on screen width
const widthPercentageToDP = widthPercent => {
  const screenWidth = Dimensions.get('window').width;
  return (widthPercent * screenWidth) / 100;
};

// Calculate height percentage based on screen height
const heightPercentageToDP = heightPercent => {
  const screenHeight = Dimensions.get('window').height;
  return (heightPercent * screenHeight) / 100;
};

export {widthPercentageToDP, heightPercentageToDP};
