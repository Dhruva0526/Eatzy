import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserOrdersAPI } from '../../services/orderService';

const ORANGE = '#FF6A3D';
const GREEN = '#2EAD66';

export default function Orders({ navigation }) {

  const [orders, setOrders] = useState([]);

  const USER_ID = "56839ba5-2e0c-48ac-bf1a-c691c4e8b2b1";
  
  useEffect(() => {

    loadOrders();

    const interval = setInterval(() => {
      loadOrders();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const loadOrders = async () => {
    try {

      const res = await getUserOrdersAPI(USER_ID);

      setOrders(res);

    } catch (error) {

      console.log(error);
    }
  };

  const getStatusColor = (status) => {

    switch (status) {

      case "pending":
        return "#EAB308";

      case "preparing":
        return "#3B82F6";

      case "completed":
        return "#22C55E";

      default:
        return "#777";
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Orders</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {orders.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No orders yet 😢
          </Text>
        ) : (
          orders.map((order) => (
            <View key={order.order_id} style={styles.card}>
          {/* Top Row */}
          <View style={styles.rowBetween}>
            <Text style={styles.orderId}>#{order.order_id}</Text>
            <Text style={styles.time}>{new Date(order.created_at).toLocaleString()}</Text>
          </View>

          {/* Items */}
          <Text style={styles.items}>
            {order.items.map(i =>
              `${i.qty}x ${i.name}`
            ).join(', ')}
          </Text>
          <Text style={styles.restaurant}>Pizza Palace</Text>

          {/* Bottom Row */}
          <View style={{ flexDirection: "row", gap: 10 }}>

            {/* STATUS BUTTON */}
            <TouchableOpacity
              style={[
                styles.statusBtn,
                {
                  backgroundColor:
                    getStatusColor(order.status) + "20"
                }
              ]}
              onPress={() =>
                
                navigation.navigate("OrderStatus", {
                  orderId: order.order_id,
                })


              }
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color: getStatusColor(order.status)
                  }
                ]}
              >
                {order.status.toUpperCase()}
              </Text>
            </TouchableOpacity>

            {/* DETAILS BUTTON */}
            <TouchableOpacity
              style={[styles.statusBtn, { backgroundColor: "#FFE5D9" }]}
              onPress={() =>
                navigation.navigate("OrderDetails", { order })
              }
            >
              <Text style={[styles.statusText, { color: "#FF6A3D" }]}>
                Details
              </Text>
            </TouchableOpacity>

          </View>
          </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 12,
  },

  container: {
    padding: 16,
  },

  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderId: {
    color: ORANGE,
    fontSize: 20,
    fontWeight: '700',
  },

  time: {
    color: '#888',
    fontSize: 14,
  },

  items: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },

  restaurant: {
    color: '#777',
    fontSize: 15,
    marginTop: 2,
  },

  price: {
    fontSize: 22,
    fontWeight: '800',
  },

  statusBtn: {
    backgroundColor: '#CDE9DA',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  statusText: {
    color: GREEN,
    fontWeight: '700',
    fontSize: 14,
  },
});
