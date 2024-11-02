import { View, Text, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList, TextInput, Keyboard, KeyboardAvoidingView } from 'react-native';
import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { COLORS, SIZES, FONTS, icons  } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { reducer } from '../utils/reducers/formReducers';
import { validateInput } from '../utils/actions/formActions';
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import { launchImagePicker } from '../utils/ImagePickerHelper';
import Input from '../components/Input';
import Button from '../components/Button';
import { useTheme } from '../theme/ThemeProvider';
import RNPickerSelect from 'react-native-picker-select';
import { apiProfileGet, apiProfilePut } from '../apiConnections/ProfilesApi';
import { getToken } from '../apiConnections/RegisterApi';
import { ProfileContext } from '../Contexts/ProfileGetApi';
import { useTranslation } from '@/Contexts/useTranslation';


const isTestMode = false

const initialState = {
  inputValues: {
    fullName: isTestMode ? 'John Doe' : '',
    lastName: isTestMode ? 'deneme': '',
    email: isTestMode ? 'example@gmail.com' : '',
    nickName: isTestMode ? "" : "",

  },
  inputValidities: {
    fullName: false,
    lastName: false,
    email: false,
    nickName: false,
  },
  formIsValid: false,
}


const EditProfile = ({ navigation }) => {

  const [image, setImage] = useState(null);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const { colors, dark } = useTheme();
  const [selectedPregnant, setSelectedPregnant] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedRelative, setSelectedRelative] = useState('');
  const [relativeLabel, setRelativeLabel] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { profileData, setProfileData } = useContext(ProfileContext);
  const { t } = useTranslation();


  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue)
      dispatchFormState({ inputId, validationResult: result, inputValue })
    },
    [dispatchFormState]
  )

  const pregnantOptions = [
    { label: `${t.yes}`, value: '1' },
    { label: `${t.notYet}`, value: '0' },
  ];

    const handlePregnantChange = (value) => {
    setSelectedPregnant(value);
  };

  const ageOptions = [
    { label: '16-20', value: '20' },
    { label: '21', value: '21' },
    { label: '22', value: '22' },
    { label: '23', value: '23' },
    { label: '24', value: '24' },
    { label: '25', value: '25' },
    { label: '26', value: '26' },
    { label: '27', value: '27' },
    { label: '28', value: '28' },
    { label: '29', value: '29' },
    { label: '30', value: '30' },
    { label: '31', value: '31' },
    { label: '32', value: '32' },
    { label: '33', value: '33' },
    { label: '34', value: '34' },
    { label: '35', value: '35' },
    { label: '36', value: '36' },
    { label: '37', value: '37' },
    { label: '38', value: '38' },
    { label: '39', value: '39' },
    { label: '40', value: '40' },
    { label: '41', value: '41' },
    { label: '42', value: '42' },
    { label: '43', value: '43' },
    { label: '44', value: '44' },
    { label: '45', value: '45' },
    { label: '46', value: '46' },
    { label: '47', value: '47' },
    { label: '48', value: '48' },
    { label: '49', value: '49' },
    { label: '50+', value: '50' },
  ];

  const handleAgeChange = (value) => {
    setSelectedAge(value);
  };


  const getUserBirthDate = (age) => {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
  
    const birthYear = currentYear - age;
  
    const birthDate = new Date(birthYear, 0, 2); // 1 Ocak doğum tarihi
  
    // ISO 8601 formatı
    const birthDateISO = birthDate.toISOString();
  
    return birthDateISO;
  };

  const userBirthDate = getUserBirthDate(selectedAge);

