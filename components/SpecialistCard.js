import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

const SpecialistCard = ({ id, name, avatar, position, onPress, isSelected }) => {
  const { colors, dark } = useTheme();

  const handlePress = () => {
    onPress(id);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container, isSelected && styles.selectedContainer, { 
        backgroundColor: dark ? COLORS.dark2 : COLORS.white,
      }]}>
        <Image
          source={avatar}
          resizeMode='contain'
          style={styles.avatar}
        />
        <View style={styles.nameContainer}>
          <Text style={[styles.name, { 
            color: dark? COLORS.white : COLORS.greyscale900
          }]}>{name.split(' ')[0]}</Text>
          <Text style={[styles.position, { 
            color: dark? COLORS.grayscale200 : COLORS.grayscale700,
          }]}>{position}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 96,
    height: 144,
    borderRadius: 16,
    paddingTop: 6,
    paddingBottom: 12,
    paddingHorizontal: 10,
    flexDirection: 'column',
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 0,
    marginRight: 16
  },
  selectedContainer: {
    borderColor: COLORS.primary, // Change border color when selected
    borderWidth: 1.6,
  },
  avatar: {
    height: 84,
    width: 84,
    borderRadius: 16,
  },
  nameContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontFamily: 'semiBold',
    color: COLORS.black,
    marginVertical: 6,
  },
  position: {
    fontSize: 11,
    fontFamily: 'regular',
    color: COLORS.grayscale700,
  },
});

export default SpecialistCard;
