import React, { createContext, useContext, useState } from 'react';

const EmergencyContext = createContext();

export const EmergencyProvider = ({ children }) => {
  const [emergencies, setEmergencies] = useState([]);

  const addEmergency = (data) => {
    const newItem = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    setEmergencies([newItem, ...emergencies]);
    return newItem;
  };

  const deleteEmergency = (id) => {
    setEmergencies(emergencies.filter(item => item.id !== id));
  };

  return (
    <EmergencyContext.Provider value={{ emergencies, addEmergency, deleteEmergency }}>
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency must be used within EmergencyProvider');
  }
  return context;
};
