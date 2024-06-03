import React, { createContext, useEffect, useState } from 'react';
import { profile } from '../services/ProfileService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await profile()
        setUser(data.data);
      } catch (err) {
      console.log(err)
      }
    }
    fetch()
  }, [])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};