import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { OrderProvider } from './src/context/OrderContext';
import { ReservationProvider } from './src/context/ReservationContext';
import { MenuContext, MenuProvider } from './src/context/MenuContext';
import { SettingsProvider } from './src/context/SettingsContext';
import { CartProvider } from './src/context/CartContext';
export default function App() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <CartProvider>

          <MenuProvider>
            <ReservationProvider>
              <OrderProvider>
                <NavigationContainer>
                  <AppNavigator />
                </NavigationContainer>
              </OrderProvider> 
            </ReservationProvider>
          </MenuProvider>
        </CartProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
