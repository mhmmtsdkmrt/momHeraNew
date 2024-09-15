import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS, SIZES, icons } from '../constants';
import SalonCard from '../components/SalonCard';
import { category, distances, manicure, ratings } from '../data';
import NotFoundCard from '../components/NotFoundCard';
import RBSheet from "react-native-raw-bottom-sheet";
import Button from '../components/Button';
import { FontAwesome } from "@expo/vector-icons";
import { Agenda, Calendar} from 'react-native-calendars';
import XDate from 'xdate';


const CalendarScreen = ({ navigation }) => {
  
  const { dark, colors } = useTheme();
  

  const healthTestsDot = {key: 'healthTestsDot', color: 'red', selectedDotColor: 'blue'};
  const durgsDot = {key: 'durgsDot', color: 'blue', selectedDotColor: 'blue'};
  const kicksCounterDot = {key: 'kicksCounterDot', color: 'green'};




  const renderCalendar = () => {

    const calendarRef = useRef(null);
    const [currentDate, setCurrentDate] = useState(new XDate());

    const subtractMonth = () => {
      const newDate = currentDate.clone().addMonths(-1);
      setCurrentDate(newDate);
    };
  
    const addMonth = () => {
      const newDate = currentDate.clone().addMonths(1);
      setCurrentDate(newDate);
    };
    return (

      
      
      <Calendar
      ref={calendarRef}
  //Initially visible month. Default = now
  //initialDate={'2024-06-01'}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={'2024-05-10'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={'2025-06-25'}
  // Handler which gets executed on day press. Default = undefined
  onDayPress={day => {
    console.log('selected day', day);
  }}
  // Handler which gets executed on day long press. Default = undefined
  onDayLongPress={day => {
    console.log('selected day', day);
  }}
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  monthFormat={'yyyy MM'}
  // Handler which gets executed when visible month changes in calendar. Default = undefined
  onMonthChange={month => {
    console.log('month changed', month);
  }}
  // Hide month navigation arrows. Default = false
  hideArrows={true}
  // Replace default arrows with custom ones (direction can be 'left' or 'right')
  renderArrow={direction => <Arrow />}
  // Do not show days of other months in month page. Default = false
  hideExtraDays={true}
  // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
  // day from another month that is visible in calendar page. Default = false
  disableMonthChange={true}
  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
  firstDay={1}
  // Hide day names. Default = false
  hideDayNames={false}
  // Show week numbers to the left. Default = false
  showWeekNumbers={false}
  // Handler which gets executed when press arrow icon left. It receive a callback can go back month
  onPressArrowLeft={subtractMonth => subtractMonth()}
  // Handler which gets executed when press arrow icon right. It receive a callback can go next month
  onPressArrowRight={addMonth => addMonth()}
  // Disable left arrow. Default = false
  disableArrowLeft={false}
  // Disable right arrow. Default = false
  disableArrowRight={false}
  // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
  disableAllTouchEventsForDisabledDays={true}
  // Replace default month and year title with custom one. the function receive a date as parameter
  
  renderHeader={date => {
    const header = date.toString('yyyy MM');
    
    return (
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <TouchableOpacity onPress={subtractMonth}>
        <Text style={{ fontSize: 24 }}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 24 }}>{header}</Text>
      <TouchableOpacity onPress={addMonth}>
        <Text style={{ fontSize: 24 }}>{'>'}</Text>
      </TouchableOpacity>
    </View>
    );
  }}
  // Enable the option to swipe between months. Default = false
  enableSwipeMonths={true}
  markingType={'multi-dot'}
  markedDates={{
    '2024-06-05': {dots: [healthTestsDot, kicksCounterDot, durgsDot], selected: true, marked: true, selectedColor: '#F84525'},
    '2024-06-06': {dots: [healthTestsDot, kicksCounterDot] ,marked: true},
    '2024-06-07': {dots: [healthTestsDot], marked: true, dotColor: 'red', activeOpacity: 0},
    '2024-06-08': {disabled: true, disableTouchEvent: true}
  }}
/>
    )
  }

  const renderAgenda = () => {

    return (
      <Agenda
  // The list of items that have to be displayed in agenda. If you want to render item as empty date
  // the value of date key has to be an empty array []. If there exists no value for date key it is
  // considered that the date in question is not yet loaded
  items={{
    '2024-06-16': [{name: 'item 1 - any js object'}],
    '2024-06-17': [{name: 'item 2 - any js object', height: 80}],
    '2024-06-18': [],
    '2024-06-19': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
  }}
  // Callback that gets called when items for a certain month should be loaded (month became visible)
  loadItemsForMonth={month => {
    console.log('trigger items loading');
  }}
  // Callback that fires when the calendar is opened or closed
  onCalendarToggled={calendarOpened => {
    console.log(calendarOpened);
  }}
  // Callback that gets called on day press
  onDayPress={day => {
    console.log('day pressed');
  }}
  // Callback that gets called when day changes while scrolling agenda list
  onDayChange={day => {
    console.log('day changed');
  }}
  // Initially selected day
  selected={'2024-06-16'}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={'2024-06-10'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={'2024-06-19'}
  // Max amount of months allowed to scroll to the past. Default = 50
  pastScrollRange={50}
  // Max amount of months allowed to scroll to the future. Default = 50
  futureScrollRange={50}
  // Specify how each item should be rendered in agenda
  renderItem={(item, firstItemInDay) => {
    return <View />;
  }}
  // Specify how each date should be rendered. day can be undefined if the item is not first in that day
  renderDay={(day, item) => {
    return <View />;
  }}
  // Specify how empty date content with no items should be rendered
  renderEmptyDate={() => {
    return <View />;
  }}
  // Specify how agenda knob should look like
  renderKnob={() => {
    return <View />;
  }}
  // Specify what should be rendered instead of ActivityIndicator
  renderEmptyData={() => {
    return <View />;
  }}
  // Specify your item comparison function for increased performance
  rowHasChanged={(r1, r2) => {
    return r1.text !== r2.text;
  }}
  // Hide knob button. Default = false
  hideKnob={true}
  // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
  showClosingKnob={false}
  // By default, agenda dates are marked if they have at least one item, but you can override this if needed
  markedDates={{
    '2024-06-17': {selected: true, marked: true},
    '2024-06-18': {marked: true},
    '2024-06-19': {disabled: true}
  }}
  // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
  disabledByDefault={true}
  // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
  onRefresh={() => console.log('refreshing...')}
  // Set this true while waiting for new data from a refresh
  refreshing={false}
  // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
  refreshControl={null}
  // Agenda theme
  theme={{
    agendaDayTextColor: 'yellow',
    agendaDayNumColor: 'green',
    agendaTodayColor: 'red',
    agendaKnobColor: 'blue'
  }}
  // Agenda container style
  style={{}}
/>
    )
  }

  /**
 * Render header
 */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              resizeMode='contain'
              style={[styles.backIcon, { 
                tintColor: dark? COLORS.white : COLORS.greyscale900
              }]}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { 
            color: dark? COLORS.white : COLORS.greyscale900
          }]}>
            Calendar
          </Text>
        </View>
      </View>
    )
  }

  return (
      <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}

    <View style= {[{flex: 1} , { backgroundColor: colors.background }]}>
    {renderCalendar()}
    {renderAgenda()}
    
    </View>
</View>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
    area: {
      flex: 1,
      backgroundColor: COLORS.white
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      padding: 16
    },
    headerContainer: {
      flexDirection: "row",
      width: SIZES.width - 32,
      justifyContent: "space-between",
      marginBottom: 16
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center"
    },
    backIcon: {
      height: 24,
      width: 24,
      tintColor: COLORS.black
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: 'bold',
      color: COLORS.black,
      marginLeft: 16
    },
    bottomTitle: {
      fontSize: 24,
      fontFamily: "semiBold",
      color: COLORS.black,
      textAlign: "center",
      marginTop: 12
    },
  })
  
  export default CalendarScreen