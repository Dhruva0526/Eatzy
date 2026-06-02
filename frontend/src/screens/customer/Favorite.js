import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ORANGE = '#FF6A3D';
const BG = '#F5F5F5';

export default function Favorite({ navigation }) {
  const [favorites, setFavorites] = useState([
    {
      id: '1',
      name: 'Margherita Pizza',
      price: '$8.50',
      restaurant: 'Pizza Palace',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: '2',
      name: 'Veg Burger',
      price: '$5.00',
      restaurant: 'Food Hub',
      image: 'https://via.placeholder.com/80',
    },
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.img} />

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.sub}>{item.restaurant}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>

      <TouchableOpacity onPress={() => removeFavorite(item.id)}>
        <Ionicons name="heart" size={24} color={ORANGE} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="heart-outline" size={60} color="#bbb" />
          <Text style={{ color: '#777', marginTop: 10 }}>
            No favorite items
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </SafeAreaView>
  );
}

/* ---------- Styles (Same Theme) ---------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 3,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 12,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 16,
    marginBottom: 14,
    elevation: 3,
  },

  img: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
  },

  sub: {
    color: '#777',
    marginTop: 2,
  },

  price: {
    marginTop: 4,
    fontWeight: '600',
  },

  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
