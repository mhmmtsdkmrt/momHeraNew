import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { completedBookings } from '../data';
import { SIZES, COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeProvider';

const CompletedBookings = () => {
  const navigation = useNavigation();
  const { colors, dark } = useTheme();

  return (
    <View style={[styles.container, { 
      backgroundColor: dark? COLORS.dark1 : COLORS.tertiaryWhite
    }]}>
       <FlatList
         data={completedBookings}
         keyExtractor={item=>item.id}
         showsVerticalScrollIndicator={false}
         renderItem={({ item })=>(
          <TouchableOpacity style={[styles.cardContainer, { 
            backgroundColor: dark? COLORS.dark2 : COLORS.white,
          }]}>
            <View style={styles.dateContainer}>
               <Text style={[styles.date, { 
                color: dark ? COLORS.white : COLORS.greyscale900
               }]}>{item.date}</Text>
               <View style={styles.statusContainer}>
                <Text style={styles.status}>{item.status}</Text>
               </View>
            </View>
            <View style={[styles.separateLine, { 
              backgroundColor: dark?  COLORS.greyScale800 : COLORS.grayscale200,
            }]} />
            <View style={styles.detailsContainer}>
                <Image
                  source={item.image}
                  resizeMode='cover'
                  style={styles.barberImage}
                />
                <View style={styles.detailsRightContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={[styles.address, { 
                     color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                  }]}>{item.address}</Text>
                  <Text style={[styles.serviceTitle, { 
                     color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                  }]}>Services:</Text>
                  <Text style={styles.serviceText}>{item.services.join(", ")}</Text>
                </View>
            </View>
            <View style={[styles.separateLine, {
              backgroundColor: dark?  COLORS.greyScale800 : COLORS.grayscale200,
            }]} />
            <TouchableOpacity 
               onPress={()=>navigation.navigate("EReceipt")}
               style={styles.receiptBtn}>
              <Text style={styles.receiptBtnText}>View E-Receipt</Text>
            </TouchableOpacity>
          </TouchableOpacity>
         )}
       />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.tertiaryWhite
  },  
  cardContainer: {
    width: SIZES.width - 32,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 16
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.greyscale900
  },
  statusContainer: {
    width: 64,
    height: 24,
    borderRadius: 6,
    backgroundColor: COLORS.greeen,
    alignItems: "center",
    justifyContent: "center"
  },
  status: {
    fontSize: 10,
    color: COLORS.white,
    fontFamily: "medium",
  },
  separateLine: {
    width: "100%",
    height: .7,
    backgroundColor: COLORS.grayscale700,
    marginVertical: 10
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  barberImage: {
    width: 88,
    height: 88,
    borderRadius: 16,
    marginHorizontal: 12
  },
  detailsRightContainer: {
    flex: 1,
    marginLeft: 12
  },
  name: {
    fontSize: 17,
    fontFamily: "bold",
    color: COLORS.greyscale900
  },
  address: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.grayscale700,
    marginVertical: 4
  },
  serviceTitle: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.grayscale700,
  },
  serviceText: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: "medium",
    marginTop: 6
  },
  receiptBtn: {
    width: "100%",
    height: 36,
    borderRadius: 24,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    borderColor: COLORS.primary,
    borderWidth: 1.4,
    marginBottom: 12
  },
  receiptBtnText: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.primary,
  }
})

export default CompletedBookings