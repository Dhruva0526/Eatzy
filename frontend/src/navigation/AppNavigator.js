import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SelectRole from '../screens/auth/common/SelectRole';
import Login from '../screens/auth/customer/LoginOTP';
import RestaurantLogin from '../screens/auth/restaurant/LoginPassword';
import OTPVerify from '../screens/auth/common/OTPVerify';
import ForgotPassword from '../screens/auth/common/ForgotPassword';
import CustomerSignup from '../screens/auth/customer/Signup';
import RestaurantRegister from '../screens/auth/restaurant/Register';
import AuthLoading from '../screens/auth/common/AuthLoading';

import CustomerTabNavigator from './CustomerTabNavigator';
import RestaurantTabNavigator from './RestaurantTabNavigator';

import RestaurantDetails from '../screens/customer/RestaurantDetails';

import OrderHistory from '../screens/customer/OrderHistory';
import Favorite from '../screens/customer/Favorite';
import UserLocations from '../screens/customer/userLocations';
import Cart from '../screens/customer/Cart';
import Checkout from '../screens/customer/Checkout'
import OrderDetails from '../screens/customer/OrderDetails';
import Settings from '../screens/customer/Settings';
import OrderStatus from '../screens/customer/OrderStatus';

import Notification from '../screens/restaurant/Notification';
import Orders from '../screens/restaurant/Orders';
import Reservations from '../screens/restaurant/Reservations';
import QueueTokens from '../screens/restaurant/queueTokens';
import TodaySales from '../screens/restaurant/TodaySales';
import ProfileScreen from './../screens/restaurant/ProfileScreen';
import TableBookingSettings from'../screens/restaurant/TableBookingSettings';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    // <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Navigator initialRouteName="AuthLoading" screenOptions={{ headerShown: false }}>

      {/* Auth Loader */}
      <Stack.Screen name="AuthLoading" component={AuthLoading} />

      {/* First Screen */}
      <Stack.Screen name="SelectRole" component={SelectRole} />


      {/* Auth Flow */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RestaurantLogin" component={RestaurantLogin} />
      <Stack.Screen name="OTPVerify" component={OTPVerify} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="CustomerSignup" component={CustomerSignup} />
      <Stack.Screen name="RestaurantRegister" component={RestaurantRegister} />

      {/* Customer App */}
      <Stack.Screen name="CustomerTabs" component={CustomerTabNavigator} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="Favorite" component={Favorite} />
      <Stack.Screen name="UserLocations" component={UserLocations} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="OrderStatus" component={OrderStatus} />
      {/* Customer App -> Restaurant Details */}
      <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
      
      {/* Restaurant App */}
      <Stack.Screen name="RestaurantDashboard" component={RestaurantTabNavigator} />
      <Stack.Screen name="Notification" component={Notification} options={{headerShown: false}} />
      <Stack.Screen name="Orders" component={Orders} options={{headerShown: false}} />
      <Stack.Screen name="Reservations" component={Reservations} options={{ headerShown: false }} />
      <Stack.Screen name="QueueTokens" component={QueueTokens} options={{ headerShown: false }} />
      <Stack.Screen name="TodaySales" component={TodaySales} options={{ headerShown: false }} />
      <Stack.Screen name="Profile"  component={ProfileScreen}  options={{ title: 'My Profile' }} />
      <Stack.Screen name="TableBookingSettings" component={TableBookingSettings} />





    </Stack.Navigator>
  );
}

