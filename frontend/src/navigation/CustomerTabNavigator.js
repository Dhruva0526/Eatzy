import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';


import Home from '../screens/customer/Home';
import Orders from '../screens/customer/Orders';
import Notify from '../screens/customer/Notify';
import Profile from '../screens/customer/Profile';

const Tab = createBottomTabNavigator();
const ORANGE = '#FF6A3D';

export default function CustomerTabNavigator() {
  const insets = useSafeAreaInsets();


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: ORANGE,
        tabBarInactiveTintColor: '#777',

        // ✅ FIX FOR BOTTOM OVERLAP
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home';
          if (route.name === 'Orders') iconName = 'receipt';
          if (route.name === 'Notify') iconName = 'notifications';
          if (route.name === 'Profile') iconName = 'person';

          return <Ionicons name={iconName} size={size || 24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Notify" component={Notify} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
