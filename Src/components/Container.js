import React from 'react';
import {SafeAreaView, Image, Dimensions, StatusBar, View, Platform} from 'react-native';
import Colors from '../theme/colors';


function Container(props) {
  return (
    <View  style={[styles.container, props.style,]}>
    {props.children}
    </View>
  );
}
const styles = {
  container: {
    flex: 1,
    backgroundColor:Colors.backgroundColor,
  },
};
export default Container;
