import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { getToken } from '../../../utils/auth';
import { decodeToken } from '../../../utils/jwt';

export default function AuthLoading({ navigation }) {

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await getToken();

    if (token) {
        const payload = decodeToken(token);

        if (payload && payload.role === 'customer') {
        navigation.replace('CustomerTabs');
        } else {
        navigation.replace('SelectRole');
        }
    } else {
        navigation.replace('SelectRole');
    }
    };

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}