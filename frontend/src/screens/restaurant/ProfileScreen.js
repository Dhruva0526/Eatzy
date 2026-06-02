import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TextInput, 
  TouchableOpacity, Image, Alert, Modal 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getProfile, updateProfile, uploadProfileImage } from "../../services/profileService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import API, { BASE_URL } from "../../services/api";
import { SafeAreaView } from 'react-native-safe-area-context';


// Design Constants (Aapke brand colors)
const ORANGE = '#FF6347'; 
const GREEN = '#2ECC71';

const ProfileScreen = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);

  const [loading, setLoading] = useState(true);
  // Registration Page Fields Mapping
  const [profile, setProfile] = useState({
    ownerName: '',
    phone: '',
    email: '',
    shopName: '',
    address: '',
    state: '',
    city: '',
    pinCode: '',
    gstNo: '',
    profileUrl: '',
  });


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:  ['images'],
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.length > 0) {
      uploadImage(result.assets[0]);
    }
  };

  const uploadImage = async (image) => {
    try {
      const identifier = await AsyncStorage.getItem("identifier");

      if (!identifier) {
        Alert.alert("Error", "Session expired. Please login again.");
        return;
      }

      const res = await uploadProfileImage(identifier, image);

      console.log("UPLOAD SUCCESS:", res);

      // 🔥 refresh profile
      fetchProfile();

    } catch (err) {
      console.log("UPLOAD ERROR:", err.response?.data || err);
    }
  };

  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const identifier = await AsyncStorage.getItem("identifier"); // 🔥 ya email

      if (!identifier) {
        Alert.alert("Error", "Session expired. Please login again.");
        return;
      }

      const data = await getProfile(identifier);

      console.log("FULL PROFILE DATA:", data);

      setProfile({
        ownerName: data.ownerName,
        phone: data.phone,
        email: data.email,
        shopName: data.shopName,
        address: data.address,
        state: data.state,
        city: data.city,
        pinCode: data.pincode,
        gstNo: data.gst,
        profileUrl: data.profile_url,
      });

      console.log("PROFILE URL:", profile.profileUrl);

    } catch (err) {
      console.log(err);
    } finally {
    setLoading(false); // 🔥 stop loading
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {

      const identifier = await AsyncStorage.getItem("identifier");

      if (!identifier) {
        Alert.alert("Error", "User not logged in");
        return;
      }

      const response = await updateProfile(identifier, {
        ownerName: profile.ownerName,
        email: profile.email,
        shopName: profile.shopName,
        address: profile.address,
        state: profile.state,
        city: profile.city,
        pincode: profile.pinCode, // ⚠️ mapping important
        gst: profile.gstNo,
      });
      console.log("SENDING DATA:", {
        ownerName: profile.ownerName,
        email: profile.email,
        shopName: profile.shopName,
        address: profile.address,
        pincode: profile.pinCode,
        gst: profile.gstNo,
      });
      console.log("UPDATE RESPONSE:", response.data);
      setIsEdit(false);
      Alert.alert("Success", "Profile updated successfully!");

    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data || err);
      Alert.alert("Error", "Update failed");
    }
  };

  // Reusable Input Component
  const ProfileInput = ({ label, value, field, editable = true, keyboard = 'default' }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, !isEdit || !editable ? styles.disabledInput : null]}
        value={value}
        editable={isEdit && editable}
        keyboardType={keyboard}
        onChangeText={(text) => setProfile({ ...profile, [field]: text })}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }} edges={['top']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{
                uri: profile.profileUrl
                  ? `${BASE_URL}/media/profile_images/${profile.profileUrl}?t=${Date.now()}`
                  : 'https://via.placeholder.com/150'
              }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
              <Ionicons name="camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.shopTitle}>{profile.shopName || "Your Shop"}</Text>
          <Text style={styles.merchantId}>ID: #{profile.phone || "N/A"}</Text>
        </View>

        {/* FORM SECTION */}
        <View style={styles.formCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Merchant Details</Text>
            <TouchableOpacity onPress={() => isEdit ? handleUpdate() : setIsEdit(true)}>
              <Text style={styles.editBtnText}>{isEdit ? "SAVE" : "EDIT"}</Text>
            </TouchableOpacity>
          </View>

          <ProfileInput label="Owner Name" value={profile.ownerName} field="ownerName" />
          <ProfileInput label="Phone No." value={profile.phone} field="phone" editable={false} keyboard="numeric" />
          <ProfileInput label="Email Id" value={profile.email} field="email" keyboard="email-address" />
          <ProfileInput label="Shop Name" value={profile.shopName} field="shopName" />
          <ProfileInput label="Shop Address" value={profile.address} field="address" />
          
          <View style={styles.rowBetween}>
              <View style={{width: '48%'}}><ProfileInput label="State" value={profile.state} field="state" /></View>
              <View style={{width: '48%'}}><ProfileInput label="City" value={profile.city} field="city" /></View>
          </View>

          <ProfileInput label="Pin Code" value={profile.pinCode} field="pinCode" keyboard="numeric" />
          <ProfileInput label="GST No. (Optional)" value={profile.gstNo} field="gstNo" />
        </View>

        {/* SECURITY SECTION */}
        <View style={[styles.formCard, { marginBottom: 40 }]}>
          <Text style={styles.sectionTitle}>Account Security</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => setShowPassModal(true)}>
            <View style={styles.row}>
              <Ionicons name="lock-closed-outline" size={20} color={ORANGE} />
              <Text style={styles.menuText}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <View style={styles.menuItem}>
            <View style={styles.row}>
              <Ionicons name="shield-checkmark-outline" size={20} color={GREEN} />
              <Text style={styles.menuText}>Verification Documents</Text>
            </View>
            <Text style={{color: GREEN, fontSize: 12, fontWeight: 'bold'}}>VERIFIED</Text>
          </View>
        </View>

        {/* CHANGE PASSWORD MODAL */}
        <Modal visible={showPassModal} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Update Password</Text>
              
              <TextInput placeholder="Current Password" secureTextEntry style={styles.modalInput} onChangeText={(v) => setPasswords({...passwords, old: v})} />
              <TextInput placeholder="New Password" secureTextEntry style={styles.modalInput} onChangeText={(v) => setPasswords({...passwords, new: v})} />
              <TextInput placeholder="Confirm New Password" secureTextEntry style={styles.modalInput} onChangeText={(v) => setPasswords({...passwords, confirm: v})} />

              <TouchableOpacity style={styles.submitBtn} onPress={() => {
                  if(passwords.new === passwords.confirm) {
                      setShowPassModal(false);
                      Alert.alert("Done", "Password Changed!");
                  } else {
                      Alert.alert("Error", "Passwords don't match");
                  }
              }}>
                <Text style={styles.btnText}>Change Password</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => setShowPassModal(false)} style={{marginTop: 15}}>
                <Text style={{color: '#999'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F8' },
  header: { backgroundColor: '#fff', padding: 30, alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, elevation: 2 },
  avatarContainer: { position: 'relative' },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: ORANGE },
  editIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: ORANGE, padding: 6, borderRadius: 20, borderSize: 2, borderColor: '#fff' },
  shopTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 10, color: '#333' },
  merchantId: { color: '#999', fontSize: 12 },
  formCard: { backgroundColor: '#fff', margin: 15, borderRadius: 20, padding: 20, elevation: 1 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#555', marginBottom: 15 },
  editBtnText: { color: ORANGE, fontWeight: 'bold' },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 12, color: '#999', marginBottom: 5 },
  input: { fontSize: 15, color: '#333', borderBottomWidth: 1, borderBottomColor: '#EEE', paddingVertical: 5 },
  disabledInput: { borderBottomColor: 'transparent', color: '#777' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F9F9F9' },
  menuText: { marginLeft: 15, fontSize: 15, color: '#444' },
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#fff', borderRadius: 25, padding: 25, alignItems: 'center' },
  modalHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  modalInput: { width: '100%', backgroundColor: '#F4F7F8', padding: 12, borderRadius: 10, marginBottom: 12 },
  submitBtn: { width: '100%', backgroundColor: ORANGE, padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold' }
});

export default ProfileScreen;