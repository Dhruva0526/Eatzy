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
import { sendOTP } from '../../../services/authService';

export default function Login({ navigation, route }) {

  // ✅ FIX 1: receive role correctly
  // const role = route?.params?.role || 'customer';

  // ✅ FIX 2: correct state usage
  const [phoneOrEmail, setPhoneOrEmail] = useState('');

  const handleSendOTP = async () => {
    
    if (!phoneOrEmail || phoneOrEmail.length !== 10) {
      alert("Enter valid phone number");
      return;
    }

    try {
      console.log("PHONE:", phoneOrEmail); // debug

      await sendOTP(phoneOrEmail);

      navigation.navigate("OTPVerify", {
        phoneOrEmail: phoneOrEmail,
        type: "login",
      });
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("ERROR RESPONSE:", error.response);
      console.log("ERROR DATA:", error.response?.data);
      console.log("ERROR STATUS:", error.response?.status);

      alert("Failed to send OTP");
    }
  };

  const handleGoogleLogin = () => {
    // Frontend placeholder
    Alert.alert(
      'Google Login',
      'Google sign-in will be integrated later'
    );

    // Optional auto-login for testing
    // navigation.replace('CustomerTabs');
  };

  const handleCustomerSignup = () => {
    navigation.navigate('CustomerSignup');
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

      {/* Input */}
      <Text style={styles.label}>Phone / Email</Text>
      <TextInput
        placeholder="Enter your phone or email"
        placeholderTextColor="#999"
        style={styles.input}
        value={phoneOrEmail}
        onChangeText={setPhoneOrEmail}
        keyboardType="email-address"
      />

      {/* Send OTP Button */}
      <TouchableOpacity style={styles.otpButton} onPress={handleSendOTP}>
        <Text style={styles.otpText}>Send OTP</Text>
      </TouchableOpacity>

      {/* OR Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* Google Button */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleLogin}
      >
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png',
          }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Sign Up */}
      <TouchableOpacity onPress={handleCustomerSignup}>
        <Text style={styles.signupText}>
          New here? <Text style={styles.signupBold}>Sign up</Text>
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
  otpButton: {
    backgroundColor: ORANGE,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  otpText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
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
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    height: 54,
    borderRadius: 14,
    marginBottom: 40,
  },
  googleIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    fontWeight: '500',
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
