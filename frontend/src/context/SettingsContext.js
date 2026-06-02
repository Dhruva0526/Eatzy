import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [acceptingOrders, setAcceptingOrders] = useState(true);
  const [busyMode, setBusyMode] = useState(false);
  const [orderAlert, setOrderAlert] = useState(true);
  const [autoAccept, setAutoAccept] = useState(false);

  const [openTime, setOpenTime] = useState('10:00 AM');
  const [closeTime, setCloseTime] = useState('10:00 PM');

  /* LOAD SETTINGS */
  useEffect(() => {
    AsyncStorage.getItem('APP_SETTINGS').then(data => {
      if (data) {
        const s = JSON.parse(data);
        setAcceptingOrders(s.acceptingOrders);
        setBusyMode(s.busyMode);
        setOrderAlert(s.orderAlert);
        setAutoAccept(s.autoAccept);
        setOpenTime(s.openTime);
        setCloseTime(s.closeTime);
      }
    });
  }, []);

  /* SAVE SETTINGS */
  useEffect(() => {
    AsyncStorage.setItem(
      'APP_SETTINGS',
      JSON.stringify({
        acceptingOrders,
        busyMode,
        orderAlert,
        autoAccept,
        openTime,
        closeTime,
      })
    );
  }, [
    acceptingOrders,
    busyMode,
    orderAlert,
    autoAccept,
    openTime,
    closeTime,
  ]);

  return (
    <SettingsContext.Provider
      value={{
        acceptingOrders,
        setAcceptingOrders,
        busyMode,
        setBusyMode,
        orderAlert,
        setOrderAlert,
        autoAccept,
        setAutoAccept,
        openTime,
        closeTime,
        setOpenTime,
        setCloseTime,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
