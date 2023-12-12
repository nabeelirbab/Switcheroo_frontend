import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from './Responsiveui';
import Colors from '../theme/colors';

const DropdownPinker = ({ setValue, data, value }) => {
    console.log('data', data);

    return (
        <View style={{ alignSelf: "center", backgroundColor: '#fff', alignItems: "center" }}>
            <Dropdown
                style={styles.dropdown}
                containerStyle={styles.dropdown2}
                selectedTextStyle={{ color: Colors.darkGray, }}
                placeholder='Please Select a Category'

                labelField="label"
                valueField="value"
                data={data}
                value={value}
                onChange={item => {
                    setValue(item.value);
                }}
            />
        </View>
    );
};

export default DropdownPinker;


const styles = StyleSheet.create({

    dropdown: {
        width: wp(99),
        paddingHorizontal: wp(6),
        backgroundColor: '#fff',
        height: hp(10)

    },
    dropdown2: {

        paddingHorizontal: wp(3),
        backgroundColor: '#fff',


    }
})