import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendOTP } from '../../../services/authService';

export default function CustomerSignup({ navigation, route }) {
  const routePhone = route?.params?.phone || "";
  const [phone, setPhone] = useState(routePhone);
  const [name, setName] = useState('');
  
  const handleSignup = async () => {
    const cleanPhone = phone.trim();

    if (!name || !cleanPhone) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (!/^[0-9]{10}$/.test(cleanPhone)) {
      Alert.alert("Error", "Enter valid phone number");
      return;
    }

    try {
      const res = await sendOTP(cleanPhone);
      navigation.navigate('OTPVerify', {
        phoneOrEmail: cleanPhone,
        name,
        type: 'signup',
      });

    } catch (error) {
      Alert.alert("Error", "Failed to send OTP");
    }
  };
  return (
    <View style={styles.container}>

      {/* Logo */}
      <Image
        source={require('../../../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Sign up to start ordering with Eatzy
      </Text>

      {/* Name */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        placeholder="Enter your name"
        placeholderTextColor="#999"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      {/* Phone / Email */}
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        placeholder="Enter your phone"
        placeholderTextColor="#999"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="number-pad"
        editable={!routePhone} // OTP se aaye to lock
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Already have account */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginBold}>Login</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const ORANGE = '#FF6A3D';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  logo: {
    width: 100,
    height: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 40,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 24,
  },
  signupButton: {
    backgroundColor: ORANGE,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  signupText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loginText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#777',
  },
  loginBold: {
    color: ORANGE,
    fontWeight: '600',
  },
});
