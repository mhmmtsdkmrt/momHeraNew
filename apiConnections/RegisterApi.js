import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";


// token al
export const getToken = async () => {

    try {
        const token = await AsyncStorage.getItem('userToken');
        return token;
    } catch (error) {
        console.error('Error getting token from AsyncStorage: ', error);
        return null;
    } 
};


//API istek (Login)
export const apiLogin = async (email, password) => {
    try {
        const response = await axios.post('https://api.momhera.com/api/Auth/Login', {
            email: email,
            password: password,
        });

            if (response.status === 200) {
                const token = response.data.accessToken.token;
                await AsyncStorage.setItem('userToken', token);
                return {success: true, token};
            }else {
                return {success: false, message: 'Invalid credentials' };
            }
        } catch(error) {

            if (error.response) {
                const {status, data} = error.response;

                if (status !== 200 && data.errors && data.errors.BusinessException) {
                    const errorMessage = data.errors.BusinessException[0];
                    return {success: true, message: errorMessage};
                }else {
                    return {success: false, message: 'Invalid credentials' };
                }

             }else {
                console.error(error);
                return {success: true, message: 'Something went wrong, please try again later'};
             }
        }        
};



// API istek (SignUp)
export const apiRegister = async (email, password) => {
    try{
        const response = await axios.post('https://api.momhera.com/api/Auth/Register', {
            email,
            password,
          });

          if (response.status === 201) {
            const data = response.data;
            const token = data.token;
            
            // Token'ı AsyncStorage'a kaydet
            await AsyncStorage.setItem('userToken', token);
            
            return { success: true, token };
          } else {
            return { success: false, message: 'Registration failed' };
          }
        } catch (error) {
          if (error.response) {
            const { status, data } = error.response;
            if (status === 400 && data.errors && data.errors.BusinessException) {
              const errorMessage = data.errors.BusinessException[0];
              return { success: false, message: errorMessage };
            } else {
              return { success: false, message: 'Registration failed' };
            }
          } else {
            console.error(error);
            return { success: false, message: 'An unexpected error occurred' };
          }
        }
};


// veri çekemek için API çağrısı
export const fetchData = async () => {

    try {
        const token = await getToken();
        if (!token) {
            console.error('No token found');
            return null;
        }

        const response = await axios.post('https://api.momhera.com/api/Auth/Login', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }catch (error) {
        console.error('Error fetching data: ', error);
        return null;
    }
};