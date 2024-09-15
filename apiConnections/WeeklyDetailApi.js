import { useState, useEffect } from 'react';
import axios from 'axios';

const useWeeklyDetailApi = (weekNumber) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const imagePath = 'https://momhera.com';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: `https://api.momhera.com/api/DonemlikGelisimBilgisis/HaftaHaftaHamilelik/WithBaseDetails/${weekNumber}`,
                    params: {
                        language: 'tr',
                    },
                });

                setData(response.data);
            } catch (e) {
                setError(e);
                console.log('hata', e);
            }
        };

        if (weekNumber) {
            fetchData();
        }
    }, [weekNumber]);

    return { data, error, imagePath };
};

export default useWeeklyDetailApi;
