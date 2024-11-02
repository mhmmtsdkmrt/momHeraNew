import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const SelectedContext = createContext();

export const useSelected = () => useContext(SelectedContext);

export const SelectedProvider = ({ children }) => {
  const [isSelected, setSelection] = useState({});


  useEffect(() => {
    const loadCheckboxState = async () => {
      try {
        const value = await AsyncStorage.getItem ('checkboxState');
          if (value !== null) {
            setSelection(JSON.parse(value));
          }
      } catch (error) {
        console.error ('Checkbox hata: ', error);
      }
    };
    loadCheckboxState();
  }, []);


  const handleCheckboxChange = async (id) => {
    const newSelected = { ...isSelected };
    newSelected[id] = !newSelected[id];
    setSelection(newSelected);

    // if (newSelected[id]) {
    //   setSelectedItems((prevSelectedItems) => [...prevSelectedItems, id]);
    // } else {
    //   setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((itemId) => itemId !== id));
    // }
  

    try {
      await AsyncStorage.setItem('checkboxState', JSON.stringify(newSelected));
    } catch (error) {
      console.error('Checkbox hata: ', error);
    }


  };


  return (
    <SelectedContext.Provider value={{ isSelected, handleCheckboxChange }}>
      {children}
    </SelectedContext.Provider>
  );
};
