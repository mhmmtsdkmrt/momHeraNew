import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import CountDown from 'react-native-countdown-component';
import { COLORS } from '../constants';
import { FONTS } from '../constants/fonts';

export default function TimeCounter({ running, until }) {
    const countdownRef = useRef(null);

    const resetCountdown = () => {
      if (countdownRef.current) {
        countdownRef.current.restart();
      }
    };

//console.log(countdownRef.current.state.lastUntil)

        return (

          <CountDown
            ref={countdownRef}
            size={28}
            until={until}
            onFinish={() => alert('Finished')} 
            digitStyle={{backgroundColor: COLORS.tansparentPrimary, borderWidth: 0.5, borderColor: COLORS.primary}}
            digitTxtStyle={{color: COLORS.primary}}
            timeLabelStyle={{color: COLORS.greyscale600, fontWeight: FONTS.semiBold}}
            separatorStyle={{color: COLORS.primary}}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{h: 'Saat', m: 'Dakika', s: 'Saniye'}}
            showSeparator
            running={running} // durdur, ilerlet
          />

        );
    }


const styles = StyleSheet.create({})