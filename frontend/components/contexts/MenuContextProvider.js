import React, { useState } from 'react';

export const MenuContext = React.createContext();

const MenuContextProvider = ({ children }) => {
  const [mainDrawerOpen, setMainDrawerOpen] = useState(true);
  return (
    <MenuContext.Provider
      value={{
        mainDrawerOpen: mainDrawerOpen,
        toggleMainDrawer: isOpen => setMainDrawerOpen(isOpen),
      }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
