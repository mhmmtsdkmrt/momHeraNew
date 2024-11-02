import react, { createContext, useState } from "react";

export const WeightContext = createContext();

export const WeightProvider = ({ children }) => {

    const [lastWeight, setLastWeight] = useState(null);

    return(
        <WeightContext.Provider value={{ lastWeight, setLastWeight}}>
            {children}
        </WeightContext.Provider>
    );
};

