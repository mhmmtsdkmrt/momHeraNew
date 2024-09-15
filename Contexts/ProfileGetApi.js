import React, { createContext, useEffect, useState } from "react";
import { apiProfileGet } from "../apiConnections/ProfilesApi";
import { getToken } from "../apiConnections/RegisterApi";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import Loading from "@/components/Loading";


export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);
    const [remainingWeeks, setRemainingWeeks] = useState(0);
    const [remainingDays, setRemainingDays] = useState(0);
    const [currentTrimester, setCurrentTrimester] = useState('');
    const [formattedDate, setFormattedDate] = useState('');
    const [elapsedWeeks, setElapsedWeeks] = useState(0);
    const [elapsedDays, setElapsedDays] = useState(0);
    const [currentWeek, setCurrentWeek] = useState(0);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchProfileData = async () => {


            const userId = '000258F6-9121-41D6-DB97-08DCC4241ECB';

            try {
                const existingData = await apiProfileGet(userId, 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjAwMDI1OGY2LTkxMjEtNDFkNi1kYjk3LTA4ZGNjNDI0MWVjYiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Im1obW10MjBAdGVzdC5jb20iLCJuYmYiOjE3MjU2Mjc1MTksImV4cCI6MTcyNTYyODExOSwiaXNzIjoibkFyY2hpdGVjdHVyZUBrb2RsYW1hLmlvIiwiYXVkIjoiYW5uZXNpeWltQGtvZGxhbWEuaW8ifQ.8fwMbKS2vh8CxYZV3H0WRwi7tY66-VKEVIdta1GeXaTUOXECuiGjR-aAUBEaNx-8PQjhjmGtZgbLPKsXemgRww');

                if (!existingData) {
                    setError('Mevcut veriler çekilemedi.');
                    return;
                }

                setProfileData(existingData);
            } catch (err) {
                setError('Profil verisi alınırken bir hata oluştu.');
                console.error(err);
            } finally {
                setLoading(false);  // API çağrısı tamamlandıktan sonra loading durduruluyor
            }
        };
        

        fetchProfileData();
    }, []);


    if (loading) {
        <Loading/>
    }


    useEffect(() => {
        if(profileData){
        calculatePregnancyDetails();
        }
    }, [profileData]);

    const apiEstimatedDate = profileData?.estimatedBirthDate;

        // Hesaplamalar //

        const calculatePregnancyDetails = () => {



            // Hamilelikte kaçıncı hafta ? Kaçıncı Gün ?
            const today = new Date();
            const dueDate = new Date(apiEstimatedDate);
            const pregnancyDurationWeeks = 40;
        
        
            const totalMillisecondsRemaining = dueDate - today;
            const totalDaysRemaining = Math.floor((totalMillisecondsRemaining) / (1000 * 60 * 60 * 24));
            const weeksRemaining = Math.floor(totalDaysRemaining / 7);
            const daysRemaining = totalDaysRemaining % 7;
        
        
            setRemainingWeeks(weeksRemaining);
            setRemainingDays(daysRemaining);
        
            // Geçen süreyi hesapla
            const totalDaysElapsed = (pregnancyDurationWeeks * 7) - totalDaysRemaining;
            const weeksElapsed = Math.floor(totalDaysElapsed / 7);
            const daysElapsed = totalDaysElapsed % 7;
            
            setElapsedWeeks(weeksElapsed);
            setElapsedDays(daysElapsed);
        
        
            // Hamilelikte trimester
            const currentWeek = pregnancyDurationWeeks - weeksRemaining;
                setCurrentWeek(currentWeek);
            if (currentWeek <= 13) {
                setCurrentTrimester('1. Trimester');
            } else if (currentWeek <= 27) {
                setCurrentTrimester('2. Trimester');
            } else {
                setCurrentTrimester('3. Trimester');
            }
        
        
            // Tahmini doğum tarihi format
            const options = { day: 'numeric', month: 'short' };
            const formatted = dueDate.toLocaleDateString('tr-TR', options);
            setFormattedDate(formatted);
        
        }


        if (loading) {
            <Loading/> // API çağrısı devam ederken loading mesajı gösteriliyor
        }


    return (
        <ProfileContext.Provider value={{ setProfileData, profileData, remainingWeeks, remainingDays, currentTrimester, formattedDate, elapsedWeeks, elapsedDays, currentWeek }}>
            {children}
        </ProfileContext.Provider>
    );
};