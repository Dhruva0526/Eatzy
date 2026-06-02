import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { restaurantLogin, setToken } from '../../../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function RestaurantLogin({ navigation }) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      alert('Please enter email and password');
      return;
    }

    console.log("LOGIN REQUEST:", {
      email_or_phone: emailOrPhone,
      password: password
    });

    try {
      const res = await restaurantLogin(emailOrPhone, password);

      console.log("FULL RESPONSE:", res.data);   // 🔥 IMPORTANT

      // const token = res.data.access_token;

      // console.log("TOKEN:", token);              // 🔥 IMPORTANT

      // await setToken(token);                     // 🔥 MUST

      // // optional debug
      // const stored = await AsyncStorage.getItem("token");
      // console.log("STORED TOKEN:", stored);

      // navigation.replace('RestaurantDashboard');
      const token = res.data.access_token;

      await setToken(token);

      // 🔥 RESTAURANT ID STORE KARO
      await AsyncStorage.setItem(
        "restaurant_id",
        res.data.merchant.restaurant_id.toString()
      );

      // 🔥 IDENTIFIER STORE KARO
      await AsyncStorage.setItem(
        "identifier",
        emailOrPhone
      );

      // optional debug
      const storedIdentifier =
        await AsyncStorage.getItem("identifier");

      console.log(
        "STORED IDENTIFIER:",
        storedIdentifier
      );

      const storedRestaurantId =
        await AsyncStorage.getItem("restaurant_id");

      console.log(
        "STORED RESTAURANT ID:",
        storedRestaurantId
      );

      navigation.replace("RestaurantDashboard");

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      alert('Login failed');
    }
  };


  const handleRestaurantRegister = () => {
    navigation.navigate('RestaurantRegister');
  };

  return (
    <View style={styles.container}>

      {/* Logo */}
      <Image
        source={require('../../../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Login to continue your foodie journey
      </Text>

      {/* Phone / Email */}
      <Text style={styles.label}>Phone / Email</Text>
      <TextInput
        placeholder="Enter your phone or email"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
      />

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={{ textAlign: 'right', color: '#FF6A3D', marginBottom: 20 }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>


      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>
      
      {/* Sign Up */}
      <TouchableOpacity onPress={handleRestaurantRegister}>
        <Text style={styles.signupText}>
          New here? <Text style={styles.signupBold}>Register</Text>
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
    width: 90,
    height: 50,
    alignSelf: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 30,
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
    marginBottom: 22,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  forgotText: {
    color: '#888',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: ORANGE,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  signInText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  ownerSignup: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ownerText: {
    color: ORANGE,
    fontSize: 16,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 12,
    color: '#888',
  },
  customerText: {
    textAlign: 'center',
    color: ORANGE,
    fontSize: 16,
    fontWeight: '600',
  },
  signupText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#777',
  },

  signupBold: {
    color: ORANGE,
    fontWeight: '600',
  },
});
