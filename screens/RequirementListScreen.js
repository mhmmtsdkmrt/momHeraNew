import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, LayoutAnimation, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { useTheme } from '../theme/ThemeProvider';
import { COLORS, SIZES, icons } from '../constants';
import Checkbox from 'expo-checkbox';
import { requirementKeywords, requirements } from '../data';
import { useNavigation } from '@react-navigation/native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { useSelected } from '../utils/SelectedContext';
import { useTranslation } from '@/Contexts/useTranslation';



const requirementsRoute = () => {
  const { dark, colors } = useTheme();
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [expanded, setExpanded] = useState(-1);
  const [searchText, setSearchText] = useState('');
  const { isSelected, handleCheckboxChange } = useSelected();
  const { t } = useTranslation();


  const handleKeywordPress = (id) => {
    setSelectedKeywords((prevSelectedKeywords) => {
        const selectedKeyword = requirementKeywords.find((keyword) => keyword.id === id);

        if (!selectedKeyword) {
            // Handle the case where the keyword with the provided id is not found
            return prevSelectedKeywords;
        }

        if (prevSelectedKeywords.includes(selectedKeyword.name)) {
            return prevSelectedKeywords.filter((keyword) => keyword !== selectedKeyword.name);
        } else {
            return [...prevSelectedKeywords, selectedKeyword.name];
        }
    });
};

const KeywordItem = ({ item, onPress, selected }) => {
  const itemStyle = {
      paddingHorizontal: 14,
      marginHorizontal: 5,
      borderRadius: 21,
      height: 39,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: COLORS.primary,
      borderWidth: 1,
      backgroundColor: selected ? COLORS.primary : "transparent",
  };

  return (
      <TouchableOpacity style={itemStyle} onPress={() => onPress(item.id)}>
          <Text style={{ color: selected ? COLORS.white : COLORS.primary }}>
              {item.name}
          </Text>
      </TouchableOpacity>
  );
};

const toggleExpand = (index) => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  setExpanded((prevExpanded) => (prevExpanded === index ? -1 : index));
};

return (
  <View>
      <View style={{ marginVertical: 16 }}>
          <FlatList
              data={requirementKeywords}
              horizontal
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                  <KeywordItem
                      item={item}
                      onPress={handleKeywordPress}
                      selected={selectedKeywords.includes(item.name)}
                  />
              )}
          />
      </View>
      <View
          style={[
              styles.searchBar,
              {
                  backgroundColor: dark ? COLORS.dark2 : COLORS.grayscale100,
              },
          ]}
      >
          <TouchableOpacity>
              <Image
                  source={icons.search}
                  resizeMode="contain"
                  style={[
                      styles.searchIcon,
                      {
                          tintColor: dark
                              ? COLORS.greyscale600
                              : COLORS.grayscale400,
                      },
                  ]}
              />
          </TouchableOpacity>
          <TextInput
              style={[
                  styles.input,
                  {
                      color: dark
                          ? COLORS.greyscale600
                          : COLORS.grayscale400,
                  },
              ]}
              placeholder={t.search}
              placeholderTextColor={
                  dark ? COLORS.greyscale600 : COLORS.grayscale400
              }
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
          />
      </View>
      <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginVertical: 22, marginBottom: 40 }}
      >
          {requirements
              .filter((req) => {
                  if (selectedKeywords.length === 0) return true;
                  // console.log(selectedKeywords);
                  return (
                      req.type &&
                      selectedKeywords.includes(req.type)
                  );
              })
              .filter((req) =>
                  req.label.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((req, index) => (
                  <View key={index} style={[styles.faqContainer, { 
                      backgroundColor: dark? COLORS.dark2 : COLORS.grayscale100,
                  }]}>
                      <TouchableOpacity
                          onPress={() => toggleExpand(index)}
                          activeOpacity={0.8}
                      >
                          <View style={styles.labelContainer}>
                              <Checkbox
                                  value={isSelected[req.label]}
                                  onValueChange={() => handleCheckboxChange(req.label)}
                                  style={styles.checkboxstyle}
                                  color={isSelected ? COLORS.primary : undefined}
                                  />
                              <Text style={[styles.label, { 
                                  color: dark? COLORS.white : COLORS.black,
                              }] }>   {req.label}</Text>
                              <Text style={[styles.icon, { 
                                  color: dark? COLORS.white : COLORS.black,
                              }]}>
                                  {expanded === index ? '-' : '+'}
                              </Text>
                          </View>
                      </TouchableOpacity>
                      {expanded === index && (
                          <Text style={[styles.answer, { 
                              color: dark? COLORS.secondaryWhite : COLORS.gray2
                          }]}>{req.description}</Text>
                      )}
                    
                  </View>
              ))}
      </ScrollView>
  </View>
);
};


