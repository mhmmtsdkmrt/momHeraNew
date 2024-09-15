import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

const RadioButtonGroup = ({ options, selectedValue, onValueChange }) => {
  const { dark } = useTheme();

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.radioButton}
          onPress={() => onValueChange(option.value)}
        >
          <Text style={[styles.label, { color: dark ? COLORS.white : COLORS.black }]}>{option.label}</Text>
          <View style={styles.roundedChecked}>
            {selectedValue === option.value && <View style={styles.roundedCheckedCheck} />}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  radioButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: "medium",
    marginLeft: 1,
    marginBottom: 3
  },
  roundedChecked: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  roundedCheckedCheck: {
    height: 9,
    width: 9,
    backgroundColor: COLORS.primary,
    borderRadius: 999,
  },
});

export default RadioButtonGroup;
