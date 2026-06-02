import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ORANGE = '#FF5733';
const BG = '#f2f2f2';

export default function Settings() {
  const navigation = useNavigation();

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    saveSettings();
  }, [darkMode, notifications, language]);

  /* ---------- STORAGE ---------- */

  const loadSettings = async () => {
    const data = await AsyncStorage.getItem('settings');
    if (data) {
      const parsed = JSON.parse(data);
      setDarkMode(parsed.darkMode);
      setNotifications(parsed.notifications);
      setLanguage(parsed.language);
    }
  };

  const saveSettings = async () => {
    const data = { darkMode, notifications, language };
    await AsyncStorage.setItem('settings', JSON.stringify(data));
  };

  /* ---------- ACTIONS ---------- */

  const clearCache = async () => {
    Alert.alert('Clear Cache', 'Remove temporary data?', [
      { text: 'Cancel' },
      {
        text: 'Clear',
        onPress: async () => {
          await AsyncStorage.removeItem('cart');
          Alert.alert('Done', 'Cache Cleared');
        },
      },
    ]);
  };

  const logout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await AsyncStorage.removeItem('user');
          navigation.replace('Login');
        },
      },
    ]);
  };

  const changeLanguage = () => {
    Alert.alert('Language', '', [
      { text: 'English', onPress: () => setLanguage('English') },
      { text: 'Hindi', onPress: () => setLanguage('Hindi') },
      { text: 'Cancel' },
    ]);
  };

  /* ---------- ROW COMPONENT ---------- */

  const Row = ({ icon, title, onPress, right }) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={20} color="#444" />
        <Text style={styles.rowText}>{title}</Text>
      </View>
      {right}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* ACCOUNT */}
        <View style={styles.card}>
          <Row
            icon="person-outline"
            title="Profile"
            onPress={() => navigation.navigate('Profile')}
            right={<Ionicons name="chevron-forward" size={18} />}
          />
          <Row
            icon="location-outline"
            title="Delivery Address"
            onPress={() => navigation.navigate('UserLocations')}
            right={<Ionicons name="chevron-forward" size={18} />}
          />
        </View>

        {/* PREFERENCES */}
        <View style={styles.card}>
          <Row
            icon="moon-outline"
            title="Dark Mode"
            right={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ true: ORANGE }}
              />
            }
          />

          <Row
            icon="notifications-outline"
            title="Notifications"
            right={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ true: ORANGE }}
              />
            }
          />

          <Row
            icon="language-outline"
            title={`Language: ${language}`}
            onPress={changeLanguage}
            right={<Ionicons name="chevron-forward" size={18} />}
          />
        </View>

        {/* SUPPORT */}
        <View style={styles.card}>
          <Row
            icon="document-text-outline"
            title="Privacy Policy"
            onPress={() => Alert.alert('Open Privacy')}
            right={<Ionicons name="chevron-forward" size={18} />}
          />
          <Row
            icon="reader-outline"
            title="Terms & Conditions"
            onPress={() => Alert.alert('Open Terms')}
            right={<Ionicons name="chevron-forward" size={18} />}
          />
        </View>

        {/* ACTIONS */}
        <View style={styles.card}>
          <Row
            icon="trash-outline"
            title="Clear Cache"
            onPress={clearCache}
            right={<Ionicons name="chevron-forward" size={18} />}
          />
          <Row
            icon="log-out-outline"
            title="Logout"
            onPress={logout}
            right={<Ionicons name="chevron-forward" size={18} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 3,
  },

  headerTitle: { fontSize: 20, fontWeight: '700' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  rowText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
});
