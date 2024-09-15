import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function WishesMessages() {

   const [currentHours, setCurrentHours] = useState('');
useEffect(() => {
    const hours =  (new Date().getHours()); 
    setCurrentHours(hours);
}, []);

if (currentHours >'05' && currentHours <= '11') {
    return <Text style={styles.description}> Good Morning! ☀️</Text>;
    }
        else if (currentHours >'11'  && currentHours <= '18') {
            return <Text style={styles.description}> Have a Nice Day! 👋🏻 </Text>;
        }
            else if (currentHours >'18'  && currentHours <= '22') {
                return <Text style={styles.description}> Good Evening! ✨</Text>; 
            }            
                else {
                    return <Text style={styles.description}> Good Night! 🌙 </Text>; 
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






