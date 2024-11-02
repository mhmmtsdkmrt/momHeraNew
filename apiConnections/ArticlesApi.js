import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { TranslationsContext } from '@/Contexts/LanguageContext';


const ArticlesApi = () => {

    const [data, setData] = useState([]);
    const { language } = useContext(TranslationsContext);

         useEffect(() => {
            const fetchData = async() => {
                try {
                const response = await axios({
                    method: 'get',
                    url: "https://api.momhera.com/api/Categories",
                    params: {
                        Language : language,
                        PageIndex : 0,
                        PageSize: 100,
                    }, 
            });  

             setData(response.data.data.items);


            } 
            catch (e) {
                setError(e);
            };
            
        };

        fetchData();

    },[]);

    return [data];

};

export default ArticlesApi;






