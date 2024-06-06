/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const SidebarContext = createContext()

export const SideBarProvider = ({ children }) => {
  const [navItem, setNavItem] = useState('members'); 

  return (
    <SidebarContext.Provider value={{ navItem, setNavItem }}>
      {children}
    </SidebarContext.Provider>
  )
}
