import { useContext, useEffect, useState } from "react";
import { TranslationsContext } from '@/Contexts/LanguageContext';
import axios from "axios";


const FindNameApi = (EnumCinsiyet, EnumNameType) => {

    const [data, setData] = useState([]);
    const { language } = useContext(TranslationsContext);

    //enumCinsiyet: 1 -Kız 2 -Erkek

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios({
                    method: 'get',
                    url: "https://api.momhera.com/api/NameMeanings",
                    params: {
                        EnumCinsiyet: EnumCinsiyet,
                        EnumNameType: EnumNameType,
                        language: language,
                    },
                });

                const items = response.data.data.items;

                const namesByLetter = items.map((item) => ({
                    harf: item.harf,
                    isimListesi: item.isimListesi
                }));

                setData(namesByLetter);

            }catch (e) {
                setError(e);
            };

            console.log(data);
        };

        fetchData();

    }, [EnumCinsiyet, EnumNameType, language]);

    return [data];

};

export default FindNameApi;