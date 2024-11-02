import { View, Text, StyleSheet, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, icons, images } from '../constants';
import Header from '../components/Header';
import { reducer } from '../utils/reducers/formReducers';
import { validateInput } from '../utils/actions/formActions';
import Input from '../components/Input';
import Checkbox from 'expo-checkbox';
import Button from '../components/Button';
import SocialButton from '../components/SocialButton';
import OrSeparator from '../components/OrSeparator';
import { useTheme } from '../theme/ThemeProvider';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiLogin } from '../apiConnections/RegisterApi';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from '../Contexts/useTranslation';




const isTestMode = false

const initialState = {
  inputValues: {
    email: isTestMode ? 'example@gmail.com' : '',
    password: isTestMode ? '**********' : '',
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
}

const Login = ({ navigation }) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isChecked, setChecked] = useState(false);
  const { colors, dark } = useTheme();

  const {t} = useTranslation();


  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue)
      dispatchFormState({ inputId, validationResult: result, inputValue })
    },
    [dispatchFormState]
  )


  // implementing apple authentication
  const appleAuthHandler = () => {
    console.log("Apple Authentication")
  };

  // implementing facebook authentication
  const facebookAuthHandler = () => {
    console.log("Facebook Authentication")
  };

  // Implementing google authentication
  const googleAuthHandler = () => {
    console.log("Google Authentication")
  };

    // error useffect
    useEffect(() => {
      if (error) {
        Alert.alert(`${anErrorOccured}`, error)
      }
    }, [error])

  const handleLogin = async() => {

    const email = formState.inputValues.email;
    const password = formState.inputValues.password;

    if (!formState.formIsValid) {
      Alert.alert(`${t.invalid}`, `${t.pleaseCheckInput}`, [
        {
          text: `${t.ok}`,
          onPress: () => null
        },
      ]);
      return;
    }

    setIsLoading(true);

    const result = await apiLogin(email, password);
    setIsLoading(false);


    if (result.success) {
      navigation.navigate("Main"); // Bir sonraki sayfaya yönlendirme
    } else {
      Alert.alert(`${t.anErrorOccured}`, `${t.pleaseCheckInput}`, [
        {
          text: `${t.resetPassword}`,
          onPress: ()=>navigation.navigate("ForgotPasswordMethods")
        },
        {
          text: `${t.ok}`,
          onPress: () => null
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={[styles.area, { 
      backgroundColor: colors.background }]}>
      <View style={[styles.container, { 
        backgroundColor: colors.background
      }]}>
          <View style={styles.logoContainer}>
            <Image
              source={images.logo}
              resizeMode='contain'
              style={styles.logo}
            />
          </View>
          <Text style={[styles.title, { 
            color: dark ? COLORS.white : COLORS.black
          }]}>{t.loginToYourAccount}</Text>
            <Input
              id="email"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['email']}
              placeholder="Email"
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              icon={icons.email}
              keyboardType="email-address"
            />
            <Input
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['password']}
              autoCapitalize="none"
              id="password"
              placeholder={t.password}
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              icon={icons.padlock}
              secureTextEntry={true}
            />
            <View style={styles.checkBoxContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  color={isChecked ? COLORS.primary : dark ? COLORS.primary : "gray"}
                  onValueChange={setChecked}
                />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.privacy, {
                    color: dark ? COLORS.white : COLORS.black
                  }]}>{t.rememberMe}</Text>
                </View>
              </View>
            </View>
            <Button
              title={t.login}
              filled
              onPress={handleLogin}
              style={styles.button}
            />
              <View style={{ height: 50}}>
              <LinearGradient colors={['#f85032', '#ff9068']} style={{ flex: 1, paddingLeft: 15, paddingRight: 15, borderRadius: 25}}>
                <Text style={{ fontSize: 18, fontFamily: 'semiBold', textAlign: 'center', margin: 10, color: '#ffffff', backgroundColor: 'transparent'}}>Login</Text>
              </LinearGradient>
              </View>
              <View style={{ height: 50, marginTop: 10}}>
              <LinearGradient start={[0, 0.5]} end={[1, 0.5]} colors={['#ff6e7f', '#bfe9ff']} style={{ flex: 1, paddingLeft: 15, paddingRight: 15, borderRadius: 25}}>
                <Text style={{ fontSize: 18, fontFamily: 'semiBold', textAlign: 'center', margin: 10, color: '#ffffff', backgroundColor: 'transparent'}}>Login</Text>
              </LinearGradient>
              </View>
              <View style={{ height: 50, marginTop: 10}}>
              <LinearGradient start={[1, 0.5]} end={[0, 0.5]} colors={['#ED4264', '#FFEDBC']} background='right' style={{ flex: 1, paddingLeft: 15, paddingRight: 15, borderRadius: 25}}>
                <Text style={{ fontSize: 18, fontFamily: 'semiBold', textAlign: 'center', margin: 10, color: '#ffffff', backgroundColor: 'transparent'}}>Login</Text>
              </LinearGradient>
              </View>



            <TouchableOpacity
             onPress={()=>navigation.navigate("ForgotPasswordMethods")}>
              <Text style={styles.forgotPasswordBtnText}>{t.forgotPassword}</Text>
            </TouchableOpacity>
            <View>
             
              <OrSeparator text={t.orContinueWith}/>
              <View style={styles.socialBtnContainer}>
                <SocialButton
                  icon={icons.appleLogo}
                  onPress={appleAuthHandler}
                  tintColor={dark ? COLORS.white : COLORS.black}
                />
                <SocialButton
                  icon={icons.facebook}
                  onPress={facebookAuthHandler}
                />
                <SocialButton
                  icon={icons.google}
                  onPress={googleAuthHandler}
                />
              </View>
              <View style={styles.bottomContainer}>
            <Text style={[styles.bottomLeft, { 
              color: dark? COLORS.white : COLORS.black
            }]}>{t.doYouHaveAnAccount}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.bottomRight}>{"  "}{t.signUp}</Text>
            </TouchableOpacity>
          </View>
            </View>

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
    padding: 16,
    backgroundColor: COLORS.white
  },
  logo: {
    width: 170,
    height: 170,
    tintColor: COLORS.primary
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 32
  },
  title: {
    fontSize: 28,
    fontFamily: "bold",
    color: COLORS.black,
    textAlign: "center"
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontFamily: "semiBold",
    color: COLORS.black,
    textAlign: "center",
    marginBottom: 22
  },
  checkBoxContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 18,
  },
  checkbox: {
    marginRight: 8,
    height: 16,
    width: 16,
    borderRadius: 4,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  privacy: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.black,
  },
  socialTitle: {
    fontSize: 19.25,
    fontFamily: "medium",
    color: COLORS.black,
    textAlign: "center",
    marginVertical: 26
  },
  socialBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    position: "relative",
    bottom: 12,
    right: 0,
    left: 0,
  },
  bottomLeft: {
    fontSize: 14,
    fontFamily: "regular",
    color: "black"
  },
  bottomRight: {
    fontSize: 16,
    fontFamily: "medium",
    color: COLORS.primary
  },
  button: {
    marginVertical: 6,
    width: SIZES.width - 32,
    borderRadius: 30
  },
  forgotPasswordBtnText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 12
  }
})

export default Login