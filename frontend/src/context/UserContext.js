import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

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

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const responseComp = await axios.get('http://localhost:3000/api/getcompany');
        const allCompanies = responseComp.data.allCompanies;
        setUserData({ ...userData, allCompanies });
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompany();
  }, []);

  const { user, permissions, token, allCompanies } = userData || {};
  const { firstname, lastname } = user || {};
  const { role } = permissions || {};

  return (
    <UserContext.Provider value={{ userData, setUserData, firstname, lastname, role, token, selectedValue, setSelectedValue, allCompanies }}>
      {children}
    </UserContext.Provider>
  );
};