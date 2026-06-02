import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Dashboard from '../screens/restaurant/Dashboard';
import Orders from '../screens/restaurant/Orders';
import Analytics from '../screens/restaurant/Analytics';
import Settings from '../screens/restaurant/Settings';


const Tab = createBottomTabNavigator();
const ORANGE = '#FF6A3D';

export default function RestaurantTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: ORANGE,
        tabBarInactiveTintColor: '#999',

        tabBarStyle: {
          height: 60 + insets.bottom,   // 👈 KEY LINE
          paddingBottom: insets.bottom, // 👈 KEY LINE
          paddingTop: 8,
        },

        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Dashboard') iconName = 'grid';
          if (route.name === 'Orders') iconName = 'receipt';
          if (route.name === 'Analytics') iconName = 'bar-chart';
          if (route.name === 'Settings') iconName = 'settings';

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Analytics" component={Analytics} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
