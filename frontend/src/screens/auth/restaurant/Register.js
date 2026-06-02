import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import { restaurantRegister } from '../../../services/authService';

export default function RestaurantRegister({ navigation }) {
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [shopName, setShopName] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [stateName, setStateName] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [gst, setGst] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [agree, setAgree] = useState(false);
  const [idType, setIdType] = useState('');
  const [idFile, setIdFile] = useState(null);
  const [showIdModal, setShowIdModal] = useState(false);

  const isValidPhone = (value) => /^[6-9]\d{9}$/.test(value);
  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const ID_TYPES = [
    'Aadhaar Card',
    'PAN Card',
    'Driving License',
    'Passport',
  ];

  const handleAttachFile = async () => {
    try {
        const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
        });

        if (result.canceled) return;

        setIdFile(result.assets[0]);
    } catch (error) {
        console.log('File pick error:', error);
    }
  };

  const handleRegister = async () => {
    if (!ownerName || !phone || !email || !shopName) {
      alert('Please fill all required fields');
      return;
    }

    if (!isValidPhone(phone)) {
      alert('Enter a valid 10-digit phone number');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Enter a valid email address');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!idType || !idFile) {
      alert('Please upload ID proof');
      return;
    }

    if (!agree) {
      alert('Please accept Terms & Conditions');
      return;
    }


    // Just to Debug
    console.log({
      owner_name: ownerName,
      phone,
      email,
      password,
      shop_name: shopName,
      shop_address: shopAddress,
      state: stateName,
      city,
      pincode,
      gst,
      id_type: idType
    });

    try {
      const res = await restaurantRegister({
        owner_name: ownerName,
        phone: phone,
        email: email,
        password: password,

        shop_name: shopName,
        shop_address: shopAddress,
        state: stateName,
        city: city,
        pincode: pincode,

        gst: gst || null,
        id_type: idType
      });

      alert("Restaurant registered successfully 🎉");

      navigation.replace("RestaurantLogin");

    } catch (err) {
      console.log(err.response?.data);

      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Logo */}
        <Image
            source={require('../../../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
        />

        <Text style={styles.title}>Register</Text>

        {/* Inputs */}
        <Input
          label="Owner Name"
          placeholder="Enter your name"
          value={ownerName}
          onChangeText={setOwnerName}
        />

        <Input
          label="Phone no."
          placeholder="Enter your phone no."
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Input
          label="Email Id"
          placeholder="Enter your email id"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Input
          label="Shop Name"
          placeholder="Enter your shop name"
          value={shopName}
          onChangeText={setShopName}
        />

        <Input
          label="Shop Address"
          placeholder="Enter your shop address"
          value={shopAddress}
          onChangeText={setShopAddress}
        />

        <Input
          label="State"
          placeholder="Select State"
          value={stateName}
          onChangeText={setStateName}
        />

        <Input
          label="City"
          placeholder="Select City"
          value={city}
          onChangeText={setCity}
        />

        <Input
          label="Pin Code"
          placeholder="Enter your Pin Code"
          keyboardType="number-pad"
          value={pincode}
          onChangeText={setPincode}
        />

        <Input
          label="GST no. (optional)"
          placeholder="Enter your GST no."
          value={gst}
          onChangeText={setGst}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Input
          label="Confirm Password"
          placeholder="Enter your confirm password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />


        {/* ID Proof Section */}
        <Text style={styles.label}>ID Proof</Text>

        {/* Select ID Type */}
        <TouchableOpacity
            style={styles.selectBox}
            onPress={() => setShowIdModal(true)}
        >
            <Text style={styles.selectText}>
                {idType || 'Select ID Type'}
            </Text>
        </TouchableOpacity>

        {/* Attach File Button */}
        <TouchableOpacity
        style={[
            styles.uploadBox,
            !idType && { opacity: 0.5 },
        ]}
        disabled={!idType}
        onPress={handleAttachFile}
        >
        <Text style={styles.uploadText}>
            {idFile ? `Attached: ${idFile.name}` : 'Attach ID Proof'}
        </Text>
        </TouchableOpacity>




        {/* Terms */}
        <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAgree(!agree)}
        >
            <View style={[styles.checkbox, agree && styles.checked]} />
            <Text style={styles.termsText}>
            I agree the <Text style={styles.link}>Terms & Conditions</Text>
            </Text>
        </TouchableOpacity>

        {/* Register Button */}
        <TouchableOpacity
          style={[
            styles.registerBtn,
            (!agree || !idFile) && { opacity: 0.5 },
          ]}
          onPress={handleRegister}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>


        {/* Already have account */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginBold}>Login</Text>
            </Text>
        </TouchableOpacity>

      </ScrollView>

      {/* ID Type Modal */}
      <Modal visible={showIdModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>Select ID Type</Text>

            <ScrollView>
                {ID_TYPES.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.modalItem}
                    onPress={() => {
                    setIdType(item);
                    setShowIdModal(false);
                    }}
                >
                    <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setShowIdModal(false)}
            >
                <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>

            </View>
        </View>
      </Modal>
    </View>
    

    
  );
}

/* Reusable Input Component */
function Input({ label, ...props }) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        {...props}
      />
    </>
  );
}

const ORANGE = '#FF6A3D';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 50,
    alignSelf: 'center',
    marginTop: 36,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 15,
  },
  selectBox: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  selectText: {
    color: '#555',
    fontSize: 15,
  },
  uploadBox: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 25,
  },
  uploadText: {
    color: '#999',
  },

  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: ORANGE,
    borderRadius: 4,
    marginRight: 10,
  },
  checked: {
    backgroundColor: ORANGE,
  },
  termsText: {
    fontSize: 14,
    color: '#555',
  },
  link: {
    color: ORANGE,
    fontWeight: '600',
  },
  registerBtn: {
    backgroundColor: ORANGE,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loginText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#777',
    fontWeight: '600',
    marginBottom: 30,
  },
  loginBold: {
    color: ORANGE,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },

  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  modalItemText: {
    fontSize: 16,
    color: '#333',
  },

  modalClose: {
    marginTop: 15,
    alignItems: 'center',
  },

  modalCloseText: {
    color: ORANGE,
    fontSize: 16,
    fontWeight: '600',
  },

});