const myListsRoute = () => {
  const navigation = useNavigation();
  const { colors, dark } = useTheme();
  const { isSelected, handleCheckboxChange } = useSelected();

  console.log(isSelected);


  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    style={{ marginVertical: 22, marginBottom: 40 }}
    >
    <View style={[styles.faqContainer, { 
        backgroundColor: dark? COLORS.dark2 : COLORS.grayscale100,
    }]}>
        {Object.entries(isSelected)
                .filter(([key, value]) => value === true)
                .map(([key, value]) => (

                    <View key={key}  style={styles.labelContainer}>
                    <Checkbox
                                  value={isSelected[key]}
                                  onValueChange={() => handleCheckboxChange(key)}
                                  style={styles.checkboxstyle}
                                  color={isSelected ? COLORS.primary : undefined}
                                  />

                  <Text  style={[styles.label, { 
                                  color: dark? COLORS.white : COLORS.black,
                              }] }>   {key}</Text>
                  </View>

                ))}
                  </View>
                  </ScrollView>
        
  );

  };
  
const renderScene = SceneMap({
  first: requirementsRoute,
  second: myListsRoute,
});


const RequirementListScreen = ({ navigation }) => {

  const layout = useWindowDimensions();
  const { dark, colors } = useTheme(); 
  const { t } = useTranslation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
      { key: 'first', title: `${t.suggested}` },
      { key: 'second', title: `${t.myList}` },
  ]);

  const renderTabBar = (props) => (
    <TabBar
        {...props}
        indicatorStyle={{
            backgroundColor: COLORS.primary,
        }}
        style={{
            backgroundColor: dark ? COLORS.dark1 : COLORS.white,
        }}
        renderLabel={({ route, focused, color }) => (
            <Text style={[{
                color: focused ? COLORS.primary : 'gray',
                fontSize: 16,
                fontFamily: "bold"
            }]}>
                {route.title}
            </Text>
        )}
    />
)


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
            {t.requirementList}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background}]}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {renderHeader()}
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
            />
        </View>
    </SafeAreaView>
)
};


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
    checkboxContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    checkboxstyle: {
      alignSelf: 'center',  
    },
    searchBar: {
      width: SIZES.width - 32,
      height: 56,
      borderRadius: 16,
      backgroundColor: COLORS.grayscale100,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16
    },
    searchIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.grayscale400
    },
    input: {
        flex: 1,
        color: COLORS.grayscale400,
        marginHorizontal: 12
    },
    faqContainer: {
      marginBottom: 20,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      elevation: 1,
    },
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
    label: {
      flex: 1,
      fontSize: 16,
      fontFamily: "semiBold",
      color: '#333',
    },
    icon: {
      fontSize: 18,
      color: COLORS.gray2,
    },
    answer: {
        fontSize: 14,
        marginTop: 10,
        paddingHorizontal: 16,
        paddingBottom: 10,
        fontFamily: "regular",
        color: COLORS.gray2,
    },
  })
  
  export default RequirementListScreen