import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyOTP, sendOTP, completeProfile } from '../../../services/authService';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { saveToken } from '../../../utils/auth';

export default function OTPVerify({ navigation, route }) {

  // 🔹 LOGIC FIX (no UI change)
  // const { phoneOrEmail = '', type = 'login' } = route.params || {};
  const { phoneOrEmail = '', type = 'login', name = '' } = route.params || {};

  const [resendMsg, setResendMsg] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < 3) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 4) {
      Alert.alert('Error', 'Please enter valid OTP');
      return;
    }

    try {
      const res = await verifyOTP(phoneOrEmail, enteredOtp);

      if (type === "signup") {
        // ✅ Signup flow

        const profileRes = await completeProfile(name, phoneOrEmail);

        // 🔥 correct token yaha se aayega
        await AsyncStorage.setItem("token", profileRes.data.access_token);

        navigation.replace("CustomerTabs");

      } else {
        // ✅ Login flow

        if (res.data.is_new_user) {
          navigation.navigate("CustomerSignup", {
            phone: phoneOrEmail,
          });
        } else {
          await AsyncStorage.setItem("token", res.data.access_token);
          navigation.replace("CustomerTabs");
        }
      }

    } catch (error) {
      console.log("ERROR:", error); // 🔥 DEBUG
      Alert.alert("Error", "Something went wrong");
    }
  };

  const handleResendOTP = async () => {
    try {
      await sendOTP(phoneOrEmail);
      setResendMsg('OTP resent successfully');
    } catch {
      setResendMsg('Failed to resend OTP');
    }

    setTimeout(() => setResendMsg(''), 2000);
  };

  return (
    <View style={styles.container}>

      {/* Logo */}
      <Image
        source={require('../../../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 4-digit code sent to your phone/email {phoneOrEmail}
      </Text>

      {/* OTP Boxes */}
      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      {/* Verify Button */}
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>

      {/* Resend */}
      <Text style={styles.resendText}>
        Didn’t receive OTP?{' '}
        <Text style={styles.resendLink} onPress={handleResendOTP}>
            Resend OTP
        </Text>
      </Text>


      {/* Success Message */}
      {resendMsg !== '' && (
        <Text style={styles.successMsg}>{resendMsg}</Text>
      )}

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
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    marginBottom: 40,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    fontSize: 22,
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: ORANGE,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resendText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#777',
  },
  resendLink: {
    color: ORANGE,
    fontWeight: '600',
  },
  successMsg: {
    textAlign: 'center',
    color: 'green',
    fontSize: 14,
    marginTop: 10,
    fontWeight: '500',
  },
});
