import React, { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getCompletedOrdersAPI
} from "../../services/restaurantOrderService";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ORANGE = '#FF6A3D';

export default function TodaySales() {
  const navigation = useNavigation();

  const [completedOrders, setCompletedOrders] = useState([]);
  const [todaySalesAmount, setTodaySalesAmount] = useState(0);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {

    try {

      const restaurantId =
        await AsyncStorage.getItem(
          "restaurant_id"
        );

      const res =
        await getCompletedOrdersAPI(
          restaurantId
        );

      setCompletedOrders(res);

      const total = res.reduce(
        (sum, order) => sum + Number(order.total),
        0
      );

      setTodaySalesAmount(total);

    } catch (error) {

      console.log(error);

    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.orderId}>#{item.order_id}</Text>
        <Text style={styles.time}>{new Date(item.created_at).toLocaleTimeString()}</Text>
      </View>

      <Text style={styles.items}>{
        item.items
          ?.map((i) => `${i.qty}x ${i.name}`)
          .join(", ")
      }</Text>

      <Text style={styles.price}>₹{item.total}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Today's Sales</Text>
          <Text style={styles.subtitle}>
            Total: ₹{todaySalesAmount.toFixed(2)}
          </Text>
        </View>

        <Ionicons
          name="arrow-back"
          size={24}
          color="#777"
          onPress={() => navigation.goBack()}
        />
      </View>

      {/* Sales List */}
      <FlatList
        data={completedOrders}
        keyExtractor={(item) => item.order_id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No sales yet today 🍕
          </Text>
        }
      />
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  header: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 16,
    color: ORANGE,
    marginTop: 4,
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 14,
    elevation: 3,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: ORANGE,
  },

  time: {
    color: '#888',
  },

  items: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },

  price: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
    color: '#777',
  },
});
