import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress as removeAddress,
} from '../../services/addressService';

const ORANGE = '#FF5733';
const BG = '#f2f2f2';

export default function UserLocations() {
  const navigation = useNavigation();

  const [locations, setLocations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [label, setLabel] = useState('');
  const [place, setPlace] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  useEffect(() => {
    loadLocations();
  }, []);

  /* ---------- LOAD ---------- */
  const loadLocations = async () => {
    try {
      const res = await getAddresses();

      setLocations(res.data);

      if (res.data.length === 0) {
        detectLocation();
      }
    } catch (error) {
      console.log("LOAD ERROR:", error);
    }
  };

  /* ---------- GPS ---------- */
  const detectLocation = async () => {
    try {

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') return;

      const loc =
        await Location.getCurrentPositionAsync({});

      const geo =
        await Location.reverseGeocodeAsync(loc.coords);

      const g = geo[0];

      setPlace(
        `${g.street || ''}, ${g.name || ''}`
      );

      setCity(g.city || '');

      setPincode(g.postalCode || '');

    } catch (error) {
      console.log(error);
    }
  };

  /* ---------- CRUD ---------- */

  const openAdd = () => {
    setEditing(null);
    setLabel('');
    setPlace('');
    setCity('');
    setPincode('');
    setModalVisible(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setLabel(item.label);
    setPlace(item.address);
    setCity(item.city || '');
    setPincode(item.pincode || '');
    setModalVisible(true);
  };

  const saveLocation = async () => {
    if (!label || !place) return;

    try {

      if (editing) {

        const res = await updateAddress(editing.id, {
          label,
          address: place,
          city,
          pincode,
        });

        setLocations(prev =>
          prev.map(l =>
            l.id === editing.id ? res.data : l
          )
        );

      } else {

        const res = await createAddress({
          label,
          address: place,
          city,
          pincode,
        });

        setLocations(prev => [...prev, res.data]);
      }

      setModalVisible(false);

    } catch (error) {
      console.log("SAVE ERROR:", error);
    }
  };

  const deleteLocation = async (id) => {
    Alert.alert('Delete Location', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: async () => {

          try {

            await removeAddress(id);

            setLocations(prev =>
              prev.filter(l => l.id !== id)
            );

          } catch (error) {
            console.log("DELETE ERROR:", error);
          }
        },
      },
    ]);
  };

  const setDefaultLocation = async (id) => {
    try {

      await updateAddress(id, {
        is_default: true,
      });

      loadLocations();

    } catch (error) {
      console.log("DEFAULT ERROR:", error);
    }
  };

  /* ---------- RENDER CARD ---------- */

  const renderItem = ({ item }) => (
    <View style={[styles.card, item.isDefault && styles.activeCard]}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => setDefaultLocation(item.id)}
      >
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.addr}>
          {item.address}
        </Text>

        <Text style={styles.addr}>
          {item.city} - {item.pincode}
        </Text>
      </TouchableOpacity>

      <View style={styles.iconRow}>
        <TouchableOpacity onPress={() => openEdit(item)}>
          <Ionicons name="create-outline" size={22} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteLocation(item.id)}>
          <Ionicons name="trash-outline" size={22} color="red" />
        </TouchableOpacity>

        {item.isDefault && (
          <Ionicons name="checkmark-circle" size={24} color={ORANGE} />
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Your Locations</Text>

        <TouchableOpacity onPress={openAdd}>
          <Ionicons name="add-circle" size={30} color={ORANGE} />
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={locations}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              {editing ? 'Edit Location' : 'Add Location'}
            </Text>

            <TextInput
              placeholder="Place (Home, Hostel, College)"
              value={label}
              onChangeText={setLabel}
              style={styles.input}
            />
            <TextInput
              placeholder="Full Address"
              value={place}
              onChangeText={setPlace}
              style={styles.input}
            />

            <TextInput
              placeholder="City"
              value={city}
              onChangeText={setCity}
              style={styles.input}
            />

            <TextInput
              placeholder="Pincode"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="numeric"
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.locationBtn}
              onPress={detectLocation}
            >
              <Ionicons name="location" size={18} color="#fff" />

              <Text style={styles.locationBtnText}>
                Use Current Location
              </Text>
            </TouchableOpacity>

            <View style={styles.btnRow}>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelTxt}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={saveLocation}>
                <Text style={styles.saveTxt}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 3,
  },

  headerTitle: { fontSize: 20, fontWeight: '700' },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },

  activeCard: {
    borderWidth: 2,
    borderColor: ORANGE,
  },

  label: { fontWeight: '700', fontSize: 15 },
  addr: { color: '#777', marginTop: 4, fontSize: 13 },

  iconRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },

  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },

  modalBox: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },

  locationBtn: {
    backgroundColor: ORANGE,
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },

  locationBtnText: {
    color: '#fff',
    fontWeight: '700',
  },

  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cancelBtn: {
    backgroundColor: '#eee',
    padding: 14,
    borderRadius: 12,
    width: '48%',
    alignItems: 'center',
  },

  saveBtn: {
    backgroundColor: ORANGE,
    padding: 14,
    borderRadius: 12,
    width: '48%',
    alignItems: 'center',
  },

  cancelTxt: { fontWeight: '700', color: '#555' },
  saveTxt: { fontWeight: '700', color: '#fff' },
});