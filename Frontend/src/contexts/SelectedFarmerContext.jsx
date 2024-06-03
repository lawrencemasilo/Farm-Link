import React, { createContext, useState } from 'react';

export const SelectedFarmerContext = createContext();

export const SelectedFarmerProvider = ({ children }) => {
  const [selectedFarmer, setSelectedFarmer] = useState();
  const [showOrderForm, setShowOrderForm] = useState(false);
  return (
    <SelectedFarmerContext.Provider value={{selectedFarmer, setSelectedFarmer, showOrderForm, setShowOrderForm}}>
      {children}
    </SelectedFarmerContext.Provider>
  )
}


/*export const ShowFormContext = createContext();

export const ShowFormProvider = ({ children }) => {
    const [showOrderForm, setShowOrderForm] = useState(false);

    return (
      <ShowFormContext.Provider value={{showOrderForm, setShowOrderForm}}>
        {children}
      </ShowFormContext.Provider>
    )
  }*/
  
