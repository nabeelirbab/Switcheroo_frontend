import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Colors from '../theme/colors';
import { Fonts } from '../theme/Fonts';
export default function ResponsiveText(props) {
  return (
    <Text
      style={[styles.defaultStyle, props.style]}
      onPress={props.onPress}
      numberOfLines={props.numberOfLines}>
      {props.children}
      
    </Text>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
   fontSize:15,
   color:Colors.black,
   fontFamily:Fonts.Fontsregular


  },
});
