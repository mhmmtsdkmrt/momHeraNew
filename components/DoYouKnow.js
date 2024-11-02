import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants';
import { useTranslation } from '@/Contexts/useTranslation';

export default function DoYouKnow() {

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>{t.doYouKnow}</Text>
      <Text style={styles.text}>Küçük Bilgiler. tıklandığında ilgili bilginin tamamına ulaşacak.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: SIZES.width - 32,
        height: 130,
        borderRadius: 20,
        borderTopWidth: 1,
        marginTop: 20,
        borderColor: COLORS.greyscale300,
        borderWidth: 1,
    },
    textHeader: {
        fontSize: 17,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 8,

    },
    text: {
        fontSize: 15,
        marginTop: 10,
        marginLeft: 8,
    },
})