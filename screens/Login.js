import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, icons, images } from '../constants';
import { reducer } from '../utils/reducers/formReducers';
import { validateInput } from '../utils/actions/formActions';
import Input from '../components/Input';
import Checkbox from 'expo-checkbox';
import Button from '../components/Button';
import SocialButton from '../components/SocialButton';
import OrSeparator from '../components/OrSeparator';
import { useTheme } from '../theme/ThemeProvider';
import { apiLogin } from '../apiConnections/RegisterApi';
import { useTranslation } from '../Contexts/useTranslation';
import RBSheet from 'react-native-raw-bottom-sheet';


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

  const refRBSheet = useRef();
  const [alertType, setAlertType] = useState(null);

  const alertContents = {
    formIsValid: {
      title: t.invalid,
      message: t.pleaseCheckInput,
      buttons: [
        {
          title: t.ok,
          styleType: "primary",
          onPress: () => refRBSheet.current.close(),
        },
      ]
    },
    notSuccess: {
      title: t.anErrorOccured, 
      message: t.pleaseCheckInput,
      buttons: [
        {
          title: t.ok,
          styleType: "secondary",
          onPress: () => refRBSheet.current.close(),
        },
        {
          title: t.resetPassword,
          styleType: "primary",
          onPress: ()=>navigation.navigate("ForgotPasswordMethods"),

        },
      ],
    },
  };

  const handleShowAlert = (type) => {
    setAlertType(type);
    refRBSheet.current.open();
  };


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

    // alert 1

    if (!formState.formIsValid) {
      handleShowAlert('formIsValid');
    }else {

    const result = await apiLogin(email, password);
    setIsLoading(false);

    // alert 2

    if (result.success) {
      navigation.navigate("Main"); // Bir sonraki sayfaya yönlendirme
    } else {
      handleShowAlert('notSuccess');
    }
  };
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
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={SIZES.height * 0.8}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          draggableIcon: {
            backgroundColor: dark ? COLORS.gray2 : COLORS.grayscale200,
            height: 4,
          },
          container: {
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            height: 260,
            backgroundColor: dark ? COLORS.dark2 : COLORS.white
          },
        }}
      >
        {/* Dinamik İçerik */}
        {alertType && (
          <>
            <Text style={styles.bottomTitle}>{alertContents[alertType].title}</Text>
            <View style={styles.separateLine} />
            <Text style={styles.bottomSubtitle}>{alertContents[alertType].message}</Text>
            <View style={styles.bottomButtonContainer}>
              {alertContents[alertType].buttons.map((button, index) => (

               button.styleType === "primary" ? (
                <Button
                  key={index}
                  title={button.title}
                  style={styles.primaryButton}
                  textColor={COLORS.primary}
                  onPress={button.onPress}
                  filled
                />)
                : ( 
                  <Button
                  key={index}
                  title={button.title}
                  style={styles.secondaryButton}
                  textColor={COLORS.primary}
                  onPress={button.onPress}
                  />
                  )

          ))}
            </View>
          </>
        )}
      </RBSheet>

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
    justifyContent: 'center',
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
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: "semiBold",
    color: COLORS.primary,
    textAlign: "center",
    marginTop: 12
  },
  bottomSubtitle: {
    fontSize: 20,
    fontFamily: "semiBold",
    color: COLORS.greyscale900,
    textAlign: "center",
    marginVertical: 28
  },
  separateLine: {
    width: SIZES.width,
    height: 1,
    backgroundColor: COLORS.grayscale200,
    marginTop: 12
  },
  primaryButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 32,
    borderColor: COLORS.tansparentPrimary,
  },
  secondaryButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32
  },
  bottomButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginVertical: 30,
    marginHorizontal: 16,
    position: "relative",
    bottom: 12,
    right: 0,
    left: 0,
  }
})

export default Login