import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { icons } from '../constants';

export default function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Image 
        source={icons.babystep}
        style={{width: 100, height: 100}}/>
    </View>
  );
}

const styles = StyleSheet.create({})