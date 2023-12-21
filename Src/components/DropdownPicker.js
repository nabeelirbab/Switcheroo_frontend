import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from './Responsiveui';
import Colors from '../theme/colors';

const DropdownPinker = ({ setValue, data, value }) => {
    // State to manage dropdown value
    const [dropdownValue, setDropdownValue] = useState(value);

    // Update dropdown value when defaultValue changes
    useEffect(() => {
        setDropdownValue(value);
    }, [value]);
    return (
        <View style={{ alignSelf: "center", backgroundColor: '#fff', alignItems: "center" }}>
            <Dropdown
                style={styles.dropdown}
                containerStyle={styles.dropdown2}
                selectedTextStyle={{ color: Colors.darkGray }}
                placeholder={dropdownValue?.value}
                placeholderStyle={{ color: Colors.darkGray }}
                itemTextStyle={{ color: Colors.darkGray }}
                labelField="label"
                valueField="value"
                data={data}
                value={dropdownValue?.value}
                onChange={item => {
                    setDropdownValue(item);
                    setValue(item);
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
