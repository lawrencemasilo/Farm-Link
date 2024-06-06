/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

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
  
