import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from '@/Contexts/useTranslation';

export default function WishesMessages() {

   const [currentHours, setCurrentHours] = useState('');

   const {t} = useTranslation();

useEffect(() => {
    const hours =  (new Date().getHours()); 
    setCurrentHours(hours);
}, []);

if (currentHours >'05' && currentHours <= '11') {
    return <Text style={styles.description}> {t.goodMorning} ☀️</Text>;
    }
        else if (currentHours >'11'  && currentHours <= '18') {
            return <Text style={styles.description}> {t.haveANiceDay} 👋🏻 </Text>;
        }
            else if (currentHours >'18'  && currentHours <= '22') {
                return <Text style={styles.description}> {t.goodEvening} ✨</Text>; 
            }            
                else {
                    return <Text style={styles.description}> {t.goodNight} 🌙 </Text>; 
                }

};

const styles = StyleSheet.create({
    description: {
        fontSize: 12,
        fontFamily: "regular",
        color: "gray",
        marginBottom: 4,
    },
})






