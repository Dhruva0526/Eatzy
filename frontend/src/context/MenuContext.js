import React, { createContext, useState } from 'react';

export const MenuContext = createContext({
  menuItems: [],
  addMenuItem: () => {},
  toggleItemStatus: () => {},
  updatePrice: () => {},
});

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([
    {
      id: '1',
      name: 'Margherita Pizza',
      price: 199,
      active: true,
    },
    {
      id: '2',
      name: 'Veg Burger',
      price: 149,
      active: true,
    },
  ]);

  const addMenuItem = (item) => {
    setMenuItems(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        ...item,
        active: true,
      },
    ]);
  };

  const toggleItemStatus = (id) => {
    setMenuItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, active: !item.active }
          : item
      )
    );
  };

  const updatePrice = (id, newPrice) => {
    setMenuItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, price: newPrice }
          : item
      )
    );
  };

  const deleteMenuItem = (id) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };
  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
        toggleItemStatus,
        updatePrice,
        deleteMenuItem,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
