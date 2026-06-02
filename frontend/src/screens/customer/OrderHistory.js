import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const historyData = [
  {
    id: '1',
    orderNo: '#T12',
    items: '1x Burger, 1x Coke',
    restaurant: 'Food Hub',
    price: '$10.50',
    date: '12 Feb 2026',
  },
  {
    id: '2',
    orderNo: '#T10',
    items: '2x Pizza',
    restaurant: 'Pizza Palace',
    price: '$18.00',
    date: '10 Feb 2026',
  },
];

export default function OrderHistory({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.orderNo}>{item.orderNo}</Text>
      <Text style={styles.items}>{item.items}</Text>
      <Text style={styles.restaurant}>{item.restaurant}</Text>

      <View style={styles.row}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
      </View>

      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 12,
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    elevation: 2,
  },

  orderNo: { color: '#FF6A3D', fontWeight: 'bold' },
  items: { fontSize: 16, fontWeight: '600', marginTop: 4 },
  restaurant: { color: '#777', marginTop: 2 },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  price: { fontWeight: 'bold', fontSize: 16 },
  date: { color: '#999' },
});
