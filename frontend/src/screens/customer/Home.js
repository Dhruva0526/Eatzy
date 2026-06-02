import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getAddresses } from '../../services/addressService';
import { getRestaurants } from '../../services/restaurantService';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

import FloatingCartBar from "../../components/customer/FloatingCartBar";

const ORANGE = '#FF6A3D';

const categories = ['Fast Food', 'North Indian', 'Beverages'];


export default function Home({ navigation }) {
  const [mode, setMode] = useState('Dine-In');
  const [selectedCategory, setSelectedCategory] = useState('Fast Food');
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const { cartItems } = useContext(CartContext);

  /* ---------- LOAD LOCATION ---------- */
  useFocusEffect(
    useCallback(() => {
      loadLocation();
    }, [])
  );

  const loadLocation = async () => {
    try {

      const res = await getAddresses();

      const defaultLoc = res.data.find(
        l => l.is_default
      );

      if (defaultLoc) {

        setLocation(
          `${defaultLoc.city || ''}`
        );
        loadRestaurants(defaultLoc.city);
      }

    } catch (error) {
      console.log("LOCATION ERROR:", error);
    }
  };

  /* ---------- Get Restaurant By city --------- */

  const loadRestaurants = async (city) => {
    try {

      const res = await getRestaurants(city);

      setRestaurants(res.data);

    } catch (error) {
      console.log("RESTAURANT ERROR:", error);
    }
  };

  /* ---------- GET CITY ---------- */
  const getCityFromAddress = (address) => {
    if (!address) return '';

    const parts = address.split(',');

    // Handle: "Street, Area, City, State"
    if (parts.length >= 2) {
      return parts[parts.length - 2].trim();
    }

    return parts[0].trim();
  };

  const selectedCity = getCityFromAddress(location);
  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  /* ---------- FILTER LOGIC ---------- */
  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) && 
    (selectedCity
      ? r.city.toLowerCase().includes(selectedCity.toLowerCase())
      : true)
  );

  /* ---------- CARD ---------- */
  const RestaurantCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RestaurantDetails', { restaurant: item })}
    >
      {/* <Image source={item.image} style={styles.image} /> */}
      <Image
        source={require('./../../../assets/pizza.jpg')}
        style={styles.image}
      />

      <View style={styles.cardBody}>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>{item.name}</Text>

          <View style={styles.rating}>
            <Ionicons name="star" color="#fff" size={14} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        <Text style={styles.sub}>{item.cuisine}</Text>

        <View style={styles.rowBetween}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="time-outline" size={16} color="#777" />
            <Text style={styles.time}>{item.time}</Text>
          </View>

          {mode === 'Dine-In' && (
            <Text
              style={[
                styles.table,
                { color: item.table_available === "yes" ? 'green' : 'red' },
              ]}
            >
              {item.table_available === "yes" ? 'Table Available' : 'Full'}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>

      <SafeAreaView style={styles.container} edges={['top']}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.locationLabel}>Location</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('UserLocations')}
            >
              <Text style={styles.location}>
                {location || 'Select Location'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={{ position: 'relative' }}
          >

            <Ionicons
              name="cart"
              size={28}
              color="#777"
            />

            {
              totalCartItems > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {totalCartItems}
                  </Text>
                </View>
              )
            }

          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#777" />
          <TextInput
            placeholder="Search restaurants and cuisines..."
            value={search}
            onChangeText={setSearch}
            style={{ marginLeft: 8, flex: 1 }}
          />
        </View>

        {/* MODE */}
        <View style={styles.modeRow}>
          {['Dine-In', 'Takeaway'].map(m => (
            <TouchableOpacity
              key={m}
              style={[
                styles.modeBtn,
                mode === m && { backgroundColor: ORANGE },
              ]}
              onPress={() => setMode(m)}
            >
              <Text
                style={{
                  color: mode === m ? '#fff' : '#777',
                  fontWeight: '600',
                }}
              >
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* CATEGORY */}
        <View style={styles.categoryRow}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryBtn,
                selectedCategory === cat && {
                  backgroundColor: '#ffd9cc',
                },
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={{
                  color:
                    selectedCategory === cat ? ORANGE : '#777',
                  fontWeight: '600',
                }}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LIST */}
        <FlatList
          data={filteredRestaurants}
          keyExtractor={item => item.id}
          renderItem={RestaurantCard}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No restaurants available in your area 😢
            </Text>
          }
        />
      </SafeAreaView>
      <FloatingCartBar />
    </View>
    
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  locationLabel: { color: '#777' },
  location: { fontSize: 18, fontWeight: '700' },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 12,
    marginVertical: 15,
  },

  modeRow: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 4,
    marginBottom: 15,
  },

  modeBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },

  categoryRow: { flexDirection: 'row', marginVertical: 15 },

  categoryBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 10,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },

  image: { width: '100%', height: 160 },

  cardBody: { padding: 14 },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: { fontSize: 18, fontWeight: '700' },
  sub: { color: '#777', marginVertical: 4 },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },

  ratingText: { color: '#fff', marginLeft: 4 },

  time: { marginLeft: 6, color: '#777' },
  table: { fontWeight: '600' },

  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#777',
  },

  cartBadge: {
  position: 'absolute',
  right: -8,
  top: -5,
  backgroundColor: 'red',
  minWidth: 18,
  height: 18,
  borderRadius: 9,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 4,
},

cartBadgeText: {
  color: '#fff',
  fontSize: 11,
  fontWeight: '700',
},

});