import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import ResponsiveText from './ResponsiveText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from './Responsiveui';
import Colors from '../theme/colors';

const Button = ({
  btnContainer,
  titleStyle,
  onPress,
  title,
  loading,
  disabled,
  loadingColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        {
          height: hp(Platform.OS == 'ios' ? 6 : 6),
        },
        btnContainer ? btnContainer : {},
      ]}
      disabled={disabled ? disabled : false}
      activeOpacity={0.8}

      onPress={onPress}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={loadingColor ? loadingColor : Colors.secondaryColor}
        />
      ) : (
        <ResponsiveText style={{ ...styles.title, ...titleStyle }}>
          {title}
        </ResponsiveText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primaryColor,
    width: wp(100) - 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: Colors.btncolor,
    borderRadius: 30
  },
  title: {
    alignSelf: 'center',
    color: Colors.white,
    margin: 0,
    fontSize: 16,
    borderWidth: 0,
    textAlign: 'center',
  },
});
export default Button;
