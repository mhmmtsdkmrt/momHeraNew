import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Switch } from 'react-native';
import React, { useRef, useState } from 'react';
import { upcomingBookings } from '../data';
import { SIZES, COLORS } from '../constants';
import RBSheet from "react-native-raw-bottom-sheet";
import { useTheme } from '../theme/ThemeProvider';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import ArticlesApi from '../apiConnections/ArticlesApi';

const UpcomingBookings = () => {
  const [bookings, setBookings] = useState(upcomingBookings);
  const refRBSheet = useRef();
  const { dark } = useTheme();
  const navigation = useNavigation();


  // const toggleRemindMe = (itemId) => {
  //   const updatedBookings = bookings.map(booking => {
  //     if (booking.id === itemId) {
  //       return { ...booking, hasRemindMe: !booking.hasRemindMe };
  //     }
  //     return booking;
  //   });
  //   setBookings(updatedBookings);
  // };

  const [data] = ArticlesApi();
  const imagePath = 'https://annesiyimwebprojectv1.azurewebsites.net'

  return (
    <View style={[styles.container, { 
      backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite
    }]}>
      <FlatList
        data={data} // Use 'bookings' instead of 'upcomingBookings'
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.cardContainer, { 
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
          }]}>
            <View style={styles.dateContainer}>
              {/* <Text style={[styles.date, { 
                color: dark ? COLORS.white : COLORS.greyscale900
              }]}>{item.date}</Text> */}
              {/* <View style={styles.rightContainer}>
                <Text style={[styles.remindMeText, { 
                  color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                }]}>Read</Text>
                <Switch
                  value={item.hasRemindMe}
                  onValueChange={() => toggleRemindMe(item.id)}
                  thumbColor={item.hasRemindMe ? '#fff' : COLORS.white}
                  trackColor={{ false: '#EEEEEE', true: COLORS.primary }}
                  ios_backgroundColor={COLORS.white}
                  style={styles.switch}
                />
              </View> */}
            </View>
            <View style={[styles.separateLine, { 
              backgroundColor: dark? COLORS.greyScale800 : COLORS.grayscale200,
            }]} />
            <View style={styles.detailsContainer}>
              <Image
                source={{uri: `${imagePath}` + results.imagePathUrl}}
                resizeMode='cover'
                style={styles.barberImage}
              />
              <View style={styles.detailsRightContainer}>
                <Text style={[styles.name, { 
                   color: dark ? COLORS.secondaryWhite : COLORS.greyscale900
                }]}>{item.name}</Text>
                <Text style={[styles.address, { 
                  color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                }]}>{item.description}</Text>
                {/* <Text style={[styles.serviceTitle, { 
                  color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                }]}>Services:</Text>
                <Text style={styles.serviceText}>{item.services.join(", ")}</Text> */}
              </View>
            </View>
            <View style={[styles.separateLine, { 
              marginVertical: 10,
              backgroundColor: dark?  COLORS.greyScale800 : COLORS.grayscale200,
              }]} />
            <View style={styles.buttonContainer}>
            <Text style={[styles.serviceTitle, { 
                  color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                }]}>Tags:</Text>
                <Text style={styles.serviceText}>    Month 1, Month2, Feeding </Text>
              {/* <TouchableOpacity
                onPress={() => refRBSheet.current.open()}
                style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>Cancel Booking</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={()=>navigation.navigate("EReceipt")}
                style={styles.receiptBtn}>
                <Text style={styles.receiptBtnText}>View E-Receipt</Text>
              </TouchableOpacity> */}
            </View>
          </TouchableOpacity>
        )}
      />

      {/* <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={332}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          draggableIcon: {
            backgroundColor: dark ? COLORS.greyscale300 : COLORS.greyscale300,
          },
          container: {
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            height: 332,
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
            alignItems: "center",
            width: "100%"
          }
        }}>
        <Text style={[styles.bottomSubtitle, {
          color: dark ? COLORS.red : COLORS.red
        }]}>Cancel Booking</Text>
        <View style={[styles.separateLine, { 
           backgroundColor: dark?  COLORS.greyScale800 : COLORS.grayscale200,
        }]} />

        <View style={styles.selectedCancelContainer}>
          <Text style={[styles.cancelTitle, { 
            color: dark? COLORS.secondaryWhite : COLORS.greyscale900
          }]}>Are you sure you want to cancel your barber/salon booking?</Text>
          <Text style={[styles.cancelSubtitle, { 
            color: dark? COLORS.grayscale400 : COLORS.grayscale700
          }]}>Only 80% of the money you can refund from your payment according to our policy.</Text>
        </View>

        <View style={styles.bottomContainer}>
          <Button
            title="Cancel"
            style={{
              width: (SIZES.width - 32) / 2 - 8,
              backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
              borderRadius: 32,
              borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary
            }}
            textColor={dark ? COLORS.white : COLORS.primary}
            onPress={() => refRBSheet.current.close()}
          />
          <Button
            title="Yes, Cancel"
            filled
            style={styles.removeButton}
            onPress={() => { 
              refRBSheet.current.close() ;
              navigation.navigate("CancelBooking") ;
            }}
          />
        </View>
      </RBSheet> */}
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
    justifyContent: "flex-end",
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
    height: 0.7,
    backgroundColor: COLORS.greyScale800,
    marginVertical: 12
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
  cancelBtn: {
    width: (SIZES.width - 32) / 2 - 16,
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
  cancelBtnText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.primary,
  },
  receiptBtn: {
    width: (SIZES.width - 32) / 2 - 16,
    height: 36,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    borderColor: COLORS.primary,
    borderWidth: 1.4,
    marginBottom: 12
  },
  receiptBtnText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.white,
  },
  buttonContainer: {
    flexDirection: "column",
    //alignItems: "center",
    //justifyContent: "space-between"
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  remindMeText: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.grayscale700,
    marginVertical: 4
  },
  switch: {
    marginLeft: 8,
    transform: [{ scaleX: .8 }, { scaleY: .8 }], // Adjust the size of the switch
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 16,
    width: "100%"
  },
  cancelButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 32
  },
  removeButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: "semiBold",
    color: "red",
    textAlign: "center",
  },
  bottomSubtitle: {
    fontSize: 22,
    fontFamily: "bold",
    color: COLORS.greyscale900,
    textAlign: "center",
    marginVertical: 12
  },
  selectedCancelContainer: {
    marginVertical: 24,
    paddingHorizontal: 36,
    width: "100%"
  },
  cancelTitle: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: COLORS.greyscale900,
    textAlign: "center",
  },
  cancelSubtitle: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.grayscale700,
    textAlign: "center",
    marginVertical: 8,
    marginTop: 16
  }
})

export default UpcomingBookings