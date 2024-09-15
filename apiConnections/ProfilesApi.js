import axios from "axios";



export const apiProfile = async(data, token) => {

    try {
        const response = await axios.post('https://api.momhera.com/api/PregnantProfiles', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response.data;

    } catch (error) {
        if (error.response) {
            console.error('Hata:', error.response.data);
            Alert.alert('Hata', `Sunucudan gelen hata: ${error.response.data.message}`);
        } else {
            console.error('Hata:', error.message);
            Alert.alert('Hata', 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
        return null;
    }
};


export const apiProfileGet = async(userId, token) => {

    try {

        const response = await axios.get('https://api.momhera.com/api/PregnantProfiles/GetByUserId'+`/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response.data;

    } catch (error) {
        if (error.response) {
            console.error('Hata:', error.response.data);
            Alert.alert('Hata', `Sunucudan gelen hata: ${error.response.data.message}`);
        } else {
            console.error('Hata:', error.message);
            Alert.alert('Hata', 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
        return null;
    }
};


export const apiProfilePut = async(data) => {

    try {

        const response = await axios.put('https://api.momhera.com/api/PregnantProfiles', data, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        
        return response.data;

    } catch (error) {
        if (error.response) {
            console.error('Hata:', error.response.data);
            Alert.alert('Hata', `Sunucudan gelen hata: ${error.response.data.message}`);
        } else {
            console.error('Hata:', error.message);
            Alert.alert('Hata', 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
        return null;
    }
};



// firstName: firstName,
// lastName: lastName,
// nickName: nickName,
// motherAge: motherAge,
// enumPregnancyCalculateType: enumPregnancyCalculateType,
// estimatedBirthDate: estimatedBirthDate,
// enumBabyGender: enumBabyGender,
// babyName: babyName,
// isBabyBorn: isBabyBorn,
// isMiscarriage: isMiscarriage,
// enumParentType: enumParentType,