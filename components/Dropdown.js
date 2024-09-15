import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { COLORS, SIZES } from '../constants';
import { useTheme } from '@react-navigation/native';

const Dropdown = ({ label, options, selectedValue, onValueChange }) => {

    const { dark, colors} = useTheme ();
  return (
    <RNPickerSelect
      placeholder={{ label: label, value: null }}
      items={options}
      onValueChange={onValueChange}
      value={selectedValue}
      style={{
        inputIOS: {
            marginTop: 8,
            fontSize: 16,
            paddingHorizontal: 10,
            borderRadius: 4,
            color: COLORS.greyscale600,
            paddingRight: 30,
            height: 52,
            width: (SIZES.width - 32)/2,
            alignItems: 'center',
            backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
            borderRadius: 16
        },
        inputAndroid: {
            marginTop: 8,
            marginRight: 5,
            fontSize: 16,
            paddingHorizontal: 10,
            borderRadius: 8,
            color: COLORS.greyscale600,
            paddingRight: 30,
            height: 52,
            width: (SIZES.width - 32)/2,
            alignItems: 'center',
            backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
            borderRadius: 16
        },
        }}
    />
  );
};

export default Dropdown;
