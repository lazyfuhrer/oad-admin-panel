import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

  const { user, permissions, token } = userData || {};
  const { firstname, lastname } = user || {};
  const { role } = permissions || {};

  return (
    <UserContext.Provider value={{ userData, setUserData, firstname, lastname, role, token }}>
      {children}
    </UserContext.Provider>
  );
};