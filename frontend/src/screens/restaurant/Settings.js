  import React, { useState, useEffect } from 'react';
  import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Switch,
    ScrollView,
    Alert,
    Modal,
    ActivityIndicator,
  } from 'react-native';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { Ionicons } from '@expo/vector-icons';
  import { useNavigation } from '@react-navigation/native';

  // Components
  import Card from '../../components/restaurant/settings/Card';
  import OperationalControl from '../../components/restaurant/settings/OperationalControl';
  import NotificationSettings from '../../components/restaurant/settings/NotificationSettings';
  import AutoAcceptCard from '../../components/restaurant/settings/AutoAcceptCard';
  import FinancialCard from '../../components/restaurant/settings/FinancialCard';
  import ProfileCard from '../../components/restaurant/settings/ProfileCard';
  import MenuManagementCard from '../../components/restaurant/settings/MenuManagementCard';
  import StaffManagementCard from '../../components/restaurant/settings/StaffManagementCard';
  import LogoutButton from '../../components/restaurant/settings/LogoutButton';

  // Models
  import PrepTimeModal from '../../components/restaurant/settings/modals/PrepTimeModal';
  import ScheduleModal from '../../components/restaurant/settings/modals/ScheduleModal';
  import BankModal from '../../components/restaurant/settings/modals/BankModal';
  import BankDetailsModal from '../../components/restaurant/settings/modals/BankDetailsModal';
  import MenuModal from '../../components/restaurant/settings/modals/MenuModal';
  import StaffModal from '../../components/restaurant/settings/modals/StaffModal'; 
  import TableBookingCard from '../../components/restaurant/tableBooking/TableBookingCard';


  import styles from '../../styles/restaurant/settingsStyles';

  import {
    getMenu,
    addMenuItem,
    updateMenuItem,
    toggleMenuItem,
    deleteMenuItem,
  } from "../../services/menuService";
  import API from "../../services/api";
  import AsyncStorage from '@react-native-async-storage/async-storage';

  import { getSettings, updateSettings } from "../../services/settingsService";
  import { getProfile } from "../../services/profileService";   


  const ORANGE = '#FF6A3D';
  const GREEN = '#16c60c';

  export default function Settings({ navigation }) {

    const [acceptingOrders, setAcceptingOrders] = useState(true);
    const [busyMode, setBusyMode] = useState(false);
    const [orderAlert, setOrderAlert] = useState(true);

    const [openTime, setOpenTime] = useState('10:00am');
    const [closeTime, setCloseTime] = useState('10:00pm');

    // Opening Time States
    const [openHour, setOpenHour] = useState('10');
    const [openMin, setOpenMin] = useState('00');
    const [openPeriod, setOpenPeriod] = useState('AM');

    // Closing Time States
    const [closeHour, setCloseHour] = useState('10');
    const [closeMin, setCloseMin] = useState('00');
    const [closePeriod, setClosePeriod] = useState('PM');

    const [prepTime, setPrepTime] = useState(20); // minutes
    const [showPrepModal, setShowPrepModal] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);

    // New Order Notifications Section
    const [notificationInterval, setNotificationInterval] = useState('60 seconds');
    const [selectedRingtone, setSelectedRingtone] = useState('Default Bell');
    const [showRingtoneModal, setShowRingtoneModal] = useState(false); // Agar list badi ho toh

    // Auto Accept Order
    const [autoAccept, setAutoAccept] = useState(false);

    // Payouts & Financial 
    const [bankAccount, setBankAccount] = useState('xxxxxxxxxx1234');
    const [bankName, setBankName] = useState('HDFC Bank (Primary)');
    const [commissionRate, setCommissionRate] = useState('3.5%');

    const [showBankModal, setShowBankModal] = useState(false);

    const [isOtpSent, setIsOtpSent] = useState(false); // OTP screen toggle karne ke liye
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Menu Management
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', price: '' });
    const [isPriceEditMode, setIsPriceEditMode] = useState(false);
    const [editingItemId, setEditingItemId] = useState(null);
    const [tempPrice, setTempPrice] = useState('');
    const [isEditMode, setIsEditMode] = useState(false); // Edit form toggle
    const [editingItem, setEditingItem] = useState(null); // Current item being edited

    const [menuItems, setMenuItems] = useState([]);

    // TABLE BOOKING
   // ================= TABLE BOOKING =================

    const [acceptBookings, setAcceptBookings] = useState(true);

    const [bookingMode, setBookingMode] = useState('Instant Confirm');

    const [maxTables, setMaxTables] = useState(20);

    const [autoHoldDuration, setAutoHoldDuration] = useState(15);

    const [waitlistEnabled, setWaitlistEnabled] = useState(true);

    const [advancePaymentEnabled, setAdvancePaymentEnabled] = useState(false);

    const [advanceAmount, setAdvanceAmount] = useState('200');

    const [bookingNotifications, setBookingNotifications] = useState(true);

    const [timeSlots, setTimeSlots] = useState([
        '12:00 PM - 2:00 PM',
        '7:00 PM - 11:00 PM',
      ]);

    // MODALS
    const [showBookingModeModal, setShowBookingModeModal] = useState(false);

    const [showTimeSlotModal, setShowTimeSlotModal] = useState(false);

    const [showMaxTablesModal, setShowMaxTablesModal] = useState(false);

    const [showAdvancePaymentModal, setShowAdvancePaymentModal] = useState(false);

    // Staff Management
    const [loadingStaff, setLoadingStaff] = useState(false);
    const [staffMembers, setStaffMembers] = useState([]);

    
    

    // helper *****
    const callUpdate = async (payload) => {
      try {
        const identifier = await AsyncStorage.getItem("identifier");

        if (!identifier) {
          console.log("Identifier missing ❌");
          return;
        }

        console.log("CALL UPDATE:", payload);

        const res = await API.put(`/settings/${identifier}`, payload);

        return res.data;
      } catch (err) {
        console.log("CALL UPDATE ERROR:", err.response?.data || err.message);
      }
    };

    // *************Menu Api Call*****************************************************************

    React.useEffect(() => {
      if (showMenuModal) {
        fetchMenu();
      }
    }, [showMenuModal]);

    const fetchMenu = async () => {
      try {
        const identifier = await AsyncStorage.getItem("identifier");

        if (!identifier) {
          console.log("identifier missing ❌");
          return;
        }

        const res = await API.get("/menu/my-menu", {
          params: { identifier }
        });

        console.log("MENU DATA:", res.data);

        setMenuItems(res.data || []);
      } catch (err) {
        console.log("MENU ERROR:", err.response?.data || err.message);
        Alert.alert("Error", "Failed to load menu");
      }
    };

    const handleAddItem = async () => {
      if (!newItem.name || !newItem.price) {
        Alert.alert("Error", "Name and Price required");
        return;
      }

      try {
        const identifier = await AsyncStorage.getItem("identifier");

        const payload = {
          name: newItem.name.trim(),
          description: newItem.desc?.trim() || "", // ✅ FIX
          price: parseFloat(newItem.price),
        };

        console.log("ADD PAYLOAD:", payload); // 🔥 DEBUG

        await API.post("/menu/my-menu", payload, {
          params: { identifier },
        });

        fetchMenu();
        setIsAddMode(false);
        setNewItem({ name: "", price: "", desc: "" });

      } catch (err) {
        console.log("ADD ERROR FULL:", err.response?.data || err.message);
        Alert.alert("Error", "Failed to add item");
      }
    };

    const handleDeleteItem = async (id) => {
      try {
        const identifier = await AsyncStorage.getItem("identifier");

        await API.delete(`/menu/my-menu/${id}`, {
          params: { identifier },
        });

        fetchMenu();

      } catch (err) {
        console.log("DELETE ERROR:", err.response?.data || err.message);
        Alert.alert("Error", "Delete failed");
      }
    };

    const handleToggleStatus = async (id) => {
      try {
        const identifier = await AsyncStorage.getItem("identifier");

        await API.put(
          `/menu/my-menu/${id}/toggle`,
          {},
          {
            params: { identifier },
          }
        );

        fetchMenu();

      } catch (err) {
        console.log("TOGGLE ERROR:", err.response?.data || err.message);
        Alert.alert("Error", "Status update failed");
      }
    };

    const openPriceEditor = (id, currentPrice) => {
      setEditingItemId(id);
      setTempPrice(String(currentPrice)); // Sirf number dikhane ke liye
      setIsPriceEditMode(true);
    };

    const saveNewPrice = () => {
      setMenuItems(prevItems => prevItems.map(item => 
        item.id === editingItemId ? { ...item, price: parseFloat(tempPrice) } : item
      ));
      setIsPriceEditMode(false);
      setEditingItemId(null);
    };

    const openEditForm = (item) => {
      setEditingItem({
        id: item.id,
        name: item.name,
        desc: item.desc || "",
        price: String(item.price), // ✅ IMPORTANT (string banaya)
      });

      setIsEditMode(true);
    };

    const saveUpdatedItem = async () => {
      try {
        const identifier = await AsyncStorage.getItem("identifier");

        const payload = {
          name: editingItem.name.trim(),
          description: editingItem.desc?.trim() || "", // ✅ FIX
          price: parseFloat(editingItem.price),
        };

        console.log("UPDATE PAYLOAD:", payload); // 🔥 DEBUG

        await API.put(
          `/menu/my-menu/${editingItem.id}`,
          payload,
          {
            params: { identifier },
          }
        );

        fetchMenu();
        setIsEditMode(false);
        setEditingItem(null);

        Alert.alert("Success", "Item updated successfully!");

      } catch (err) {
        console.log("UPDATE ERROR FULL:", err.response?.data || err.message);
        Alert.alert("Error", "Update failed");
      }
    };

    // ********************** Setting page *******************************************************

    React.useEffect(() => {
      loadSettings();
      loadProfile();
    }, []);

    const loadSettings = async () => {
      try {
        const identifier = await AsyncStorage.getItem("identifier");

        const data = await getSettings(identifier);

        // 🔥 backend camelCase match
        setAcceptingOrders(data?.acceptingOrders ?? true);
        setBusyMode(data?.busyMode ?? false);
        setPrepTime(data?.prepTime ?? 20);
        setOpenTime(data?.openTime ?? "10:00am");
        setCloseTime(data?.closeTime ?? "10:00pm");
        setOrderAlert(data?.orderAlert ?? true);
        setSelectedRingtone(data?.ringtone ?? "Default Bell");
        setNotificationInterval(data?.notificationInterval ?? "60 seconds");
        setAutoAccept(data?.autoAccept ?? false);

      } catch (err) {
        Alert.alert("Error", "Failed to load settings");
      }
    };

    const loadProfile = async () => {
      try {

        setLoadingProfile(true);

        const identifier = await AsyncStorage.getItem("identifier");

        const data = await getProfile(identifier);   // 🔥 same function use karo

        console.log("PROFILE DATA:", data);

        setProfileData(data);

      } catch (err) {
        console.log("PROFILE ERROR:", err.response?.data || err.message);
      } finally {
      // 🔹 Stop loading (success ya error dono me)
        setLoadingProfile(false);
      }
    };

    const [profileData, setProfileData] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    React.useEffect(() => {
      const fetchProfile = async () => {
        try {
          setLoadingProfile(true); // start loading
          const identifier = await AsyncStorage.getItem("identifier");

          if (!identifier) {
            console.log("Identifier missing ❌");
            setLoadingProfile(false);
            return;
          }

          // API call ya service function
          const data = await getProfile(identifier);  // tumhare profileService se
          console.log("PROFILE DATA:", data);
          setProfileData(data); // store profile

        } catch (err) {
          console.log("PROFILE ERROR:", err.response?.data || err.message);
        } finally {
          setLoadingProfile(false); // end loading
        }
      };

      fetchProfile();
    }, []);

    //STAFF MANAGEMENT
    useEffect(() => {
      fetchStaff();
    }, []);

    const fetchStaff = async () => {
      try {
        setLoadingStaff(true);

        const token = await AsyncStorage.getItem("token");

        const res = await API.get("/restaurant/staff/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("STAFF DATA:", res.data);

        setStaffMembers(res.data);   // 🔥 IMPORTANT: staffMembers use karo
      } catch (error) {
        console.log("Error fetching staff:", error.response?.data || error.message);
      } finally {
        setLoadingStaff(false);
      }
    };


    const addStaff = async () => {
      console.log("ADD STAFF FUNCTION CALLED ✅");
      try {
        const token = await AsyncStorage.getItem("token");

        console.log("TOKEN:", token);

        if (!token) {
          Alert.alert("Error", "Token missing ❌");
          return;
        }

        const payload = {
          name: newStaff.name,
          role: newStaff.role,
          phone: newStaff.phone,
        };

        console.log("ADD STAFF PAYLOAD:", payload);
        if (
          !newStaff.name ||
          newStaff.role === 'Select Role' ||
          !newStaff.phone
        ) {
          Alert.alert("Error", "Please fill Name, Role and Phone.");
          return;
        }

        await API.post("/restaurant/staff/", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        fetchStaff();   // 🔥 refresh list
        setShowStaffModal(false);

      } catch (err) {
        console.log("Add staff error:", err.response?.data || err.message);
        Alert.alert("Error", "Failed to add staff");
      }
    };

    const [showStaffModal, setShowStaffModal] = useState(false);

    const [isRolePickerVisible, setIsRolePickerVisible] = useState(false);
    const roles = ['Manager', 'Billing Staff', 'Chef', 'Delivery Partner', 'Waiter'];

    const [newStaff, setNewStaff] = useState({ 
      name: '', 
      role: 'Select Role', 
      phone: '', 
      idType: 'Select ID Type', // Aadhaar, PAN, etc.
      idNumber: '', 
      idFile: null // File info store karne ke liye
    });

    const idTypes = ['Aadhaar Card', 'PAN Card', 'Voter ID', 'Driving License'];
    const [isIdTypePickerVisible, setIsIdTypePickerVisible] = useState(false);

    const handleLogout = () => {
      Alert.alert('Logout', 'Are you sure you want to logout?', [
        { text: 'Cancel' },
        { text: 'Logout', onPress: () => navigation.replace('Login') },
      ]);
    };

    const handleTimeChange = (type, value, setter) => {
      // Sirf numbers allow karein
      let cleaned = value.replace(/[^0-9]/g, '');

      if (type === 'hour') {
        // Agar user 12 se bada number daale toh 12 set kar do
        if (parseInt(cleaned) > 12) {
          cleaned = '12';
        }
      } else if (type === 'min') {
        // Agar user 59 se bada number daale toh 59 set kar do
        if (parseInt(cleaned) > 59) {
          cleaned = '59';
        }
      }
      
      // Max 2 digits
      if (cleaned.length > 2) cleaned = cleaned.slice(0, 2);
      
      setter(cleaned);
    };

    const formatOnBlur = (value, setter) => {
      // Agar khali hai toh "00"
      if (!value || value.trim() === '') {
        setter('00');
        return;
      }
      
      // Agar single digit hai (e.g. "5"), toh use "05" bana do
      if (value.length === 1) {
        setter('0' + value);
      }
    };

    const finalFormat = (val) => {
      if (!val || val.trim() === '') return '00';
      return val.length === 1 ? '0' + val : val;
    };

    // Form Fields
    const [bankForm, setBankForm] = useState({
      bankName: '',
      ifsc: '',
      branch: 'Auto-detected branch...', // IFSC se fetch hoga
      holderName: '',
      accountNo: '',
      confirmAccountNo: '',
      otp: ''
    });

    React.useEffect(() => {
      let interval;
      if (isOtpSent && timer > 0) {
        interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
      } else if (timer === 0) {
        setCanResend(true);
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isOtpSent, timer]);

    // Resend function
    const handleResend = () => {
      setTimer(30);
      setCanResend(false);
      // Yahan aapki OTP API call hogi
      Alert.alert("OTP Sent", "A new code has been sent to your phone.");
    };

    // Delete Staff
    const removeStaff = (id) => {
      Alert.alert("Remove Staff", "Are you sure?", [
        { text: "Cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");

              await API.delete(`/restaurant/staff/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              fetchStaff();   // 🔥 refresh list

            } catch (err) {
              console.log("Delete error:", err.response?.data || err.message);
            }
          },
        },
      ]);
    };

    const updateStaff = async (id, updatedData) => {
      try {
        const token = await AsyncStorage.getItem("token");

        await API.put(`/restaurant/staff/${id}`, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        fetchStaff();

      } catch (err) {
        console.log("Update error:", err.response?.data || err.message);
      }
    };

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }} edges={['top']}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

          {/* HEADER */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Settings</Text>
              <Text style={styles.headerSub}>
                {profileData?.shopName || "Loading..."}
              </Text>
            </View>
          </View>

          {/* OPERATIONAL CONTROL */}
          <OperationalControl
            styles={styles}
            GREEN={GREEN}

            acceptingOrders={acceptingOrders}
            setAcceptingOrders={setAcceptingOrders}

            callUpdate={callUpdate}

            busyMode={busyMode}
            setBusyMode={setBusyMode}

            prepTime={prepTime}
            setPrepTime={setPrepTime}

            setShowPrepModal={setShowPrepModal}

            openTime={openTime}
            closeTime={closeTime}

            setShowScheduleModal={setShowScheduleModal}
          />

          {/* NOTIFICATIONS */}
          <NotificationSettings
            styles={styles}
            GREEN={GREEN}

            orderAlert={orderAlert}
            setOrderAlert={setOrderAlert}

            selectedRingtone={selectedRingtone}
            setSelectedRingtone={setSelectedRingtone}

            notificationInterval={notificationInterval}
            setNotificationInterval={setNotificationInterval}

            callUpdate={callUpdate}
          />

          {/* AUTO ACCEPT */}
          <AutoAcceptCard
            styles={styles}
            GREEN={GREEN}

            autoAccept={autoAccept}
            setAutoAccept={setAutoAccept}

            callUpdate={callUpdate}
          />
            
          {/* PAYOUTS & FINANCIAL */}
          <FinancialCard
            styles={styles}
            ORANGE={ORANGE}
            GREEN={GREEN}

            bankName={bankName}
            bankAccount={bankAccount}

            commissionRate={commissionRate}

            setShowDetailsModal={setShowDetailsModal}
            setShowBankModal={setShowBankModal}
          />

          {/* MENU MANAGEMENT */}
          <MenuManagementCard
            styles={styles}
            GREEN={ORANGE}
            setShowMenuModal={setShowMenuModal}
          />

          {/* TABLE BOOKING */}
          <Card>

            <TouchableOpacity
              style={styles.menuRow}
              onPress={() =>
                navigation.navigate(
                  'TableBookingSettings'
                )
              }
            >

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >

                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    backgroundColor: '#FFF1EB',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 14,
                  }}
                >

                  <Ionicons
                    name="calendar-outline"
                    size={24}
                    color={ORANGE}
                  />

                </View>

                <View>

                  <Text style={styles.cardTitle}>
                    Table Booking
                  </Text>

                  <Text
                    style={[
                      styles.subLabel,
                      { marginTop: 3 },
                    ]}
                  >
                    Manage reservations &
                    dining setup
                  </Text>

                </View>

              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color="#999"
              />

            </TouchableOpacity>

          </Card>

          {/* STAFF MANAGEMENT */}
          <StaffManagementCard
            styles={styles}
            loadingStaff={loadingStaff}
            staffMembers={staffMembers}
            removeStaff={removeStaff}
            setShowStaffModal={setShowStaffModal}
          />

          {/* PROFILE SECTION */}
          <ProfileCard
            styles={styles}
            ORANGE={ORANGE}
            profileData={profileData}
            navigation={navigation}
          />

          {/* LOGOUT */}
          <LogoutButton
            styles={styles}
            handleLogout={handleLogout}
          />
          
        </ScrollView>

        <PrepTimeModal
          showPrepModal={showPrepModal}
          setShowPrepModal={setShowPrepModal}

          prepTime={prepTime}
          setPrepTime={setPrepTime}

          callUpdate={callUpdate}
        />

        <ScheduleModal
          showScheduleModal={showScheduleModal}
          setShowScheduleModal={setShowScheduleModal}

          openHour={openHour}
          setOpenHour={setOpenHour}

          openMin={openMin}
          setOpenMin={setOpenMin}

          closeHour={closeHour}
          setCloseHour={setCloseHour}

          closeMin={closeMin}
          setCloseMin={setCloseMin}

          openPeriod={openPeriod}
          setOpenPeriod={setOpenPeriod}

          closePeriod={closePeriod}
          setClosePeriod={setClosePeriod}

          setOpenTime={setOpenTime}
          setCloseTime={setCloseTime}

          handleTimeChange={handleTimeChange}
          formatOnBlur={formatOnBlur}
          finalFormat={finalFormat}

          callUpdate={callUpdate}
        />

        <BankModal
          showBankModal={showBankModal}
          setShowBankModal={setShowBankModal}

          isOtpSent={isOtpSent}
          setIsOtpSent={setIsOtpSent}

          bankForm={bankForm}
          setBankForm={setBankForm}

          timer={timer}
          setTimer={setTimer}

          canResend={canResend}
          handleResend={handleResend}

          GREEN={GREEN}
          ORANGE={ORANGE}

          setBankName={setBankName}
          setBankAccount={setBankAccount}
        />

        <BankDetailsModal
          showDetailsModal={showDetailsModal}
          setShowDetailsModal={setShowDetailsModal}

          GREEN={GREEN}

          bankForm={bankForm}
          bankName={bankName}
        />

        <MenuModal
          showMenuModal={showMenuModal}
          setShowMenuModal={setShowMenuModal}

          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}

          isAddMode={isAddMode}
          setIsAddMode={setIsAddMode}

          editingItem={editingItem}
          setEditingItem={setEditingItem}

          saveUpdatedItem={saveUpdatedItem}

          newItem={newItem}
          setNewItem={setNewItem}

          handleAddItem={handleAddItem}

          menuItems={menuItems}

          GREEN={GREEN}
          ORANGE={ORANGE}

          openEditForm={openEditForm}
          handleToggleStatus={handleToggleStatus}
          handleDeleteItem={handleDeleteItem}
        />

        <StaffModal
          styles={styles}
          visible={showStaffModal}
          setShowStaffModal={setShowStaffModal}

          newStaff={newStaff}
          setNewStaff={setNewStaff}

          isRolePickerVisible={isRolePickerVisible}
          setIsRolePickerVisible={setIsRolePickerVisible}

          isIdTypePickerVisible={isIdTypePickerVisible}
          setIsIdTypePickerVisible={setIsIdTypePickerVisible}

          roles={roles}
          idTypes={idTypes}

          addStaff={addStaff}

          GREEN={GREEN}
          ORANGE={ORANGE}
        />
      </SafeAreaView>
    );
  }