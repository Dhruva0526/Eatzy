import React, { useState, useEffect } from 'react';
import API from '../../services/api'; // adjust path if needed
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateProfile, getProfile } from "../../services/customerService";

const ORANGE = '#FF6A3D';

export default function Profile({ navigation }) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // const [location, setLocation] = useState('Orai, UP');

  const [image, setImage] = useState(null);
  const [editVisible, setEditVisible] = useState(false);

  /* ---------- Fetching Profile ---------- */  

  const fetchProfile = async () => {
    console.log("FETCH PROFILE CALLED");
    try {
      const res = await API.get("/users/me");

      console.log("PROFILE DATA:", res.data);

      setUser(res.data);
      setName(res.data.name || '');
      setPhone(res.data.phone || '');
      setEmail(res.data.email || '');

    } catch (error) {
      console.log("Profile fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ---------- Image Picker ---------- */
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  /* ---------- Logout ---------- */
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token"); // token delete

      console.log("Logout success");

      navigation.replace("SelectRole");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };
  
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <TouchableOpacity onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.avatar} />
            ) : (
              <Ionicons name="person-circle-outline" size={130} color="#888" />
            )}
          </TouchableOpacity>

          <Text style={styles.name}>{name || "No Name"}</Text>
          <Text style={styles.location}>
            {phone || "No Phone Number"}
          </Text>

          <Text style={styles.location}>
            {email || "No Email"}
          </Text>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setEditVisible(true)}
          >
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Buttons */}
        <View style={styles.quickRow}>
          <QuickBtn
            icon="receipt-outline"
            label="Order History"
            onPress={() => navigation.navigate('OrderHistory')}
          />
          <QuickBtn
            icon="heart-outline"
            label="Favorite"
            onPress={() => navigation.navigate('Favorite')}
          />
        </View>

        {/* Menu Card */}
        <View style={styles.menuCard}>
          <MenuItem
            icon="location-outline"
            label="My Addresses"
            onPress={() => navigation.navigate('UserLocations')}
          />
          <Divider />
          <MenuItem
            icon="settings-outline"
            label="Settings"
            onPress={() => navigation.navigate('Settings')}
          />
          <Divider />
          <MenuItem
            icon="chatbox-ellipses-outline"
            label="Help & Support"
            onPress={() => navigation.navigate('Support')}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* ---------- Edit Modal ---------- */}
      <EditModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
      />
    </SafeAreaView>
  );
}

/* ---------- Components ---------- */

function QuickBtn({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.quickBtn} onPress={onPress}>
      <Ionicons name={icon} size={22} color="#555" />
      <Text style={styles.quickText}>{label}</Text>
    </TouchableOpacity>
  );
}

function MenuItem({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name={icon} size={22} color="#666" />
        <Text style={styles.menuText}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={22} color="#666" />
    </TouchableOpacity>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

function EditModal({
  visible,
  onClose,
  name,
  setName,
  email,
  setEmail,
}) {

  const handleSave = async () => {
    try {
      console.log("SENDING:", name);

      const res = await updateProfile({
        name,
        email,
      });

      console.log("RESPONSE:", res.data);

      onClose();
    } catch (error) {
      console.log("ERROR:", error.response?.data || error);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBg}>
        <View style={styles.modalCard}>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>Edit Profile</Text>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email ID"
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f2f2f2' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },

  headerTitle: { fontSize: 24, fontWeight: '700', marginLeft: 12 },

  container: { padding: 16 },

  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
  },

  avatar: { width: 120, height: 120, borderRadius: 60 },

  name: { fontSize: 22, fontWeight: '700', marginTop: 10 },

  location: { color: '#777', marginTop: 4 },

  editBtn: {
    backgroundColor: ORANGE,
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 12,
  },

  editText: { color: '#fff', fontWeight: '700' },

  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  quickBtn: {
    backgroundColor: '#fff',
    width: '48%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
  },

  quickText: { marginTop: 6, fontWeight: '600' },

  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 20,
    paddingVertical: 8,
    elevation: 4,
  },

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },

  menuText: { marginLeft: 12, fontSize: 16 },

  divider: { height: 1, backgroundColor: '#eee', marginHorizontal: 16 },

  logoutBtn: {
    backgroundColor: '#fff',
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
  },

  logoutText: { fontSize: 18, fontWeight: '600' },

  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },

  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
  },

  saveBtn: {
    backgroundColor: ORANGE,
    marginTop: 16,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
});
