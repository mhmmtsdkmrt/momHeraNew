import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import BottomTabNavigation from './BottomTabNavigation';
import { ArticleShowDetailScreen, ArticlesShowScreen, AboutUsScreen, ContractionsCounterScreen, ToolsScreen, KicksCounter, Drugs, WeightControl, FindName,EditPregnancyInfo, 
  PregnancyInfo, ChangeEmail, ChangePassword, Chat, CreateNewPassword, EditProfile, FillYourProfile, 
  ForgotPasswordEmail, ForgotPasswordMethods, ForgotPasswordPhoneNumber, HelpCenter, InviteFriends, Login, Notifications, Onboarding1, Onboarding2, 
  Onboarding3, Onboarding4, Search, SettingsLanguage, SettingsNotifications, SettingsPrivacyPolicy, SettingsSecurity, Signup, Welcome, RequirementListScreen, 
  CalendarScreen, NoteForMyBabyScreen, HealthTestsScreen, AlbumScreen, BoyNamesListScreen, CalculatePregnancyScreen, WeeklyPeriodScreen, WeeklyPeriodDetailScreen, ArticlesCatagoriesScreen, HoroscopeScreen, HoroscopeDetailScreen, Home} from '../screens';
import { View } from 'react-native';
import Loading from '../components/Loading';
import OnlineNotifications from '@/utils/notifications/OnlineNotifications';


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
      setIsLoading(true)
        const checkIfFirstLaunch = async () => {
            try {
                const value = await AsyncStorage.getItem('alreadyLaunched')
                if (value === null) {
                    await AsyncStorage.setItem('alreadyLaunched', 'true')
                    setIsFirstLaunch(true)
                } else {
                    setIsFirstLaunch(false)
                }
            } catch (error) {
              console.error('AsyncStorage error: ', error);
                setIsFirstLaunch(false)
            }
            setIsLoading(false) // Set loading state to false once the check is complete
        }
        checkIfFirstLaunch()
    }, [])

    // if (isLoading) {
    //     return null // Render a loader or any other loading state component
    // }

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Loading/>
        </View>
      );
    }

  return (
    <NavigationContainer>
            <Stack.Navigator 
              screenOptions={{ headerShown: false }}
              // replace the second onboaring1 with login in order to make the user not to see the onboarding 
              // when login the next time
              initialRouteName={isFirstLaunch ? 'Onboarding1' : 'Login'}
              >
                
                <Stack.Screen name="Onboarding1" component={Onboarding1}/>
                <Stack.Screen name="Onboarding2" component={Onboarding2}/>
                <Stack.Screen name="Onboarding3" component={Onboarding3}/>
                <Stack.Screen name="Onboarding4" component={Onboarding4}/>
                <Stack.Screen name="Welcome" component={Welcome}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Signup" component={Signup}/>
                <Stack.Screen name="ForgotPasswordMethods" component={ForgotPasswordMethods}/>
                <Stack.Screen name="ForgotPasswordEmail" component={ForgotPasswordEmail}/>
                <Stack.Screen name="ForgotPasswordPhoneNumber" component={ForgotPasswordPhoneNumber}/>
                <Stack.Screen name="CreateNewPassword" component={CreateNewPassword}/>
                <Stack.Screen name="FillYourProfile" component={FillYourProfile}/>
                <Stack.Screen name="PregnancyInfo" component={PregnancyInfo}/>
                <Stack.Screen name="EditPregnancyInfo" component={EditPregnancyInfo}/>
                <Stack.Screen name="Main" component={BottomTabNavigation}/>
                <Stack.Screen name="EditProfile" component={EditProfile}/>
                <Stack.Screen name="SettingsNotifications" component={SettingsNotifications}/>
                <Stack.Screen name="SettingsSecurity" component={SettingsSecurity}/>
                <Stack.Screen name="ChangePassword" component={ChangePassword}/>
                <Stack.Screen name="ChangeEmail" component={ChangeEmail}/>
                <Stack.Screen name="SettingsLanguage" component={SettingsLanguage}/>
                <Stack.Screen name="SettingsPrivacyPolicy" component={SettingsPrivacyPolicy}/>
                <Stack.Screen name="InviteFriends" component={InviteFriends}/>
                <Stack.Screen name="HelpCenter" component={HelpCenter}/>
                <Stack.Screen name="Chat" component={Chat}/>
                <Stack.Screen name="Notifications" component={Notifications}/>
                <Stack.Screen name="FindName" component={FindName}/>
                <Stack.Screen name="WeightControl" component={WeightControl}/>
                <Stack.Screen name="Drugs" component={Drugs}/> 
                <Stack.Screen name="KicksCounter" component={KicksCounter}/>
                <Stack.Screen name="Search" component={Search}/>
                <Stack.Screen name="ToolsScreen" component={ToolsScreen}/>
                <Stack.Screen name='ContractionsCounterScreen' component={ContractionsCounterScreen}/>
                <Stack.Screen name='RequirementListScreen' component={RequirementListScreen}/>
                <Stack.Screen name='CalendarScreen' component={CalendarScreen}/>
                <Stack.Screen name='NoteForMyBabyScreen' component={NoteForMyBabyScreen}/>
                <Stack.Screen name='HealthTestsScreen' component={HealthTestsScreen}/>
                <Stack.Screen name='AlbumScreen' component={AlbumScreen}/>
                <Stack.Screen name='AboutUsScreen' component={AboutUsScreen}/>
                <Stack.Screen name='ArticlesShowScreen' component={ArticlesShowScreen}/>
                <Stack.Screen name='ArticleShowDetailScreen' component={ArticleShowDetailScreen}/>
                <Stack.Screen name='BoyNamesListScreen' component={BoyNamesListScreen}/>
                <Stack.Screen name='CalculatePregnancyScreen' component={CalculatePregnancyScreen}/>
                <Stack.Screen name='WeeklyPeriodScreen' component={WeeklyPeriodScreen}/>
                <Stack.Screen name='WeeklyPeriodDetailScreen' component={WeeklyPeriodDetailScreen}/>
                <Stack.Screen name='ArticlesCatagoriesScreen' component={ArticlesCatagoriesScreen}/>
                <Stack.Screen name='HoroscopeScreen' component={HoroscopeScreen}/>
                <Stack.Screen name='HoroscopeDetailScreen' component={HoroscopeDetailScreen}/>
                <Stack.Screen name='OnlineNotifications' component={OnlineNotifications}/>

              </Stack.Navigator> 
     </NavigationContainer>
  );
}

export default AppNavigation