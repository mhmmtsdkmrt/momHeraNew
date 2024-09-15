import {useState, useEffect} from 'react';
import axios from 'axios';


const ArticlesApi = () => {

    const [data, setData] = useState([]);

         useEffect(() => {
            const fetchData = async() => {
                try {
                const response = await axios({
                    method: 'get',
                    url: "https://api.momhera.com/api/Categories",
                    params: {
                        Language : 'tr',
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






