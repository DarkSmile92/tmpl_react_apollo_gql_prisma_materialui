import React, { useState } from 'react';

import defaultTheme from '../../muiTheme';

export const ThemeContext = React.createContext();

const ThemeContextProvider = ({ children }) => {
  const [currentTheme, setTheme] = useState(defaultTheme);
  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme: newTheme => setTheme(newTheme),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
