import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { FONTS } from '@/constants/fonts'
import AppNavigation from '@/navigations/AppNavigation';
import { ProfileProvider } from '@/Contexts/ProfileGetApi';
import { ThemeProvider } from '@/theme/ThemeProvider'
import { SelectedProvider } from '@/utils/SelectedContext';
import { LogBox } from 'react-native';
import {WeightProvider} from '@/Contexts/WeightContext';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

//Ignore all log notifications
LogBox.ignoreAllLogs();


export default function App() {
  const [loaded] = useFonts(FONTS);


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);



  if (!loaded) {
    return null;
  }

  return (

       <ThemeProvider>
        <SelectedProvider>
          <SafeAreaProvider>
           <ProfileProvider>
            <WeightProvider>
                <AppNavigation/>
            </WeightProvider>
           </ProfileProvider>
          </SafeAreaProvider>
        </SelectedProvider>
       </ThemeProvider>

  );
} 
