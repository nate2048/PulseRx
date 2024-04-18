// DataContext.js
import React, { createContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dataUpdated, setDataUpdated] = useState(false);

  const toggleDataUpdated = () => {
    setDataUpdated(prevState => !prevState);
  };

  return (
    <DataContext.Provider value={{ dataUpdated, toggleDataUpdated }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
