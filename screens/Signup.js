import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
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
import { apiRegister } from '../apiConnections/RegisterApi';
import { useTranslation } from '@/Contexts/useTranslation';

const isTestMode = false

const initialState = {
  inputValues: {
    email: isTestMode ? 'example@gmail.com' : '',
    password: isTestMode ? '**********' : '',
  },
  inputValidities: {
    email: false,
    password: false
  },
  formIsValid: false,
}


const Signup = ({ navigation }) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const [error, setError] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');


  const { colors, dark } = useTheme();
  const { t } = useTranslation();


  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue)
      dispatchFormState({ inputId, validationResult: result, inputValue })

      // if (inputId === 'email') {
      //   setEmail(inputValue);
      // }

      // if (inputId === 'password') {
      //   setPassword(inputValue);
      // }
    },
    [dispatchFormState,t]
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

  useEffect(() => {
    if (error) {
      Alert.alert(`${t.anErrorOccured}`, error)
    }
  }, [error])


  const handleSingUp = async () => {
    if (!isChecked) {
      setPrivacyError(true);
      return;
    }
    setPrivacyError(false);

    const { email, password } = formState.inputValues;

    if (!formState.formIsValid) {
      Alert.alert(`${t.invalid}`, `${t.pleaseCheckInput}`);
      return;
    }

    try {
      const result = await apiRegister(email, password);
      if (result.success) {
        Alert.alert(`${t.success}`, `${t.successfullyRegistered}`);
        navigation.navigate("FillYourProfile");
      } else {
        Alert.alert(`${t.anErrorOccured}`, `${t.alreadyHave}`);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(`${t.anErrorOccured}`, `${t.anErrorOccured}`);
    }
  };


  const handleCheckboxChange = (newValue) => {
    setChecked(newValue);
  };

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* <Header /> */}

          <View style={styles.logoContainer}>
            <Image
              source={images.logo}
              resizeMode='contain'
              style={styles.logo}
            />
          </View>
          <Text style={[styles.title, {
            color: dark ? COLORS.white : COLORS.black
          }]}>{t.createYourAccount}</Text>
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
                onValueChange={handleCheckboxChange}
              />
              <View style={{ flex: 1 }}>
                <Text style={[styles.privacy, {
                  color: privacyError ? COLORS.red : dark ? COLORS.white : COLORS.black
                }]}>{t.acceptPrivacyPolicy}</Text>
              </View>
            </View>
          </View>
          <Button
            title={t.signUp}
            filled
            onPress={handleSingUp}
            style={styles.button}
          /> 


          <View>
            <OrSeparator text={t.orContinueWith}/>
            <View style={styles.socialBtnContainer}>
              <SocialButton
                icon={icons.appleLogo}
                // onPress={showDatepicker}
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
            color: dark ? COLORS.white : COLORS.black
          }]}>{t.alreadyHaveAnAccount}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.bottomRight}>{" "}{t.signIn}</Text>
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
    marginVertical: 80,
    position: "relative",
    bottom: 35,
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
  }
})

export default Signup