// her sayfaya girdiğinde bilgileri güncelle
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = await getToken();
      if (!token) {
        Alert.alert(`${t.anErrorOccured}`, `${t.tokenNotFound}`);
        return;
      }

      const userId = '000258F6-9121-41D6-DB97-08DCC4241ECB';
      try {
        const existingData = await apiProfileGet(userId, token);
        if (!existingData) {
          Alert.alert(`${t.anErrorOccured}`, `${t.notPullData}`);
          return;
        }

        setProfileData(existingData);
      } catch (err) {
        Alert.alert(`${t.anErrorOccured}`, `${t.notPullingProfileData}`);
        console.error(err);
      }
    };

    fetchProfileData();
  }, []);



    useEffect(() => {
      if(profileData) {

        const currentDate = new Date();

        const currentAgeYearApi = new Date(profileData?.motherAge);
        const currentAgeYear = currentAgeYearApi.getFullYear();
        const currentYear = currentDate.getFullYear();
    
        const userAge = currentYear - currentAgeYear;


        dispatchFormState({
          inputId: 'fullName',
          validationResult: { isValid: true },
          inputValue: profileData?.firstName || ''
        });
        dispatchFormState({
          inputId: 'lastName',
          validationResult: { isValid: true },
          inputValue: profileData?.lastName || ''
        });
        // dispatchFormState({
        //   inputId: 'email',
        //   validationResult: { isValid: true },
        //   inputValue: profileData?.email || ''
        // });
        dispatchFormState({
          inputId: 'nickName',
          validationResult: { isValid: true },
          inputValue: profileData?.nickName || ''
        });

        setSelectedAge(userAge.toString());
        setSelectedPregnant(profileData?.isPregnant ? '1' : '0');
        setSelectedRelative(profileData?.enumParentType);
      }
    }, [profileData]);  


    useEffect(() => {
      const relativeOption = relativeOptions.find(option => option.value === selectedRelative);
      if (relativeOption) {
        setRelativeLabel(relativeOption.label); // Label'ı state'e set ediyoruz
      }
    }, [selectedRelative]);


  const relativeOptions = [
    { label: `${t.mother}`, value: 1 },
    { label: `${t.father}`, value: 2 },
    { label: `${t.parent}`, value: 3 },
    { label: `${t.singleMother}`, value: 4 },
    { label: `${t.grandMa}`, value: 5 },
    { label: `${t.grandFather}`, value: 6 },
    { label: `${t.uncleOrAunt}`, value: 7 },
    { label: `${t.friend}`, value: 8 },
    { label: `${t.other}`, value: 9 },
  ];

  const handleRelativeChange = (value) => {
    setSelectedRelative(value);
  };

  useEffect(() => {
    if (error) {
      Alert.alert(`${t.anErrorOccured}`, error)
    }
  }, [error])

  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker()

      if (!tempUri) return

      // set the image
      setImage({ uri: tempUri })
    } catch (error) { }
  };


      // API Operations

      const handleSubmit = async () => {

        const token = await getToken();

      if(!token) {
        Alert.alert(`${t.anErrorOccured}`, `${t.tokenNotFound}`);
        return;
      }

      //const id = 'D30431AE-BF3B-4A92-7749-08DCBEB7E17E';
      const userId = '000258F6-9121-41D6-DB97-08DCC4241ECB';

      const existingData = await apiProfileGet(userId, token);

      console.log('userıd:', existingData.userId);


      if (!existingData) {
          Alert.alert(`${t.anErrorOccured}`, `${t.notPullData}`);
          return;
      }

      const data = {
        babyName: existingData.babyName,
        enumBabyGender: existingData.enumBabyGender,
        id: existingData.id,
        isBabyBorn: existingData.isBabyBorn,
        isMiscarriage: existingData.isMiscarriage,
        userId: userId,
        enumPregnancyCalculateType: existingData.enumPregnancyCalculateType,
        estimatedBirthDate: existingData.estimatedBirthDate,
        //güncellenecekler
        firstName: formState.inputValues.fullName,
        lastName: formState.inputValues.lastName,
        nickname: formState.inputValues.nickName,
        motherAge: userBirthDate,
        isPregnant: selectedPregnant === '1',
        enumParentType: selectedRelative,

      };

      setIsSubmitting(true);
      console.log(token);
    
      try {
        const response = await apiProfilePut(data); 
        Alert.alert(`${t.success}`, `${t.successfullyUpdate}`);
        console.log('Response:', response);
        // Burada başka bir sayfaya yönlendirme
        navigation.navigate("Profile");
      } catch (error) {
        Alert.alert(`${t.anErrorOccured}`, `${t.notCreatingProfile}`);
        console.error(`${t.anErrorOccured}`, error);
      } finally {
        setIsSubmitting(false);
      }
    };


  return (
    <SafeAreaView style={[styles.area, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
      <View style={[styles.container, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
        <Header title={t.editProfile} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center", marginVertical: 12 }}>
            <View style={styles.avatarContainer}>
              <Image
                source={image === null ? icons.userDefault2 : image}
                resizeMode="cover"
                style={styles.avatar} />
              <TouchableOpacity
                onPress={pickImage}
                style={styles.pickImage}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={24}
                  color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Input
              id="fullName"
              defaultValue={formState.inputValues.fullName}
              onInputChanged={inputChangedHandler}
              errorText=''
              required
              placeholder={profileData?.firstName}
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              initialValue={formState.inputValues.fullName}
              />
              <Input
              id="lastName"
              defaultValue={formState.inputValues.lastName}
              onInputChanged={inputChangedHandler}
              errorText=''
              required
              placeholder={profileData?.lastName}
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              initialValue={formState.inputValues.lastName}
              />
            <Input
              id="nickName"
              defaultValue={formState.inputValues.nickName}
              onInputChanged={inputChangedHandler}
              errorText=''
              required
              placeholder={profileData?.nickName}
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              initialValue={formState.inputValues.nickName}
              />
            {/* email çıakrılacak. password ve email hesap ayarlarına eklenecek. */}
            <Input
              id="email"
              defaultValue={formState.inputValues.email}
              onInputChanged={inputChangedHandler}
              errorText=''
              readOnly='true'
              placeholder={profileData?.userMail}
              placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
              keyboardType="email-address" 
              initialValue={formState.inputValues.email}
              />  
            
            <View style={{
              width: SIZES.width - 32
            }}>
            </View>
            <View style={styles.pickerContainer}>
              {/* yaş seçimi */}
            <RNPickerSelect
                placeholder={{ label: `${t.yourAge}`, value: '' }}
                items={ageOptions}
                onValueChange={(value) => handleAgeChange(value)}
                value={selectedAge}
                style={{
                  inputIOS: {
                    marginTop: 8,
                    fontSize: 16,
                    paddingHorizontal: 10,
                    borderRadius: 4,
                    color: COLORS.greyscale600,
                    paddingRight: 30,
                    height: 52,
                    width: SIZES.width - 32,
                    alignItems: 'center',
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderRadius: 16
                  },
                  inputAndroid: {
                    marginTop: 8,
                    fontSize: 16,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    color: COLORS.greyscale600,
                    paddingRight: 30,
                    height: 52,
                    width: SIZES.width - 32,
                    alignItems: 'center',
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderRadius: 16
                  },
                }}
              />
              {/* Hamilelik seçimi */}
              <RNPickerSelect
                placeholder={{ label: `${t.yourPregnancy}` , value: '' }}
                items={pregnantOptions}
                onValueChange={(value) => handlePregnantChange(value)}
                value={selectedPregnant}
                style={{
                  inputIOS: {
                    marginTop: 12,
                    fontSize: 16,
                    paddingHorizontal: 10,
                    borderRadius: 4,
                    color: COLORS.greyscale600,
                    paddingRight: 30,
                    height: 52,
                    width: SIZES.width - 32,
                    alignItems: 'center',
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderRadius: 16
                  },
                  inputAndroid: {
                    marginTop: 12,
                    fontSize: 16,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    color: COLORS.greyscale600,
                    paddingRight: 30,
                    height: 52,
                    width: SIZES.width - 32,
                    alignItems: 'center',
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderRadius: 16
                  },
                }}
              />
              {/* ilişki seçimi */}
            <RNPickerSelect
                placeholder={{ label: `${t.yourRelative}`, value: '' }}
                items={relativeOptions}
                onValueChange={(value) => handleRelativeChange(value)}
                value={selectedRelative}
                style={{
                  inputIOS: {
                    marginTop: 12,
                    fontSize: 16,
                    paddingHorizontal: 10,
                    borderRadius: 4,
                    color: COLORS.greyscale600,
                    paddingRight: 30,
                    height: 52,
                    width: SIZES.width - 32,
                    alignItems: 'center',
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderRadius: 16
                  },
                  inputAndroid: {
                    marginTop: 12,
                    fontSize: 16,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    color: COLORS.greyscale600,
                    paddingRight: 30,
                    height: 52,
                    width: SIZES.width - 32,
                    alignItems: 'center',
                    backgroundColor: dark ? COLORS.dark2 : COLORS.greyscale500,
                    borderRadius: 16
                  },
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
      <Button
          title={isSubmitting ? `${t.updating}` : `${t.update}`}
          filled
          style={styles.continueButton}
          onPress={handleSubmit}
          disabled={isSubmitting} // API çağrısı sırasında butonu devre dışı bırak
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
    padding: 16,
    backgroundColor: COLORS.white
  },
  avatarContainer: {
    marginVertical: 12,
    alignItems: "center",
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  avatar: {
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  pickImage: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: COLORS.greyscale500,
    borderWidth: .4,
    borderRadius: 6,
    height: 52,
    width: SIZES.width - 32,
    alignItems: 'center',
    marginVertical: 16,
    backgroundColor: COLORS.greyscale500,
  },
  downIcon: {
    width: 10,
    height: 10,
    tintColor: "#111"
  },
  selectFlagContainer: {
    width: 90,
    height: 50,
    marginHorizontal: 5,
    flexDirection: "row",
  },
  flagIcon: {
    width: 30,
    height: 30
  },
  input: {
    flex: 1,
    marginVertical: 10,
    height: 40,
    fontSize: 14,
    color: "#111"
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.greyscale500,
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "space-between",
    marginTop: 4,
    backgroundColor: COLORS.greyscale500,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bottomContainer: {
    position: "absolute",
    bottom: 32,
    right: 16,
    left: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    width: SIZES.width - 32,
    alignItems: "center"
  },
  continueButton: {
    width: SIZES.width - 32,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary
  },
  genderContainer: {
    flexDirection: "row",
    borderColor: COLORS.greyscale500,
    borderWidth: .4,
    borderRadius: 6,
    height: 58,
    width: SIZES.width - 32,
    alignItems: 'center',
    marginVertical: 16,
    backgroundColor: COLORS.greyscale500,
  },
  pickerContainer: {
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    marginTop: 5,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: COLORS.greyscale600,
    paddingRight: 30,
    height: 58,
    width: SIZES.width - 32,
    alignItems: 'center',
    backgroundColor: COLORS.greyscale500,
    borderRadius: 16
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: COLORS.greyscale600,
    paddingRight: 30,
    height: 58,
    width: SIZES.width - 32,
    alignItems: 'center',
    backgroundColor: COLORS.greyscale500,
    borderRadius: 16
  },

});

export default EditProfile